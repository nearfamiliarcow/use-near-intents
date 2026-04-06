<script lang="ts">
	import CaseStudyCard from '$lib/components/content/CaseStudyCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Case Studies — NEAR Intents</title>
	<meta name="description" content="Real partners building with NEAR Intents. See how wallets, chains, DEXes, and more integrate cross-chain capabilities." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="text-2xl font-bold text-near-text sm:text-3xl lg:text-4xl">Case Studies</h1>
	<p class="mt-2 text-sm text-near-text-secondary sm:text-base">Real partners building with NEAR Intents</p>

	<div class="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
		{#each data.caseStudies as cs (cs.slug)}
			<CaseStudyCard caseStudy={cs} />
		{/each}
	</div>
</div>
