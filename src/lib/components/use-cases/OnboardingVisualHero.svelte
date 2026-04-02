<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown, QrCode, Copy } from 'lucide-svelte';

	// Which card is showing: 'wallet' or 'address'
	let activeCard = $state<'wallet' | 'address'>('wallet');

	// Deposit scenarios that animate through the demo — each shows a new user type onboarding
	const depositScenarios = [
		{
			deposit: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin', color: '#F7931A' },
			receive: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Base', color: '#0052FF' },
			amount: '0.05',
			appLabel: 'DeFi lending protocol'
		},
		{
			deposit: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum', color: '#627EEA' },
			receive: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Starknet', color: '#627EEA' },
			amount: '0.5',
			appLabel: 'Starknet DeFi app'
		},
		{
			deposit: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana', color: '#9945FF' },
			receive: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Arbitrum', color: '#28A0F0' },
			amount: '10.0',
			appLabel: 'Perps exchange'
		},
		{
			deposit: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Arbitrum', color: '#28A0F0' },
			receive: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum', color: '#627EEA' },
			amount: '1000',
			appLabel: 'Liquid staking protocol'
		}
	];

	let activeScenario = $state(0);
	let animating = $state(false);
	let mounted = $state(false);
	let imgErrors = $state(new Set<string>());

	function handleImgError(key: string) {
		imgErrors = new Set([...imgErrors, key]);
	}

	onMount(() => {
		mounted = true;
		const interval = setInterval(async () => {
			animating = true;
			await new Promise((r) => setTimeout(r, 320));
			activeScenario = (activeScenario + 1) % depositScenarios.length;
			animating = false;
		}, 2800);
		return () => clearInterval(interval);
	});

	const scenario = $derived(depositScenarios[activeScenario]);
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.06]"
		style="background: radial-gradient(circle, #00c853 0%, transparent 70%)"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.04]"
		style="background: radial-gradient(circle, #F7931A 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: card area with tab switcher -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">

			<!-- Tab switcher -->
			<div class="mb-3 flex rounded-lg border border-near-border bg-near-bg p-0.5">
				<button
					onclick={() => (activeCard = 'wallet')}
					class="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all {activeCard === 'wallet' ? 'bg-near-surface text-near-text shadow-sm' : 'text-near-gray-medium hover:text-near-text'}"
				>
					Connected Wallet
				</button>
				<button
					onclick={() => (activeCard = 'address')}
					class="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all {activeCard === 'address' ? 'bg-near-surface text-near-text shadow-sm' : 'text-near-gray-medium hover:text-near-text'}"
				>
					Deposit Address
				</button>
			</div>

			{#if activeCard === 'wallet'}
			<!-- Mock deposit card (connected wallet flow) -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Deposit</span>
						<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
							31 chains
						</span>
					</div>
				</div>

				<!-- Deposit section -->
				<div class="p-4">
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">You deposit</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.deposit.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						{#if !imgErrors.has('deposit')}
							<img
								src={scenario.deposit.logo}
								alt={scenario.deposit.symbol}
								class="h-8 w-8 rounded-full object-contain"
								onerror={() => handleImgError('deposit')}
							/>
						{:else}
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-white"
								style="background-color: {scenario.deposit.color}"
							>{scenario.deposit.symbol.slice(0, 3)}</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{scenario.deposit.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{scenario.deposit.chain}</p>
						</div>
						<span class="text-sm font-semibold text-near-text">{scenario.amount}</span>
					</div>

					<!-- Arrow down -->
					<div class="my-3 flex items-center justify-center">
						<div class="flex h-8 w-8 items-center justify-center rounded-full border border-near-border bg-near-surface shadow-sm">
							<ArrowDown size={14} class="text-near-green-dark" />
						</div>
					</div>

					<!-- You receive -->
					<p
						class="mb-2 text-[10px] font-semibold text-near-gray-medium transition-all duration-300"
						style="opacity: {animating ? 0 : 1}"
					>Arrives in your {scenario.appLabel}</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.receive.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						{#if !imgErrors.has('receive')}
							<img
								src={scenario.receive.logo}
								alt={scenario.receive.symbol}
								class="h-8 w-8 rounded-full object-contain"
								onerror={() => handleImgError('receive')}
							/>
						{:else}
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-white"
								style="background-color: {scenario.receive.color}"
							>{scenario.receive.symbol.slice(0, 3)}</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{scenario.receive.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{scenario.receive.chain}</p>
						</div>
						<span
							class="text-sm font-semibold text-near-green-dark transition-all duration-300"
							style="opacity: {animating ? 0 : 1}"
						>≈ ready</span>
					</div>

					<!-- CTA button -->
					<button
						class="mt-4 w-full rounded-xl bg-near-green-dark py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
					>
						Deposit — 1 signature
					</button>
				</div>

				<!-- Footer: powered by -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Powered by <span class="font-semibold text-near-green-dark">NEAR Intents</span>
					</p>
				</div>
			</div>

			<!-- Scenario switcher dots -->
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Deposit scenario examples">
				{#each depositScenarios as _, i}
					<button
						onclick={() => { activeScenario = i; }}
						class="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
						style="width: {activeScenario === i ? '16px' : '6px'}; background-color: {activeScenario === i ? '#00963f' : 'var(--color-near-border)'}"
						aria-label="Example {i + 1}"
						aria-pressed={activeScenario === i}
					></button>
				{/each}
			</div>

			{:else}
			<!-- Mock deposit address card (no wallet needed) -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Deposit Address</span>
						<span class="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
							No wallet needed
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Deposit amount -->
					<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Send from any wallet</p>
					<div class="mb-4 flex items-center justify-center gap-2">
						<img
							src="https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
							alt="BTC"
							class="h-6 w-6 rounded-full object-contain"
						/>
						<span class="text-2xl font-bold text-near-text">BTC</span>
						<span class="text-sm text-near-gray-medium">Bitcoin</span>
					</div>

					<!-- QR code mockup -->
					<div class="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl border border-near-border bg-near-bg">
						<QrCode size={80} class="text-near-text" strokeWidth={1.5} />
					</div>

					<!-- Address -->
					<div class="mb-3 flex items-center gap-2 rounded-lg border border-near-border bg-near-bg px-3 py-2">
						<span class="flex-1 truncate text-xs font-mono text-near-text-secondary">bc1qxy2kgdygjrsq...yrFP</span>
						<Copy size={14} class="shrink-0 text-near-gray-medium" />
					</div>

					<!-- Explainer -->
					<p class="text-center text-[10px] leading-relaxed text-near-gray-medium">
						Send <span class="font-semibold text-near-text">BTC</span> from any wallet or exchange. Assets arrive automatically.
					</p>
				</div>

				<!-- Footer: powered by -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Powered by <span class="font-semibold text-near-green-dark">NEAR Intents</span>
					</p>
				</div>
			</div>
			{/if}
		</div>

		<!-- Right: value prop text -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<div>
				<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					Stop losing users to bridging friction.<br />Let anyone deposit from any chain.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Every app loses users who hold assets on a different chain. Add a "Deposit from anywhere" flow powered by NEAR Intents — users send what they have (BTC, ETH, SOL, and 100+ more) and your app receives exactly the token it needs. One step, one signature, ~30 seconds. You configure the fee.
				</p>
			</div>

			<!-- Quick stats row -->
			<div class="flex flex-wrap justify-center gap-4 sm:justify-start">
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">31</span>
					<span class="text-[11px] text-near-text-secondary">source chains</span>
				</div>
				<div class="w-px bg-near-border" aria-hidden="true"></div>
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">native</span>
					<span class="text-[11px] text-near-text-secondary">BTC deposits</span>
				</div>
				<div class="w-px bg-near-border" aria-hidden="true"></div>
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">~30s</span>
					<span class="text-[11px] text-near-text-secondary">settlement</span>
				</div>
				<div class="w-px bg-near-border" aria-hidden="true"></div>
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">1 step</span>
					<span class="text-[11px] text-near-text-secondary">for the user</span>
				</div>
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
