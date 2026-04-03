---
name: Bridging
slug: bridging
icon: waypoints
tagline: "Bridge any supported asset to any supported chain — bring exotic assets onto your chain. As new chains are added to NEAR Intents, any asset can be bridged to them automatically — no per-route setup needed."
coverImage: /screenshots/zcash-live-on-raydium.jpg
screenshots:
  - src: /screenshots/zcash-live-on-raydium.jpg
    caption: "Zcash is live on Raydium — bridged via NEAR Intents"
    source: "Helius / NEAR / Raydium"
  - src: /screenshots/btc-withdraw-to-near.png
    caption: "Wrapped Bitcoin on NEAR — bridged by NEAR Intents onto the NEAR L1 blockchain"
    source: "NEAR Intents"
relevantUserTypes:
  - blockchain
  - dex
  - aggregator
  - bridge
  - lending
  - yield-vault
  - single-chain-wallet
  - multi-chain-wallet
demoComponent: BridgingDemo
sortOrder: 2
revenueHooks:
  default: "Every asset bridged to your chain or app is a user you would have lost to fragmented bridge UX"
  blockchain: "Bring UTXO chains and 31 others to your ecosystem — grow TVL without fragmenting the bridging experience"
  dex: "Users from 31 chains can deposit directly into your pools — wider user base, more volume"
  aggregator: "Add cross-chain bridging as a feature — users never leave your app to move assets in"
  bridge: "Surface NEAR Intents routes alongside your own — more asset coverage, better fills"
  lending: "Accept collateral from 31 chains — every asset holder becomes a potential borrower"
  yield-vault: "Users deposit from any chain in one step — remove the bridge-then-deposit friction"
userStories:
  - persona: "A ZEC holder on Zcash"
    userType: dex
    context: "Holds ZEC on Zcash, wants to trade on Raydium (Solana) for the first time"
    app: Raydium
    partnerSlug: solana
    steps:
      - "Opens Raydium on Solana → selects 'Bridge from another chain'"
      - "Chooses ZEC (Zcash) as source asset"
      - "NEAR Intents previews the route: ZEC → SOL on Solana"
      - "User signs one transaction on Zcash"
      - "Assets arrive on Solana in ~30 seconds, ready for DeFi"
    without: "Sell ZEC on a CEX, buy SOL, transfer to Solana wallet, then deposit into Raydium. 4 steps, 20-40 minutes, multiple accounts required."
  - persona: "Solana ecosystem growth lead"
    userType: blockchain
    context: "Wants to grow Solana TVL by removing barriers for UTXO chain holders"
    app: Solana ecosystem
    partnerSlug: solana
    steps:
      - "Solana integrates with NEAR Intents as a supported chain"
      - "Raydium (and other Solana apps) can now offer cross-chain bridging via API"
      - "BTC, ZEC, DOGE, and LTC holders gain a direct path to Solana"
      - "TVL grows from new user segments that had no bridge before"
    without: "Each Solana app builds individual bridge integrations. UTXO chains never get coverage. Users from Bitcoin and Zcash ecosystems remain locked out."
  - persona: "An ETH holder on Ethereum"
    userType: aggregator
    context: "Wants to move ETH to a new L2 to earn yield, but doesn't want to manage the official bridge"
    app: "A cross-chain aggregator"
    partnerSlug: null
    steps:
      - "Opens aggregator → selects 'Bridge to [L2]'"
      - "Picks ETH (Ethereum) → ETH (destination chain)"
      - "NEAR Intents handles routing and delivery"
      - "One signature on Ethereum, ETH arrives on L2"
    without: "Find the official L2 bridge, understand the wait time, track the transaction, then deposit separately. 15-30 min, multiple steps."
  - persona: "A lending protocol on Base"
    userType: lending
    context: "Wants to accept BTC as collateral but users hold native BTC, not WBTC"
    app: "Lending protocol on Base"
    partnerSlug: null
    steps:
      - "Protocol adds 'Bridge & Deposit' powered by NEAR Intents"
      - "BTC holder selects BTC (Bitcoin) as collateral source"
      - "NEAR Intents bridges native BTC → cbBTC on Base"
      - "cbBTC is credited as collateral in one transaction"
    without: "User sends BTC to a CEX, converts to cbBTC, bridges to Base, then deposits. 4 manual steps, 15-30 minutes."
howItWorksSteps:
  - icon: Waypoints
    title: Select source & destination
    detail: "Choose the asset you want to bridge and the destination chain. ZEC to Solana, BTC to TON, XRP to Arbitrum, DOGE to Base — any supported asset to any supported chain."
    color: "#F4B728"
    chainPill: Any asset → any chain
  - icon: Send
    title: Send your funds
    detail: "Send the native asset from your wallet. For UTXO chains like Zcash, Bitcoin, and Dogecoin, a deposit address is generated — send from any wallet or exchange. One transaction, one signature."
    color: "#9945FF"
    chainPill: Source chain
  - icon: Shield
    title: NEAR Intents custodies & issues
    detail: "NEAR Intents custodies the native asset and issues a wrapped version on the destination chain. No third-party bridge needed — NEAR Intents handles the wrapping and issuance directly."
    color: "#00c853"
    chainPill: NEAR Intents network
  - icon: Zap
    title: Wrapped asset arrives — with instant liquidity
    detail: "The wrapped asset lands on the destination chain ready to use. Because bridged assets are part of the NEAR Intents cross-chain network, every NEAR Intents user instantly has access to liquidity for the wrapped asset across all 31 chains."
    color: "#28A0F0"
    chainPill: Destination chain + cross-chain liquidity
revenueModel:
  feeStructure: ""
  revShare: ""
---

## What is Bridging?

NEAR Intents can bridge **any supported asset to any supported chain**. ZEC to Solana, BTC to NEAR, ETH to Base, STRK to Arbitrum — any combination works. The examples on this page are just that: examples. As new chains and assets are added to the network, they're immediately bridgeable to every other supported chain. No per-route configuration, no chain-by-chain setup.

NEAR Intents treats bridging as a one-step user action: the user selects where their assets are and where they want them. NEAR Intents handles the routing, conversion, and delivery — including UTXO chains that no other protocol supports natively.

## How it Works

1. **User selects source asset and destination chain** in your app's UI
2. **NEAR Intents previews the bridge route** — asset received, estimated time, fees
3. **User signs one transaction** on their source chain
4. **NEAR Intents solver network routes the assets** — handling conversion and cross-chain delivery
5. **Assets arrive on the destination chain** in roughly 30 seconds

No bridge interface. No wrapped token complexity. No second transaction.

## Bridging vs. Cross-Chain Swaps

These two use cases are related but distinct:

**Cross-Chain Swaps** are about exchanging *different* assets across chains — swap ETH for SOL, or USDC on Arbitrum for BTC on Bitcoin. The user wants a different asset at the end.

**Bridging** is about moving assets to a *new destination* — same or equivalent asset, new chain. The goal is participation: get onto a chain or into an app that the user couldn't access before. The ZEC holder bridging to Solana isn't trying to change what they hold; they're trying to join a new ecosystem.

In practice, many bridge transactions involve both — moving assets and converting them — but the intent is different, and so is the value proposition to the destination chain.

## The UTXO Advantage

Most bridges don't support UTXO chains at all. Bitcoin, Zcash, Dogecoin, Litecoin, Bitcoin Cash, and Dash operate on fundamentally different transaction models than EVM chains, and few protocols have built the infrastructure to handle them.

NEAR Intents does. This means chains and apps that integrate NEAR Intents can accept deposits from the entire UTXO universe — not just wrapped versions through intermediary chains, but native assets straight from the source wallet.

For any L2 or app looking to attract Bitcoin-native capital, this is a meaningful differentiator. BTC holders represent the largest single source of crypto capital outside of stablecoins.

## What Your Chain or App Gets

**For chains:** Every new chain that joins NEAR Intents can accept assets from all 31 other supported chains. Your ecosystem gets a universal on-ramp without requiring each individual DeFi app to integrate bridges separately.

**For DEXs and aggregators:** Users from 31 chains can deposit directly into your pools and interfaces. You become the entry point for your chain's ecosystem, not just a DEX for users already on your chain.

**For lending and yield protocols:** Collateral and deposit friction drops to near zero. Any asset holder on any chain can engage with your protocol in one transaction.
