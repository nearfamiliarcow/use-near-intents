<script lang="ts">
	import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-svelte';
	import type { CaseStudy } from '$lib/types';
	import { getUserType } from '$lib/data/user-types';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		caseStudies: CaseStudy[];
	}

	let { caseStudies }: Props = $props();

	let activeIndex = $state(0);
	let imgErrors = $state(new Set<string>());
	let interval: ReturnType<typeof setInterval> | null = null;

	const active = $derived(caseStudies[activeIndex]);
	const activeUserType = $derived(active ? getUserType(active.userType) : null);

	// Use coverImage for the carousel if available, fall back to first use-case screenshot
	const activeCoverImage = $derived(active?.coverImage ?? null);
	const activeScreenshots = $derived(
		activeCoverImage
			? [activeCoverImage]
			: active?.useCases
				.flatMap((uc) => uc.screenshots ?? [])
				.slice(0, 1) ?? []
	);

	function handleImgError(id: string) {
		imgErrors = new Set([...imgErrors, id]);
	}

	function next() {
		activeIndex = (activeIndex + 1) % caseStudies.length;
		resetAutoPlay();
	}

	function prev() {
		activeIndex = (activeIndex - 1 + caseStudies.length) % caseStudies.length;
		resetAutoPlay();
	}

	function goTo(i: number) {
		activeIndex = i;
		resetAutoPlay();
	}

	function resetAutoPlay() {
		if (interval) clearInterval(interval);
		interval = setInterval(next, 8000);
	}

	$effect(() => {
		interval = setInterval(next, 8000);
		return () => { if (interval) clearInterval(interval); };
	});
</script>

{#if caseStudies.length > 0 && active}
	<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
		<div class="mb-6 flex items-center justify-between sm:mb-8">
			<div>
				<h2 class="text-xl font-bold text-near-text sm:text-2xl">Case Studies</h2>
				<p class="mt-1 text-sm text-near-text-secondary">Real partners building with NEAR Intents</p>
			</div>
			<a href="/case-studies" class="text-sm font-medium text-near-green-dark hover:underline">View all →</a>
		</div>

		<div class="overflow-hidden rounded-2xl border border-near-border bg-near-surface shadow-sm">
			<div class="grid grid-cols-1 lg:grid-cols-2" style="grid-template-rows: 1fr">
				<!-- Left: Info -->
				<div class="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
					<div>
						<!-- Partner header -->
						<div class="mb-4 flex items-center gap-4 sm:mb-5">
							{#if active.logo && !imgErrors.has('logo-' + active.slug)}
								<img
									src={active.logo}
									alt="{active.name} logo"
									class="h-14 w-14 rounded-xl shadow-sm sm:h-16 sm:w-16"
									onerror={() => handleImgError('logo-' + active.slug)}
								/>
							{:else}
								<div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-lg font-bold text-near-light-gray sm:h-16 sm:w-16">
									{active.name.slice(0, 2)}
								</div>
							{/if}
							<div>
								<h3 class="text-xl font-bold text-near-text sm:text-2xl">{active.name}</h3>
							</div>
						</div>

						<p class="text-sm text-near-text-secondary leading-relaxed sm:text-base">{active.description}</p>

						<!-- Use cases this partner implements -->
						<div class="mt-5 space-y-2 sm:mt-6">
							{#each active.useCases.slice(0, 3) as uc}
								<div class="flex items-baseline gap-2.5">
									<div class="h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full bg-near-green-dark"></div>
									<a href="/use-cases/{uc.useCase}" class="text-sm text-near-text hover:text-near-green-dark">
										<span class="font-medium">{uc.useCase.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</span>
										<span class="text-near-text-secondary"> — {uc.summary.split('—')[0].split('.')[0]}</span>
									</a>
								</div>
							{/each}
						</div>
					</div>

					<div class="mt-6 sm:mt-8">
						<a
							href="/case-studies/{active.slug}"
							class="inline-flex items-center gap-2 rounded-lg bg-near-green-dark px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
						>
							Read full case study
							<ChevronRight size={16} />
						</a>
					</div>
				</div>

				<!-- Right: Screenshots — height constrained by left column -->
				<div class="flex items-center justify-center border-t border-near-border bg-near-bg p-6 sm:p-8 lg:border-l lg:border-t-0 lg:min-h-0 overflow-hidden">
					{#if activeScreenshots.length > 0}
						<div class="flex max-h-full {activeScreenshots.length === 1 ? 'items-center justify-center' : 'items-end gap-3 sm:gap-4 justify-center'}">
							{#each activeScreenshots as src, i}
								<a
									href="/case-studies/{active.slug}"
									class="overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] {activeScreenshots.length >= 3 ? 'max-w-[130px] sm:max-w-[160px]' : activeScreenshots.length === 2 ? 'max-w-[170px] sm:max-w-[200px]' : ''}"
								>
									<img
										{src}
										alt="{active.name} screenshot {i + 1}"
										class="h-auto w-full rounded-xl {activeScreenshots.length === 1 ? 'max-h-[400px] object-contain' : ''}"
									/>
								</a>
							{/each}
						</div>
					{:else if active.logo && !imgErrors.has('logo-big-' + active.slug)}
						<img
							src={active.logo}
							alt="{active.name}"
							class="h-32 w-32 rounded-2xl shadow-lg sm:h-40 sm:w-40"
							onerror={() => handleImgError('logo-big-' + active.slug)}
						/>
					{:else}
						<div class="flex h-40 w-40 items-center justify-center rounded-2xl bg-gray-100 text-3xl font-bold text-near-light-gray">
							{active.name.slice(0, 2)}
						</div>
					{/if}
				</div>
			</div>

			<!-- Navigation dots + arrows -->
			{#if caseStudies.length > 1}
				<div class="flex items-center justify-between border-t border-near-border px-6 py-3 sm:px-8">
					<button onclick={prev} class="rounded-full p-1.5 text-near-light-gray transition-colors hover:bg-gray-100 hover:text-near-text" aria-label="Previous">
						<ChevronLeft size={18} />
					</button>
					<div class="flex items-center gap-2">
						{#each caseStudies as _, i}
							<button
								onclick={() => goTo(i)}
								class="h-2 rounded-full transition-all {i === activeIndex ? 'w-6 bg-near-green-dark' : 'w-2 bg-gray-200 hover:bg-gray-300'}"
								aria-label="Go to case study {i + 1}"
							></button>
						{/each}
					</div>
					<button onclick={next} class="rounded-full p-1.5 text-near-light-gray transition-colors hover:bg-gray-100 hover:text-near-text" aria-label="Next">
						<ChevronRight size={18} />
					</button>
				</div>
			{/if}
		</div>
	</section>
{/if}
