<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<meta property="og:site_name" content="NEAR Intents" />
	<meta property="og:image" content="/logos/NEAR_Intents_Logo_Primary_Black.svg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 pt-16">
		{@render children()}
	</main>
	<Footer />
</div>
