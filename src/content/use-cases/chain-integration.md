---
name: Chain Integration
slug: chain-integration
icon: blocks
tagline: "Connect your chain to 31+ others — bring assets and users to your ecosystem"
coverImage: /screenshots/solana-chain-integration.png
relevantUserTypes:
  - blockchain
demoComponent: null
sortOrder: 4
revenueHooks:
  default: "Every asset bridged to your chain grows your ecosystem's TVL and DeFi activity"
  blockchain: "Cross-chain access means every token holder on 31 chains is a potential user of your ecosystem"
userStories:
  - persona: "Starknet Foundation"
    userType: blockchain
    context: "Wants to grow Starknet DeFi TVL by making it easy to bring assets from other chains"
    app: Starknet
    partnerSlug: null
    steps:
      - "NEAR Intents adds Starknet as a supported chain"
      - "Any app on Starknet (e.g., AVNU) can now offer cross-chain swaps and deposits"
      - "Users on Ethereum, Solana, Bitcoin etc. can move assets to Starknet in one step"
      - "Starknet ecosystem TVL grows as entry friction decreases"
    without: "Each Starknet app must individually integrate bridges. Fragmented UX, inconsistent asset coverage, high dev cost."
  - persona: "A new L2 launching"
    userType: blockchain
    context: "Just launched their L2 and needs to bootstrap liquidity and users"
    app: "New L2"
    partnerSlug: null
    steps:
      - "Integrates NEAR Intents as a supported chain"
      - "Day 1: users can deposit from 31 chains into any app on the L2"
      - "DeFi apps on the L2 don't need to individually integrate bridges"
      - "Ecosystem grows faster because cross-chain access is built in"
    without: "Build or integrate multiple bridges. Wait months for liquidity. Each DeFi app needs separate bridge integrations. Users face fragmented, confusing bridging experiences."
revenueModel:
  feeStructure: "Protocol-level fees on cross-chain volume to your chain"
  revShare: "Ecosystem-aligned revenue model"
---

## What is Chain Integration?

Chain Integration means adding your blockchain to the NEAR Intents network. Once integrated, every app on your chain can offer cross-chain swaps, payments, and deposits — without each app needing to integrate bridges individually.

This is infrastructure-level cross-chain access for your entire ecosystem.

## How it Works

1. **Your chain integrates with NEAR Intents** at the protocol level
2. **NEAR Intents solvers gain the ability** to route assets to and from your chain
3. **Every app on your chain** can now use the NEAR Intents API/Widget/SDK
4. **Users on 31+ chains** can send assets to your ecosystem in one transaction
5. **Your ecosystem TVL grows** as cross-chain friction disappears

## What Your Ecosystem Gets

### For your DeFi apps
Every DEX, lending protocol, and yield vault on your chain gets instant access to cross-chain deposits and swaps — without building bridge integrations themselves.

### For your users
Users from any chain can participate in your ecosystem's DeFi without understanding bridges, wrapped tokens, or multi-step processes.

### For your growth
Cross-chain access is the biggest lever for ecosystem TVL growth. When it's easy to move assets in, more assets flow in.

## Currently Supported Chains

NEAR Intents supports 31 chains across three categories:

**EVM Chains (15):** Arbitrum, ADI, Aurora, Avalanche, Base, Berachain, BNB Chain, Ethereum, Gnosis, Monad, Optimism, Plasma, Polygon, Scroll, XLayer

**Bitcoin & Forks (6):** Bitcoin, Bitcoin Cash, Dogecoin, Litecoin, Zcash, Dash

**Other L1s (10):** Aleo, Cardano, NEAR, Solana, Stellar, Sui, TON, Tron, XRP, Starknet

## The Unique UTXO Advantage

NEAR Intents is one of the only cross-chain protocols that natively supports UTXO chains. This means Bitcoin, Dogecoin, Litecoin, Bitcoin Cash, Zcash, and Dash holders can interact with your ecosystem directly — not through wrapped tokens on an intermediary chain.

For any chain looking to attract BTC capital, this is a differentiator. $10B+ in wrapped BTC exists across DeFi, and growing.
