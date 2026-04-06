<script lang="ts">
	import { onMount } from 'svelte';
	import { chains } from '$lib/data/chains';
	import { getChainLogo } from '$lib/data/tokens';

	// Use chains data but override logos with the working ones from tokens.ts
	const allChains = chains.map((c) => ({
		name: c.name,
		logo: getChainLogo(c.slug) ?? c.logo
	}));

	// Existing connected chains — positioned around the NEAR Intents hub
	const connectedChains = [
		{ name: 'Bitcoin', logo: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png', color: '#F7931A' },
		{ name: 'Ethereum', logo: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png', color: '#627EEA' },
		{ name: 'Solana', logo: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png', color: '#9945FF' },
		{ name: 'Base', logo: '/logos/chains/base.svg', color: '#0000FF' },
		{ name: 'Arbitrum', logo: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg', color: '#28A0F0' },
		{ name: 'Starknet', logo: '/logos/starknet.png', color: '#29296E' },
		{ name: 'TON', logo: 'https://coin-images.coingecko.com/coins/images/17980/small/ton_symbol.png', color: '#0088CC' },
		{ name: 'Zcash', logo: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png', color: '#ECB244' },
		{ name: 'BNB', logo: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png', color: '#F3BA2F' },
		{ name: 'Dogecoin', logo: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png', color: '#C2A633' },
	];

	// Layout: place chains in a circle around center
	const RADIUS = 140;
	const CENTER_X = 200;
	const CENTER_Y = 180;

	const chainPositions = connectedChains.map((chain, i) => {
		const angle = (i / connectedChains.length) * Math.PI * 2 - Math.PI / 2;
		return {
			...chain,
			x: CENTER_X + RADIUS * Math.cos(angle),
			y: CENTER_Y + RADIUS * Math.sin(angle),
			angle
		};
	});

	let mounted = $state(false);
	let gridErrors = $state(new Set<string>());
	let showNewChain = $state(false);
	let pulseIndex = $state(0);

	// "Your chain" position — enters from outside
	const NEW_CHAIN_X = CENTER_X;
	const NEW_CHAIN_Y = CENTER_Y + RADIUS + 80;

	onMount(() => {
		mounted = true;
		setTimeout(() => { showNewChain = true; }, 800);

		const pulseInterval = setInterval(() => {
			pulseIndex = (pulseIndex + 1) % connectedChains.length;
		}, 600);

		return () => clearInterval(pulseInterval);
	});
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background glow -->
	<div
		class="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
		style="background: radial-gradient(circle, #fb4d01 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="flex flex-col items-center gap-6 p-6 sm:flex-row sm:gap-8 sm:p-10">

		<!-- Left: Network diagram -->
		<div class="relative w-full max-w-[400px] shrink-0 sm:w-[400px]">
			<svg viewBox="0 0 400 360" class="w-full" aria-label="Chain network diagram">
				<!-- Connection lines from chains to center -->
				{#each chainPositions as chain, i}
					<line
						x1={CENTER_X}
						y1={CENTER_Y}
						x2={chain.x}
						y2={chain.y}
						stroke={chain.color}
						stroke-width="1.5"
						stroke-opacity={mounted ? 0.3 : 0}
						class="transition-all duration-700"
						style="transition-delay: {i * 60}ms"
					/>
					<!-- Animated pulse dot along each line -->
					{#if mounted && pulseIndex === i}
						<circle r="3" fill={chain.color} opacity="0.8">
							<animateMotion
								dur="1s"
								repeatCount="1"
								path="M{chain.x},{chain.y} L{CENTER_X},{CENTER_Y}"
							/>
						</circle>
					{/if}
				{/each}

				<!-- New chain connection line -->
				{#if showNewChain}
					<line
						x1={CENTER_X}
						y1={CENTER_Y}
						x2={NEW_CHAIN_X}
						y2={NEW_CHAIN_Y}
						stroke="#fb4d01"
						stroke-width="2"
						stroke-dasharray="6 4"
						stroke-opacity="0.5"
						class="transition-all duration-700"
					/>
				{/if}

				<!-- Chain nodes -->
				{#each chainPositions as chain, i}
					<g
						class="transition-all duration-500"
						style="opacity: {mounted ? 1 : 0}; transition-delay: {i * 60}ms"
					>
						<!-- Outer ring -->
						<circle
							cx={chain.x}
							cy={chain.y}
							r="20"
							fill="var(--color-near-surface, #1a1a1a)"
							stroke={chain.color}
							stroke-width="1.5"
							stroke-opacity="0.4"
						/>
						<!-- Chain logo -->
						<image
							href={chain.logo}
							x={chain.x - 12}
							y={chain.y - 12}
							width="24"
							height="24"
						/>
					</g>
				{/each}

				<!-- Center hub: NEAR Intents -->
				<g class="transition-opacity duration-500" style="opacity: {mounted ? 1 : 0}">
					<!-- Glow ring -->
					<circle
						cx={CENTER_X}
						cy={CENTER_Y}
						r="34"
						fill="none"
						stroke="#fb4d01"
						stroke-width="1"
						stroke-opacity="0.2"
					>
						{#if mounted}
							<animate attributeName="r" values="34;40;34" dur="3s" repeatCount="indefinite" />
							<animate attributeName="stroke-opacity" values="0.2;0.05;0.2" dur="3s" repeatCount="indefinite" />
						{/if}
					</circle>
					<!-- Hub circle -->
					<circle
						cx={CENTER_X}
						cy={CENTER_Y}
						r="30"
						fill="var(--color-near-surface, #1a1a1a)"
						stroke="#fb4d01"
						stroke-width="2"
					/>
					<!-- NEAR Intents logo -->
					<image
						href="/logos/NEAR_Intents_Logo_Tertiary.svg"
						x={CENTER_X - 18}
						y={CENTER_Y - 18}
						width="36"
						height="36"
					/>
				</g>

				<!-- "Your Chain" node -->
				<g
					class="transition-all duration-700"
					style="opacity: {showNewChain ? 1 : 0}; transform: translateY({showNewChain ? '0px' : '20px'})"
				>
					<!-- Dashed outer ring -->
					<circle
						cx={NEW_CHAIN_X}
						cy={NEW_CHAIN_Y}
						r="22"
						fill="var(--color-near-surface, #1a1a1a)"
						stroke="#fb4d01"
						stroke-width="2"
						stroke-dasharray="4 3"
					/>
					<!-- Plus icon center -->
					<text
						x={NEW_CHAIN_X}
						y={NEW_CHAIN_Y + 1}
						text-anchor="middle"
						dominant-baseline="central"
						fill="#fb4d01"
						font-size="18"
						font-weight="300"
					>+</text>
					<!-- Label -->
					<text
						x={NEW_CHAIN_X}
						y={NEW_CHAIN_Y + 38}
						text-anchor="middle"
						fill="var(--color-near-text-secondary, #999)"
						font-size="10"
						font-weight="600"
					>Your chain</text>
				</g>

			</svg>
		</div>

		<!-- Right: copy -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
				Connect your chain<br />to every other chain.
			</h2>
			<p class="text-sm leading-relaxed text-near-text-secondary sm:text-base">
				Add your chain to the NEAR Intents network and every app in your ecosystem inherits cross-chain swaps, deposits, and payments — no per-app bridge work required.
			</p>
		</div>

	</div>

	<!-- Connected chains grid -->
	<div class="border-t border-near-border px-6 py-5 sm:px-10">
		<p class="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-near-gray-medium">Connected chains</p>
		<div class="flex flex-wrap justify-center gap-3 sm:gap-4">
			{#each allChains as chain}
				<div class="flex flex-col items-center gap-1" title={chain.name}>
					{#if gridErrors.has(chain.name)}
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-near-border text-[10px] font-bold text-near-text-secondary sm:h-9 sm:w-9">
							{chain.name.slice(0, 3)}
						</div>
					{:else}
						<img
							src={chain.logo}
							alt={chain.name}
							class="h-8 w-8 rounded-full object-contain sm:h-9 sm:w-9"
							onerror={() => { gridErrors = new Set([...gridErrors, chain.name]); }}
						/>
					{/if}
					<span class="text-[9px] font-medium text-near-text-secondary">{chain.name}</span>
				</div>
			{/each}
			<!-- Your chain placeholder -->
			<div class="flex flex-col items-center gap-1">
				<div class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-near-orange/50 sm:h-9 sm:w-9">
					<span class="text-sm text-near-orange">+</span>
				</div>
				<span class="text-[9px] font-semibold text-near-orange">Yours?</span>
			</div>
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
