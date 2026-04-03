import { getLiveTokens, getLiveChains, getLiveStats, getAssetChainMap, getChainAssetList } from '$lib/data/tokens';
import { getAllCaseStudies } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [tokens, liveChains, stats, assetChainMap, chainAssetList] = await Promise.all([
		getLiveTokens(),
		getLiveChains(),
		getLiveStats(),
		getAssetChainMap(),
		getChainAssetList()
	]);

	const featuredCaseStudies = getAllCaseStudies().filter((cs) => cs.featured);

	return {
		tokens,
		liveChains,
		stats,
		assetChainMap,
		chainAssetList,
		featuredCaseStudies
	};
};
