<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, QrCode, Copy } from 'lucide-svelte';

	// Which card is showing: 'pay' or 'link'
	let activeCard = $state<'pay' | 'link'>('pay');

	// Payment scenarios that animate through the demo
	const paymentScenarios = [
		{
			sender: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin', color: '#F7931A' },
			recipient: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Base', color: '#0052FF' },
			amount: '500',
			label: 'Pay freelancer on Base',
			changeNote: 'Overpayment returned in BTC'
		},
		{
			sender: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana', color: '#9945FF' },
			recipient: { symbol: 'USDT', logo: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png', chain: 'Ethereum', color: '#26A17B' },
			amount: '200',
			label: 'Split bill with a friend',
			changeNote: 'Overpayment returned in SOL'
		},
		{
			sender: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum', color: '#627EEA' },
			recipient: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Solana', color: '#0052FF' },
			amount: '1000',
			label: 'Pay vendor invoice',
			changeNote: 'Overpayment returned in ETH'
		},
		{
			sender: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Zcash', color: '#F4B728' },
			recipient: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Base', color: '#0052FF' },
			amount: '75',
			label: 'Pay online merchant',
			changeNote: 'Overpayment returned in ZEC'
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
			activeScenario = (activeScenario + 1) % paymentScenarios.length;
			animating = false;
		}, 2800);
		return () => clearInterval(interval);
	});

	const scenario = $derived(paymentScenarios[activeScenario]);
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
		style="background: radial-gradient(circle, #9945FF 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: card area with tab switcher -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">

			<!-- Tab switcher -->
			<div class="mb-3 flex rounded-lg border border-near-border bg-near-bg p-0.5">
				<button
					onclick={() => (activeCard = 'pay')}
					class="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all {activeCard === 'pay' ? 'bg-near-surface text-near-text shadow-sm' : 'text-near-gray-medium hover:text-near-text'}"
				>
					Direct Pay
				</button>
				<button
					onclick={() => (activeCard = 'link')}
					class="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all {activeCard === 'link' ? 'bg-near-surface text-near-text shadow-sm' : 'text-near-gray-medium hover:text-near-text'}"
				>
					Payment Link
				</button>
			</div>

			{#if activeCard === 'pay'}
			<!-- Mock payment card -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Cross-Chain Payment</span>
						<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
							31 chains
						</span>
					</div>
				</div>

				<!-- You pay -->
				<div class="p-4">
					<p
						class="mb-2 text-[10px] font-semibold text-near-gray-medium transition-all duration-300"
						style="opacity: {animating ? 0 : 1}"
					>{scenario.label}</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.sender.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						{#if !imgErrors.has('sender')}
							<img
								src={scenario.sender.logo}
								alt={scenario.sender.symbol}
								class="h-8 w-8 rounded-full object-contain"
								onerror={() => handleImgError('sender')}
							/>
						{:else}
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-white"
								style="background-color: {scenario.sender.color}"
							>{scenario.sender.symbol.slice(0, 3)}</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{scenario.sender.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{scenario.sender.chain}</p>
						</div>
						<span class="text-sm font-semibold text-near-text">~{scenario.amount}</span>
					</div>
					<!-- Change return note -->
					<p
						class="mt-1.5 text-[10px] text-near-gray-medium transition-all duration-300"
						style="opacity: {animating ? 0 : 1}"
					>
						{scenario.changeNote}
					</p>

					<!-- Arrow -->
					<div class="my-3 flex items-center justify-center">
						<div class="flex h-8 w-8 items-center justify-center rounded-full border border-near-border bg-near-surface shadow-sm">
							<ArrowRight size={14} class="rotate-90 text-near-green-dark" />
						</div>
					</div>

					<!-- Recipient gets -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Recipient gets</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : scenario.recipient.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						{#if !imgErrors.has('recipient')}
							<img
								src={scenario.recipient.logo}
								alt={scenario.recipient.symbol}
								class="h-8 w-8 rounded-full object-contain"
								onerror={() => handleImgError('recipient')}
							/>
						{:else}
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-white"
								style="background-color: {scenario.recipient.color}"
							>{scenario.recipient.symbol.slice(0, 3)}</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{scenario.recipient.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{scenario.recipient.chain}</p>
						</div>
						<span
							class="text-sm font-semibold text-near-green-dark transition-all duration-300"
							style="opacity: {animating ? 0 : 1}"
						>{scenario.amount} exact</span>
					</div>

					<!-- CTA button -->
					<button
						class="mt-4 w-full rounded-xl bg-near-green-dark py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
					>
						Pay — 1 signature
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
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Payment scenario examples">
				{#each paymentScenarios as _, i}
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
			<!-- Mock payment link card -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Payment Link</span>
						<span class="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
							No wallet needed
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Request amount -->
					<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Requesting</p>
					<div class="mb-4 flex items-center justify-center gap-2">
						<img
							src="https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
							alt="USDC"
							class="h-6 w-6 rounded-full object-contain"
						/>
						<span class="text-2xl font-bold text-near-text">50.00</span>
						<span class="text-sm text-near-gray-medium">USDC</span>
					</div>

					<!-- QR code mockup -->
					<div class="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl border border-near-border bg-near-bg">
						<QrCode size={80} class="text-near-text" strokeWidth={1.5} />
					</div>

					<!-- Payment link -->
					<div class="mb-3 flex items-center gap-2 rounded-lg border border-near-border bg-near-bg px-3 py-2">
						<span class="flex-1 truncate text-xs font-mono text-near-text-secondary">pay.app/r/8xKp2...mNqA</span>
						<Copy size={14} class="shrink-0 text-near-gray-medium" />
					</div>

					<!-- Explainer -->
					<p class="text-center text-[10px] leading-relaxed text-near-gray-medium">
						Sender pays with <span class="font-semibold text-near-text">any token</span> on any chain. You receive exactly <span class="font-semibold text-near-text">50 USDC</span>.
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
					Your users pay with anything.<br />Recipient gets their preferred stablecoin on any chain.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Add cross-chain payments to your app in a day. Senders pay with any token they hold — BTC, ETH, SOL, and 100+ others. Recipients always receive the exact stablecoin amount requested (USDC, USDT) on their chosen chain. Overpayment returns to the sender automatically. You configure the fee you charge. Compatible with x402 for payments.
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
