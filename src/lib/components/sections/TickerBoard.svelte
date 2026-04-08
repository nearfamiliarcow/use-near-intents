<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { Token } from '$lib/data/tokens';

	interface Props {
		tokens: Token[];
		assetChainMap: Record<string, { slug: string; name: string; logoURI: string }[]>;
	}

	let { tokens, assetChainMap }: Props = $props();

	let hoveredSymbol = $state<string | null>(null);
	let clickedSymbol = $state<string | null>(null);
	let expanded = $state(false);
	let imgErrors = $state(new Set<string>());

	function toggleClick(symbol: string) {
		clickedSymbol = clickedSymbol === symbol ? null : symbol;
	}


	const INITIAL_COUNT = 24;

	function handleImgError(id: string) {
		imgErrors = new Set([...imgErrors, id]);
	}

	const mergeMap: Record<string, string> = {
		WETH: 'ETH', wETH: 'ETH',
		WNEAR: 'NEAR', wNEAR: 'NEAR',
		wBTC: 'BTC'
	};

	const allTokens = $derived(() => {
		const seen = new Set<string>();
		return tokens
			.filter((t) => {
				if (t.price <= 0) return false;
				const displaySymbol = mergeMap[t.symbol] ?? t.symbol;
				if (seen.has(displaySymbol)) return false;
				seen.add(displaySymbol);
				return true;
			})
			.sort((a, b) => (b.volume24h ?? 0) - (a.volume24h ?? 0) || b.price - a.price);
	});

	const displayTokens = $derived(
		expanded ? allTokens() : allTokens().slice(0, INITIAL_COUNT)
	);

	const hiddenCount = $derived(Math.max(0, allTokens().length - INITIAL_COUNT));

	function getChainsForSymbol(rawSymbol: string): { slug: string; name: string; logoURI: string }[] {
		const parentSymbol = mergeMap[rawSymbol] ?? rawSymbol;
		const allSymbols = [parentSymbol, ...Object.entries(mergeMap).filter(([, v]) => v === parentSymbol).map(([k]) => k)];
		if (!allSymbols.includes(rawSymbol)) allSymbols.push(rawSymbol);
		const seen = new Set<string>();
		const chains: { slug: string; name: string; logoURI: string }[] = [];
		for (const sym of allSymbols) {
			for (const chain of assetChainMap[sym] ?? []) {
				if (!seen.has(chain.slug)) {
					seen.add(chain.slug);
					chains.push(chain);
				}
			}
		}
		return chains;
	}

	function formatPrice(price: number): string {
		if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
		if (price >= 1) return `$${price.toFixed(2)}`;
		if (price >= 0.01) return `$${price.toFixed(3)}`;
		return `$${price.toFixed(6)}`;
	}
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<div class="mb-6 text-center sm:mb-8">
		<h2 class="text-xl font-bold text-near-text sm:text-2xl">Live Supported Assets</h2>
		<p class="mt-1 text-sm text-near-text-secondary sm:text-base">
			Across {new Set(tokens.map((t) => t.blockchain)).size} chains — hover to see cross-chain availability
		</p>
	</div>

	<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
		{#each displayTokens as token (token.assetId)}
			{@const displaySymbol = mergeMap[token.symbol] ?? token.symbol}
			{@const active = hoveredSymbol === token.symbol || clickedSymbol === token.symbol}
			{@const chains = active ? getChainsForSymbol(token.symbol) : []}

			<!-- Wrapper with relative positioning for the popover -->
			<div class="relative">
				<button
					class="flex w-full items-center gap-2.5 rounded-lg border bg-near-surface px-3 py-2.5 text-left shadow-sm transition-all sm:gap-3 sm:px-4 sm:py-3
						{active ? 'border-near-orange/40 bg-near-orange-light shadow-md z-20' : 'border-near-border hover:border-near-orange/30'}"
					onmouseenter={() => (hoveredSymbol = token.symbol)}
					onmouseleave={() => (hoveredSymbol = null)}
					onclick={() => toggleClick(token.symbol)}
					onfocus={() => (hoveredSymbol = token.symbol)}
					onblur={() => (hoveredSymbol = null)}
				>
					{#if token.logoURI && !imgErrors.has(token.assetId)}
						<img
							src={token.logoURI}
							alt={displaySymbol}
							class="h-6 w-6 shrink-0 rounded-full sm:h-8 sm:w-8"
							onerror={() => handleImgError(token.assetId)}
						/>
					{:else}
						<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[8px] font-bold text-near-light-gray sm:h-8 sm:w-8 sm:text-[10px]">
							{displaySymbol.slice(0, 3)}
						</div>
					{/if}
					<div class="min-w-0 flex-1">
						<div class="truncate text-xs font-semibold text-near-text sm:text-sm">{displaySymbol}</div>
						<div class="text-[10px] text-near-gray-medium sm:text-xs">{formatPrice(token.price)}</div>
					</div>
				</button>

				<!-- Floating popover with chain pills -->
				{#if active && chains.length > 0}
					<div
						class="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-near-border bg-near-surface p-2 shadow-lg sm:p-2.5"
						onmouseenter={() => (hoveredSymbol = token.symbol)}
						onmouseleave={() => (hoveredSymbol = null)}
					>
						<div class="mb-1 text-[9px] font-medium text-near-gray-medium sm:text-[10px]">
							Available on {chains.length} chain{chains.length === 1 ? '' : 's'}
						</div>
						<div class="flex flex-wrap gap-1">
							{#each chains as chain}
								<div class="flex items-center gap-0.5 rounded-full bg-gray-50 px-1.5 py-0.5" title={chain.name}>
									{#if chain.logoURI && !imgErrors.has(`hc-${chain.slug}`)}
										<img
											src={chain.logoURI}
											alt={chain.name}
											class="h-3 w-3 rounded-full"
											onerror={() => handleImgError(`hc-${chain.slug}`)}
										/>
									{/if}
									<span class="text-[8px] text-near-light-gray sm:text-[9px]">{chain.name}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	{#if hiddenCount > 0}
		<div class="mt-4 text-center">
			<button
				onclick={() => (expanded = !expanded)}
				class="inline-flex items-center gap-1.5 rounded-full border border-near-border bg-near-surface px-4 py-2 text-sm font-medium text-near-text-secondary shadow-sm transition-colors hover:border-near-orange/30 hover:text-near-text"
			>
				{#if expanded}
					Show less
					<ChevronUp size={16} />
				{:else}
					Show more assets
					<ChevronDown size={16} />
				{/if}
			</button>
		</div>
	{/if}
</section>
