<script lang="ts">
	import StatCard from '$lib/components/ui/StatCard.svelte';
	import { globalStats } from '$lib/data/stats';
</script>

<div class="border-b border-near-border bg-near-surface">
	<div class="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
		{#each globalStats as stat}
			<StatCard label={stat.label} value={stat.value} href={stat.href} />
		{/each}
	</div>
</div>
