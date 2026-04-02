<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';

	let mobileOpen = $state(false);

	const navItems = [
		{ href: '/', label: 'Home', exact: true },
		{ href: '/case-studies', label: 'Case Studies' },
		{ href: '/use-cases', label: 'Use Cases' }
	];

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-near-border bg-near-white/90 backdrop-blur-lg">
	<nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<a href="/" class="flex items-center gap-2 text-lg font-bold text-near-text">
			<span class="text-near-green-dark">NEAR</span> Intents
		</a>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-8 md:flex">
			{#each navItems as item}
				<a
					href={item.href}
					class="text-sm font-medium transition-colors {(item.exact ? $page.url.pathname === item.href : $page.url.pathname.startsWith(item.href))
						? 'text-near-green-dark'
						: 'text-near-light-gray hover:text-near-text'}"
				>
					{item.label}
				</a>
			{/each}
			<a
				href="https://docs.near-intents.org"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-near-light-gray transition-colors hover:text-near-text"
			>
				Docs
			</a>
			<a
				href="https://explorer.near-intents.org"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm font-medium text-near-light-gray transition-colors hover:text-near-text"
			>
				Explorer
			</a>
		</div>

		<!-- Mobile menu button -->
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="p-2 text-near-light-gray md:hidden"
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
							? 'bg-near-green-light text-near-green-dark'
							: 'text-near-light-gray hover:bg-near-bg hover:text-near-text'}"
					>
						{item.label}
					</a>
				{/each}
				<a
					href="https://docs.near-intents.org"
					target="_blank"
					rel="noopener noreferrer"
					onclick={closeMobile}
					class="block rounded-lg px-3 py-2.5 text-base font-medium text-near-light-gray hover:bg-near-bg hover:text-near-text"
				>
					Docs
				</a>
				<a
					href="https://explorer.near-intents.org"
					target="_blank"
					rel="noopener noreferrer"
					onclick={closeMobile}
					class="block rounded-lg px-3 py-2.5 text-base font-medium text-near-light-gray hover:bg-near-bg hover:text-near-text"
				>
					Explorer
				</a>
			</div>
		</div>
	{/if}
</header>
