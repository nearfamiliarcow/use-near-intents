<script lang="ts">
	import { base } from '$app/paths';
	import { getUserType } from '$lib/data/user-types';
	import { getChain } from '$lib/data/chains';
	import { ExternalLink, ArrowRight } from 'lucide-svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import FlowArrows from '$lib/components/ui/FlowArrows.svelte';
	import FlowLogoArrows from '$lib/components/ui/FlowLogoArrows.svelte';
	import ZoomableImage from '$lib/components/ui/ZoomableImage.svelte';
	import CaseStudyCard from '$lib/components/content/CaseStudyCard.svelte';
	import StoryBeats from '$lib/components/ui/StoryBeats.svelte';
	import UseCaseProofBar from '$lib/components/use-cases/UseCaseProofBar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const caseStudy = $derived(data.caseStudy);
	const resolvedUseCases = $derived(data.resolvedUseCases);
	const related = $derived(data.related);
	const userType = $derived(getUserType(caseStudy.userType));
	let imgErrors = $state(new Set<string>());

	function handleImgError(id: string) {
		imgErrors = new Set([...imgErrors, id]);
	}

	const statusVariant = {
		live: 'green' as const,
		building: 'yellow' as const,
		opportunity: 'blue' as const
	};

	// Use case icon placeholder colors
	const useCaseColors: Record<string, string> = {
		'cross-chain-swaps': 'bg-blue-50 text-blue-600 border-blue-200',
		'cross-pay': 'bg-purple-50 text-purple-600 border-purple-200',
		'asset-onboarding': 'bg-emerald-50 text-emerald-600 border-emerald-200',
		'cross-chain-custody': 'bg-amber-50 text-amber-600 border-amber-200',
		'chain-integration': 'bg-indigo-50 text-indigo-600 border-indigo-200'
	};
</script>

<svelte:head>
	<title>{caseStudy.name} — NEAR Intents Case Study</title>
	<meta name="description" content={caseStudy.description} />
</svelte:head>

<!-- ============================================================ -->
<!-- HERO: Partner identity + key info                            -->
<!-- ============================================================ -->
<section class="border-b border-near-border bg-near-surface">
	<div class="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
		<div class="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
			<!-- Partner logo -->
			{#if caseStudy.logo && !imgErrors.has('logo')}
				<img
					src={caseStudy.logo}
					alt="{caseStudy.name} logo"
					class="h-20 w-20 rounded-2xl shadow-md sm:h-24 sm:w-24"
					onerror={() => handleImgError('logo')}
				/>
			{:else}
				<div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-2xl font-bold text-near-light-gray sm:h-24 sm:w-24">
					{caseStudy.name.slice(0, 2)}
				</div>
			{/if}

			<div class="flex-1">
				<!-- Badges -->
				<div class="mb-2 flex flex-wrap items-center gap-2">
					{#if userType}
						<Badge variant="green" href="{base}/case-studies?userType={caseStudy.userType}">{userType.name}</Badge>
					{/if}
					{#each caseStudy.chains as chainSlug}
						{@const chain = getChain(chainSlug)}
						{#if chain}
							<Badge>{chain.name}</Badge>
						{/if}
					{/each}
				</div>

				<h1 class="text-2xl font-bold text-near-text sm:text-3xl lg:text-4xl">{caseStudy.name}</h1>
				<p class="mt-2 text-base text-near-text-secondary sm:text-lg">{caseStudy.description}</p>

				<!-- Visit partner link -->
				{#if caseStudy.url}
					<a
						href={caseStudy.url}
						target="_blank"
						rel="noopener noreferrer"
						class="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-near-orange transition-colors hover:underline sm:mt-4"
					>
						Visit {caseStudy.name}
						<ExternalLink size={14} />
					</a>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- ============================================================ -->
<!-- STORY BEATS: Scannable narrative                              -->
<!-- ============================================================ -->
{#if caseStudy.storyBeats && caseStudy.storyBeats.length > 0}
	<div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
		<StoryBeats beats={caseStudy.storyBeats} />
	</div>
{/if}

<!-- ============================================================ -->
<!-- METRICS: Key proof points at a glance                         -->
<!-- ============================================================ -->
{#if caseStudy.metrics && caseStudy.metrics.length > 0}
	<div class="mx-auto max-w-5xl px-4 pb-2 sm:px-6 lg:px-8">
		<UseCaseProofBar metrics={caseStudy.metrics} />
	</div>
{/if}

<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

	<!-- ============================================================ -->
	<!-- USE CASES: Visual cards for each integration                  -->
	<!-- ============================================================ -->
	<section class="py-10 sm:py-14">
		<h2 class="mb-2 text-xl font-bold text-near-text sm:text-2xl">How {caseStudy.name} Uses NEAR Intents</h2>
		<p class="mb-8 text-sm text-near-text-secondary sm:text-base">
			{caseStudy.name} integrates {resolvedUseCases.length} use case{resolvedUseCases.length === 1 ? '' : 's'} to deliver a cross-chain experience
		</p>

		<div class="space-y-6 sm:space-y-8">
			{#each resolvedUseCases as join, i}
				{@const colorClass = useCaseColors[join.useCase] ?? 'bg-gray-50 text-gray-600 border-gray-200'}
				<div class="overflow-hidden rounded-xl border border-near-border bg-near-surface shadow-sm">
					<!-- Use case header -->
					<div class="flex items-center gap-3 border-b border-near-border px-5 py-4 sm:px-6">
						<!-- TODO: Replace with custom use case icon -->
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border {colorClass}">
							<span class="text-sm font-bold">{i + 1}</span>
						</div>
						<div class="flex-1">
							<h3 class="text-base font-semibold text-near-text sm:text-lg">{join.resolved?.name ?? join.useCase}</h3>
						</div>
						<a href="{base}/use-cases/{join.useCase}" class="text-xs font-medium text-near-orange hover:underline sm:text-sm">
							Learn more →
						</a>
					</div>

					<div class="grid grid-cols-1 gap-0 lg:grid-cols-2">
						<!-- Left: Description + flow -->
						<div class="p-5 sm:p-6">
							<p class="text-sm text-near-text-secondary leading-relaxed sm:text-base">{join.summary}</p>

							{#if join.logoFlow}
								<div class="mt-4 sm:mt-5">
									<p class="mb-2 text-xs font-medium uppercase tracking-wider text-near-gray-medium">How it flows</p>
									<FlowLogoArrows
										from={join.logoFlow.from.assets}
										to={join.logoFlow.to.assets}
										fromMore={join.logoFlow.from.moreCount ?? 0}
										toMore={join.logoFlow.to.moreCount ?? 0}
										fromLabel={join.logoFlow.fromLabel}
										toLabel={join.logoFlow.toLabel}
									/>
								</div>
							{:else if join.flow && join.flow.length > 0}
								<div class="mt-4 sm:mt-5">
									<p class="mb-2 text-xs font-medium uppercase tracking-wider text-near-gray-medium">How it flows</p>
									<FlowArrows steps={join.flow} />
								</div>
							{/if}

							<!-- Before/after comparison — only shown when transformation data exists -->
							{#if caseStudy.transformation}
								<div class="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
									<div class="rounded-lg border border-near-orange/20 bg-near-orange-light p-3 sm:p-4">
										<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-near-orange sm:text-xs">With NEAR Intents</p>
										<p class="text-xs font-semibold text-near-dark sm:text-sm">{caseStudy.transformation.after.headline}</p>
										<p class="mt-1 text-xs text-near-dark/80 sm:text-sm">{caseStudy.transformation.after.body}</p>
									</div>
									<div class="rounded-lg border border-red-100 bg-red-50 p-3 sm:p-4">
										<p class="mb-1 text-[10px] font-semibold uppercase tracking-wider text-red-500 sm:text-xs">Before</p>
										<p class="text-xs font-semibold text-red-800 sm:text-sm">{caseStudy.transformation.before.headline}</p>
										<p class="mt-1 text-xs text-red-700/80 sm:text-sm">{caseStudy.transformation.before.body}</p>
									</div>
								</div>
							{/if}
						</div>

						<!-- Right: Screenshots or placeholder -->
						<div class="flex items-center justify-center border-t border-near-border bg-near-bg p-4 sm:p-6 lg:border-l lg:border-t-0">
							{#if join.screenshots && join.screenshots.length > 0}
								<div class="flex w-full {join.screenshots.length > 1 ? 'items-end gap-3 sm:gap-4' : 'items-center justify-center'}">
									{#each join.screenshots as src, si}
										{@const caption = join.captions?.[si] ?? `${join.resolved?.name ?? join.useCase} — Step ${si + 1}`}
										<ZoomableImage
											{src}
											alt="{caseStudy.name} — {caption}"
											{caption}
											class="overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] {join.screenshots.length >= 3 ? 'max-w-[140px] sm:max-w-[160px]' : join.screenshots.length === 2 ? 'max-w-[180px] sm:max-w-[200px]' : 'max-w-full'}"
										/>
									{/each}
								</div>
							{:else if join.screenshot}
								<ZoomableImage
									src={join.screenshot}
									alt="{caseStudy.name} — {join.resolved?.name ?? join.useCase}"
									caption="{caseStudy.name} · {join.resolved?.name ?? join.useCase}"
									class="overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02] max-w-full"
								/>
							{:else}
								<!-- Placeholder -->
								<div class="flex h-48 w-full max-w-[240px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-near-border text-center sm:h-56">
									<div class="mb-2 text-3xl text-near-gray-medium">📱</div>
									<p class="text-xs font-medium text-near-gray-medium sm:text-sm">Screenshot coming soon</p>
									<p class="mt-1 text-[10px] text-near-gray-medium sm:text-xs">{join.resolved?.name ?? join.useCase}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>


	<!-- ============================================================ -->
	<!-- RELATED: Other case studies                                   -->
	<!-- ============================================================ -->
	{#if related.sameUserType.length > 0}
		<section class="border-t border-near-border py-10 sm:py-14">
			<h2 class="mb-6 text-xl font-bold text-near-text sm:text-2xl">
				Other {userType?.name ?? ''} Partners
			</h2>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
				{#each related.sameUserType as cs}
					<CaseStudyCard caseStudy={cs} />
				{/each}
			</div>
		</section>
	{/if}


	<!-- ============================================================ -->
	<!-- CTA                                                           -->
	<!-- ============================================================ -->
	<section class="border-t border-near-border py-10 sm:py-14">
		<div class="rounded-xl border border-near-border bg-near-surface p-6 text-center shadow-sm sm:p-10">
			<h2 class="text-xl font-bold text-near-text sm:text-2xl">Build something like {caseStudy.name}?</h2>
			<p class="mx-auto mt-2 max-w-lg text-sm text-near-text-secondary sm:mt-3 sm:text-base">
				See how NEAR Intents can power cross-chain capabilities in your product.
			</p>
			<div class="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-6 sm:flex-row sm:gap-4">
				<a
					href="{base}/use-cases"
					class="w-full rounded-lg bg-near-orange px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
				>
					Explore Use Cases
				</a>
				<a
					href="https://docs.near-intents.org"
					target="_blank"
					rel="noopener noreferrer"
					class="w-full rounded-lg border border-near-border px-6 py-3 text-sm font-semibold text-near-text transition-colors hover:border-near-orange hover:text-near-orange sm:w-auto"
				>
					Read the Docs
				</a>
			</div>
		</div>
	</section>
</div>
