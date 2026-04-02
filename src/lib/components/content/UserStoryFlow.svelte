<script lang="ts">
	import type { UserStory } from '$lib/types';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		story: UserStory;
	}

	let { story }: Props = $props();
</script>

<Card>
	<div class="mb-3 sm:mb-4">
		<span class="text-sm font-semibold text-near-green-dark">{story.persona}</span>
		<span class="text-sm text-near-text-secondary"> — {story.context}</span>
		{#if story.app}
			<span class="text-sm text-near-text-secondary"> using <strong class="text-near-text">{story.app}</strong></span>
		{/if}
	</div>

	<!-- Steps -->
	<ol class="space-y-2.5 sm:space-y-3">
		{#each story.steps as step, i}
			<li class="flex items-start gap-2.5 sm:gap-3">
				<span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-near-green-light text-[10px] font-bold text-near-green-dark sm:h-6 sm:w-6 sm:text-xs">
					{i + 1}
				</span>
				<span class="text-sm text-near-text">{step}</span>
			</li>
		{/each}
	</ol>

	<!-- Without comparison -->
	{#if story.without}
		<div class="mt-4 rounded-lg border border-red-100 bg-red-50 p-3 sm:mt-6 sm:p-4">
			<p class="text-[10px] font-semibold uppercase tracking-wider text-red-600 sm:text-xs">Without NEAR Intents</p>
			<p class="mt-1 text-xs text-red-700/80 sm:text-sm">{story.without}</p>
		</div>
	{/if}
</Card>
