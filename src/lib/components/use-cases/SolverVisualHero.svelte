<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowRight, ArrowDown } from 'lucide-svelte';

	let mounted = $state(false);
	let step = $state(0); // 0: idle, 1: request sent, 2: solver quotes, 3: fill complete

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			step = (step + 1) % 4;
		}, 2200);
		return () => clearInterval(interval);
	});
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background decoration -->
	<div
		class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.06]"
		style="background: radial-gradient(circle, #fb4d01 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col gap-6 p-6 sm:p-10">

		<!-- Top: headline + description -->
		<div class="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">

			<!-- Visual flow -->
			<div class="w-full max-w-md shrink-0">

				<!-- Three-column flow: User → Message Bus → Solver -->
				<div class="flex items-start justify-between gap-2">

					<!-- User column -->
					<div class="flex w-28 flex-col items-center gap-2 sm:w-32">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-500 sm:h-20 sm:w-20"
							style="border-color: {step >= 1 ? '#F7931A' : 'var(--color-near-border)'}; background-color: {step >= 1 ? '#F7931A10' : 'var(--color-near-surface)'}"
						>
							<img
								src="https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
								alt="BTC"
								class="h-8 w-8 sm:h-10 sm:w-10"
							/>
						</div>
						<div class="text-center">
							<p class="text-xs font-bold text-near-text sm:text-sm">User</p>
							<p class="text-[10px] text-near-text-secondary">Wants to sell 1 BTC</p>
						</div>

						<!-- Incoming USDC (step 3) -->
						<div
							class="flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all duration-500"
							style="opacity: {step === 3 ? 1 : 0}; border-color: #2775CA40; background-color: #2775CA10; transform: translateY({step === 3 ? '0px' : '8px'})"
						>
							<img
								src="https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
								alt="USDC"
								class="h-4 w-4"
							/>
							<span class="text-[11px] font-bold text-[#2775CA]">65,420 USDC</span>
						</div>
					</div>

					<!-- Arrows + Message Bus -->
					<div class="flex flex-1 flex-col items-center gap-1 pt-4 sm:pt-6">
						<!-- Request arrow (right) -->
						<div
							class="flex items-center gap-1 transition-all duration-500"
							style="opacity: {step >= 1 ? 1 : 0.2}"
						>
							<div class="h-px flex-1 bg-near-border" style="min-width: 12px"></div>
							<div
								class="rounded-full px-2 py-0.5 text-[8px] font-semibold transition-colors duration-500"
								style="background-color: {step === 1 ? '#fb4d0115' : 'var(--color-near-bg)'}; color: {step === 1 ? '#fb4d01' : 'var(--color-near-gray-medium)'}"
							>
								{step === 1 ? 'QUOTE REQUEST →' : step >= 2 ? '← USDC' : 'QUOTE REQUEST →'}
							</div>
							<div class="h-px flex-1 bg-near-border" style="min-width: 12px"></div>
						</div>

						<!-- Message Bus badge -->
						<div
							class="mt-1 flex items-center gap-1.5 rounded-full border border-near-border px-3 py-1.5 shadow-sm transition-all duration-500"
							style="background-color: {step >= 1 && step <= 2 ? '#fb4d0108' : 'var(--color-near-surface)'}; border-color: {step >= 1 && step <= 2 ? '#fb4d0130' : 'var(--color-near-border)'}"
						>
							<div
								class="h-1.5 w-1.5 rounded-full transition-colors duration-300"
								style="background-color: {step >= 1 ? '#fb4d01' : 'var(--color-near-gray-medium)'}"
							></div>
							<span class="text-[9px] font-semibold text-near-text-secondary">Message Bus</span>
						</div>

						<!-- Fill arrow (left, step 3) -->
						<div
							class="mt-1 flex items-center gap-1 transition-all duration-500"
							style="opacity: {step === 3 ? 1 : 0.2}"
						>
							<div class="h-px flex-1 bg-near-border" style="min-width: 12px"></div>
							<div
								class="rounded-full px-2 py-0.5 text-[8px] font-semibold"
								style="background-color: {step === 3 ? '#0d948815' : 'var(--color-near-bg)'}; color: {step === 3 ? '#0d9488' : 'var(--color-near-gray-medium)'}"
							>
								SETTLED ✓
							</div>
							<div class="h-px flex-1 bg-near-border" style="min-width: 12px"></div>
						</div>
					</div>

					<!-- Solver column -->
					<div class="flex w-28 flex-col items-center gap-2 sm:w-32">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-2xl border-2 transition-all duration-500 sm:h-20 sm:w-20"
							style="border-color: {step >= 2 ? '#9945FF' : 'var(--color-near-border)'}; background-color: {step >= 2 ? '#9945FF10' : 'var(--color-near-surface)'}"
						>
							<div class="flex flex-col items-center">
								<span class="text-lg font-bold text-near-text sm:text-xl">⚡</span>
							</div>
						</div>
						<div class="text-center">
							<p class="text-xs font-bold text-near-text sm:text-sm">Your Solver</p>
							<p class="text-[10px] text-near-text-secondary">Quotes & fills</p>
						</div>

						<!-- Quote response (step 2) -->
						<div
							class="flex flex-col items-center gap-0.5 rounded-lg border px-2.5 py-1.5 transition-all duration-500"
							style="opacity: {step >= 2 ? 1 : 0}; border-color: {step === 2 ? '#9945FF40' : 'var(--color-near-border)'}; background-color: {step === 2 ? '#9945FF08' : 'var(--color-near-surface)'}; transform: translateY({step >= 2 ? '0px' : '8px'})"
						>
							<span class="text-[9px] font-semibold text-near-text-secondary">QUOTE</span>
							<span class="text-[11px] font-bold text-near-text">65,420 USDC</span>
						</div>
					</div>
				</div>

				<!-- Step indicator -->
				<div class="mt-5 flex items-center justify-center gap-3">
					{#each ['Intent broadcast', 'Solver quotes', 'User selects', 'Settled'] as label, i}
						<div class="flex items-center gap-1.5">
							<div
								class="h-1.5 w-1.5 rounded-full transition-all duration-300"
								style="background-color: {step === i ? '#fb4d01' : 'var(--color-near-border)'}; transform: scale({step === i ? 1.3 : 1})"
							></div>
							<span
								class="text-[9px] font-medium transition-colors duration-300"
								style="color: {step === i ? '#fb4d01' : 'var(--color-near-gray-medium)'}"
							>{label}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right: copy -->
			<div class="flex flex-col gap-3 text-center sm:pt-2 sm:text-left">
				<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					Fill intents.<br />Capture spread.
				</h2>
				<p class="text-sm leading-relaxed text-near-text-secondary sm:text-base">
					Users across 31 chains submit swap intents. Multiple solvers compete on every request — best quoted output wins. Price it right, fill the trade, keep the spread.
				</p>
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
