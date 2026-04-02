// Live token data from 1click API, enriched with logos from multiple sources

export interface Token {
	assetId: string;
	symbol: string;
	decimals: number;
	blockchain: string;
	price: number;
	contractAddress?: string;
	logoURI?: string;
	volume24h?: number;
	marketCap?: number;
}

export interface ChainSummary {
	slug: string;
	name: string;
	tokenCount: number;
	logoURI: string;
}

export interface ChainAssetReach {
	symbol: string;
	logoURI?: string;
	chains: { slug: string; name: string; logoURI: string }[];
}

// ============================================================
// Logo sources — we try multiple CDNs to maximize coverage
// ============================================================

// 1) Manual overrides for tokens we know the logo for (most important ones)
const tokenLogos: Record<string, string> = {
	// Major native assets
	BTC: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
	ETH: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
	SOL: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
	BNB: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
	XRP: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
	ADA: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',
	DOGE: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
	LTC: 'https://coin-images.coingecko.com/coins/images/2/small/litecoin.png',
	BCH: 'https://coin-images.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png',
	ZEC: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
	DASH: 'https://coin-images.coingecko.com/coins/images/19/small/dash-logo.png',
	DOT: 'https://coin-images.coingecko.com/coins/images/12171/small/polkadot.png',
	AVAX: 'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
	NEAR: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',
	SUI: 'https://coin-images.coingecko.com/coins/images/26375/small/sui-ocean-square.png',
	TON: 'https://coin-images.coingecko.com/coins/images/17980/small/ton_symbol.png',
	TRX: 'https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png',
	XLM: 'https://coin-images.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
	GNO: 'https://coin-images.coingecko.com/coins/images/662/small/logo_square_simple_300px.png',
	OKB: 'https://coin-images.coingecko.com/coins/images/4463/small/WeChat_Image_20220118095654.png',

	// Wrapped / bridged variants
	WBTC: 'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
	WETH: 'https://coin-images.coingecko.com/coins/images/2518/small/weth.png',
	wBTC: 'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
	cbBTC: 'https://coin-images.coingecko.com/coins/images/40143/small/cbbtc.webp',
	xBTC: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
	nBTC: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',

	// Stablecoins
	USDT: 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
	USDC: 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
	'USDC.e': 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
	DAI: 'https://coin-images.coingecko.com/coins/images/9956/small/Badge_Dai.png',
	FRAX: 'https://coin-images.coingecko.com/coins/images/13422/small/FRAX_icon.png',
	USDD: 'https://coin-images.coingecko.com/coins/images/25380/small/USDD.jpg',

	// DeFi majors
	UNI: 'https://coin-images.coingecko.com/coins/images/12504/small/uni.jpg',
	AAVE: 'https://coin-images.coingecko.com/coins/images/12645/small/AAVE.png',
	LINK: 'https://coin-images.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
	GMX: 'https://coin-images.coingecko.com/coins/images/18323/small/arbit.png',
	ARB: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
	OP: 'https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png',
	MATIC: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',
	POL: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',
	STX: 'https://coin-images.coingecko.com/coins/images/2069/small/Stacks_logo_full.png',
	TRUMP: 'https://coin-images.coingecko.com/coins/images/53746/small/trump.jpg',
	SHIB: 'https://coin-images.coingecko.com/coins/images/11939/large/shiba.png',
	PEPE: 'https://coin-images.coingecko.com/coins/images/29850/large/pepe-token.jpeg',

	// L1/L2 tokens
	APT: 'https://coin-images.coingecko.com/coins/images/26455/large/Aptos-Network-Symbol-Black-RGB-1x.png',
	STRK: 'https://coin-images.coingecko.com/coins/images/26433/large/starknet.png',
	BERA: 'https://coin-images.coingecko.com/coins/images/25235/large/BERA.png',
	MON: 'https://coin-images.coingecko.com/coins/images/38927/large/mon.png',
	ALEO: 'https://coin-images.coingecko.com/coins/images/27916/large/secondary-icon-dark.png',
	XPL: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',

	// DeFi
	COW: 'https://coin-images.coingecko.com/coins/images/24384/large/CoW-token_logo.png',
	KNC: 'https://coin-images.coingecko.com/coins/images/14899/large/RwdVsGcw_400x400.jpg',
	SAFE: 'https://coin-images.coingecko.com/coins/images/27032/large/Artboard_1_copy_8circle-1.png',
	PENGU: 'https://coin-images.coingecko.com/coins/images/52622/large/PUDGY_PENGUINS_PENGU_PFP.png',
	BRETT: 'https://coin-images.coingecko.com/coins/images/33747/large/ogbretttttttt.jpg',
	SPX: 'https://coin-images.coingecko.com/coins/images/31401/large/centeredcoin_%281%29.png',
	TURBO: 'https://coin-images.coingecko.com/coins/images/30117/large/TurboMark-QL_200.png',
	'$WIF': 'https://coin-images.coingecko.com/coins/images/33566/large/dogwifhat.jpg',
	MELANIA: 'https://coin-images.coingecko.com/coins/images/53775/large/melania-meme.png',
	KAITO: 'https://coin-images.coingecko.com/coins/images/53844/large/kaito.jpg',

	// NEAR ecosystem
	wNEAR: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',
	stNEAR: 'https://coin-images.coingecko.com/coins/images/24250/small/st_near.png',
	AURORA: 'https://coin-images.coingecko.com/coins/images/20582/small/aurora.jpeg',
	SWEAT: 'https://coin-images.coingecko.com/coins/images/25057/small/fhD9Xs16_400x400.jpg',
	REF: 'https://coin-images.coingecko.com/coins/images/18279/small/ref.png',
	ADI: 'https://coin-images.coingecko.com/coins/images/38803/small/adi.jpeg'
};

// 2) Chain logo mapping — using coin-images.coingecko.com (current CDN)
const chainLogos: Record<string, string> = {
	near: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',
	eth: 'https://coin-images.coingecko.com/coins/images/279/small/ethereum.png',
	base: 'https://coin-images.coingecko.com/asset_platforms/images/131/small/base.jpeg',
	arb: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
	arbitrum: 'https://coin-images.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg',
	sol: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
	solana: 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
	btc: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
	bitcoin: 'https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png',
	bsc: 'https://coin-images.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
	avalanche: 'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
	avax: 'https://coin-images.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png',
	pol: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',
	polygon: 'https://coin-images.coingecko.com/coins/images/4713/small/polygon.png',
	op: 'https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png',
	optimism: 'https://coin-images.coingecko.com/coins/images/25244/small/Optimism.png',
	aurora: 'https://coin-images.coingecko.com/coins/images/20582/small/aurora.jpeg',
	tron: 'https://coin-images.coingecko.com/coins/images/1094/small/tron-logo.png',
	ton: 'https://coin-images.coingecko.com/coins/images/17980/small/ton_symbol.png',
	doge: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
	dogecoin: 'https://coin-images.coingecko.com/coins/images/5/small/dogecoin.png',
	ltc: 'https://coin-images.coingecko.com/coins/images/2/small/litecoin.png',
	litecoin: 'https://coin-images.coingecko.com/coins/images/2/small/litecoin.png',
	bch: 'https://coin-images.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png',
	'bitcoin-cash': 'https://coin-images.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png',
	zec: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
	zcash: 'https://coin-images.coingecko.com/coins/images/486/small/circle-zcash-color.png',
	gnosis: 'https://coin-images.coingecko.com/coins/images/662/small/logo_square_simple_300px.png',
	starknet: 'https://coin-images.coingecko.com/coins/images/26433/small/starknet.png',
	sui: 'https://coin-images.coingecko.com/coins/images/26375/small/sui-ocean-square.png',
	xrp: 'https://coin-images.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
	stellar: 'https://coin-images.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png',
	cardano: 'https://coin-images.coingecko.com/coins/images/975/small/cardano.png',
	dash: 'https://coin-images.coingecko.com/coins/images/19/small/dash-logo.png',
	berachain: 'https://coin-images.coingecko.com/coins/images/25235/large/BERA.png',
	bera: 'https://coin-images.coingecko.com/coins/images/25235/large/BERA.png',
	scroll: 'https://coin-images.coingecko.com/asset_platforms/images/153/small/scroll.jpeg',
	monad: 'https://coin-images.coingecko.com/coins/images/38927/large/mon.png',
	aleo: 'https://coin-images.coingecko.com/coins/images/27916/large/secondary-icon-dark.png',
	xlayer: 'https://coin-images.coingecko.com/coins/images/4463/small/WeChat_Image_20220118095654.png',
	plasma: 'https://coin-images.coingecko.com/coins/images/10365/small/near.jpg',
	adi: 'https://coin-images.coingecko.com/coins/images/38803/small/adi.jpeg',
	aptos: 'https://coin-images.coingecko.com/coins/images/26455/small/aptos_round.png'
};

// Pretty names for chains
const chainNames: Record<string, string> = {
	near: 'NEAR', eth: 'Ethereum', base: 'Base', arb: 'Arbitrum', arbitrum: 'Arbitrum',
	sol: 'Solana', solana: 'Solana', btc: 'Bitcoin', bitcoin: 'Bitcoin',
	bsc: 'BNB Chain', avalanche: 'Avalanche', avax: 'Avalanche',
	pol: 'Polygon', polygon: 'Polygon', op: 'Optimism', optimism: 'Optimism',
	aurora: 'Aurora', tron: 'Tron', ton: 'TON',
	doge: 'Dogecoin', dogecoin: 'Dogecoin', ltc: 'Litecoin', litecoin: 'Litecoin',
	bch: 'Bitcoin Cash', 'bitcoin-cash': 'Bitcoin Cash',
	zec: 'Zcash', zcash: 'Zcash', gnosis: 'Gnosis',
	starknet: 'Starknet', sui: 'Sui', xrp: 'XRP', stellar: 'Stellar',
	cardano: 'Cardano', dash: 'Dash', berachain: 'Berachain', bera: 'Berachain',
	scroll: 'Scroll', monad: 'Monad', aleo: 'Aleo',
	xlayer: 'XLayer', plasma: 'Plasma', adi: 'ADI', aptos: 'Aptos'
};

// ============================================================
// Logo resolution
// ============================================================

function getTokenLogo(token: { symbol: string; blockchain: string; contractAddress?: string }): string | undefined {
	// 1) Check manual mapping first (covers all major tokens)
	if (tokenLogos[token.symbol]) return tokenLogos[token.symbol];

	// 2) For native assets, use chain logo as fallback
	if (!token.contractAddress || token.contractAddress === 'NATIVE') {
		return chainLogos[token.blockchain];
	}

	// 3) Try SwapKit CDN for EVM tokens with contract addresses
	const swapKitChain: Record<string, string> = {
		eth: 'eth', arb: 'arb', base: 'base', op: 'op', bsc: 'bsc',
		avalanche: 'avax', pol: 'matic', gnosis: 'gno', scroll: 'scroll'
	};
	const chain = swapKitChain[token.blockchain];
	if (chain && token.contractAddress) {
		return `https://storage.googleapis.com/token-list-swapkit-dev/images/${chain}.${token.symbol.toLowerCase()}-${token.contractAddress.toLowerCase()}.png`;
	}

	return undefined;
}

export function getChainLogo(chainSlug: string): string | undefined {
	return chainLogos[chainSlug];
}

// ============================================================
// Data fetching
// ============================================================

interface CoinGeckoMarket {
	symbol: string;
	image: string;
	current_price: number;
	total_volume: number;
	market_cap: number;
}

let cachedTokens: Token[] | null = null;
let cachedChains: ChainSummary[] | null = null;

// Load CoinGecko cache — pre-fetched at build time via:
//   curl 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1' > src/lib/data/coingecko-cache.json
// Re-run to refresh volume/price data.
import geckoCache from './coingecko-cache.json';

// Map wrapped/variant symbols to their canonical parent for CoinGecko lookups
// Aliases for CoinGecko volume/market cap lookup (NOT logo — logo uses tokenLogos map)
const symbolAliases: Record<string, string> = {
	wBTC: 'BTC', NBTC: 'BTC',           // NEAR-bridged BTC variants → BTC volume
	XBTC: 'BTC', xBTC: 'BTC',           // xBTC → BTC volume
	cbBTC: 'BTC',                         // cbBTC → BTC volume (logo from tokenLogos)
	// Note: WBTC is NOT aliased — it has its own CoinGecko entry (just not in top 250)
	WETH: 'ETH', wETH: 'ETH',
	WNEAR: 'NEAR', wNEAR: 'NEAR',
	'USDC.e': 'USDC', USDCX: 'USDC',
	USDT0: 'USDT',
	XDAI: 'DAI'
};

// Symbols that should be merged into their parent in the display
// e.g. WETH rows merge into ETH, wNEAR rows merge into NEAR
const mergeIntoParent: Record<string, string> = {
	WETH: 'ETH', wETH: 'ETH',
	WNEAR: 'NEAR', wNEAR: 'NEAR'
};

function getCoinGeckoMap(): Map<string, CoinGeckoMarket> {
	const map = new Map<string, CoinGeckoMarket>();
	for (const coin of geckoCache as CoinGeckoMarket[]) {
		const sym = coin.symbol.toUpperCase();
		if (!map.has(sym)) map.set(sym, coin);
	}
	return map;
}

function lookupGecko(symbol: string, geckoMap: Map<string, CoinGeckoMarket>): CoinGeckoMarket | undefined {
	const upper = symbol.toUpperCase();
	// Direct match first
	const direct = geckoMap.get(upper);
	if (direct) return direct;
	// Try alias
	const alias = symbolAliases[symbol] ?? symbolAliases[upper];
	if (alias) return geckoMap.get(alias.toUpperCase());
	return undefined;
}

async function fetchTokens(): Promise<Token[]> {
	if (cachedTokens) return cachedTokens;

	try {
		const geckoMarkets = getCoinGeckoMap();
		const oneClickRes = await fetch('https://1click.chaindefuser.com/v0/tokens');
		if (!oneClickRes.ok) throw new Error(`HTTP ${oneClickRes.status}`);

		const raw: Array<{
			assetId: string;
			symbol: string;
			decimals: number;
			blockchain: string;
			price: number;
			contractAddress?: string;
		}> = await oneClickRes.json();

		cachedTokens = raw.map((t) => {
			const match = lookupGecko(t.symbol, geckoMarkets);
			// Manual logo map first (has correct logos for WBTC, cbBTC, etc.)
			// Then CoinGecko (only if it's a direct symbol match, not aliased)
			// Then SwapKit/fallback
			const manualLogo = tokenLogos[t.symbol];
			const directGecko = geckoMarkets.get(t.symbol.toUpperCase());

			return {
				...t,
				logoURI: manualLogo ?? directGecko?.image ?? getTokenLogo(t),
				volume24h: match?.total_volume ?? 0,
				marketCap: match?.market_cap ?? 0
			};
		});

		return cachedTokens;
	} catch (e) {
		console.warn('Failed to fetch tokens, using empty list:', e);
		cachedTokens = [];
		return cachedTokens;
	}
}

export async function getLiveTokens(): Promise<Token[]> {
	return fetchTokens();
}

export async function getLiveChains(): Promise<ChainSummary[]> {
	if (cachedChains) return cachedChains;

	const tokens = await fetchTokens();
	const chainMap = new Map<string, number>();

	for (const t of tokens) {
		chainMap.set(t.blockchain, (chainMap.get(t.blockchain) ?? 0) + 1);
	}

	cachedChains = Array.from(chainMap.entries())
		.map(([slug, count]) => ({
			slug,
			name: chainNames[slug] ?? slug,
			tokenCount: count,
			logoURI: chainLogos[slug] ?? ''
		}))
		.sort((a, b) => b.tokenCount - a.tokenCount);

	return cachedChains;
}

// For each chain, compute which of its key assets exist on other chains
// Returns a map: chainSlug → array of { symbol, logoURI, chains[] }
export async function getChainAssetReach(): Promise<Record<string, ChainAssetReach[]>> {
	const tokens = await fetchTokens();

	// Group all tokens by symbol → list of chains they appear on
	const symbolToChains = new Map<string, Set<string>>();
	const symbolToLogo = new Map<string, string>();
	for (const t of tokens) {
		if (!symbolToChains.has(t.symbol)) symbolToChains.set(t.symbol, new Set());
		symbolToChains.get(t.symbol)!.add(t.blockchain);
		if (t.logoURI && !symbolToLogo.has(t.symbol)) symbolToLogo.set(t.symbol, t.logoURI);
	}

	// For each chain, find tokens that originate or exist on that chain AND appear on other chains
	const chainToTokens = new Map<string, Set<string>>();
	for (const t of tokens) {
		if (!chainToTokens.has(t.blockchain)) chainToTokens.set(t.blockchain, new Set());
		chainToTokens.get(t.blockchain)!.add(t.symbol);
	}

	const result: Record<string, ChainAssetReach[]> = {};

	for (const [chainSlug, symbols] of chainToTokens) {
		const assets: ChainAssetReach[] = [];
		for (const symbol of symbols) {
			const chainsForSymbol = symbolToChains.get(symbol)!;
			// Only include assets that appear on 2+ chains (cross-chain reach)
			if (chainsForSymbol.size >= 2) {
				assets.push({
					symbol,
					logoURI: symbolToLogo.get(symbol),
					chains: Array.from(chainsForSymbol).map((slug) => ({
						slug,
						name: chainNames[slug] ?? slug,
						logoURI: chainLogos[slug] ?? ''
					}))
				});
			}
		}
		// Sort: most cross-chain reach first, then alphabetical
		assets.sort((a, b) => b.chains.length - a.chains.length || a.symbol.localeCompare(b.symbol));
		if (assets.length > 0) {
			result[chainSlug] = assets;
		}
	}

	return result;
}

// For each unique asset symbol, return the list of chains it exists on (with logos)
export async function getAssetChainMap(): Promise<Record<string, { slug: string; name: string; logoURI: string }[]>> {
	const tokens = await fetchTokens();
	const map = new Map<string, Map<string, { slug: string; name: string; logoURI: string }>>();

	for (const t of tokens) {
		if (!map.has(t.symbol)) map.set(t.symbol, new Map());
		const chainMap = map.get(t.symbol)!;
		if (!chainMap.has(t.blockchain)) {
			chainMap.set(t.blockchain, {
				slug: t.blockchain,
				name: chainNames[t.blockchain] ?? t.blockchain,
				logoURI: chainLogos[t.blockchain] ?? ''
			});
		}
	}

	const result: Record<string, { slug: string; name: string; logoURI: string }[]> = {};
	for (const [symbol, chainMap] of map) {
		result[symbol] = Array.from(chainMap.values());
	}
	return result;
}

// For each chain, return the list of assets on it (with logos)
export async function getChainAssetList(): Promise<Record<string, { symbol: string; logoURI?: string; price: number }[]>> {
	const tokens = await fetchTokens();
	const map = new Map<string, Map<string, { symbol: string; logoURI?: string; price: number }>>();

	for (const t of tokens) {
		if (!map.has(t.blockchain)) map.set(t.blockchain, new Map());
		const assetMap = map.get(t.blockchain)!;
		if (!assetMap.has(t.symbol)) {
			assetMap.set(t.symbol, {
				symbol: t.symbol,
				logoURI: t.logoURI,
				price: t.price
			});
		}
	}

	const result: Record<string, { symbol: string; logoURI?: string; price: number }[]> = {};
	for (const [chain, assetMap] of map) {
		result[chain] = Array.from(assetMap.values()).sort((a, b) => b.price - a.price);
	}
	return result;
}

export async function getLiveStats() {
	const tokens = await fetchTokens();
	const chains = await getLiveChains();

	const uniqueSymbols = new Set(tokens.map((t) => t.symbol));

	return {
		totalTokens: tokens.length,
		uniqueAssets: uniqueSymbols.size,
		chainCount: chains.length,
		topTokens: tokens
			.filter((t) => t.price > 0)
			.sort((a, b) => b.price - a.price)
			.slice(0, 20)
	};
}
