<script lang="ts">
	interface Props {
		label: string;
		value: string;
		period?: string;
	}

	let { label, value, period }: Props = $props();
</script>

<div class="text-center">
	<div class="text-2xl font-bold text-near-green-dark sm:text-3xl">{value}</div>
	<div class="mt-1 text-sm text-near-light-gray">{label}</div>
	{#if period}
		<div class="text-xs text-near-gray-medium">{period}</div>
	{/if}
</div>
