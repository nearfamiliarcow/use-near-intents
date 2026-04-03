<script lang="ts">
	import { onMount } from 'svelte';

	// Single token shown in the diagram
	const tokens = [
		{
			symbol: 'NEW',
			name: 'New Token',
			logo: '',
			chain: 'Any Chain',
			color: '#fb4d01',
			tagline: 'Instantly available everywhere'
		}
	];

	// Distribution venues — where the token propagates to
	const venues = [
		{
			name: 'Trust Wallet',
			logo: 'https://coin-images.coingecko.com/coins/images/11085/small/Trust.png',
			users: '70M+ users',
			color: '#3375BB',
			angle: -60   // degrees, for positioning around the center
		},
		{
			name: 'Ledger Live',
			logo: 'https://www.ledger.com/wp-content/uploads/2021/11/Ledger_favicon.png',
			users: 'Hardware wallet users',
			color: '#F3A833',
			angle: 0
		},
		{
			name: 'near.com',
			logo: 'https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png',
			users: 'near.com',
			color: '#00C08B',
			angle: 60
		},
		{
			name: 'LI.FI',
			logo: 'https://li.fi/logo96.png',
			users: 'LI.FI ecosystem',
			color: '#BF5AF2',
			angle: 120
		},
		{
			name: 'SwapKit',
			logo: 'https://swapkit.dev/wp-content/uploads/2024/04/cropped-swapkit-icon.jpg',
			users: 'SwapKit SDK',
			color: '#F4B728',
			angle: 180
		},
		{
			name: '+ Every future app',
			logo: '',
			users: 'Network grows with you',
			color: '#6b7280',
			angle: 240
		}
	];

	let activeToken = $state(0);
	let animating = $state(false);
	// Which venue dots are "lit" (pulse has reached them)
	let venuesLit = $state<boolean[]>(venues.map(() => false));
	let mounted = $state(false);

	async function runPulse() {
		// Reset
		venuesLit = venues.map(() => false);
		// Light up venues one by one with a stagger
		for (let i = 0; i < venues.length; i++) {
			await new Promise((r) => setTimeout(r, 120 + i * 80));
			venuesLit = venuesLit.map((v, idx) => (idx === i ? true : v));
		}
	}

	onMount(() => {
		mounted = true;
		setTimeout(() => runPulse(), 600);

		const interval = setInterval(() => {
			runPulse();
		}, 4000);

		return () => clearInterval(interval);
	});

	const token = $derived(tokens[activeToken]);

	// SVG radius for the venue orbit
	const orbitR = 110;
	const svgSize = 300;
	const cx = svgSize / 2;
	const cy = svgSize / 2;

	// Compute x/y for each venue logo
	function venuePos(angleDeg: number) {
		const rad = ((angleDeg - 90) * Math.PI) / 180;
		return {
			x: cx + orbitR * Math.cos(rad),
			y: cy + orbitR * Math.sin(rad)
		};
	}
</script>

<div class="relative overflow-hidden rounded-2xl border border-near-border bg-gradient-to-br from-near-surface via-near-bg to-near-surface">
	<!-- Background glow -->
	<div
		class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-[0.07] transition-all duration-700"
		style="background: radial-gradient(circle, {token.color} 0%, transparent 70%)"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.04]"
		style="background: radial-gradient(circle, #fb4d01 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-10">

		<!-- Left: distribution diagram -->
		<div class="w-full max-w-xs flex-shrink-0 sm:w-72">
			<div class="flex flex-col items-center">
				<!-- SVG orbit diagram -->
				<div class="relative" style="width: {svgSize}px; height: {svgSize}px; max-width: 100%">
					<svg
						viewBox="0 0 {svgSize} {svgSize}"
						class="w-full h-full"
						aria-label="Token distribution network diagram"
						role="img"
					>
						<!-- Orbit ring -->
						<circle
							cx={cx}
							cy={cy}
							r={orbitR}
							fill="none"
							stroke="var(--color-near-border)"
							stroke-width="1"
							stroke-dasharray="4 6"
							opacity="0.6"
						/>

						<!-- Pulse lines from center to each venue -->
						{#each venues as venue, i}
							{@const pos = venuePos(venue.angle)}
							<line
								x1={cx}
								y1={cy}
								x2={pos.x}
								y2={pos.y}
								stroke={venuesLit[i] ? venue.color : 'var(--color-near-border)'}
								stroke-width={venuesLit[i] ? 1.5 : 0.8}
								opacity={venuesLit[i] ? 0.7 : 0.3}
								class="transition-all duration-300"
							/>
						{/each}

						<!-- Center: NEAR Intents hub -->
						<circle
							cx={cx}
							cy={cy}
							r={32}
							fill="var(--color-near-surface)"
							stroke="var(--color-near-border)"
							stroke-width="1.5"
						/>
						<!-- Outer pulse ring (animated via CSS) -->
						<circle
							cx={cx}
							cy={cy}
							r={36}
							fill="none"
							stroke="#fb4d01"
							stroke-width="1"
							opacity="0.4"
							class="pulse-ring"
						/>

						<!-- Token logo in center — use foreignObject for img -->
						<foreignObject x={cx - 20} y={cy - 20} width="40" height="40" style="overflow: visible">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-near-border bg-near-bg shadow-md overflow-hidden transition-all duration-300"
								style="border-color: {animating ? 'var(--color-near-border)' : token.color + '60'}; opacity: {animating ? 0.4 : 1}"
							>
								{#if token.logo}
									<img src={token.logo} alt={token.symbol} class="h-8 w-8 object-contain rounded-full" />
								{:else}
									<span class="text-xs font-bold" style="color: {token.color}">{token.symbol}</span>
								{/if}
							</div>
						</foreignObject>

						<!-- NEAR Intents label under center -->
						<text
							x={cx}
							y={cy + 50}
							text-anchor="middle"
							class="text-[8px] font-semibold fill-near-orange"
							font-size="8"
							fill="#fb4d01"
							font-weight="600"
						>NEAR Intents</text>

						<!-- Venue logos on the orbit -->
						{#each venues as venue, i}
							{@const pos = venuePos(venue.angle)}
							<!-- Glow circle when lit -->
							{#if venuesLit[i]}
								<circle
									cx={pos.x}
									cy={pos.y}
									r={18}
									fill={venue.color}
									opacity="0.12"
									class="transition-opacity duration-300"
								/>
							{/if}
							<circle
								cx={pos.x}
								cy={pos.y}
								r={14}
								fill="var(--color-near-surface)"
								stroke={venuesLit[i] ? venue.color : 'var(--color-near-border)'}
								stroke-width={venuesLit[i] ? 1.5 : 1}
								class="transition-all duration-300"
							/>
							{#if venue.logo}
								<foreignObject x={pos.x - 10} y={pos.y - 10} width="20" height="20" style="overflow: visible">
									<div class="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full">
										<img src={venue.logo} alt={venue.name} class="h-5 w-5 object-cover rounded-full" />
									</div>
								</foreignObject>
							{:else}
								<!-- "More" dot -->
								<text
									x={pos.x}
									y={pos.y + 3}
									text-anchor="middle"
									font-size="9"
									fill={venuesLit[i] ? venue.color : 'var(--color-near-gray-medium, #9ca3af)'}
									font-weight="600"
									class="transition-all duration-300"
								>+</text>
							{/if}
						{/each}
					</svg>
				</div>

				<!-- Token label below diagram -->
				<div
					class="mt-1 flex items-center gap-2 rounded-full border border-near-border bg-near-surface px-4 py-1.5 shadow-sm transition-all duration-300"
					style="border-color: {animating ? 'var(--color-near-border)' : token.color + '50'}; opacity: {animating ? 0.5 : 1}"
				>
					{#if token.logo}
						<img src={token.logo} alt={token.symbol} class="h-5 w-5 rounded-full object-contain" />
					{:else}
						<div class="h-5 w-5 rounded-full flex items-center justify-center" style="background: {token.color}20">
							<span class="text-[9px] font-bold" style="color: {token.color}">{token.symbol[0]}</span>
						</div>
					{/if}
					<div>
						<span class="text-sm font-bold text-near-text">{token.symbol}</span>
						<span class="ml-1.5 text-[11px] text-near-text-secondary">{token.tagline}</span>
					</div>
				</div>

			</div>
		</div>

		<!-- Right: value prop text + stats -->
		<div class="flex flex-col gap-4 text-center sm:text-left">
			<div>
				<h2 class="text-2xl font-bold leading-snug text-near-text sm:text-3xl">
					List once.<br />Reach every wallet.
				</h2>
				<p class="mt-3 text-sm leading-relaxed text-near-text-secondary sm:text-base">
					One listing on NEAR Intents puts your token inside Trust Wallet, Ledger Live, near.com, and every other integrated app automatically. No per-venue negotiations. No separate exchange listings. The moment you're live, you're everywhere.
				</p>
			</div>

			<!-- Venue list — compact -->
			<div class="flex flex-col gap-2">
				{#each venues.slice(0, 5) as venue, i}
					<div
						class="flex items-center gap-2.5 rounded-lg border border-near-border bg-near-bg px-3 py-2 transition-all duration-300"
						style="border-color: {venuesLit[i] ? venue.color + '50' : 'var(--color-near-border)'}; background-color: {venuesLit[i] ? venue.color + '08' : ''}"
					>
						{#if venue.logo}
							<img src={venue.logo} alt={venue.name} class="h-5 w-5 flex-shrink-0 rounded-full object-cover" />
						{:else}
							<div class="h-5 w-5 flex-shrink-0 rounded-full bg-near-border"></div>
						{/if}
						<span class="text-xs font-semibold text-near-text">{venue.name}</span>
						<span class="ml-auto text-[10px] text-near-text-secondary">{venue.users}</span>
					</div>
				{/each}
				<div class="flex items-center gap-2.5 rounded-lg border border-near-border bg-near-bg px-3 py-2">
					<div class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-near-border">
						<span class="text-[9px] font-bold text-near-gray-medium">+</span>
					</div>
					<span class="text-xs font-semibold text-near-text">Every future integrator</span>
					<span class="ml-auto text-[10px] text-near-text-secondary">Auto-inherited</span>
				</div>
			</div>

		</div>
	</div>
</div>

<style>
	.pulse-ring {
		transform-origin: 150px 150px;
		animation: pulse-expand 2s ease-out infinite;
	}

	@keyframes pulse-expand {
		0% {
			r: 34;
			opacity: 0.5;
		}
		100% {
			r: 52;
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pulse-ring {
			animation: none;
		}
		* {
			transition: none !important;
		}
	}
</style>
