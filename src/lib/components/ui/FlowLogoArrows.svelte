<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import ChainAssetLogo from '$lib/components/ui/ChainAssetLogo.svelte';
	import type { AssetLogo } from '$lib/types';

	interface Props {
		/** Assets on the left side of the flow (source) */
		from: AssetLogo[];
		/** Assets on the right side of the flow (destination) */
		to: AssetLogo[];
		/** Additional count shown as "+N more" after the from logos */
		fromMore?: number;
		/** Additional count shown as "+N more" after the to logos */
		toMore?: number;
		/** Custom label under the from logos */
		fromLabel?: string;
		/** Custom label under the to logos */
		toLabel?: string;
	}

	let { from, to, fromMore = 0, toMore = 0, fromLabel, toLabel }: Props = $props();

	let imgErrors = $state(new Set<string>());

	function handleImgError(key: string) {
		imgErrors = new Set([...imgErrors, key]);
	}

	// Check if any assets have chain logos — switches to chain-aware rendering
	const hasChainLogos = $derived(
		[...from, ...to].some((a) => a.chainLogo)
	);

	// When there are multiple logos, overlap them like a stack
	const STACK_OFFSET = '-ml-3';
</script>

<div class="flex items-center gap-3 sm:gap-4">
	<!-- Source asset(s) -->
	<div class="flex items-center">
		{#each from as asset, i}
			<div
				class="relative {i > 0 ? STACK_OFFSET : ''}"
				style="z-index: {from.length - i}"
				title="{asset.symbol}{asset.chain ? ` on ${asset.chain}` : ''}"
			>
				{#if asset.chainLogo}
					<div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg shadow-sm sm:h-10 sm:w-10">
						<ChainAssetLogo
							assetLogo={asset.logo}
							assetSymbol={asset.symbol}
							chainLogo={asset.chainLogo}
							chainName={asset.chain ?? ''}
							size="md"
						/>
					</div>
				{:else if imgErrors.has(`from-${i}`)}
					<div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg text-[9px] font-bold text-near-text-secondary shadow-sm sm:h-10 sm:w-10">
						{asset.symbol.slice(0, 3)}
					</div>
				{:else}
					<div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg shadow-sm sm:h-10 sm:w-10">
						<img
							src={asset.logo}
							alt={asset.symbol}
							class="h-6 w-6 object-contain sm:h-7 sm:w-7"
							onerror={() => handleImgError(`from-${i}`)}
						/>
					</div>
				{/if}
			</div>
		{/each}
		{#if fromMore > 0}
			<span class="relative {STACK_OFFSET} flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg text-[10px] font-semibold text-near-text-secondary shadow-sm sm:h-10 sm:w-10">
				+{fromMore}
			</span>
		{/if}
	</div>

	<!-- Labels under logos when chain-aware -->
	{#if hasChainLogos && from.length <= 2}
		<!-- intentionally empty — labels shown in the wrapper below -->
	{/if}

	<!-- Arrow -->
	<ArrowRight size={18} class="shrink-0 text-near-orange" />

	<!-- Destination asset(s) -->
	<div class="flex items-center">
		{#each to as asset, i}
			<div
				class="relative {i > 0 ? STACK_OFFSET : ''}"
				style="z-index: {to.length - i}"
				title="{asset.symbol}{asset.chain ? ` on ${asset.chain}` : ''}"
			>
				{#if asset.chainLogo}
					<div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg shadow-sm sm:h-10 sm:w-10">
						<ChainAssetLogo
							assetLogo={asset.logo}
							assetSymbol={asset.symbol}
							chainLogo={asset.chainLogo}
							chainName={asset.chain ?? ''}
							size="md"
						/>
					</div>
				{:else if imgErrors.has(`to-${i}`)}
					<div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg text-[9px] font-bold text-near-text-secondary shadow-sm sm:h-10 sm:w-10">
						{asset.symbol.slice(0, 3)}
					</div>
				{:else}
					<div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg shadow-sm sm:h-10 sm:w-10">
						<img
							src={asset.logo}
							alt={asset.symbol}
							class="h-6 w-6 object-contain sm:h-7 sm:w-7"
							onerror={() => handleImgError(`to-${i}`)}
						/>
					</div>
				{/if}
			</div>
		{/each}
		{#if toMore > 0}
			<span class="relative {STACK_OFFSET} flex h-9 w-9 items-center justify-center rounded-full border-2 border-near-surface bg-near-bg text-[10px] font-semibold text-near-text-secondary shadow-sm sm:h-10 sm:w-10">
				+{toMore}
			</span>
		{/if}
	</div>
</div>

<!-- Chain labels row — shown when assets have chain designations -->
{#if hasChainLogos || fromLabel || toLabel}
	{@const fromChains = [...new Set(from.filter(a => a.chain).map(a => a.chain))]}
	{@const toChains = [...new Set(to.filter(a => a.chain).map(a => a.chain))]}
	<div class="mt-1.5 flex items-center gap-3 sm:gap-4">
		<span class="text-[10px] text-near-gray-medium">
			{fromLabel ?? (fromChains.length === 1 ? `on ${fromChains[0]}` : 'Native chains')}
		</span>
		<div class="w-[18px] shrink-0"></div>
		<span class="text-[10px] text-near-gray-medium">
			{toLabel ?? (toChains.length === 1 ? `Wrapped on ${toChains[0]}` : 'Destination chains')}
		</span>
	</div>
{/if}
