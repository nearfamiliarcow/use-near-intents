import { getAllUseCases, getCaseStudiesByUseCase } from '$lib/content';
import { userTypes } from '$lib/data/user-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const useCases = getAllUseCases().map((uc) => {
		const cs = getCaseStudiesByUseCase(uc.slug);
		return {
			...uc,
			caseStudyCount: cs.length,
			caseStudyLogos: cs.slice(0, 3).map((c) => c.logo)
		};
	});

	return {
		useCases,
		userTypes
	};
};
