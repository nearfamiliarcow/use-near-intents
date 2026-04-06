<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, TrendingUp } from 'lucide-svelte';
	import ChainAssetLogo from '$lib/components/ui/ChainAssetLogo.svelte';

	const CHAIN_LOGOS: Record<string, string> = {
		bitcoin: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
		ethereum: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
		solana: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
		zcash: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
		base: 'https://coin-images.coingecko.com/coins/images/31164/small/base.png',
		arbitrum: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
		lido: 'https://coin-images.coingecko.com/coins/images/13573/small/Lido_DAO.png'
	};

	// Each scenario: source asset/chain → yield protocol + destination asset + APY
	const earnScenarios = [
		{
			from: {
				symbol: 'BTC',
				logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
				chain: 'Bitcoin',
				chainKey: 'bitcoin',
				color: '#F7931A',
				amount: '0.5'
			},
			to: {
				symbol: 'cbBTC',
				logo: 'https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp',
				chain: 'Base',
				chainKey: 'base',
				color: '#0052FF',
				protocol: 'Moonwell / Aave',
				protocolType: 'Lending market'
			},
			apy: '4.2%',
			apyColor: '#0052FF',
			label: 'BTC → Base lending'
		},
		{
			from: {
				symbol: 'ETH',
				logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
				chain: 'Ethereum',
				chainKey: 'ethereum',
				color: '#627EEA',
				amount: '2.0'
			},
			to: {
				symbol: 'stETH',
				logo: 'https://coin-images.coingecko.com/coins/images/13442/small/steth_logo.png',
				chain: 'Ethereum',
				chainKey: 'lido',
				color: '#00A3FF',
				protocol: 'Lido',
				protocolType: 'Liquid staking'
			},
			apy: '3.1%',
			apyColor: '#00A3FF',
			label: 'ETH → Lido staking'
		},
		{
			from: {
				symbol: 'SOL',
				logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
				chain: 'Solana',
				chainKey: 'solana',
				color: '#9945FF',
				amount: '25'
			},
			to: {
				symbol: 'USDC',
				logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
				chain: 'Arbitrum',
				chainKey: 'arbitrum',
				color: '#28A0F0',
				protocol: 'Aave',
				protocolType: 'Lending market'
			},
			apy: '5.8%',
			apyColor: '#28A0F0',
			label: 'SOL → Aave lending'
		},
		{
			from: {
				symbol: 'ZEC',
				logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
				chain: 'Zcash',
				chainKey: 'zcash',
				color: '#F4B728',
				amount: '50'
			},
			to: {
				symbol: 'USDC',
				logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
				chain: 'Base',
				chainKey: 'base',
				color: '#0052FF',
				protocol: 'Aave',
				protocolType: 'Lending market'
			},
			apy: '5.8%',
			apyColor: '#0052FF',
			label: 'ZEC → Base lending'
		}
	];

	let activeScenario = $state(0);
	let animating = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		const interval = setInterval(async () => {
			animating = true;
			await new Promise((r) => setTimeout(r, 320));
			activeScenario = (activeScenario + 1) % earnScenarios.length;
			animating = false;
		}, 2800);
		return () => clearInterval(interval);
	});

	const scenario = $derived(earnScenarios[activeScenario]);
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.06]"
		style="background: radial-gradient(circle, #0d9488 0%, transparent 70%)"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.04]"
		style="background: radial-gradient(circle, #F7931A 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: earn flow card -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Earn</span>
						<span
							class="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-300"
							style="background-color: {scenario.from.color}15; color: {scenario.from.color}"
						>
							{scenario.label}
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Source asset -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">You deposit</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.from.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						<ChainAssetLogo
							assetLogo={scenario.from.logo}
							assetSymbol={scenario.from.symbol}
							chainLogo={CHAIN_LOGOS[scenario.from.chainKey]}
							chainName={scenario.from.chain}
							fallbackColor={scenario.from.color}
						/>
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{scenario.from.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">on {scenario.from.chain}</p>
						</div>
						<span class="text-sm font-semibold text-near-text">{scenario.from.amount}</span>
					</div>

					<!-- NEAR Intents routing badge -->
					<div class="my-3 flex items-center justify-center gap-2">
						<div class="h-px flex-1 bg-near-border"></div>
						<div class="flex items-center gap-1.5 rounded-full border border-near-border bg-near-surface px-3 py-1 shadow-sm">
							<div class="h-1.5 w-1.5 rounded-full bg-near-orange"></div>
							<span class="text-[9px] font-semibold text-near-orange">NEAR Intents</span>
							<ArrowRight size={10} class="text-near-orange" />
						</div>
						<div class="h-px flex-1 bg-near-border"></div>
					</div>

					<!-- Yield destination -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Earning on</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.to.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						<ChainAssetLogo
							assetLogo={scenario.to.logo}
							assetSymbol={scenario.to.symbol}
							chainLogo={CHAIN_LOGOS[scenario.to.chainKey]}
							chainName={scenario.to.chain}
							fallbackColor={scenario.to.color}
						/>
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{scenario.to.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{scenario.to.protocol} · {scenario.to.chain}</p>
						</div>
						<!-- APY badge -->
						<span
							class="rounded-full px-2 py-0.5 text-[11px] font-bold transition-all duration-300"
							style="background-color: {scenario.to.color}15; color: {scenario.to.color}; opacity: {animating ? 0 : 1}"
						>
							{scenario.apy} APY
						</span>
					</div>

					<!-- Protocol type pill -->
					<div class="mt-3 flex items-center justify-center">
						<span class="rounded-full border border-near-border bg-near-bg px-3 py-1 text-[10px] font-medium text-near-gray-medium">
							{scenario.to.protocolType}
						</span>
					</div>

					<!-- CTA button -->
					<button
						class="mt-3 w-full rounded-xl bg-near-orange py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
					>
						Deposit &amp; Earn — 1 signature
					</button>
				</div>

				<!-- Footer -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Withdraw to original chain anytime · Powered by <span class="font-semibold text-near-orange">NEAR Intents</span>
					</p>
				</div>
			</div>

			<!-- Scenario switcher dots -->
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Earn scenario examples">
				{#each earnScenarios as _, i}
					<button
						onclick={() => { activeScenario = i; }}
						class="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
						style="width: {activeScenario === i ? '16px' : '6px'}; background-color: {activeScenario === i ? '#fb4d01' : 'var(--color-near-border)'}"
						aria-label="Example {i + 1}"
						aria-pressed={activeScenario === i}
					></button>
				{/each}
			</div>
		</div>

		<!-- Right: value prop text + stats -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<div>
				<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					Any asset.<br />Any yield.<br />One step.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Users deposit from their chain in their token — NEAR Intents converts, routes, and deposits into your yield protocol automatically. Withdraw back to the original asset on the original chain, anytime.
				</p>
			</div>

		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		* {
			transition: none !important;
		}
	}
</style>
