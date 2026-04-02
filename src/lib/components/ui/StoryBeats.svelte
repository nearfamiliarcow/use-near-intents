<script lang="ts">
	import { Lock, Zap, TrendingUp, type Icon as LucideIcon } from 'lucide-svelte';
	import type { StoryBeat } from '$lib/types';

	interface Props {
		beats: StoryBeat[];
	}

	let { beats }: Props = $props();

	// Map icon string → Lucide component
	const iconMap: Record<string, typeof LucideIcon> = {
		lock: Lock,
		zap: Zap,
		'trending-up': TrendingUp
	};

	// Accent colors per beat index — matches the before/after visual language
	const accentColors = [
		{
			icon: 'bg-red-50 text-red-500 border-red-200',
			label: 'text-red-500'
		},
		{
			icon: 'bg-blue-50 text-blue-500 border-blue-200',
			label: 'text-blue-600'
		},
		{
			icon: 'bg-emerald-50 text-emerald-600 border-emerald-200',
			label: 'text-emerald-600'
		}
	];
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
	{#each beats as beat, i}
		{@const colors = accentColors[i % accentColors.length]}
		{@const IconComponent = iconMap[beat.icon]}
		<div class="flex flex-col gap-3 rounded-xl border border-near-border bg-near-surface p-5 shadow-sm sm:p-6">
			<!-- Icon + label row -->
			<div class="flex items-center gap-3">
				<div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border {colors.icon}">
					{#if IconComponent}
						<IconComponent size={16} />
					{:else}
						<span class="text-sm font-bold">{i + 1}</span>
					{/if}
				</div>
				<p class="text-xs font-semibold uppercase tracking-wider {colors.label}">{beat.label}</p>
			</div>
			<!-- Body -->
			<p class="text-sm leading-relaxed text-near-text-secondary">{beat.body}</p>
		</div>
	{/each}
</div>
