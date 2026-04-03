<script lang="ts">
	import type { Metric } from '$lib/types';

	interface Props {
		metrics: Metric[];
		variant?: 'default' | 'compact';
	}

	let { metrics, variant = 'default' }: Props = $props();

	// Show up to 4 metrics for visual balance
	const displayed = $derived(metrics.slice(0, 4));
	const cols = $derived(displayed.length);
</script>

{#if variant === 'compact'}
	<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
		{#each displayed as metric, i}
			{#if i > 0}
				<span class="hidden text-near-border sm:inline">|</span>
			{/if}
			<div class="flex items-baseline gap-1.5">
				<span class="text-base font-bold text-near-orange">{metric.value}</span>
				<span class="text-xs text-near-text-secondary">{metric.label}</span>
			</div>
		{/each}
	</div>
{:else}
	<div
		class="grid gap-px overflow-hidden rounded-xl border border-near-border bg-near-border"
		class:grid-cols-2={cols <= 2}
		class:sm:grid-cols-2={cols <= 2}
		class:md:grid-cols-3={cols === 3}
		class:md:grid-cols-4={cols >= 4}
		style="grid-template-columns: repeat({Math.min(cols, 2)}, 1fr);"
	>
		{#each displayed as metric}
			<div class="bg-near-surface px-5 py-5 text-center sm:px-6 sm:py-6">
				<div class="text-2xl font-bold text-near-orange sm:text-3xl">{metric.value}</div>
				<div class="mt-1 text-sm text-near-text-secondary">{metric.label}</div>
				{#if metric.period}
					<div class="mt-0.5 text-xs text-near-gray-medium">{metric.period}</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	/* Override grid-template-columns for responsive breakpoints */
	@media (min-width: 768px) {
		.md\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; }
		.md\:grid-cols-4 { grid-template-columns: repeat(4, 1fr) !important; }
	}
</style>
