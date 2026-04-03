<script lang="ts">
	import type { Metric } from '$lib/types';

	interface Props {
		/** Label shown above the metrics, e.g. "Proven by ZODL" */
		label?: string;
		/** Link href for the label (e.g. case study URL) */
		labelHref?: string;
		metrics: Metric[];
	}

	let { label, labelHref, metrics }: Props = $props();
</script>

<div class="rounded-xl border border-near-orange/25 bg-gradient-to-br from-near-orange-light to-near-bg p-5 sm:p-6">
	{#if label}
		<div class="mb-4 flex items-center gap-2">
			<span class="h-1.5 w-1.5 rounded-full bg-near-orange"></span>
			{#if labelHref}
				<a
					href={labelHref}
					class="text-xs font-semibold text-near-orange underline-offset-2 hover:underline"
				>
					{label}
				</a>
			{:else}
				<span class="text-xs font-semibold text-near-orange">{label}</span>
			{/if}
		</div>
	{/if}

	<div class="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-near-orange/20">
		{#each metrics as metric, i}
			<div class="flex flex-col items-center sm:px-4 {i === 0 ? 'sm:pl-0' : ''}">
				<span class="text-2xl font-bold text-near-orange sm:text-3xl">{metric.value}</span>
				<span class="mt-0.5 text-center text-xs text-near-text-secondary">{metric.label}</span>
				{#if metric.period}
					<span class="mt-0.5 text-center text-[10px] text-near-gray-medium">{metric.period}</span>
				{/if}
			</div>
		{/each}
	</div>
</div>
