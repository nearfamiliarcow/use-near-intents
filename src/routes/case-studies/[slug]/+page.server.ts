import { getCaseStudy, getUseCase, getRelatedCaseStudies } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const caseStudy = getCaseStudy(params.slug);
	if (!caseStudy) throw error(404, 'Case study not found');

	const resolvedUseCases = caseStudy.useCases
		.map((join) => ({
			...join,
			resolved: getUseCase(join.useCase)
		}))
		.filter((j) => j.resolved);

	const related = getRelatedCaseStudies(params.slug);

	return {
		caseStudy,
		resolvedUseCases,
		related
	};
};
