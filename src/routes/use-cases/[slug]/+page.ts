import { getUseCase, getCaseStudiesByUseCase } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = ({ params }) => {
	const useCase = getUseCase(params.slug);
	if (!useCase) throw error(404, 'Use case not found');

	const caseStudies = getCaseStudiesByUseCase(params.slug);

	return {
		useCase,
		caseStudies
	};
};
