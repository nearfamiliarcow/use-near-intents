<script lang="ts">
	import { onMount } from 'svelte';
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Screenshot {
		src: string;
		caption: string;
		partnerName: string;
		partnerLogo?: string;
		partnerSlug?: string;
	}

	interface Props {
		screenshots: Screenshot[];
	}

	let { screenshots }: Props = $props();

	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);
	let scrollContainer = $state<HTMLDivElement | null>(null);
	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);
	let autoplayInterval: ReturnType<typeof setInterval> | null = null;
	let paused = $state(false);

	function openLightbox(i: number) {
		lightboxIndex = i;
		lightboxOpen = true;
		pauseAutoplay();
	}

	function closeLightbox() {
		lightboxOpen = false;
		resumeAutoplay();
	}

	function prev() {
		lightboxIndex = (lightboxIndex - 1 + screenshots.length) % screenshots.length;
	}

	function next() {
		lightboxIndex = (lightboxIndex + 1) % screenshots.length;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}

	function updateScrollState() {
		if (!scrollContainer) return;
		canScrollLeft = scrollContainer.scrollLeft > 4;
		canScrollRight = scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 4;
	}

	function scrollByCard(dir: -1 | 1) {
		if (!scrollContainer) return;
		// Find the card width from the first child
		const card = scrollContainer.firstElementChild as HTMLElement | null;
		if (!card) return;
		const cardWidth = card.offsetWidth + 16; // card width + gap
		scrollContainer.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
		pauseAutoplay();
	}

	function autoScroll() {
		if (!scrollContainer || paused) return;
		// If at the end, loop back to start
		if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 4) {
			scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
		} else {
			const card = scrollContainer.firstElementChild as HTMLElement | null;
			if (!card) return;
			const cardWidth = card.offsetWidth + 16;
			scrollContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
		}
	}

	function pauseAutoplay() {
		paused = true;
		if (autoplayInterval) {
			clearInterval(autoplayInterval);
			autoplayInterval = null;
		}
	}

	function resumeAutoplay() {
		paused = false;
		startAutoplay();
	}

	function startAutoplay() {
		if (autoplayInterval) clearInterval(autoplayInterval);
		autoplayInterval = setInterval(autoScroll, 4000);
	}

	onMount(() => {
		updateScrollState();
		startAutoplay();
		return () => {
			if (autoplayInterval) clearInterval(autoplayInterval);
		};
	});

	$effect(() => {
		if (scrollContainer) {
			updateScrollState();
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div>
	<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">In the wild</h2>
	<p class="mb-5 text-sm text-near-text-secondary sm:mb-6">
		Real partners shipping cross-chain swaps powered by NEAR Intents.
	</p>

	<!-- Carousel wrapper -->
	<div
		class="relative"
		onmouseenter={pauseAutoplay}
		onmouseleave={resumeAutoplay}
	>
		<!-- Left arrow -->
		{#if canScrollLeft}
			<button
				onclick={() => scrollByCard(-1)}
				class="absolute -left-3 top-[40%] z-10 -translate-y-1/2 rounded-full border border-near-border bg-near-surface p-2 shadow-md transition-colors hover:bg-near-bg focus:outline-none sm:-left-4"
				aria-label="Scroll left"
			>
				<ChevronLeft size={18} class="text-near-text" />
			</button>
		{/if}

		<!-- Right arrow -->
		{#if canScrollRight}
			<button
				onclick={() => scrollByCard(1)}
				class="absolute -right-3 top-[40%] z-10 -translate-y-1/2 rounded-full border border-near-border bg-near-surface p-2 shadow-md transition-colors hover:bg-near-bg focus:outline-none sm:-right-4"
				aria-label="Scroll right"
			>
				<ChevronRight size={18} class="text-near-text" />
			</button>
		{/if}

		<!-- Scrollable track -->
		<div
			bind:this={scrollContainer}
			onscroll={updateScrollState}
			class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-0.5 pb-2 no-scrollbar"
		>
			{#each screenshots as shot, i}
				<button
					onclick={() => openLightbox(i)}
					class="group flex w-[calc(50%-8px)] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-near-border bg-near-surface shadow-sm transition-all duration-200 hover:border-near-orange/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-near-orange sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
					aria-label="View screenshot: {shot.caption}"
				>
					<!-- Phone frame effect — centered vertically -->
					<div class="relative flex flex-1 flex-col justify-center overflow-hidden rounded-t-xl bg-near-bg">
						<!-- Notch bar -->
						<div class="flex h-5 items-center justify-center bg-near-dark">
							<div class="h-1.5 w-12 rounded-full bg-near-surface/20"></div>
						</div>
						<!-- Screenshot image -->
						<img
							src={shot.src}
							alt={shot.caption}
							class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
							loading="lazy"
						/>
						<!-- Zoom hint overlay -->
						<div
							class="absolute inset-0 flex items-center justify-center bg-near-black/0 transition-colors duration-200 group-hover:bg-near-black/10"
							aria-hidden="true"
						>
							<div class="rounded-full bg-white/90 p-1.5 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-near-text" aria-hidden="true">
									<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
									<line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
								</svg>
							</div>
						</div>
					</div>

					<!-- Caption footer -->
					<div class="px-3 py-2.5">
						{#if shot.partnerLogo}
							<div class="mb-1.5 flex items-center gap-1.5">
								<img src={shot.partnerLogo} alt={shot.partnerName} class="h-4 w-auto object-contain" />
								<span class="text-[10px] font-semibold text-near-text-secondary">{shot.partnerName}</span>
							</div>
						{:else}
							<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-near-orange">
								{shot.partnerName}
							</p>
						{/if}
						<p class="text-[11px] leading-snug text-near-text-secondary sm:text-xs line-clamp-2">{shot.caption}</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<!-- Lightbox -->
{#if lightboxOpen}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm"
		onclick={closeLightbox}
		onkeydown={(e) => e.key === 'Enter' && closeLightbox()}
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-label="Screenshot preview"
	>
		<button
			onclick={closeLightbox}
			class="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none"
			aria-label="Close preview"
		>
			<X size={20} />
		</button>

		{#if screenshots.length > 1}
			<button
				onclick={(e) => { e.stopPropagation(); prev(); }}
				class="absolute left-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none sm:left-6"
				aria-label="Previous screenshot"
			>
				<ChevronLeft size={22} />
			</button>
			<button
				onclick={(e) => { e.stopPropagation(); next(); }}
				class="absolute right-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none sm:right-6"
				aria-label="Next screenshot"
			>
				<ChevronRight size={22} />
			</button>
		{/if}

		{#key lightboxIndex}
			{@const shot = screenshots[lightboxIndex]}
			<div
				class="flex max-h-[85vh] max-w-[92vw] flex-col items-center gap-3"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.stopPropagation()}
				role="document"
				style="animation: lightboxIn 0.18s ease both"
			>
				<img
					src={shot.src}
					alt={shot.caption}
					class="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
				/>
				<div class="text-center">
					<p class="text-sm font-semibold text-white sm:text-base">{shot.caption}</p>
					<p class="mt-0.5 text-xs text-white/60">{shot.partnerName}</p>
				</div>
				{#if screenshots.length > 1}
					<div class="flex gap-1.5" aria-label="Screenshot {lightboxIndex + 1} of {screenshots.length}">
						{#each screenshots as _, i}
							<div
								class="h-1.5 rounded-full transition-all duration-200"
								style="width: {i === lightboxIndex ? '16px' : '6px'}; background-color: {i === lightboxIndex ? 'white' : 'rgba(255,255,255,0.3)'}"
							></div>
						{/each}
					</div>
				{/if}
			</div>
		{/key}
	</div>
{/if}

<style>
	@keyframes lightboxIn {
		from { opacity: 0; transform: scale(0.97); }
		to { opacity: 1; transform: scale(1); }
	}

	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
