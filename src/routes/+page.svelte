<script lang="ts">
	import StatsBar from '$lib/components/sections/StatsBar.svelte';
	import CaseStudyCarousel from '$lib/components/sections/CaseStudyCarousel.svelte';
	import ChainGrid from '$lib/components/sections/ChainGrid.svelte';
	import TickerBoard from '$lib/components/sections/TickerBoard.svelte';
	import UserTypeSelector from '$lib/components/sections/UserTypeSelector.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>NEAR Intents — Cross-Chain Integration Showcase</title>
	<meta name="description" content="See how teams use NEAR Intents to build cross-chain products. Case studies, use cases, and integration patterns." />
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28">
	<h1 class="text-3xl font-bold tracking-tight text-near-text sm:text-5xl lg:text-6xl">
		See how teams use
		<span class="text-near-green-dark">NEAR Intents</span>
	</h1>
</section>

<StatsBar />

{#if data.featuredCaseStudies.length > 0}
	<CaseStudyCarousel caseStudies={data.featuredCaseStudies} />
{/if}

<UserTypeSelector />

{#if data.tokens.length > 0}
	<TickerBoard tokens={data.tokens} assetChainMap={data.assetChainMap} />
{/if}

<ChainGrid liveChains={data.liveChains} chainAssetList={data.chainAssetList} />

<!-- CTA -->
<section class="border-t border-near-border bg-near-surface">
	<div class="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
		<h2 class="text-2xl font-bold text-near-text sm:text-3xl">Ready to integrate?</h2>
		<p class="mx-auto mt-3 max-w-xl text-sm text-near-text-secondary sm:mt-4 sm:text-base">
			Add cross-chain capabilities to your product. Widget integration takes a day. API integration takes a week.
		</p>
		<a
			href="https://docs.near-intents.org"
			target="_blank"
			rel="noopener noreferrer"
			class="mt-6 inline-block rounded-lg bg-near-green-dark px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-8"
		>
			Read the Docs
		</a>
	</div>
</section>
