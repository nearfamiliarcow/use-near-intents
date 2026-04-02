import type { Chain } from '$lib/types';

export const chains: Chain[] = [
	// EVM Chains
	{ slug: 'ethereum', name: 'Ethereum', logo: '/logos/chains/ethereum.svg', color: '#627EEA' },
	{ slug: 'arbitrum', name: 'Arbitrum', logo: '/logos/chains/arbitrum.svg', color: '#28A0F0' },
	{ slug: 'base', name: 'Base', logo: '/logos/chains/base.svg', color: '#0052FF' },
	{ slug: 'optimism', name: 'Optimism', logo: '/logos/chains/optimism.svg', color: '#FF0420' },
	{ slug: 'polygon', name: 'Polygon', logo: '/logos/chains/polygon.svg', color: '#8247E5' },
	{ slug: 'bnb', name: 'BNB Chain', logo: '/logos/chains/bnb.svg', color: '#F3BA2F' },
	{ slug: 'avalanche', name: 'Avalanche', logo: '/logos/chains/avalanche.svg', color: '#E84142' },
	{ slug: 'berachain', name: 'Berachain', logo: '/logos/chains/berachain.svg', color: '#964B00' },
	{ slug: 'scroll', name: 'Scroll', logo: '/logos/chains/scroll.svg', color: '#FFEEDA' },
	{ slug: 'gnosis', name: 'Gnosis', logo: '/logos/chains/gnosis.svg', color: '#3E6957' },
	{ slug: 'aurora', name: 'Aurora', logo: '/logos/chains/aurora.svg', color: '#70D44B' },
	{ slug: 'monad', name: 'Monad', logo: '/logos/chains/monad.svg', color: '#836EF9' },
	{ slug: 'plasma', name: 'Plasma', logo: '/logos/chains/plasma.svg', color: '#00D4AA' },
	{ slug: 'xlayer', name: 'XLayer', logo: '/logos/chains/xlayer.svg', color: '#000000' },
	{ slug: 'adi', name: 'ADI', logo: '/logos/chains/adi.svg', color: '#C4A962' },

	// Bitcoin & Forks
	{ slug: 'bitcoin', name: 'Bitcoin', logo: '/logos/chains/bitcoin.svg', color: '#F7931A' },
	{ slug: 'bitcoin-cash', name: 'Bitcoin Cash', logo: '/logos/chains/bitcoin-cash.svg', color: '#0AC18E' },
	{ slug: 'dogecoin', name: 'Dogecoin', logo: '/logos/chains/dogecoin.svg', color: '#C2A633' },
	{ slug: 'litecoin', name: 'Litecoin', logo: '/logos/chains/litecoin.svg', color: '#345D9D' },
	{ slug: 'zcash', name: 'Zcash', logo: '/logos/chains/zcash.svg', color: '#ECB244' },
	{ slug: 'dash', name: 'Dash', logo: '/logos/chains/dash.svg', color: '#008CE7' },

	// Other L1s
	{ slug: 'near', name: 'NEAR', logo: '/logos/chains/near.svg', color: '#00EC97' },
	{ slug: 'solana', name: 'Solana', logo: '/logos/chains/solana.svg', color: '#9945FF' },
	{ slug: 'starknet', name: 'Starknet', logo: '/logos/chains/starknet.svg', color: '#29296E' },
	{ slug: 'sui', name: 'Sui', logo: '/logos/chains/sui.svg', color: '#4DA2FF' },
	{ slug: 'ton', name: 'TON', logo: '/logos/chains/ton.svg', color: '#0088CC' },
	{ slug: 'tron', name: 'Tron', logo: '/logos/chains/tron.svg', color: '#FF0013' },
	{ slug: 'cardano', name: 'Cardano', logo: '/logos/chains/cardano.svg', color: '#0033AD' },
	{ slug: 'stellar', name: 'Stellar', logo: '/logos/chains/stellar.svg', color: '#7D00FF' },
	{ slug: 'xrp', name: 'XRP', logo: '/logos/chains/xrp.svg', color: '#23292F' },
	{ slug: 'aleo', name: 'Aleo', logo: '/logos/chains/aleo.svg', color: '#00C0F9' }
];

export function getChain(slug: string): Chain | undefined {
	return chains.find((c) => c.slug === slug);
}
