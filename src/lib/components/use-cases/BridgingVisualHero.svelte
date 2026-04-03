<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';
	import ChainAssetLogo from '$lib/components/ui/ChainAssetLogo.svelte';

	const CHAIN_LOGOS: Record<string, string> = {
		zcash: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
		solana: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
		bitcoin: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
		ethereum: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
		arbitrum: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
		base: 'https://coin-images.coingecko.com/coins/images/31164/small/base.png',
		dogecoin: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
		xrp: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
		ton: 'https://coin-images.coingecko.com/coins/images/17980/small/ton_symbol.png'
	};

	// Bridging scenarios: same or different asset, source chain → destination chain
	const bridgeScenarios = [
		{
			from: {
				symbol: 'ZEC',
				logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
				chain: 'Zcash',
				chainKey: 'zcash',
				color: '#F4B728'
			},
			to: {
				symbol: 'ZEC',
				logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
				chain: 'Solana',
				chainKey: 'solana',
				color: '#9945FF'
			},
			amount: '10.0',
			label: 'ZEC → Solana'
		},
		{
			from: {
				symbol: 'BTC',
				logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
				chain: 'Bitcoin',
				chainKey: 'bitcoin',
				color: '#F7931A'
			},
			to: {
				symbol: 'BTC',
				logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
				chain: 'TON',
				chainKey: 'ton',
				color: '#0098EA'
			},
			amount: '0.05',
			label: 'BTC → TON'
		},
		{
			from: {
				symbol: 'XRP',
				logo: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
				chain: 'XRP Ledger',
				chainKey: 'xrp',
				color: '#23292F'
			},
			to: {
				symbol: 'XRP',
				logo: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
				chain: 'Arbitrum',
				chainKey: 'arbitrum',
				color: '#28A0F0'
			},
			amount: '500',
			label: 'XRP → Arbitrum'
		},
		{
			from: {
				symbol: 'DOGE',
				logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
				chain: 'Dogecoin',
				chainKey: 'dogecoin',
				color: '#C2A633'
			},
			to: {
				symbol: 'DOGE',
				logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
				chain: 'Base',
				chainKey: 'base',
				color: '#0052FF'
			},
			amount: '1000',
			label: 'UTXO → Base'
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
			activeScenario = (activeScenario + 1) % bridgeScenarios.length;
			animating = false;
		}, 2800);
		return () => clearInterval(interval);
	});

	const scenario = $derived(bridgeScenarios[activeScenario]);
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.06]"
		style="background: radial-gradient(circle, #9945FF 0%, transparent 70%)"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.04]"
		style="background: radial-gradient(circle, #F4B728 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: bridge flow card -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Bridge</span>
						<span
							class="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-300"
							style="background-color: {scenario.from.color}15; color: {scenario.from.color}"
						>
							{scenario.label}
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Source chain -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">From</p>
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
						<span class="text-sm font-semibold text-near-text">{scenario.amount}</span>
					</div>

					<!-- Bridge arrow with NEAR Intents badge -->
					<div class="my-3 flex items-center justify-center gap-2">
						<div class="h-px flex-1 bg-near-border"></div>
						<div class="flex items-center gap-1.5 rounded-full border border-near-border bg-near-surface px-3 py-1 shadow-sm">
							<div class="h-1.5 w-1.5 rounded-full bg-near-orange"></div>
							<span class="text-[9px] font-semibold text-near-orange">NEAR Intents</span>
							<ArrowRight size={10} class="text-near-orange" />
						</div>
						<div class="h-px flex-1 bg-near-border"></div>
					</div>

					<!-- Destination chain -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">To</p>
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
							<p class="text-[10px] text-near-gray-medium">on {scenario.to.chain}</p>
						</div>
						<span
							class="text-sm font-semibold text-near-orange transition-all duration-300"
							style="opacity: {animating ? 0 : 1}"
						>~30s</span>
					</div>

					<!-- CTA button -->
					<button
						class="mt-4 w-full rounded-xl bg-near-orange py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
					>
						Bridge — 1 signature
					</button>
				</div>

				<!-- Footer -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Powered by <span class="font-semibold text-near-orange">NEAR Intents</span>
					</p>
				</div>
			</div>

			<!-- Scenario switcher dots -->
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Bridge scenario examples">
				{#each bridgeScenarios as _, i}
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

		<!-- Right: value prop text -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<div>
				<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					New assets, new markets.<br />Bridge Any Asset to Your Chain.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Any asset NEAR Intents supports can be bridged to any chain we support — and every bridged asset instantly has cross-chain liquidity across all 31 chains. UTXO chains like Zcash, Bitcoin, and Dogecoin included — no other bridge protocol handles them natively.
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
