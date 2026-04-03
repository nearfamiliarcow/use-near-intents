<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href?: string;
		class?: string;
		children: Snippet;
	}

	let { href, class: className = '', children }: Props = $props();
</script>

{#if href}
	<a
		{href}
		class="block rounded-xl border border-near-border bg-near-surface p-5 shadow-sm transition-all hover:border-near-orange/40 hover:shadow-md sm:p-6 {className}"
	>
		{@render children()}
	</a>
{:else}
	<div class="rounded-xl border border-near-border bg-near-surface p-5 shadow-sm sm:p-6 {className}">
		{@render children()}
	</div>
{/if}
