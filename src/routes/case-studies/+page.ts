import { getAllCaseStudies } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		caseStudies: getAllCaseStudies()
	};
};
