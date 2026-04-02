<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'default' | 'green' | 'yellow' | 'blue';
		href?: string;
		children: Snippet;
	}

	let { variant = 'default', href, children }: Props = $props();

	const colors: Record<string, string> = {
		default: 'bg-gray-100 text-near-light-gray',
		green: 'bg-emerald-50 text-emerald-700',
		yellow: 'bg-amber-50 text-amber-700',
		blue: 'bg-blue-50 text-blue-700'
	};

	const classes = $derived(`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[variant]}`);
</script>

{#if href}
	<a {href} class="{classes} transition-opacity hover:opacity-80">
		{@render children()}
	</a>
{:else}
	<span class={classes}>
		{@render children()}
	</span>
{/if}
