<script lang="ts">
	import { base } from '$app/paths';
	import { userTypes } from '$lib/data/user-types';
	import Card from '$lib/components/ui/Card.svelte';

	const featured = userTypes.filter((ut) =>
		['single-chain-wallet', 'multi-chain-wallet', 'ai-agent', 'payment-app'].includes(ut.slug)
	);
</script>

<section class="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
	<h2 class="mb-2 text-center text-xl font-bold text-near-text sm:text-2xl">What are you building?</h2>
	<p class="mb-6 text-center text-sm text-near-light-gray sm:mb-8 sm:text-base">See use cases tailored to your product</p>
	<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each featured as ut}
			<Card href="{base}/use-cases?userType={ut.slug}">
				<h3 class="text-base font-semibold text-near-text sm:text-lg">{ut.name}</h3>
				<p class="mt-1 text-sm text-near-text-secondary">{ut.question}</p>
			</Card>
		{/each}
		<Card href="{base}/use-cases/chain-integration/">
			<h3 class="text-base font-semibold text-near-text sm:text-lg">Blockchain - L1 or L2</h3>
			<p class="mt-1 text-sm text-near-text-secondary">How do I add my chain to NEAR Intents?</p>
		</Card>
		<Card href="https://nearfamiliarcow.github.io/use-near-intents/use-cases/token-listing/">
			<h3 class="text-base font-semibold text-near-text sm:text-lg">Token Issuer</h3>
			<p class="mt-1 text-sm text-near-text-secondary">How do I list my token on NEAR Intents or bridge it to other chains?</p>
		</Card>
	</div>
</section>
