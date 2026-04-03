<script lang="ts">
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
		type Icon as LucideIcon
	} from 'lucide-svelte';
	import type { UserType } from '$lib/types';

	interface Props {
		userTypes: UserType[];
		selected: string;
		onSelect: (slug: string) => void;
	}

	let { userTypes, selected, onSelect }: Props = $props();

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
		network: Network
	};
</script>

<div>
	<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-near-gray-medium">
		I build a&hellip;
	</p>
	<div class="flex flex-wrap gap-2">
		<!-- "All" option -->
		<button
			onclick={() => onSelect('')}
			class="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all {selected === ''
				? 'border-near-orange bg-near-orange text-white shadow-sm'
				: 'border-near-border bg-near-surface text-near-light-gray hover:border-near-orange/50 hover:text-near-text'}"
		>
			<span>All use cases</span>
		</button>
		{#each userTypes as ut}
			{@const IconComponent = iconMap[ut.icon]}
			<button
				onclick={() => onSelect(ut.slug)}
				class="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all {selected === ut.slug
					? 'border-near-orange bg-near-orange text-white shadow-sm'
					: 'border-near-border bg-near-surface text-near-light-gray hover:border-near-orange/50 hover:text-near-text'}"
				title={ut.question}
			>
				{#if IconComponent}
					<IconComponent size={14} class="shrink-0" />
				{/if}
				<span>{ut.name}</span>
			</button>
		{/each}
	</div>
</div>
