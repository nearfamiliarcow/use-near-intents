<script lang="ts">
	import { onMount } from 'svelte';

	// Animated chain nodes that flow into NEAR and out to other chains
	const sourceChains = [
		{ name: 'Bitcoin', color: '#F7931A', symbol: 'BTC', x: 0 },
		{ name: 'Ethereum', color: '#627EEA', symbol: 'ETH', x: 1 },
		{ name: 'Solana', color: '#9945FF', symbol: 'SOL', x: 2 },
		{ name: 'Base', color: '#0052FF', symbol: 'BASE', x: 3 },
		{ name: 'Arbitrum', color: '#28A0F0', symbol: 'ARB', x: 4 }
	];

	const destChains = [
		{ name: 'Ethereum', color: '#627EEA', symbol: 'ETH', x: 0 },
		{ name: 'Solana', color: '#9945FF', symbol: 'SOL', x: 1 },
		{ name: 'Base', color: '#0052FF', symbol: 'BASE', x: 2 },
		{ name: 'Arbitrum', color: '#28A0F0', symbol: 'ARB', x: 3 },
		{ name: 'Bitcoin', color: '#F7931A', symbol: 'BTC', x: 4 }
	];

	let mounted = $state(false);
	let activeParticle = $state(0);

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			activeParticle = (activeParticle + 1) % sourceChains.length;
		}, 900);
		return () => clearInterval(interval);
	});
</script>

<div class="relative overflow-hidden border-b border-near-border bg-gradient-to-b from-near-surface to-near-bg">
	<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
		<div class="text-center">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full border border-near-green/30 bg-near-green-light px-3 py-1 text-xs font-semibold text-near-green-dark">
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-near-green-dark"></span>
				31 Chains Supported
			</div>
			<h1 class="text-3xl font-bold tracking-tight text-near-text sm:text-4xl lg:text-5xl">
				What will you build with
				<span class="text-near-green-dark">NEAR Intents?</span>
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-base text-near-text-secondary sm:text-lg">
				Cross-chain capabilities — swaps, payments, deposits, custody — that slot into any product in days, not months.
			</p>
		</div>

		<!-- Animated flow diagram -->
		<div class="relative mx-auto mt-10 max-w-2xl sm:mt-14" aria-hidden="true">
			<div class="flex items-center justify-between gap-4">
				<!-- Source chains column -->
				<div class="flex flex-col gap-2.5">
					{#each sourceChains as chain, i}
						<div
							class="flex items-center gap-2 rounded-lg border bg-near-surface px-3 py-2 text-xs font-semibold shadow-sm transition-all duration-300"
							style="border-color: {activeParticle === i ? chain.color : 'var(--color-near-border)'}; box-shadow: {activeParticle === i ? `0 0 0 2px ${chain.color}22` : ''}; opacity: {mounted ? 1 : 0}; transform: translateX({mounted ? 0 : -8}px); transition-delay: {i * 60}ms"
						>
							<span
								class="h-2 w-2 rounded-full transition-all duration-300"
								style="background-color: {chain.color}; transform: scale({activeParticle === i ? 1.4 : 1})"
							></span>
							<span class="text-near-text">{chain.symbol}</span>
						</div>
					{/each}
				</div>

				<!-- Flow lines + NEAR hub -->
				<div class="relative flex flex-1 items-center justify-center">
					<!-- SVG flow lines -->
					<svg
						class="absolute inset-0 h-full w-full"
						viewBox="0 0 200 160"
						preserveAspectRatio="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<!-- Lines from left to center -->
						{#each sourceChains as chain, i}
							{@const y = 14 + i * 33}
							<line
								x1="0" y1={y}
								x2="100" y2="80"
								stroke={activeParticle === i ? chain.color : '#e5e7eb'}
								stroke-width={activeParticle === i ? '2' : '1'}
								stroke-dasharray="4 3"
								opacity={activeParticle === i ? 0.9 : 0.4}
								class="transition-all duration-500"
							/>
						{/each}
						<!-- Lines from center to right -->
						{#each destChains as chain, i}
							{@const y = 14 + i * 33}
							<line
								x1="100" y1="80"
								x2="200" y2={y}
								stroke={activeParticle === i ? chain.color : '#e5e7eb'}
								stroke-width={activeParticle === i ? '2' : '1'}
								stroke-dasharray="4 3"
								opacity={activeParticle === i ? 0.9 : 0.4}
								class="transition-all duration-500"
							/>
						{/each}
					</svg>

					<!-- NEAR hub node -->
					<div class="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-near-green bg-near-green-light shadow-lg sm:h-20 sm:w-20" style="box-shadow: 0 0 20px rgba(0,200,83,0.2)">
						<span class="text-[10px] font-bold text-near-green-dark sm:text-xs">NEAR</span>
						<span class="text-[8px] text-near-green-dark/70 sm:text-[10px]">Intents</span>
					</div>
				</div>

				<!-- Destination chains column -->
				<div class="flex flex-col gap-2.5">
					{#each destChains as chain, i}
						<div
							class="flex items-center gap-2 rounded-lg border bg-near-surface px-3 py-2 text-xs font-semibold shadow-sm transition-all duration-300"
							style="border-color: {activeParticle === i ? chain.color : 'var(--color-near-border)'}; box-shadow: {activeParticle === i ? `0 0 0 2px ${chain.color}22` : ''}; opacity: {mounted ? 1 : 0}; transform: translateX({mounted ? 0 : 8}px); transition-delay: {i * 60}ms"
						>
							<span class="text-near-text">{chain.symbol}</span>
							<span
								class="h-2 w-2 rounded-full transition-all duration-300"
								style="background-color: {chain.color}; transform: scale({activeParticle === i ? 1.4 : 1})"
							></span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Caption -->
			<p class="mt-4 text-center text-xs text-near-gray-medium">
				One integration. Any asset. Any chain.
			</p>
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
