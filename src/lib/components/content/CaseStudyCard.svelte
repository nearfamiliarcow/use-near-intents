<script lang="ts">
	import { base } from '$app/paths';
	import type { CaseStudy } from '$lib/types';
	import { getUserType } from '$lib/data/user-types';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	interface Props {
		caseStudy: CaseStudy;
	}

	let { caseStudy }: Props = $props();

	const userType = $derived(getUserType(caseStudy.userType));

</script>

<Card href="{base}/case-studies/{caseStudy.slug}">
	<div class="flex items-start gap-3">
		{#if caseStudy.logo}
			<img
				src={caseStudy.logo}
				alt="{caseStudy.name} logo"
				class="h-10 w-10 shrink-0 rounded-lg object-contain"
			/>
		{/if}
		<div class="min-w-0 flex-1">
			<div class="flex items-center gap-2">
				<h3 class="text-base font-semibold text-near-text sm:text-lg">{caseStudy.name}</h3>
				{#if userType}
					<Badge variant="green">{userType.name}</Badge>
				{/if}
			</div>
			<p class="mt-1 text-sm text-near-text-secondary">{caseStudy.description}</p>
		</div>
	</div>
	{#if caseStudy.useCases.length > 0}
		<div class="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
			{#each caseStudy.useCases as uc}
				<Badge variant="blue">{uc.useCase.replace(/-/g, ' ')}</Badge>
			{/each}
		</div>
	{/if}
</Card>
