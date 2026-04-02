<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { userTypes } from '$lib/data/user-types';
	import CaseStudyCard from '$lib/components/content/CaseStudyCard.svelte';
	import FilterBar from '$lib/components/ui/FilterBar.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedUserType = $derived($page.url.searchParams.get('userType') ?? '');

	const filtered = $derived(
		selectedUserType
			? data.caseStudies.filter((cs) => cs.userType === selectedUserType)
			: data.caseStudies
	);

	function onFilterSelect(slug: string) {
		const url = new URL($page.url);
		if (slug) {
			url.searchParams.set('userType', slug);
		} else {
			url.searchParams.delete('userType');
		}
		goto(url.toString(), { replaceState: true, noScroll: true });
	}
</script>

<svelte:head>
	<title>Case Studies — NEAR Intents</title>
	<meta name="description" content="Real partners building with NEAR Intents. See how wallets, chains, DEXes, and more integrate cross-chain capabilities." />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
	<h1 class="text-2xl font-bold text-near-text sm:text-3xl lg:text-4xl">Case Studies</h1>
	<p class="mt-2 text-sm text-near-text-secondary sm:text-base">Real partners building with NEAR Intents</p>

	<div class="mt-6 sm:mt-8">
		<FilterBar
			label="Filter by type"
			options={userTypes.map((ut) => ({ slug: ut.slug, name: ut.name }))}
			selected={selectedUserType}
			onSelect={onFilterSelect}
		/>
	</div>

	<div class="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
		{#each filtered as cs (cs.slug)}
			<CaseStudyCard caseStudy={cs} />
		{:else}
			<p class="col-span-2 py-12 text-center text-near-gray-medium">No case studies match this filter yet.</p>
		{/each}
	</div>
</div>
