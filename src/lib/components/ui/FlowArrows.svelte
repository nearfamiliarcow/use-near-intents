<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		steps: string[];
	}

	let { steps }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-1.5 text-sm sm:gap-2">
	{#each steps as step, i}
		<span class="rounded-lg bg-near-bg px-2 py-1 text-xs font-medium text-near-text sm:px-3 sm:text-sm">{step}</span>
		{#if i < steps.length - 1}
			<ArrowRight size={14} class="shrink-0 text-near-green-dark" />
		{/if}
	{/each}
</div>
