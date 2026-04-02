<script lang="ts">
	import { onMount } from 'svelte';
	import * as icons from 'lucide-svelte';
	import type { HowItWorksStep } from '$lib/types';

	let { steps }: { steps: HowItWorksStep[] } = $props();

	// Resolve icon name string to a Lucide component
	function resolveIcon(name: string) {
		// lucide-svelte exports PascalCase names
		const key = name as keyof typeof icons;
		return (icons[key] ?? icons.Circle) as typeof icons.Circle;
	}

	let activeStep = $state(0);
	let mounted = $state(false);
	let paused = $state(false);

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			if (!paused) {
				activeStep = (activeStep + 1) % steps.length;
			}
		}, 7200);
		return () => clearInterval(interval);
	});
</script>

<div class="rounded-xl border border-near-border bg-near-surface p-5 shadow-sm sm:p-8">
	<h2 class="mb-6 text-lg font-bold text-near-text sm:mb-8 sm:text-xl">How it works</h2>

	<!-- Step indicators (desktop: horizontal) -->
	<div
		class="mb-8 hidden items-center gap-0 sm:flex"
		aria-label="Flow steps"
	>
		{#each steps as step, i}
			{@const Icon = resolveIcon(step.icon)}
			<button
				class="flex flex-1 flex-col items-center gap-2 px-2 py-3 transition-all duration-200 focus:outline-none"
				onclick={() => { activeStep = i; paused = true; }}
				aria-pressed={activeStep === i}
				aria-label="Step {i + 1}: {step.title}"
			>
				<!-- Circle -->
				<div
					class="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300"
					style="
						border-color: {activeStep >= i ? step.color : 'var(--color-near-border)'};
						background-color: {activeStep >= i ? step.color + '18' : 'var(--color-near-surface)'};
					"
				>
					<Icon
						size={18}
						style="color: {activeStep >= i ? step.color : 'var(--color-near-gray-medium)'}"
					/>
				</div>

				<!-- Label -->
				<span
					class="text-center text-xs font-semibold transition-colors duration-300 sm:text-sm"
					style="color: {activeStep === i ? step.color : activeStep > i ? 'var(--color-near-text)' : 'var(--color-near-gray-medium)'}"
				>
					{step.title}
				</span>
			</button>

			{#if i < steps.length - 1}
				<div
					class="mx-1 h-0.5 flex-1 self-start mt-5 transition-all duration-500"
					style="background-color: {activeStep > i ? '#00c853' : 'var(--color-near-border)'}"
					aria-hidden="true"
				></div>
			{/if}
		{/each}
	</div>

	<!-- Active step detail panel -->
	<div class="rounded-xl border border-near-border bg-near-bg p-5 sm:p-6" aria-live="polite">
		{#key activeStep}
			{@const step = steps[activeStep]}
			{@const Icon = resolveIcon(step.icon)}
			<div
				class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
				style="animation: fadeSlideIn 0.3s ease both"
			>
				<!-- Icon -->
				<div
					class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2"
					style="border-color: {step.color}30; background-color: {step.color}12;"
				>
					<Icon size={24} style="color: {step.color}" />
				</div>

				<div class="flex-1 min-w-0">
					<div class="mb-1 flex items-center gap-3">
						<span class="text-xs font-semibold uppercase tracking-wider text-near-gray-medium">
							Step {activeStep + 1} of {steps.length}
						</span>
						<span
							class="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
							style="background-color: {step.color}18; color: {step.color}"
						>
							{step.chainPill}
						</span>
					</div>
					<h3 class="text-base font-bold text-near-text sm:text-lg">{step.title}</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-near-text-secondary sm:text-base">
						{step.detail}
					</p>
				</div>
			</div>
		{/key}
	</div>

	<!-- Mobile: step pills -->
	<div class="mt-4 flex items-center justify-center gap-2 sm:hidden" aria-label="Step navigation">
		{#each steps as step, i}
			<button
				onclick={() => { activeStep = i; paused = true; }}
				class="h-2 rounded-full transition-all duration-300 focus:outline-none"
				style="
					width: {activeStep === i ? '24px' : '8px'};
					background-color: {activeStep === i ? step.color : 'var(--color-near-border)'};
				"
				aria-label="Go to step {i + 1}: {step.title}"
				aria-pressed={activeStep === i}
			></button>
		{/each}
	</div>

	<!-- Restart auto-play hint on pause -->
	{#if paused && mounted}
		<div class="mt-4 flex justify-center">
			<button
				onclick={() => (paused = false)}
				class="text-xs text-near-gray-medium underline-offset-2 hover:underline focus:outline-none"
			>
				Resume auto-play
			</button>
		</div>
	{/if}
</div>

<style>
	@keyframes fadeSlideIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
