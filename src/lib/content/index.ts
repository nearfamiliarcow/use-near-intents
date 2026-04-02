import { render } from 'svelte/server';
import type { CaseStudy, UseCase, CaseStudyUseCaseJoin, UserStory, HowItWorksStep } from '$lib/types';
import type { Component } from 'svelte';

// Import all case study markdown files
const caseStudyFiles = import.meta.glob('/src/content/case-studies/*.md', { eager: true });
const useCaseFiles = import.meta.glob('/src/content/use-cases/*.md', { eager: true });

interface MdFile {
	metadata: Record<string, unknown>;
	default: Component;
}

function renderContent(file: MdFile): string {
	try {
		const { body } = render(file.default);
		return body;
	} catch {
		return '';
	}
}

function parseCaseStudy(file: MdFile): CaseStudy {
	const m = file.metadata;
	return {
		name: m.name as string,
		slug: m.slug as string,
		logo: m.logo as string,
		url: (m.url as string) ?? '',
		description: m.description as string,
		userType: m.userType as string,
		chains: (m.chains as string[]) ?? [],
		status: (m.status as CaseStudy['status']) ?? 'opportunity',
		integrationMethod: (m.integrationMethod as CaseStudy['integrationMethod']) ?? 'api',
		featured: (m.featured as boolean) ?? false,
		metrics: (m.metrics as CaseStudy['metrics']) ?? [],
		tags: (m.tags as string[]) ?? [],
		useCases: (m.useCases as CaseStudyUseCaseJoin[]) ?? [],
		content: renderContent(file),
		coverImage: (m.coverImage as string) ?? undefined,
		transformation: (m.transformation as CaseStudy['transformation']) ?? undefined,
		storyBeats: (m.storyBeats as CaseStudy['storyBeats']) ?? undefined
	};
}

function parseUseCase(file: MdFile): UseCase {
	const m = file.metadata;
	return {
		name: m.name as string,
		slug: m.slug as string,
		icon: m.icon as string,
		tagline: m.tagline as string,
		coverImage: (m.coverImage as string) ?? undefined,
		screenshots: (m.screenshots as UseCase['screenshots']) ?? undefined,
		featuredPartners: (m.featuredPartners as UseCase['featuredPartners']) ?? undefined,
		relevantUserTypes: (m.relevantUserTypes as string[]) ?? [],
		demoComponent: (m.demoComponent as string) ?? null,
		sortOrder: (m.sortOrder as number) ?? 99,
		revenueHooks: (m.revenueHooks as Record<string, string>) ?? {},
		userStories: (m.userStories as UserStory[]) ?? [],
		revenueModel: (m.revenueModel as UseCase['revenueModel']) ?? {
			feeStructure: '',
			revShare: ''
		},
		howItWorksSteps: (m.howItWorksSteps as HowItWorksStep[]) ?? undefined,
		content: renderContent(file)
	};
}

// === Case Studies ===

export function getAllCaseStudies(): CaseStudy[] {
	return Object.values(caseStudyFiles).map((file) => parseCaseStudy(file as MdFile));
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
	return getAllCaseStudies().find((cs) => cs.slug === slug);
}

export function getCaseStudiesByUserType(userTypeSlug: string): CaseStudy[] {
	return getAllCaseStudies().filter((cs) => cs.userType === userTypeSlug);
}

export function getCaseStudiesByChain(chainSlug: string): CaseStudy[] {
	return getAllCaseStudies().filter((cs) => cs.chains.includes(chainSlug));
}

export function getCaseStudiesByUseCase(
	useCaseSlug: string
): (CaseStudy & { joinData: CaseStudyUseCaseJoin })[] {
	return getAllCaseStudies()
		.filter((cs) => cs.useCases.some((uc) => uc.useCase === useCaseSlug))
		.map((cs) => ({
			...cs,
			joinData: cs.useCases.find((uc) => uc.useCase === useCaseSlug)!
		}));
}

// === Use Cases ===

export function getAllUseCases(): UseCase[] {
	return Object.values(useCaseFiles)
		.map((file) => parseUseCase(file as MdFile))
		.sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getUseCase(slug: string): UseCase | undefined {
	return getAllUseCases().find((uc) => uc.slug === slug);
}

export function getUseCasesForUserType(userTypeSlug: string): UseCase[] {
	return getAllUseCases().filter((uc) => uc.relevantUserTypes.includes(userTypeSlug));
}

// === Relationships ===

export function getRelatedCaseStudies(slug: string): {
	sameUserType: CaseStudy[];
	sharedUseCases: CaseStudy[];
} {
	const caseStudy = getCaseStudy(slug);
	if (!caseStudy) return { sameUserType: [], sharedUseCases: [] };

	const all = getAllCaseStudies().filter((cs) => cs.slug !== slug);
	const caseStudyUseCaseSlugs = caseStudy.useCases.map((uc) => uc.useCase);

	return {
		sameUserType: all.filter((cs) => cs.userType === caseStudy.userType),
		sharedUseCases: all.filter(
			(cs) =>
				cs.userType !== caseStudy.userType &&
				cs.useCases.some((uc) => caseStudyUseCaseSlugs.includes(uc.useCase))
		)
	};
}

// === Filtering helpers ===

export function getUserStoriesForUserType(useCase: UseCase, userTypeSlug: string): UserStory[] {
	if (!userTypeSlug) return useCase.userStories;
	return useCase.userStories.filter((s) => s.userType === userTypeSlug);
}

export function getRevenueHookForUserType(useCase: UseCase, userTypeSlug: string): string {
	if (userTypeSlug && useCase.revenueHooks[userTypeSlug]) {
		return useCase.revenueHooks[userTypeSlug];
	}
	return useCase.revenueHooks['default'] ?? '';
}
