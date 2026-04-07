<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';

	let mobileOpen = $state(false);

	const navItems = [
		{ href: `${base}/`, label: 'Home', exact: true },
		{ href: `${base}/case-studies`, label: 'Case Studies' },
		{ href: `${base}/use-cases`, label: 'Use Cases' }
	];

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-near-border bg-near-white/90 backdrop-blur-lg">
	<nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<a href="{base}/" class="flex items-center" aria-label="NEAR Intents home">
			<!-- NEAR Intents Primary logo — black wordmark on light background -->
			<img
				src="{base}/logos/NEAR_Intents_Logo_Primary_Black.svg"
				alt="NEAR Intents"
				class="h-7 w-auto"
			/>
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-6 md:flex">
			<a
				href={navItems[0].href}
				class="text-sm font-medium transition-colors {$page.url.pathname === navItems[0].href
					? 'text-near-orange'
					: 'text-near-gray hover:text-near-text'}"
			>
				{navItems[0].label}
			</a>
			<div class="h-4 w-px bg-near-border" aria-hidden="true"></div>
			<a
				href={navItems[1].href}
				class="text-sm font-medium transition-colors {$page.url.pathname.startsWith(navItems[1].href)
					? 'text-near-orange'
					: 'text-near-gray hover:text-near-text'}"
			>
				{navItems[1].label}
			</a>
			<a
				href={navItems[2].href}
				class="text-sm font-medium transition-colors {$page.url.pathname.startsWith(navItems[2].href)
					? 'text-near-orange'
					: 'text-near-gray hover:text-near-text'}"
			>
				{navItems[2].label}
			</a>
			<div class="h-4 w-px bg-near-border" aria-hidden="true"></div>
			<a
				href="https://docs.near-intents.org"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-near-gray transition-colors hover:text-near-text"
			>
				Docs
			</a>
			<a
				href="https://explorer.near-intents.org"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-near-gray transition-colors hover:text-near-text"
			>
				Explorer
			</a>
		</div>

		<!-- Mobile menu button -->
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="p-2 text-near-gray md:hidden"
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</nav>

	<!-- Mobile nav -->
	{#if mobileOpen}
		<div class="border-t border-near-border bg-near-white md:hidden">
			<div class="space-y-1 px-4 py-4">
				{#each navItems as item}
					<a
						href={item.href}
						onclick={closeMobile}
						class="block rounded-lg px-3 py-2.5 text-base font-medium {(item.exact ? $page.url.pathname === item.href : $page.url.pathname.startsWith(item.href))
							? 'bg-near-orange-light text-near-orange'
							: 'text-near-gray hover:bg-near-off-white hover:text-near-text'}"
					>
						{item.label}
					</a>
				{/each}
				<a
					href="https://docs.near-intents.org"
					target="_blank"
					rel="noopener noreferrer"
					onclick={closeMobile}
					class="block rounded-lg px-3 py-2.5 text-base font-medium text-near-gray hover:bg-near-off-white hover:text-near-text"
				>
					Docs
				</a>
				<a
					href="https://explorer.near-intents.org"
					target="_blank"
					rel="noopener noreferrer"
					onclick={closeMobile}
					class="block rounded-lg px-3 py-2.5 text-base font-medium text-near-gray hover:bg-near-off-white hover:text-near-text"
				>
					Explorer
				</a>
			</div>
		</div>
	{/if}
</header>
