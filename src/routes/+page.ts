import { getLiveTokens, getLiveChains, getLiveStats, getAssetChainMap, getChainAssetList } from '$lib/data/tokens';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const [tokens, liveChains, stats, assetChainMap, chainAssetList] = await Promise.all([
		getLiveTokens(),
		getLiveChains(),
		getLiveStats(),
		getAssetChainMap(),
		getChainAssetList()
	]);

	return {
		tokens,
		liveChains,
		stats,
		assetChainMap,
		chainAssetList
	};
};
