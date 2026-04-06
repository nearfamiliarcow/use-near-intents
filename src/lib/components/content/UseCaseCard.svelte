<script lang="ts">
	import { base } from '$app/paths';
	import type { UseCase } from '$lib/types';
	import { getRevenueHookForUserType } from '$lib/utils/use-case-helpers';
	import { getUserType } from '$lib/data/user-types';
	import {
		ArrowLeftRight,
		CreditCard,
		Download,
		Blocks,
		ShieldCheck,
		Waypoints,
		TrendingUp,
		Radio,
		ArrowRight,
		type Icon as LucideIcon
	} from 'lucide-svelte';

	interface Props {
		useCase: UseCase & { caseStudyCount?: number; caseStudyLogos?: string[] };
		userTypeFilter?: string;
	}

	let { useCase, userTypeFilter = '' }: Props = $props();

	const caseStudyCount = $derived(useCase.caseStudyCount ?? 0);
	const caseStudyLogos = $derived(useCase.caseStudyLogos ?? []);
	const revenueHook = $derived(
		userTypeFilter ? getRevenueHookForUserType(useCase, userTypeFilter) : ''
	);

	// Color scheme keyed by slug
	const colorSchemes: Record<
		string,
		{
			bg: string;
			iconBg: string;
			iconColor: string;
			accent: string;
			hookBg: string;
			hookText: string;
			hookBorder: string;
			badgeBg: string;
			badgeText: string;
		}
	> = {
		'cross-chain-swaps': {
			bg: 'hover:border-blue-300',
			iconBg: 'bg-blue-100',
			iconColor: 'text-blue-600',
			accent: 'text-blue-600',
			hookBg: 'bg-blue-50',
			hookText: 'text-blue-800',
			hookBorder: 'border-blue-200',
			badgeBg: 'bg-blue-50',
			badgeText: 'text-blue-700'
		},
		'cross-pay': {
			bg: 'hover:border-purple-300',
			iconBg: 'bg-purple-100',
			iconColor: 'text-purple-600',
			accent: 'text-purple-600',
			hookBg: 'bg-purple-50',
			hookText: 'text-purple-800',
			hookBorder: 'border-purple-200',
			badgeBg: 'bg-purple-50',
			badgeText: 'text-purple-700'
		},
		'asset-onboarding': {
			bg: 'hover:border-emerald-300',
			iconBg: 'bg-emerald-100',
			iconColor: 'text-emerald-600',
			accent: 'text-emerald-600',
			hookBg: 'bg-emerald-50',
			hookText: 'text-emerald-800',
			hookBorder: 'border-emerald-200',
			badgeBg: 'bg-emerald-50',
			badgeText: 'text-emerald-700'
		},
		'chain-integration': {
			bg: 'hover:border-indigo-300',
			iconBg: 'bg-indigo-100',
			iconColor: 'text-indigo-600',
			accent: 'text-indigo-600',
			hookBg: 'bg-indigo-50',
			hookText: 'text-indigo-800',
			hookBorder: 'border-indigo-200',
			badgeBg: 'bg-indigo-50',
			badgeText: 'text-indigo-700'
		},
		bridging: {
			bg: 'hover:border-cyan-300',
			iconBg: 'bg-cyan-100',
			iconColor: 'text-cyan-600',
			accent: 'text-cyan-600',
			hookBg: 'bg-cyan-50',
			hookText: 'text-cyan-800',
			hookBorder: 'border-cyan-200',
			badgeBg: 'bg-cyan-50',
			badgeText: 'text-cyan-700'
		},
		'cross-chain-custody': {
			bg: 'hover:border-amber-300',
			iconBg: 'bg-amber-100',
			iconColor: 'text-amber-600',
			accent: 'text-amber-600',
			hookBg: 'bg-amber-50',
			hookText: 'text-amber-800',
			hookBorder: 'border-amber-200',
			badgeBg: 'bg-amber-50',
			badgeText: 'text-amber-700'
		},
		'cross-chain-earn': {
			bg: 'hover:border-teal-300',
			iconBg: 'bg-teal-100',
			iconColor: 'text-teal-600',
			accent: 'text-teal-600',
			hookBg: 'bg-teal-50',
			hookText: 'text-teal-800',
			hookBorder: 'border-teal-200',
			badgeBg: 'bg-teal-50',
			badgeText: 'text-teal-700'
		},
		'token-listing': {
			bg: 'hover:border-rose-300',
			iconBg: 'bg-rose-100',
			iconColor: 'text-rose-600',
			accent: 'text-rose-600',
			hookBg: 'bg-rose-50',
			hookText: 'text-rose-800',
			hookBorder: 'border-rose-200',
			badgeBg: 'bg-rose-50',
			badgeText: 'text-rose-700'
		}
	};

	const fallbackScheme = {
		bg: 'hover:border-near-orange/40',
		iconBg: 'bg-near-orange-light',
		iconColor: 'text-near-orange',
		accent: 'text-near-orange',
		hookBg: 'bg-near-orange-light',
		hookText: 'text-near-dark',
		hookBorder: 'border-near-orange/20',
		badgeBg: 'bg-gray-100',
		badgeText: 'text-near-light-gray'
	};

	const colors = $derived(colorSchemes[useCase.slug] ?? fallbackScheme);

	const iconMap: Record<string, typeof LucideIcon> = {
		'arrow-left-right': ArrowLeftRight,
		'credit-card': CreditCard,
		download: Download,
		blocks: Blocks,
		'shield-check': ShieldCheck,
		waypoints: Waypoints,
		'trending-up': TrendingUp,
		radio: Radio
	};

	const IconComponent = $derived(iconMap[useCase.icon]);

	// Resolve human-readable names for user type badges (max 3 shown)
	const badgeUserTypes = $derived(
		useCase.relevantUserTypes.slice(0, 3).map((slug) => {
			const ut = getUserType(slug);
			return ut ? ut.name : slug.replace(/-/g, ' ');
		})
	);
	const extraCount = $derived(Math.max(0, useCase.relevantUserTypes.length - 3));
</script>

<a
	href="{base}/use-cases/{useCase.slug}{userTypeFilter ? `?userType=${userTypeFilter}` : ''}"
	class="group flex flex-col overflow-hidden rounded-xl border border-near-border bg-near-surface shadow-sm transition-all hover:shadow-md {colors.bg}"
>
	<div class="flex flex-1 flex-col p-5 sm:p-6">
		<!-- Main row: text content + optional phone preview -->
		<div class="flex items-start gap-4">
			<!-- Text side -->
			<div class="flex min-w-0 flex-1 flex-col">
				<!-- Header row: icon + title + arrow -->
				<div class="flex items-start gap-3">
					<div
						class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl {colors.iconBg} {colors.iconColor}"
					>
						{#if IconComponent}
							<IconComponent size={22} />
						{:else}
							<span class="text-base font-bold">{useCase.name[0]}</span>
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						<h3 class="text-base font-semibold text-near-text sm:text-lg">{useCase.name}</h3>
						{#if !revenueHook}
							<p class="mt-0.5 text-sm leading-snug text-near-text-secondary">{useCase.tagline}</p>
						{/if}
					</div>
					<ArrowRight
						size={16}
						class="mt-1 shrink-0 text-near-gray-medium transition-transform group-hover:translate-x-0.5 {colors.accent}"
					/>
				</div>

				<!-- Revenue hook — only shown when a role filter is active -->
				{#if revenueHook}
					<div class="mt-4 rounded-lg border {colors.hookBorder} {colors.hookBg} px-4 py-3">
						<p class="text-xs font-medium leading-snug {colors.hookText}">{revenueHook}</p>
					</div>
				{/if}

				<!-- Footer: user type badges + case study count -->
				<div class="mt-4 flex flex-wrap items-end justify-between gap-2">
					<div class="flex flex-wrap gap-1.5">
						{#each badgeUserTypes as name}
							<span
								class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {colors.badgeBg} {colors.badgeText}"
							>
								{name}
							</span>
						{/each}
						{#if extraCount > 0}
							<span
								class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-near-gray-medium"
							>
								+{extraCount} more
							</span>
						{/if}
					</div>
					{#if caseStudyCount > 0}
						<div class="flex shrink-0 items-center gap-1.5">
							<div class="flex items-center">
								{#each caseStudyLogos as logo, i}
									{#if logo}
										<img
											src={logo}
											alt="Partner logo"
											class="h-5 w-5 rounded-full border border-near-surface bg-near-bg object-cover shadow-sm {i > 0 ? '-ml-1.5' : ''}"
											style="z-index: {3 - i}"
										/>
									{/if}
								{/each}
							</div>
							<span class="text-xs font-medium text-near-gray-medium">
								{caseStudyCount}
								{caseStudyCount === 1 ? 'case study' : 'case studies'}
							</span>
						</div>
					{/if}
				</div>
			</div>

			{#if useCase.coverImage}
				<div class="hidden w-36 shrink-0 items-center sm:flex" aria-hidden="true">
					<img
						src={useCase.coverImage}
						alt=""
						class="w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
					/>
				</div>
			{/if}
		</div>
	</div>
</a>

