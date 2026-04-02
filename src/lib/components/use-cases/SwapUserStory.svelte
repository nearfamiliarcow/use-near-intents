<script lang="ts">
	import type { UserStory } from '$lib/types';
	import { ArrowRight } from 'lucide-svelte';

	interface Props {
		story: UserStory;
	}

	let { story }: Props = $props();

	// "Without" steps — parse the without string into scannable chunks
	// e.g. "Find a CEX, KYC, deposit, trade, withdraw. ~30 min, ~3% in fees."
	// We split on commas and full-stops to get step-like fragments.
	const withoutSteps = $derived(
		story.without
			? story.without
					.replace(/\.\s*$/, '') // strip trailing period
					.split(/,\s*(?=[A-Z])|(?<=\.)\s+/)
					.map((s) => s.trim())
					.filter(Boolean)
			: []
	);
</script>

<div class="overflow-hidden rounded-xl border border-near-border bg-near-surface shadow-sm">
	<!-- Header -->
	<div class="border-b border-near-border bg-near-bg px-5 py-3.5 sm:px-6">
		<div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
			<span class="text-sm font-bold text-near-text">{story.persona}</span>
			<span class="text-sm text-near-text-secondary">{story.context}</span>
			{#if story.app}
				<span class="text-sm text-near-text-secondary">
					via <a
						href={story.partnerSlug ? `/case-studies/${story.partnerSlug}` : undefined}
						class={story.partnerSlug ? 'font-semibold text-near-green-dark underline-offset-2 hover:underline' : 'font-semibold text-near-text'}
					>{story.app}</a>
				</span>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 divide-y divide-near-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">

		<!-- WITH NEAR Intents -->
		<div class="p-5 sm:p-6">
			<p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-near-green-dark sm:text-xs">
				With NEAR Intents
			</p>

			<ol class="space-y-3">
				{#each story.steps as step, i}
					<li class="flex items-start gap-3">
						<!-- Step circle -->
						<span
							class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
							style="background-color: #00c85318; color: #00963f; border: 1.5px solid #00c85340"
						>{i + 1}</span>

						<!-- Step text + connector -->
						<div class="flex-1">
							<span class="text-sm text-near-text">{step}</span>
							{#if i < story.steps.length - 1}
								<div class="mt-2 ml-px h-3 w-0.5 bg-near-green/25"></div>
							{/if}
						</div>
					</li>
				{/each}
			</ol>

			<!-- Time / outcome callout -->
			<div class="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2.5">
				<div class="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500"></div>
				<span class="text-xs font-semibold text-emerald-700">~30 seconds, one signature</span>
			</div>
		</div>

		<!-- WITHOUT NEAR Intents -->
		{#if story.without}
			<div class="bg-red-50/50 p-5 sm:p-6">
				<p class="mb-4 text-[10px] font-bold uppercase tracking-widest text-red-600 sm:text-xs">
					Without NEAR Intents
				</p>

				{#if withoutSteps.length > 1}
					<ol class="space-y-2.5">
						{#each withoutSteps as wStep, i}
							<li class="flex items-start gap-2.5">
								<span class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-100 text-[9px] font-bold text-red-500">
									{i + 1}
								</span>
								<span class="text-sm text-red-700/80">{wStep}</span>
							</li>
						{/each}
					</ol>
				{:else}
					<p class="text-sm text-red-700/80">{story.without}</p>
				{/if}

				<!-- Pain point callout -->
				<div class="mt-4 flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2.5">
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0 text-red-500" aria-hidden="true">
						<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
					</svg>
					<span class="text-xs font-semibold text-red-600">30+ minutes, multiple platforms</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		.animate-pulse {
			animation: none;
		}
	}
</style>
