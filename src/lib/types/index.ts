export interface CaseStudy {
	name: string;
	slug: string;
	logo: string;
	url: string;
	description: string;
	userType: string;
	chains: string[];
	status: 'live' | 'building' | 'opportunity';
	integrationMethod: 'widget' | 'api' | 'sdk';
	featured: boolean;
	metrics: Metric[];
	tags: string[];
	useCases: CaseStudyUseCaseJoin[];
	content: string;
	coverImage?: string;
	sortOrder: number;
	transformation?: TransformationData;
	storyBeats?: StoryBeat[];
}

export interface UseCaseScreenshot {
	src: string;
	caption: string;
	source: string;
}

export interface FeaturedPartner {
	name: string;
	logo?: string;
	url?: string;
	description: string;
}

export interface HowItWorksStep {
	/** Lucide component name in PascalCase, e.g. "Wallet", "Cpu", "CheckCircle" */
	icon: string;
	title: string;
	detail: string;
	color: string;
	chainPill: string;
}

export interface UseCase {
	name: string;
	slug: string;
	icon: string;
	tagline: string;
	coverImage?: string;
	screenshots?: UseCaseScreenshot[];
	featuredPartners?: FeaturedPartner[];
	relevantUserTypes: string[];
	demoComponent: string | null;
	sortOrder: number;
	revenueHooks: Record<string, string>;
	userStories: UserStory[];
	revenueModel: RevenueModel;
	howItWorksSteps?: HowItWorksStep[];
	content: string;
}

export interface AssetLogo {
	symbol: string;
	logo: string;
	/** Optional chain name — shown as "on {chain}" label */
	chain?: string;
	/** Optional chain logo URL — renders as a small badge on the bottom-right of the asset logo */
	chainLogo?: string;
}

export interface LogoFlowSide {
	assets: AssetLogo[];
	moreCount?: number;
}

export interface LogoFlow {
	from: LogoFlowSide;
	to: LogoFlowSide;
	fromLabel?: string;
	toLabel?: string;
}

export interface CaseStudyUseCaseJoin {
	useCase: string;
	summary: string;
	flow: string[];
	logoFlow?: LogoFlow | null;
	screenshot?: string | null;
	screenshots?: string[];
	captions?: string[];
}

export interface UserStory {
	persona: string;
	userType: string;
	context: string;
	app: string;
	partnerSlug: string | null;
	steps: string[];
	without: string;
}

export interface Metric {
	label: string;
	value: string;
	period?: string;
}

export interface RevenueModel {
	feeStructure: string;
	revShare: string;
}

export interface UserType {
	slug: string;
	name: string;
	description: string;
	icon: string;
	question: string;
}

export interface Chain {
	slug: string;
	name: string;
	logo: string;
	color: string;
}

export interface TransformationData {
	before: {
		headline: string;
		body: string;
	};
	after: {
		headline: string;
		body: string;
	};
}

export interface StoryBeat {
	icon: string;
	label: string;
	body: string;
}

export interface StoryBeatsData {
	beats: StoryBeat[];
}
