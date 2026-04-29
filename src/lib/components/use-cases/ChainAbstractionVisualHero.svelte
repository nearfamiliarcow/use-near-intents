<script lang="ts">
	import { onMount } from 'svelte';
	import { Key } from 'lucide-svelte';
	import ChainAssetLogo from '$lib/components/ui/ChainAssetLogo.svelte';

	const CHAIN_LOGOS: Record<string, string> = {
		ethereum: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
		bitcoin: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
		solana: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
		zcash: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
		base: 'https://coin-images.coingecko.com/coins/images/31164/small/base.png',
		near: 'https://coin-images.coingecko.com/coins/images/10365/small/near.png',
		arbitrum: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
		cosmos: 'https://coin-images.coingecko.com/coins/images/1481/small/cosmos_hub.png'
	};

	// Each scenario: a "home" wallet on one chain, controlling assets on others
	const controlScenarios = [
		{
			homeChain: 'Ethereum',
			homeChainKey: 'ethereum',
			homeColor: '#627EEA',
			homeSymbol: 'ETH',
			label: 'ETH wallet controls all',
			controlled: [
				{ symbol: 'BTC', chain: 'Bitcoin', chainKey: 'bitcoin', color: '#F7931A', amount: '0.12 BTC' },
				{ symbol: 'SOL', chain: 'Solana', chainKey: 'solana', color: '#9945FF', amount: '14.5 SOL' },
				{ symbol: 'ZEC', chain: 'Zcash', chainKey: 'zcash', color: '#F4B728', amount: '8.0 ZEC' }
			]
		},
		{
			homeChain: 'Solana',
			homeChainKey: 'solana',
			homeColor: '#9945FF',
			homeSymbol: 'SOL',
			label: 'SOL wallet controls all',
			controlled: [
				{ symbol: 'ETH', chain: 'Ethereum', chainKey: 'ethereum', color: '#627EEA', amount: '0.4 ETH' },
				{ symbol: 'BTC', chain: 'Bitcoin', chainKey: 'bitcoin', color: '#F7931A', amount: '0.05 BTC' },
				{ symbol: 'USDC', chain: 'Base', chainKey: 'base', color: '#0052FF', amount: '500 USDC' }
			]
		},
		{
			homeChain: 'NEAR',
			homeChainKey: 'near',
			homeColor: '#fb4d01',
			homeSymbol: 'NEAR',
			label: 'NEAR account controls all',
			controlled: [
				{ symbol: 'BTC', chain: 'Bitcoin', chainKey: 'bitcoin', color: '#F7931A', amount: '0.08 BTC' },
				{ symbol: 'ETH', chain: 'Ethereum', chainKey: 'ethereum', color: '#627EEA', amount: '0.6 ETH' },
				{ symbol: 'ATOM', chain: 'Cosmos', chainKey: 'cosmos', color: '#6F7390', amount: '25 ATOM' }
			]
		},
		{
			homeChain: 'Zcash',
			homeChainKey: 'zcash',
			homeColor: '#F4B728',
			homeSymbol: 'ZEC',
			label: 'ZEC wallet controls all',
			controlled: [
				{ symbol: 'USDC', chain: 'Base', chainKey: 'base', color: '#0052FF', amount: '1,200 USDC' },
				{ symbol: 'ETH', chain: 'Ethereum', chainKey: 'ethereum', color: '#627EEA', amount: '0.25 ETH' },
				{ symbol: 'SOL', chain: 'Solana', chainKey: 'solana', color: '#9945FF', amount: '9.0 SOL' }
			]
		}
	];

	let activeScenario = $state(0);
	let animating = $state(false);
	let mounted = $state(false);
	// Track which controlled address is "active" (pulsing)
	let activeAddress = $state(0);

	onMount(() => {
		mounted = true;

		// Cycle through controlled addresses every 900ms for the pulse effect
		const addressInterval = setInterval(() => {
			activeAddress = (activeAddress + 1) % controlScenarios[activeScenario].controlled.length;
		}, 900);

		// Rotate scenarios every 3200ms
		const scenarioInterval = setInterval(async () => {
			animating = true;
			await new Promise((r) => setTimeout(r, 320));
			activeScenario = (activeScenario + 1) % controlScenarios.length;
			activeAddress = 0;
			animating = false;
		}, 3200);

		return () => {
			clearInterval(addressInterval);
			clearInterval(scenarioInterval);
		};
	});

	const scenario = $derived(controlScenarios[activeScenario]);
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background glow decorations -->
	<div
		class="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-[0.07] transition-all duration-700"
		style="background: radial-gradient(circle, {scenario.homeColor} 0%, transparent 70%)"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full opacity-[0.04]"
		style="background: radial-gradient(circle, #fb4d01 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: chain abstraction diagram card -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Multi-Chain Wallet</span>
						<span
							class="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors duration-500"
							style="background-color: {scenario.homeColor}18; color: {scenario.homeColor}"
						>
							{scenario.label}
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Home wallet (the signer) -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Your Wallet</p>
					<div
						class="flex items-center gap-3 rounded-xl border bg-near-bg px-4 py-3 transition-all duration-500"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.homeColor + '50'}; opacity: {animating ? 0.5 : 1}"
					>
						<!-- Key icon with home chain badge -->
						<div
							class="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
							style="background-color: {scenario.homeColor}20"
						>
							<Key size={14} style="color: {scenario.homeColor}" />
							<div class="absolute -bottom-0.5 -right-0.5 rounded-full border border-near-surface bg-near-surface">
								<img
									src={CHAIN_LOGOS[scenario.homeChainKey]}
									alt={scenario.homeChain}
									class="h-3.5 w-3.5 rounded-full object-contain"
								/>
							</div>
						</div>
						<div class="min-w-0 flex-1">
							<p class="text-sm font-bold text-near-text">{scenario.homeChain} Key</p>
							<p class="text-[10px] text-near-gray-medium">1 signature controls all</p>
						</div>
						<!-- "1 key" pill -->
						<span class="rounded-full border border-near-border px-2 py-0.5 text-[9px] font-semibold text-near-gray-medium">
							1 key
						</span>
					</div>

					<!-- MPC derivation connector -->
					<div class="my-3 flex flex-col items-center gap-1">
						<div class="flex items-center gap-2">
							<div class="h-px w-12 bg-near-border"></div>
							<div class="flex items-center gap-1.5 rounded-full border border-near-border bg-near-surface px-3 py-1 shadow-sm">
								<div
									class="h-1.5 w-1.5 rounded-full bg-near-orange"
									class:animate-pulse={mounted && !animating}
								></div>
								<span class="text-[9px] font-semibold text-near-orange">MPC Key Derivation</span>
							</div>
							<div class="h-px w-12 bg-near-border"></div>
						</div>
						<p class="text-[9px] text-near-gray-medium">NEAR Chain Signatures</p>
					</div>

					<!-- Controlled addresses -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Controls Addresses On</p>
					<div class="flex flex-col gap-2">
						{#each scenario.controlled as asset, i}
							<div
								class="flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-300"
								style="
									border-color: {(mounted && activeAddress === i && !animating) ? asset.color + '60' : 'var(--color-near-border)'};
									background-color: {(mounted && activeAddress === i && !animating) ? asset.color + '08' : 'transparent'};
									opacity: {animating ? 0.4 : 1};
								"
							>
								<ChainAssetLogo
									assetLogo={CHAIN_LOGOS[asset.chainKey]}
									assetSymbol={asset.symbol}
									chainLogo={CHAIN_LOGOS[asset.chainKey]}
									chainName={asset.chain}
									fallbackColor={asset.color}
									size="sm"
								/>
								<div class="min-w-0 flex-1">
									<p class="text-xs font-semibold text-near-text">{asset.chain}</p>
									<p class="text-[10px] text-near-gray-medium">{asset.symbol} address</p>
								</div>
								<span
									class="text-[10px] font-semibold tabular-nums transition-all duration-300"
									style="color: {asset.color}; opacity: {animating ? 0 : 1}"
								>
									{asset.amount}
								</span>
							</div>
						{/each}
					</div>

					<!-- CTA -->
					<button
						class="mt-4 w-full rounded-xl bg-near-orange py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
					>
						Control — 1 signature
					</button>
				</div>

				<!-- Footer -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Powered by <span class="font-semibold text-near-orange">NEAR Chain Signatures</span>
					</p>
				</div>
			</div>

			<!-- Scenario switcher dots -->
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Chain abstraction scenario examples">
				{#each controlScenarios as _, i}
					<button
						onclick={() => { activeScenario = i; activeAddress = 0; }}
						class="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
						style="width: {activeScenario === i ? '16px' : '6px'}; background-color: {activeScenario === i ? '#fb4d01' : 'var(--color-near-border)'}"
						aria-label="Scenario {i + 1}"
						aria-pressed={activeScenario === i}
					></button>
				{/each}
			</div>
		</div>

		<!-- Right: value prop text -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<div>
				<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					One key.<br />Every chain.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					NEAR's MPC network derives addresses on any chain from a single existing wallet. Your users keep their current key — Bitcoin, Ethereum, Solana, or Zcash — and instantly control assets on all 31 supported chains. No new seed phrases. No bridging. Native assets on every chain, signed from one place.
				</p>
			</div>

			<!-- Stats row -->
			<div class="flex flex-wrap justify-center gap-4 sm:justify-start">
				<div class="flex flex-col items-center rounded-xl border border-near-border bg-near-surface px-4 py-3 sm:items-start">
					<span class="text-xl font-bold text-near-orange">31</span>
					<span class="text-[10px] text-near-gray-medium">chains supported</span>
				</div>
				<div class="flex flex-col items-center rounded-xl border border-near-border bg-near-surface px-4 py-3 sm:items-start">
					<span class="text-xl font-bold text-near-orange">1</span>
					<span class="text-[10px] text-near-gray-medium">key needed</span>
				</div>
				<div class="flex flex-col items-center rounded-xl border border-near-border bg-near-surface px-4 py-3 sm:items-start">
					<span class="text-xl font-bold text-near-orange">0</span>
					<span class="text-[10px] text-near-gray-medium">new seed phrases</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
