<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { getUserStoriesForUserType } from '$lib/content';
	import { ExternalLink } from 'lucide-svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import FlowArrows from '$lib/components/ui/FlowArrows.svelte';
	import FlowLogoArrows from '$lib/components/ui/FlowLogoArrows.svelte';
	import UserStoryFlow from '$lib/components/content/UserStoryFlow.svelte';
	import HowItWorks from '$lib/components/use-cases/HowItWorks.svelte';
	// Visual hero components — each has genuinely different UX, kept separate
	import SwapVisualHero from '$lib/components/use-cases/SwapVisualHero.svelte';
	import CrossPayVisualHero from '$lib/components/use-cases/CrossPayVisualHero.svelte';
	import OnboardingVisualHero from '$lib/components/use-cases/OnboardingVisualHero.svelte';
	import BridgingVisualHero from '$lib/components/use-cases/BridgingVisualHero.svelte';
	import PartnerScreenshots from '$lib/components/use-cases/PartnerScreenshots.svelte';
	import type { PageData } from './$types';
	import type { Component } from 'svelte';

	let { data }: { data: PageData } = $props();

	let userTypeFilter = $derived($page.url.searchParams.get('userType') ?? '');

	const userStories = $derived(getUserStoriesForUserType(data.useCase, userTypeFilter));
	const filteredCaseStudies = $derived(
		userTypeFilter
			? data.caseStudies.filter((cs) => cs.userType === userTypeFilter)
			: data.caseStudies
	);

	// Map demoComponent string → visual hero component
	const heroComponentMap: Record<string, Component> = {
		SwapDemo: SwapVisualHero,
		CrossPayDemo: CrossPayVisualHero,
		OnboardingDemo: OnboardingVisualHero,
		BridgingDemo: BridgingVisualHero
	};

	const VisualHero = $derived(
		data.useCase.demoComponent ? (heroComponentMap[data.useCase.demoComponent] ?? null) : null
	);

	// Whether this use case has an enhanced visual layout
	const isVisualUseCase = $derived(VisualHero !== null);

	// Build screenshot list: use case-level screenshots first, then case study screenshots
	const partnerScreenshots = $derived([
		...(data.useCase.screenshots ?? []).map((s) => ({
			src: s.src,
			caption: s.caption,
			partnerName: s.source,
			partnerLogo: '',
			partnerSlug: ''
		})),
		...data.caseStudies.flatMap((cs) => {
			const joinData = cs.joinData;
			if (!joinData.screenshots || joinData.screenshots.length === 0) return [];
			const useCaseSrcs = new Set((data.useCase.screenshots ?? []).map((s) => s.src));
			return joinData.screenshots
				.map((src, i) => ({
					src,
					caption: joinData.captions?.[i] ?? '',
					partnerName: cs.name,
					partnerLogo: cs.logo,
					partnerSlug: cs.slug
				}))
				.filter((s) => !useCaseSrcs.has(s.src));
		})
	]);
</script>

<svelte:head>
	<title>{data.useCase.name} — NEAR Intents Use Case</title>
	<meta name="description" content={data.useCase.tagline} />
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

	<!-- ================================================================
	     VISUAL LAYOUT — use cases with a demoComponent hero
	     ================================================================ -->
	{#if isVisualUseCase}

		<!-- Back button -->
		<a
			href="{base}/use-cases{userTypeFilter ? `?userType=${userTypeFilter}` : ''}"
			class="mb-4 inline-flex items-center gap-1.5 text-sm text-near-text-secondary transition-colors hover:text-near-text sm:mb-6"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Use Cases
		</a>

		<!-- Page title + tagline -->
		<div class="mb-6 sm:mb-8">
			<h1 class="text-2xl font-bold text-near-text sm:text-3xl lg:text-4xl">{data.useCase.name}</h1>
			<p class="mt-2 text-base text-near-text-secondary sm:mt-3 sm:text-lg">{data.useCase.tagline}</p>
		</div>

		<!-- Visual hero -->
		<section class="mb-8 sm:mb-12" aria-label="What {data.useCase.name} looks like">
			<VisualHero />
		</section>

		<!-- How it works -->
		{#if data.useCase.howItWorksSteps && data.useCase.howItWorksSteps.length > 0}
			<section class="mb-8 sm:mb-12">
				<HowItWorks steps={data.useCase.howItWorksSteps} />
			</section>
		{/if}

		<!-- Extended content (markdown body) -->
		{#if data.useCase.content}
			<section class="prose mb-8 max-w-none sm:mb-12">
				{@html data.useCase.content}
			</section>
		{/if}

		<!-- Partner screenshots -->
		{#if partnerScreenshots.length > 0}
			<section class="mb-8 sm:mb-12">
				<PartnerScreenshots screenshots={partnerScreenshots} />
			</section>
		{/if}

		<!-- Case studies -->
		{#if filteredCaseStudies.length > 0}
			<section class="mb-8 sm:mb-12">
				<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">
					Case Studies: {data.useCase.name}
				</h2>
				<div class="space-y-3 sm:space-y-4">
					{#each filteredCaseStudies as cs}
						<Card href="{base}/case-studies/{cs.slug}">
							<div class="flex items-start justify-between gap-3">
								<div class="flex min-w-0 flex-1 items-center gap-3">
									{#if cs.logo}
										<img
											src={cs.logo}
											alt="{cs.name} logo"
											class="h-8 w-8 shrink-0 rounded-lg object-contain"
										/>
									{/if}
									<div class="min-w-0">
										<h3 class="text-base font-semibold text-near-text sm:text-lg">{cs.name}</h3>
										<p class="mt-0.5 text-sm text-near-text-secondary">{cs.joinData.summary}</p>
									</div>
								</div>
								<Badge variant="green">{cs.status}</Badge>
							</div>
							{#if cs.joinData.logoFlow}
								<div class="mt-4 border-t border-near-border pt-4">
									<FlowLogoArrows
										from={cs.joinData.logoFlow.from.assets}
										to={cs.joinData.logoFlow.to.assets}
										toMore={cs.joinData.logoFlow.to.moreCount ?? 0}
									/>
								</div>
							{:else if cs.joinData.flow && cs.joinData.flow.length > 0}
								<div class="mt-3">
									<FlowArrows steps={cs.joinData.flow} />
								</div>
							{/if}
						</Card>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Featured partners -->
		{#if data.useCase.featuredPartners && data.useCase.featuredPartners.length > 0}
			<section class="mb-8 sm:mb-12">
				{#if filteredCaseStudies.length === 0}
					<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">
						Case Studies: {data.useCase.name}
					</h2>
				{:else}
					<h3 class="mb-4 text-base font-semibold text-near-text sm:text-lg">{data.useCase.name} are also used by</h3>
				{/if}
				<div class="flex flex-wrap gap-3 sm:gap-4">
					{#each data.useCase.featuredPartners as partner}
						<a
							href={partner.url ?? '#'}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center gap-2.5 rounded-lg border border-near-border bg-near-surface px-4 py-2.5 shadow-sm transition-all hover:border-near-green/40 hover:shadow-md"
						>
							{#if partner.logo}
								<img
									src={partner.logo}
									alt="{partner.name} logo"
									class="h-6 w-6 shrink-0 rounded object-contain"
								/>
							{/if}
							<span class="text-sm font-semibold text-near-text">{partner.name}</span>
							<ExternalLink size={12} class="shrink-0 text-near-gray-medium" />
						</a>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Revenue model -->
		{#if data.useCase.revenueModel.feeStructure}
			<section class="mb-8 sm:mb-12">
				<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">Revenue model</h2>
				<Card>
					<p class="text-sm font-medium text-near-gray-medium">Fee Structure</p>
					<p class="mt-1 text-sm text-near-text sm:text-base">{data.useCase.revenueModel.feeStructure}</p>
				</Card>
			</section>
		{/if}

	<!-- ================================================================
	     DEFAULT LAYOUT — use cases without a visual hero
	     ================================================================ -->
	{:else}

		<!-- Back button -->
		<a
			href="{base}/use-cases{userTypeFilter ? `?userType=${userTypeFilter}` : ''}"
			class="mb-4 inline-flex items-center gap-1.5 text-sm text-near-text-secondary transition-colors hover:text-near-text sm:mb-6"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Use Cases
		</a>

		<!-- Hero -->
		<div class="mb-6 sm:mb-8">
			<h1 class="text-2xl font-bold text-near-text sm:text-3xl lg:text-4xl">{data.useCase.name}</h1>
			<p class="mt-2 text-base text-near-text-secondary sm:mt-3 sm:text-lg">{data.useCase.tagline}</p>
		</div>

		<!-- Extended content -->
		{#if data.useCase.content}
			<section class="prose mb-8 max-w-none sm:mb-12">
				{@html data.useCase.content}
			</section>
		{/if}

		<!-- User Stories -->
		{#if userStories.length > 0}
			<section class="mb-8 sm:mb-12">
				<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">User Stories</h2>
				<div class="space-y-4 sm:space-y-6">
					{#each userStories as story}
						<UserStoryFlow {story} />
					{/each}
				</div>
			</section>
		{/if}

		<!-- Case Studies -->
		{#if filteredCaseStudies.length > 0}
			<section class="mb-8 sm:mb-12">
				<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">Partners Using {data.useCase.name}</h2>
				<div class="space-y-3 sm:space-y-4">
					{#each filteredCaseStudies as cs}
						<Card href="{base}/case-studies/{cs.slug}">
							<div class="flex items-start justify-between gap-3">
								<div class="min-w-0 flex-1">
									<h3 class="text-base font-semibold text-near-text sm:text-lg">{cs.name}</h3>
									<p class="mt-1 text-sm text-near-text-secondary">{cs.joinData.summary}</p>
								</div>
								<Badge variant="green">{cs.status}</Badge>
							</div>
							{#if cs.joinData.flow && cs.joinData.flow.length > 0}
								<div class="mt-3">
									<FlowArrows steps={cs.joinData.flow} />
								</div>
							{/if}
						</Card>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Revenue Model -->
		{#if data.useCase.revenueModel.feeStructure}
			<section class="mb-8 sm:mb-12">
				<h2 class="mb-4 text-lg font-bold text-near-text sm:mb-6 sm:text-xl">Revenue Model</h2>
				<Card>
					<div class="grid grid-cols-1 gap-4 {data.useCase.revenueModel.revShare ? 'sm:grid-cols-2' : ''}">
						<div>
							<p class="text-sm font-medium text-near-gray-medium">Fee Structure</p>
							<p class="mt-1 text-sm text-near-text sm:text-base">{data.useCase.revenueModel.feeStructure}</p>
						</div>
						{#if data.useCase.revenueModel.revShare}
							<div>
								<p class="text-sm font-medium text-near-gray-medium">Revenue Share</p>
								<p class="mt-1 text-sm text-near-text sm:text-base">{data.useCase.revenueModel.revShare}</p>
							</div>
						{/if}
					</div>
				</Card>
			</section>
		{/if}

	{/if}

	<!-- ================================================================
	     CTA — shared by all use cases
	     ================================================================ -->
	<section class="rounded-xl border border-near-border bg-near-surface p-6 text-center shadow-sm sm:p-8">
		<h2 class="text-xl font-bold text-near-text sm:text-2xl">Add {data.useCase.name} to your product</h2>
		<p class="mx-auto mt-2 max-w-lg text-sm text-near-text-secondary sm:mt-3 sm:text-base">
			Integration is straightforward — widget takes a day, API takes a week.
		</p>
		<a
			href="https://docs.near-intents.org"
			target="_blank"
			rel="noopener noreferrer"
			class="mt-5 inline-block rounded-lg bg-near-green-dark px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-6"
		>
			Read the Integration Docs
		</a>
	</section>
</div>
