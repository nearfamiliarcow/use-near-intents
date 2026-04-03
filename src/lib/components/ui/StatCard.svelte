<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	interface Props {
		label: string;
		value: string;
		period?: string;
		href?: string;
	}

	let { label, value, period, href }: Props = $props();
</script>

{#if href}
	<a {href} target="_blank" rel="noopener noreferrer" class="group block text-center transition-opacity hover:opacity-80">
		<div class="text-2xl font-bold text-near-orange sm:text-3xl">{value}</div>
		<div class="mt-1 flex items-center justify-center gap-1 text-sm text-near-light-gray">
			{label}
			<ExternalLink size={12} class="shrink-0 text-near-gray-medium group-hover:text-near-orange" />
		</div>
		{#if period}
			<div class="text-xs text-near-gray-medium">{period}</div>
		{/if}
	</a>
{:else}
	<div class="text-center">
		<div class="text-2xl font-bold text-near-orange sm:text-3xl">{value}</div>
		<div class="mt-1 text-sm text-near-light-gray">{label}</div>
		{#if period}
			<div class="text-xs text-near-gray-medium">{period}</div>
		{/if}
	</div>
{/if}
