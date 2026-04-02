import { getAllUseCases } from '$lib/content';
import { userTypes } from '$lib/data/user-types';
import type { PageLoad } from './$types';

export const ssr = false;

export const load: PageLoad = () => {
	return {
		useCases: getAllUseCases(),
		userTypes
	};
};
