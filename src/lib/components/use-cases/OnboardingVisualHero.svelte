<script lang="ts">
	import { onMount } from 'svelte';
	import { QrCode, Copy } from 'lucide-svelte';

	// Deposit scenarios — each shows a different user depositing into an app from their home chain.
	// The LEFT side is what the user holds; the RIGHT side is what YOUR APP receives.
	// This is the onboarding mechanic: the app defines what it needs, the user sends what they have.
	const depositScenarios = [
		{
			deposit: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin', color: '#F7931A' },
			receive: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Base', color: '#0052FF' },
			amount: '0.05',
			appLabel: 'lending protocol on Base'
		},
		{
			deposit: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum', color: '#627EEA' },
			receive: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Zcash', color: '#F4B728' },
			amount: '0.5',
			appLabel: 'ZODL privacy wallet'
		},
		{
			deposit: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana', color: '#9945FF' },
			receive: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Arbitrum', color: '#28A0F0' },
			amount: '10.0',
			appLabel: 'perps exchange on Arbitrum'
		},
		{
			deposit: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin', color: '#F7931A' },
			receive: { symbol: 'NEAR', logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg', chain: 'NEAR', color: '#fb4d01' },
			amount: '0.1',
			appLabel: 'yield vault on NEAR'
		}
	];

	let activeScenario = $state(0);
	let animating = $state(false);
	let mounted = $state(false);
	// Track broken images per-scenario so errors don't bleed between scenarios
	let imgErrors = $state<Record<number, Set<string>>>({});

	function handleImgError(scenarioIndex: number, key: string) {
		const current = imgErrors[scenarioIndex] ?? new Set<string>();
		imgErrors = { ...imgErrors, [scenarioIndex]: new Set([...current, key]) };
	}

	function hasImgError(scenarioIndex: number, key: string): boolean {
		return imgErrors[scenarioIndex]?.has(key) ?? false;
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
		style="background: radial-gradient(circle, #fb4d01 0%, transparent 70%)"
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

			<!-- Deposit address card -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Deposit Address</span>
						<span
							class="rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all duration-300"
							style="background-color: {scenario.deposit.color}15; color: {scenario.deposit.color}"
						>
							No wallet needed
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Source asset -->
					<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Send from any wallet</p>
					<div
						class="mb-4 flex items-center justify-center gap-2 transition-all duration-300"
						style="opacity: {animating ? 0.5 : 1}"
					>
						{#if !hasImgError(activeScenario, 'deposit')}
							<img
								src={scenario.deposit.logo}
								alt={scenario.deposit.symbol}
								class="h-6 w-6 rounded-full object-contain"
								onerror={() => handleImgError(activeScenario, 'deposit')}
							/>
						{:else}
							<div
								class="flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold text-white"
								style="background-color: {scenario.deposit.color}"
							>{scenario.deposit.symbol.slice(0, 3)}</div>
						{/if}
						<span class="text-2xl font-bold text-near-text">{scenario.deposit.symbol}</span>
						<span class="text-sm text-near-gray-medium">{scenario.deposit.chain}</span>
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

					<!-- App receives -->
					<div
						class="mb-3 rounded-lg border border-near-orange/20 bg-near-orange-light px-3 py-2.5 transition-all duration-300"
						style="opacity: {animating ? 0.5 : 1}"
					>
						<p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-near-orange">Your app receives</p>
						<div class="flex items-center gap-2">
							{#if !hasImgError(activeScenario, 'receive')}
								<img
									src={scenario.receive.logo}
									alt={scenario.receive.symbol}
									class="h-5 w-5 rounded-full object-contain"
									onerror={() => handleImgError(activeScenario, 'receive')}
								/>
							{:else}
								<div
									class="flex h-5 w-5 items-center justify-center rounded-full text-[7px] font-bold text-white"
									style="background-color: {scenario.receive.color}"
								>{scenario.receive.symbol.slice(0, 3)}</div>
							{/if}
							<span class="text-sm font-bold text-near-text">{scenario.receive.symbol}</span>
							<span class="text-[10px] text-near-gray-medium">on {scenario.receive.chain}</span>
						</div>
						<p class="mt-1 text-[10px] text-near-gray-medium">into your {scenario.appLabel}</p>
					</div>

					<!-- Explainer -->
					<p class="text-center text-[10px] leading-relaxed text-near-gray-medium">
						Send <span class="font-semibold text-near-text">{scenario.deposit.symbol}</span> from any wallet or exchange. Assets arrive automatically.
					</p>
				</div>

				<!-- Footer: powered by -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Powered by <span class="font-semibold text-near-orange">NEAR Intents</span>
					</p>
				</div>
			</div>

			<!-- Scenario switcher dots -->
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Deposit scenario examples">
				{#each depositScenarios as _, i}
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
					Let anyone onboard to your app from any chain.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Every app loses users who hold assets on a different chain. Add a "Deposit from anywhere" flow powered by NEAR Intents — users send what they have (BTC, ETH, SOL, and 100+ more) and your app receives exactly the token it needs. One step, ~30 seconds. You configure the fee.
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
