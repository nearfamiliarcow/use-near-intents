<script lang="ts">
	import type { ChainSummary } from '$lib/data/tokens';

	interface Props {
		liveChains?: ChainSummary[];
		chainAssetList?: Record<string, { symbol: string; logoURI?: string; price: number }[]>;
	}

	let { liveChains = [], chainAssetList = {} }: Props = $props();

	let hoveredChain = $state<string | null>(null);
	let clickedChain = $state<string | null>(null);
	let imgErrors = $state(new Set<string>());

	function handleImgError(id: string) {
		imgErrors = new Set([...imgErrors, id]);
	}

	function toggleClick(slug: string) {
		clickedChain = clickedChain === slug ? null : slug;
	}

	// The panel shows data for whichever chain is active (hovered or clicked)
	// Use the most recent non-null source so content persists during fade
	let lastActiveChain = $state<string | null>(null);
	$effect(() => {
		const current = hoveredChain ?? clickedChain;
		if (current) lastActiveChain = current;
	});

	const isOpen = $derived(hoveredChain !== null || clickedChain !== null);

	const displayAssets = $derived(
		lastActiveChain ? (chainAssetList[lastActiveChain] ?? []).slice(0, 12) : []
	);

	const displayChainData = $derived(
		lastActiveChain ? liveChains.find((c) => c.slug === lastActiveChain) : null
	);

	const displayTotalCount = $derived(
		lastActiveChain ? (chainAssetList[lastActiveChain]?.length ?? 0) : 0
	);
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
	<h2 class="mb-6 text-center text-xl font-bold text-near-text sm:mb-8 sm:text-2xl">
		{liveChains.length || 31} Chains Supported
	</h2>
	<p class="mb-6 text-center text-sm text-near-text-secondary sm:mb-8">
		Hover or click a chain to see its supported assets
	</p>

	<!-- Chain icons -->
	<div class="flex flex-wrap justify-center gap-4 sm:gap-5">
		{#each liveChains as chain}
			{@const active = hoveredChain === chain.slug || clickedChain === chain.slug}
			<button
				class="flex flex-col items-center gap-1.5 rounded-xl px-2 py-2 transition-all
					{active ? 'bg-near-orange-light scale-110 shadow-md' : 'hover:bg-gray-50'}
					{clickedChain === chain.slug ? 'ring-2 ring-near-orange/40' : ''}"
				onmouseenter={() => (hoveredChain = chain.slug)}
				onmouseleave={() => (hoveredChain = null)}
				onclick={() => toggleClick(chain.slug)}
				onfocus={() => (hoveredChain = chain.slug)}
				onblur={() => (hoveredChain = null)}
			>
				{#if chain.logoURI && !imgErrors.has(chain.slug)}
					<img
						src={chain.logoURI}
						alt={chain.name}
						class="h-10 w-10 rounded-full shadow-sm sm:h-12 sm:w-12"
						onerror={() => handleImgError(chain.slug)}
					/>
				{:else}
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-near-light-gray sm:h-12 sm:w-12 sm:text-xs">
						{chain.name.slice(0, 3).toUpperCase()}
					</div>
				{/if}
				<span class="text-[10px] font-medium text-near-light-gray sm:text-xs">{chain.name}</span>
			</button>
		{/each}
	</div>

	<!-- Panel: chain → assets -->
	<div
		class="mx-auto mt-6 max-w-3xl overflow-hidden transition-all duration-300 {isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}"
	>
		<div class="rounded-xl border border-near-border bg-near-surface p-4 shadow-lg sm:p-5">
			<h3 class="mb-3 text-sm font-semibold text-near-text sm:text-base">
				{displayTotalCount} asset{displayTotalCount === 1 ? '' : 's'} on <span class="text-near-orange">{displayChainData?.name ?? ''}</span>
			</h3>
			<div class="flex flex-wrap gap-2">
				{#each displayAssets as asset}
					<div class="flex items-center gap-1.5 rounded-full border border-near-border bg-gray-50 px-2.5 py-1 sm:px-3 sm:py-1.5">
						{#if asset.logoURI && !imgErrors.has(`ha-${asset.symbol}`)}
							<img
								src={asset.logoURI}
								alt={asset.symbol}
								class="h-4 w-4 rounded-full sm:h-5 sm:w-5"
								onerror={() => handleImgError(`ha-${asset.symbol}`)}
							/>
						{:else}
							<div class="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[7px] font-bold text-near-light-gray sm:h-5 sm:w-5 sm:text-[8px]">
								{asset.symbol.slice(0, 2)}
							</div>
						{/if}
						<span class="text-xs font-medium text-near-text sm:text-sm">{asset.symbol}</span>
					</div>
				{/each}
			</div>
			{#if displayTotalCount > 12}
				<p class="mt-3 text-xs text-near-gray-medium">
					+{displayTotalCount - 12} more assets
				</p>
			{/if}
		</div>
	</div>
</section>
