<script lang="ts">
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { partners } from '$lib/data/partners';

	interface Props {
		/** Only show partners matching this userType slug. Shows all if empty. */
		filterUserType?: string;
		/** Display name of the user type for the heading */
		filterUserTypeName?: string;
		/** Add rounded corners and border (for inline/card usage) */
		rounded?: boolean;
	}

	let { filterUserType = '', filterUserTypeName = '', rounded = false }: Props = $props();

	const visible = $derived(
		filterUserType
			? partners.filter((p) => p.userTypes.includes(filterUserType))
			: partners.filter((p) => p.featured)
	);

	const showSection = $derived(visible.length >= 1);

	// Track whether content overflows the container (needs marquee)
	let containerEl: HTMLDivElement | undefined = $state();
	let trackEl: HTMLDivElement | undefined = $state();
	let needsScroll = $state(true);

	function checkOverflow() {
		if (!containerEl || !trackEl) return;
		// Measure the width of one set of logos vs container
		const logoItems = trackEl.querySelectorAll('.marquee-item');
		const halfCount = Math.floor(logoItems.length / 2);
		let contentWidth = 0;
		for (let i = 0; i < halfCount; i++) {
			contentWidth += (logoItems[i] as HTMLElement).offsetWidth;
		}
		needsScroll = contentWidth > containerEl.offsetWidth;
	}

	$effect(() => {
		if (!browser) return;
		checkOverflow();
		const ro = new ResizeObserver(checkOverflow);
		if (containerEl) ro.observe(containerEl);
		return () => ro.disconnect();
	});

	const heading = $derived(
		filterUserTypeName
			? `${filterUserTypeName} teams using NEAR Intents`
			: 'Used as core infrastructure by leading teams'
	);
</script>

{#if showSection}
	<section class="bg-near-surface py-6 overflow-hidden {rounded ? 'rounded-2xl border border-near-border' : 'border-t border-near-border'}">
		<p class="text-center text-xs font-medium uppercase tracking-widest text-near-gray mb-5">
			{heading}
		</p>
		<div class="marquee-container" class:no-mask={!needsScroll} bind:this={containerEl}>
			<div
				class="marquee-track"
				class:marquee-animate={needsScroll}
				class:marquee-static={!needsScroll}
				aria-label="Partner logos"
				bind:this={trackEl}
			>
				{#each needsScroll ? [0, 1] : [0] as _dup}
					{#each visible as partner}
						<a
							href="{base}/use-cases?userType={partner.userTypes[0]}"
							class="marquee-item"
							title="{partner.name}"
						>
							<img
								src="{base}{partner.logo}"
								alt={partner.name}
								class="partner-logo transition-opacity hover:opacity-100"
							/>
						</a>
					{/each}
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.marquee-container {
		width: 100%;
		mask-image: linear-gradient(
			to right,
			transparent,
			black 8%,
			black 92%,
			transparent
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 8%,
			black 92%,
			transparent
		);
	}

	.marquee-container.no-mask {
		mask-image: none;
		-webkit-mask-image: none;
	}

	.marquee-track {
		display: flex;
		align-items: center;
		width: max-content;
	}

	.marquee-animate {
		animation: marquee 30s linear infinite;
	}

	.marquee-static {
		width: 100%;
		justify-content: center;
	}

	.marquee-item {
		flex-shrink: 0;
		padding: 0 2.5rem;
		display: flex;
		align-items: center;
	}

	.marquee-item :global(.partner-logo) {
		height: 40px;
		width: auto;
		max-width: 180px;
		object-fit: contain;
		opacity: 0.7;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee-animate {
			animation: none;
			justify-content: center;
			flex-wrap: wrap;
			gap: 1rem;
			width: 100%;
		}
	}
</style>
