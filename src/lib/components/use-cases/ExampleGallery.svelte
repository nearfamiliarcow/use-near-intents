<script lang="ts">
	import { X, ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Example {
		src: string;
		caption: string;
		source: string;
	}

	interface Props {
		examples: Example[];
	}

	let { examples }: Props = $props();

	let lightboxOpen = $state(false);
	let lightboxIndex = $state(0);

	function open(i: number) {
		lightboxIndex = i;
		lightboxOpen = true;
	}

	function close() {
		lightboxOpen = false;
	}

	function prev() {
		lightboxIndex = (lightboxIndex - 1 + examples.length) % examples.length;
	}

	function next() {
		lightboxIndex = (lightboxIndex + 1) % examples.length;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div>
	<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">Examples</h2>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each examples as example, i}
			<button
				onclick={() => open(i)}
				class="group overflow-hidden rounded-xl border border-near-border bg-near-surface shadow-sm transition-all hover:border-near-orange/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-near-orange"
				aria-label="View: {example.caption}"
			>
				<div class="relative overflow-hidden bg-near-bg">
					<img
						src={example.src}
						alt={example.caption}
						class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
						loading="lazy"
					/>
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
				<div class="px-3 py-2.5">
					<p class="text-[10px] font-semibold uppercase tracking-wider text-near-orange">{example.source}</p>
					<p class="mt-0.5 text-[11px] leading-snug text-near-text-secondary sm:text-xs line-clamp-2">{example.caption}</p>
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- Lightbox -->
{#if lightboxOpen}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm"
		onclick={close}
		onkeydown={(e) => e.key === 'Enter' && close()}
		role="dialog"
		tabindex="-1"
		aria-modal="true"
		aria-label="Screenshot preview"
	>
		<button
			onclick={close}
			class="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none"
			aria-label="Close preview"
		>
			<X size={20} />
		</button>

		{#if examples.length > 1}
			<button
				onclick={(e) => { e.stopPropagation(); prev(); }}
				class="absolute left-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none sm:left-6"
				aria-label="Previous"
			>
				<ChevronLeft size={22} />
			</button>
			<button
				onclick={(e) => { e.stopPropagation(); next(); }}
				class="absolute right-3 z-10 rounded-full bg-black/50 p-2.5 text-white transition-colors hover:bg-black/70 focus:outline-none sm:right-6"
				aria-label="Next"
			>
				<ChevronRight size={22} />
			</button>
		{/if}

		{#key lightboxIndex}
			{@const ex = examples[lightboxIndex]}
			<div
				class="flex max-h-[85vh] max-w-[92vw] flex-col items-center gap-3"
				onclick={(e) => e.stopPropagation()}
				onkeydown={(e) => e.stopPropagation()}
				role="document"
				style="animation: galleryIn 0.18s ease both"
			>
				<img
					src={ex.src}
					alt={ex.caption}
					class="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
				/>
				<div class="text-center">
					<p class="text-sm font-semibold text-white sm:text-base">{ex.caption}</p>
					<p class="mt-0.5 text-xs text-white/60">{ex.source}</p>
				</div>
				{#if examples.length > 1}
					<div class="flex gap-1.5" aria-label="Image {lightboxIndex + 1} of {examples.length}">
						{#each examples as _, i}
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
	@keyframes galleryIn {
		from { opacity: 0; transform: scale(0.97); }
		to { opacity: 1; transform: scale(1); }
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
