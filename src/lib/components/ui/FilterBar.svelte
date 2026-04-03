<script lang="ts">
	interface FilterOption {
		slug: string;
		name: string;
	}

	interface Props {
		options: FilterOption[];
		selected: string;
		onSelect: (slug: string) => void;
		label?: string;
	}

	let { options, selected, onSelect, label = 'Filter by' }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-2">
	{#if label}
		<span class="text-sm font-medium text-near-light-gray">{label}:</span>
	{/if}
	<div class="flex flex-wrap gap-1.5 sm:gap-2">
		<button
			onclick={() => onSelect('')}
			class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm {selected === ''
				? 'bg-near-orange text-white'
				: 'bg-gray-100 text-near-light-gray hover:bg-gray-200 hover:text-near-text'}"
		>
			All
		</button>
		{#each options as option}
			<button
				onclick={() => onSelect(option.slug)}
				class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm {selected === option.slug
					? 'bg-near-orange text-white'
					: 'bg-gray-100 text-near-light-gray hover:bg-gray-200 hover:text-near-text'}"
			>
				{option.name}
			</button>
		{/each}
	</div>
</div>
