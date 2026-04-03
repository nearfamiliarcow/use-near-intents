import { getAllUseCases } from '$lib/content';
import { userTypes } from '$lib/data/user-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		useCases: getAllUseCases(),
		userTypes
	};
};
