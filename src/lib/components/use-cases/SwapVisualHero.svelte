<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, QrCode, Copy } from 'lucide-svelte';

	// Which card is showing: 'swap' or 'deposit'
	let activeCard = $state<'swap' | 'deposit'>('swap');

	// Token pairs that animate through the swap demo
	const tokenPairs = [
		{
			from: { symbol: 'ZEC', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', chain: 'Zcash', color: '#F4B728' },
			to: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin', color: '#F7931A' },
			fromAmount: '5.0', toAmount: '≈ 0.0038'
		},
		{
			from: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum', color: '#627EEA' },
			to: { symbol: 'SOL', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', chain: 'Solana', color: '#9945FF' },
			fromAmount: '0.5', toAmount: '≈ 12.4'
		},
		{
			from: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Arbitrum', color: '#28A0F0' },
			to: { symbol: 'ETH', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', chain: 'Ethereum', color: '#627EEA' },
			fromAmount: '500', toAmount: '≈ 0.26'
		},
		{
			from: { symbol: 'BTC', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', chain: 'Bitcoin', color: '#F7931A' },
			to: { symbol: 'USDC', logo: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png', chain: 'Base', color: '#0052FF' },
			fromAmount: '0.1', toAmount: '≈ 8,160'
		}
	];

	let activePair = $state(0);
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
			activePair = (activePair + 1) % tokenPairs.length;
			animating = false;
		}, 2800);
		return () => clearInterval(interval);
	});

	const pair = $derived(tokenPairs[activePair]);
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
		style="background: radial-gradient(circle, #627EEA 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: card area with tab switcher -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">

			<!-- Tab switcher -->
			<div class="mb-3 flex rounded-lg border border-near-border bg-near-bg p-0.5">
				<button
					onclick={() => (activeCard = 'swap')}
					class="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all {activeCard === 'swap' ? 'bg-near-surface text-near-text shadow-sm' : 'text-near-gray-medium hover:text-near-text'}"
				>
					Sign & Swap
				</button>
				<button
					onclick={() => (activeCard = 'deposit')}
					class="flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-all {activeCard === 'deposit' ? 'bg-near-surface text-near-text shadow-sm' : 'text-near-gray-medium hover:text-near-text'}"
				>
					Deposit Address
				</button>
			</div>

			{#if activeCard === 'swap'}
			<!-- Mock swap card -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Cross-Chain Swap</span>
						<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
							31 chains
						</span>
					</div>
				</div>

				<!-- You pay -->
				<div class="p-4">
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">You pay</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : pair.from.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						{#if !imgErrors.has('from')}
							<img
								src={pair.from.logo}
								alt={pair.from.symbol}
								class="h-8 w-8 rounded-full object-contain"
								onerror={() => handleImgError('from')}
							/>
						{:else}
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-white"
								style="background-color: {pair.from.color}"
							>{pair.from.symbol.slice(0, 3)}</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{pair.from.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{pair.from.chain}</p>
						</div>
						<span class="text-sm font-semibold text-near-text">{pair.fromAmount}</span>
					</div>

					<!-- Swap arrow -->
					<div class="my-3 flex items-center justify-center">
						<div class="flex h-8 w-8 items-center justify-center rounded-full border border-near-border bg-near-surface shadow-sm">
							<ArrowRight size={14} class="rotate-90 text-near-green-dark" />
						</div>
					</div>

					<!-- You receive -->
					<p class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">You receive</p>
					<div
						class="flex items-center gap-3 rounded-xl border border-near-border bg-near-bg px-4 py-3 transition-all duration-300"
						style="border-color: {animating ? 'var(--color-near-border)' : pair.to.color + '40'}; opacity: {animating ? 0.5 : 1}"
					>
						{#if !imgErrors.has('to')}
							<img
								src={pair.to.logo}
								alt={pair.to.symbol}
								class="h-8 w-8 rounded-full object-contain"
								onerror={() => handleImgError('to')}
							/>
						{:else}
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-white"
								style="background-color: {pair.to.color}"
							>{pair.to.symbol.slice(0, 3)}</div>
						{/if}
						<div class="flex-1 min-w-0">
							<p class="text-base font-bold text-near-text">{pair.to.symbol}</p>
							<p class="text-[10px] text-near-gray-medium">{pair.to.chain}</p>
						</div>
						<span
							class="text-sm font-semibold text-near-green-dark transition-all duration-300"
							style="opacity: {animating ? 0 : 1}"
						>{pair.toAmount}</span>
					</div>

					<!-- CTA button -->
					<button
						class="mt-4 w-full rounded-xl bg-near-green-dark py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
					>
						Swap — 1 signature
					</button>
				</div>

				<!-- Footer: powered by -->
				<div class="border-t border-near-border bg-near-bg px-4 py-2.5 text-center">
					<p class="text-[10px] text-near-gray-medium">
						Powered by <span class="font-semibold text-near-green-dark">NEAR Intents</span>
					</p>
				</div>
			</div>

			<!-- Pair switcher dots -->
			<div class="mt-3 flex justify-center gap-1.5" aria-label="Token pair examples">
				{#each tokenPairs as _, i}
					<button
						onclick={() => { activePair = i; }}
						class="h-1.5 rounded-full transition-all duration-300 focus:outline-none"
						style="width: {activePair === i ? '16px' : '6px'}; background-color: {activePair === i ? '#00963f' : 'var(--color-near-border)'}"
						aria-label="Example {i + 1}"
						aria-pressed={activePair === i}
					></button>
				{/each}
			</div>

			{:else}
			<!-- Mock deposit address card -->
			<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-xl">
				<!-- Card header -->
				<div class="border-b border-near-border px-4 py-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-bold text-near-text">Deposit to Swap</span>
						<span class="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
							No wallet needed
						</span>
					</div>
				</div>

				<div class="p-4">
					<!-- Deposit amount -->
					<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-near-gray-medium">Deposit amount</p>
					<div class="mb-4 flex items-center justify-center gap-2">
						<img
							src="https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
							alt="BTC"
							class="h-6 w-6 rounded-full object-contain"
						/>
						<span class="text-2xl font-bold text-near-text">0.01</span>
						<span class="text-sm text-near-gray-medium">BTC</span>
					</div>

					<!-- QR code mockup -->
					<div class="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-xl border border-near-border bg-near-bg">
						<QrCode size={80} class="text-near-text" strokeWidth={1.5} />
					</div>

					<!-- Address -->
					<div class="mb-3 flex items-center gap-2 rounded-lg border border-near-border bg-near-bg px-3 py-2">
						<span class="flex-1 truncate text-xs font-mono text-near-text-secondary">12GsTPCxun...Usq5fcMuDP</span>
						<Copy size={14} class="shrink-0 text-near-gray-medium" />
					</div>

					<!-- User receives -->
					<div class="mb-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
						<p class="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">User receives</p>
						<div class="flex items-center gap-2">
							<img
								src="https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
								alt="USDC"
								class="h-5 w-5 rounded-full object-contain"
							/>
							<span class="text-sm font-bold text-near-text">≈ 650 USDC</span>
						</div>
						<div class="mt-1 flex items-center gap-1">
							<span class="text-[10px] text-near-gray-medium">at</span>
							<span class="text-[10px] font-mono text-near-text-secondary">0x1D5e...E138</span>
						</div>
					</div>

					<!-- Explainer -->
					<p class="text-center text-[10px] leading-relaxed text-near-gray-medium">
						Send <span class="font-semibold text-near-text">BTC</span> from any wallet or exchange. Swap completes automatically.
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

		<!-- Right: value prop text + chain count -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<div>
			<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					Any asset.<br />Any chain.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Users sign a swap directly from their wallet — or deposit to a generated address from any wallet or exchange. No chain-specific wallet support required.
				</p>
			</div>

			<!-- Quick stats row -->
			<div class="flex flex-wrap justify-center gap-4 sm:justify-start">
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">31</span>
					<span class="text-[11px] text-near-text-secondary">chains</span>
				</div>
				<div class="w-px bg-near-border" aria-hidden="true"></div>
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">100+</span>
					<span class="text-[11px] text-near-text-secondary">assets</span>
				</div>
				<div class="w-px bg-near-border" aria-hidden="true"></div>
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">~30s</span>
					<span class="text-[11px] text-near-text-secondary">settlement</span>
				</div>
				<div class="w-px bg-near-border" aria-hidden="true"></div>
				<div class="flex flex-col">
					<span class="text-xl font-bold text-near-green-dark">1 day</span>
					<span class="text-[11px] text-near-text-secondary">to integrate (widget)</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.animate-pulse {
			animation: none;
		}
		* {
			transition: none !important;
		}
	}
</style>
