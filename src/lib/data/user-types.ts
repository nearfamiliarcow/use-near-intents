import type { UserType } from '$lib/types';

export const userTypes: UserType[] = [
	{
		slug: 'single-chain-wallet',
		name: 'Single-Chain Wallet or dApp',
		description: 'Wallets or dApps supporting one blockchain that use NEAR Intents for cross-chain access',
		icon: 'wallet',
		question: 'How do I give my users access to every chain?'
	},
	{
		slug: 'multi-chain-wallet',
		name: 'Multi-Chain Wallet',
		description: 'Multi-chain wallets that add cross-chain swaps and payments',
		icon: 'wallet-cards',
		question: 'How do I add cross-chain swaps and payments?'
	},
	{
		slug: 'blockchain',
		name: 'Blockchain - L1 or L2',
		description: 'Layer 1 and Layer 2 networks that want to attract cross-chain users and assets',
		icon: 'blocks',
		question: 'How do I bring assets and users to my chain?'
	},
	{
		slug: 'dex',
		name: 'DEX / AMM',
		description: 'Decentralized exchanges and automated market makers',
		icon: 'arrow-left-right',
		question: 'How do I capture cross-chain swap volume?'
	},
	{
		slug: 'lending',
		name: 'Lending Protocol',
		description: 'Lending and borrowing protocols',
		icon: 'landmark',
		question: 'How do I accept deposits from any chain?'
	},
	{
		slug: 'perps',
		name: 'Perpetuals & Derivatives',
		description: 'Perpetual futures and derivatives platforms',
		icon: 'trending-up',
		question: 'How do I let traders fund positions from any chain?'
	},
	{
		slug: 'aggregator',
		name: 'Aggregator',
		description: 'DEX and bridge aggregators',
		icon: 'git-merge',
		question: 'How do I add NEAR Intents as a route?'
	},
	{
		slug: 'payment-app',
		name: 'Payment App',
		description: 'Crypto payment and commerce platforms',
		icon: 'credit-card',
		question: 'How do I accept any crypto from any chain?'
	},
	{
		slug: 'liquid-staking',
		name: 'Liquid Staking',
		description: 'Liquid staking protocols',
		icon: 'droplets',
		question: 'How do I accept cross-chain staking deposits?'
	},
	{
		slug: 'yield-vault',
		name: 'Yield Vault',
		description: 'Yield aggregators and vault protocols',
		icon: 'vault',
		question: 'How do I let users deposit from any chain?'
	},
	{
		slug: 'trading-bot',
		name: 'Trading Bot',
		description: 'Automated trading bot platforms',
		icon: 'bot',
		question: 'How do I fund bots from any chain?'
	},
	{
		slug: 'ai-agent',
		name: 'AI Agent Platform',
		description: 'AI agent infrastructure and platforms',
		icon: 'brain',
		question: 'How do I give agents cross-chain funding rails?'
	},
	{
		slug: 'bridge',
		name: 'Bridge / Aggregator',
		description: 'Cross-chain bridges and routing protocols',
		icon: 'network',
		question: 'How do I add NEAR Intents as a route?'
	}
];

export function getUserType(slug: string): UserType | undefined {
	return userTypes.find((ut) => ut.slug === slug);
}
