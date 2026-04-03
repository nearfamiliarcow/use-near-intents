<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { getUserType } from '$lib/data/user-types';
	import UseCaseCard from '$lib/components/content/UseCaseCard.svelte';
	import RoleSelector from '$lib/components/ui/RoleSelector.svelte';
	import {
		Wallet,
		WalletCards,
		Blocks,
		ArrowLeftRight,
		Landmark,
		TrendingUp,
		GitMerge,
		CreditCard,
		Droplets,
		Vault,
		Bot,
		Brain,
		Network,
		Waypoints,
		Radio,
		type Icon as LucideIcon
	} from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedUserType = $derived(browser ? ($page.url.searchParams.get('userType') ?? '') : '');

	const filtered = $derived(
		selectedUserType
			? data.useCases.filter((uc) => uc.relevantUserTypes.includes(selectedUserType))
			: data.useCases
	);

	const activeUserType = $derived(
		selectedUserType ? getUserType(selectedUserType) : null
	);

	function onFilterSelect(slug: string) {
		const url = new URL($page.url);
		if (slug) {
			url.searchParams.set('userType', slug);
		} else {
			url.searchParams.delete('userType');
		}
		goto(url.toString(), { replaceState: true, noScroll: true });
	}

	const iconMap: Record<string, typeof LucideIcon> = {
		wallet: Wallet,
		'wallet-cards': WalletCards,
		blocks: Blocks,
		'arrow-left-right': ArrowLeftRight,
		landmark: Landmark,
		'trending-up': TrendingUp,
		'git-merge': GitMerge,
		'credit-card': CreditCard,
		droplets: Droplets,
		vault: Vault,
		bot: Bot,
		brain: Brain,
		network: Network,
		waypoints: Waypoints,
		radio: Radio
	};
</script>

<svelte:head>
	<title>Use Cases — NEAR Intents</title>
	<meta
		name="description"
		content="Explore how different types of products integrate NEAR Intents. Cross-chain swaps, payments, asset onboarding, and more."
	/>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
	<!-- Hero + Role selector -->
	<div class="mb-10 sm:mb-12">
		<div class="rounded-2xl border border-near-border bg-near-surface p-6 shadow-sm sm:p-8">
			<RoleSelector
				userTypes={data.userTypes}
				selected={selectedUserType}
				onSelect={onFilterSelect}
			/>
		</div>
	</div>

	<!-- Context bar when a role is selected -->
	{#if activeUserType}
		{@const ActiveIcon = iconMap[activeUserType.icon]}
		<div class="mb-8 flex items-center gap-3 sm:mb-10">
			<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-near-orange-light text-near-orange">
				{#if ActiveIcon}
					<ActiveIcon size={18} />
				{/if}
			</div>
			<div>
				<p class="text-sm font-semibold text-near-text">{activeUserType.name}</p>
				<p class="text-sm text-near-text-secondary">{activeUserType.question}</p>
			</div>
			<button
				onclick={() => onFilterSelect('')}
				class="ml-auto shrink-0 text-xs text-near-gray-medium underline hover:text-near-text"
			>
				Clear filter
			</button>
		</div>
	{/if}

	<!-- Use case grid -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
		{#each filtered as uc (uc.slug)}
			<UseCaseCard useCase={uc} userTypeFilter={selectedUserType} />
		{:else}
			<p class="col-span-2 py-12 text-center text-near-gray-medium">
				No use cases match this filter.
			</p>
		{/each}
	</div>
</div>
