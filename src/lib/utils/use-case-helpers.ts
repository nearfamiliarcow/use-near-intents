/**
 * Client-safe utility functions for use case data.
 * These do NOT import from $lib/content (which uses svelte/server).
 */
import type { UseCase, UserStory } from '$lib/types';

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
