<script lang="ts">
	/**
	 * ChainAssetLogo — shows an asset logo with a small chain badge in the bottom-right.
	 * Reusable anywhere you need to visually distinguish which chain an asset lives on.
	 *
	 * Usage:
	 *   <ChainAssetLogo
	 *     assetLogo="https://...zcash.png"
	 *     assetSymbol="ZEC"
	 *     chainLogo="https://...solana.png"
	 *     chainName="Solana"
	 *     size="md"
	 *   />
	 */

	interface Props {
		assetLogo: string;
		assetSymbol: string;
		chainLogo: string;
		chainName: string;
		/** sm = 24px asset / 12px chain, md = 32px/16px, lg = 40px/20px */
		size?: 'sm' | 'md' | 'lg';
		/** Fallback color for the asset circle if the image fails */
		fallbackColor?: string;
	}

	let {
		assetLogo,
		assetSymbol,
		chainLogo,
		chainName,
		size = 'md',
		fallbackColor = '#888'
	}: Props = $props();

	let assetError = $state(false);
	let chainError = $state(false);

	// Reset error states when logos change
	$effect(() => {
		assetLogo;
		assetError = false;
	});
	$effect(() => {
		chainLogo;
		chainError = false;
	});

	const sizes = {
		sm: { asset: 'h-6 w-6', chain: 'h-3 w-3', chainOffset: '-bottom-0.5 -right-0.5', chainBorder: 'border', container: 'h-6 w-6' },
		md: { asset: 'h-8 w-8', chain: 'h-4 w-4', chainOffset: '-bottom-0.5 -right-0.5', chainBorder: 'border-[1.5px]', container: 'h-8 w-8' },
		lg: { asset: 'h-10 w-10', chain: 'h-5 w-5', chainOffset: '-bottom-0.5 -right-0.5', chainBorder: 'border-2', container: 'h-10 w-10' }
	};

	const s = $derived(sizes[size]);
</script>

<div class="relative inline-flex shrink-0 {s.container}">
	<!-- Asset logo -->
	{#if !assetError}
		<img
			src={assetLogo}
			alt={assetSymbol}
			class="{s.asset} rounded-full object-contain"
			onerror={() => (assetError = true)}
		/>
	{:else}
		<div
			class="{s.asset} flex items-center justify-center rounded-full text-[8px] font-bold text-white"
			style="background-color: {fallbackColor}"
		>
			{assetSymbol.slice(0, 3)}
		</div>
	{/if}

	<!-- Chain badge -->
	<div class="absolute {s.chainOffset} overflow-hidden">
		{#if !chainError}
			<img
				src={chainLogo}
				alt={chainName}
				class="{s.chain} object-contain"
				onerror={() => (chainError = true)}
			/>
		{:else}
			<div
				class="{s.chain} flex items-center justify-center rounded-full bg-near-gray-medium text-[5px] font-bold text-white"
			>
				{chainName.slice(0, 2)}
			</div>
		{/if}
	</div>
</div>
