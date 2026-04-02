---
name: Asset Onboarding
slug: asset-onboarding
icon: download
tagline: "Turn any crypto holder into your user — they deposit from their chain, your app gets what it needs"
coverImage: /screenshots/zodl-onboard-input.jpg
screenshots:
  - src: /screenshots/zodl-onboard-input.jpg
    caption: "Selecting a source asset to deposit into ZODL — send ETH from Ethereum, receive ZEC in the app"
    source: "ZODL"
  - src: /screenshots/zodl-onboard-confirm.jpg
    caption: "Confirming a cross-chain deposit in ZODL — one signature, assets arrive in ~30 seconds"
    source: "ZODL"
relevantUserTypes:
  - single-chain-wallet
  - multi-chain-wallet
  - blockchain
  - dex
  - aggregator
  - lending
  - perps
  - liquid-staking
  - yield-vault
  - trading-bot
  - ai-agent
  - bridge
  - payment-app
demoComponent: OnboardingDemo
sortOrder: 3
revenueHooks:
  default: "Every cross-chain deposit into your app = a user you would have lost to bridging friction"
  single-chain-wallet: "Anyone with crypto anywhere can become your user — no CEX or bridge required"
  blockchain: "Cross-chain deposits grow your ecosystem's TVL without users manually bridging"
  dex: "Traders from 31 chains can fund and trade directly — more users, more volume, more fees"
  lending: "Borrowers deposit collateral from any chain — expand your addressable market overnight"
  perps: "Traders fund margin from any chain in one step — lower the barrier, increase open interest"
  liquid-staking: "Accept staking deposits from any chain — a Bitcoin holder stakes with one transaction"
  yield-vault: "Users deposit into your vault from any chain — one step instead of bridge + swap + deposit"
userStories:
  - persona: "A BTC holder"
    userType: lending
    context: "Wants to deposit BTC as collateral on a lending protocol on Base, but has never used Base"
    app: "A lending protocol on Base"
    partnerSlug: null
    steps:
      - "Opens the lending app → clicks 'Deposit Collateral'"
      - "Sees 'Bitcoin (BTC)' in the source chain selector"
      - "Selects amount — app previews cbBTC equivalent on Base"
      - "Sends BTC to a generated deposit address (no Base wallet needed)"
      - "cbBTC appears as collateral in their lending position in ~30s"
    without: "Send BTC to a CEX, convert to cbBTC, bridge to Base, deposit into lending protocol. 4 steps, 15-30 min, ~3% in fees."
  - persona: "An Ethereum user"
    userType: blockchain
    context: "Wants to use a Starknet DeFi app but has never bridged to Starknet before"
    app: "A DeFi app on Starknet"
    partnerSlug: null
    steps:
      - "Opens a Starknet DeFi app → clicks 'Deposit'"
      - "Selects 'ETH on Ethereum' as source"
      - "Previews: 0.5 ETH → ETH on Starknet"
      - "Signs one Ethereum transaction"
      - "ETH arrives on Starknet ready to use — user never touched a bridge"
    without: "Find the Starknet bridge, understand the process, wait for L1→L2 finality, then manually deposit into the DeFi app. Many users give up before completing."
  - persona: "A SOL holder"
    userType: perps
    context: "Wants to open a leveraged position on an Arbitrum perps exchange with SOL collateral"
    app: "A perps exchange on Arbitrum"
    partnerSlug: null
    steps:
      - "Opens perps exchange → clicks 'Fund Account'"
      - "Selects 'SOL on Solana' from the chain selector"
      - "NEAR Intents previews: 10 SOL → USDC on Arbitrum"
      - "Signs one Solana transaction"
      - "USDC appears in their margin account — position opened immediately"
    without: "Bridge SOL to Arbitrum via a cross-chain bridge, swap to USDC on an Arbitrum DEX, then deposit. Three separate steps across two apps."
  - persona: "A wallet user"
    userType: single-chain-wallet
    context: "Has ETH on Ethereum, wants to try a Zcash-based privacy wallet app"
    app: "ZODL"
    partnerSlug: zodl
    steps:
      - "Opens ZODL → taps Deposit"
      - "Selects 'ETH on Ethereum' as source"
      - "App previews: 0.5 ETH → receives ZEC in ZODL"
      - "Signs one Ethereum transaction"
      - "ZEC appears in ZODL wallet in ~30 seconds — ready to use"
    without: "Find a CEX that supports both ETH and ZEC, complete KYC, deposit ETH, trade to ZEC, withdraw to ZODL. ~30 min and ~3% in fees."
howItWorksSteps:
  - icon: LayoutGrid
    title: User selects their source asset
    detail: "Your deposit UI shows a chain and token selector. The user picks what they hold — BTC on Bitcoin, ETH on Ethereum, SOL on Solana, or any of 100+ assets across 31 chains. Your app defines the destination token it needs to receive."
    color: "#627EEA"
    chainPill: Any asset, any chain
  - icon: Cpu
    title: Intents routes the conversion
    detail: "Solvers compete to convert the user's source asset to your app's required token at the best available rate. Settlement is handled trustlessly on NEAR. You configure your own fee, charged on top of each deposit."
    color: "#00c853"
    chainPill: NEAR Intents solver network
  - icon: PenLine
    title: Sign once — or just send
    detail: "If the user has a connected wallet, they sign one transaction on their source chain. If not, generate a static deposit address — the user sends from any wallet or exchange with no chain-specific wallet support needed."
    color: "#F7931A"
    chainPill: Two ways in
  - icon: CheckCircle
    title: Your app receives the right token (~30s)
    detail: "The required token lands on your chain, ready to use — converted, settled, and delivered in a single step. No bridging UI to explain, no failed transactions, no user drop-off."
    color: "#9945FF"
    chainPill: Lands on your chain
revenueModel:
  feeStructure: "Configurable fee per deposit — typically 20 to 100 basis points. Fees are fully customizable per route, so you can set lower fees for like-to-like deposits and higher fees for cross-asset or cross-chain deposits. You keep the fees you configure."
  revShare: ""
---

## What is Asset Onboarding?

Asset Onboarding lets users deposit into your app from any chain — they send what they have (ETH on Ethereum, BTC on Bitcoin, SOL on Solana, and 100+ more), and your app receives exactly the token it needs, automatically converted and delivered.

This is the universal "deposit from anywhere" button. Add it once; every crypto holder on 31 chains can become your user.

## How it Works

1. **User wants to deposit into your app** — but their assets are on a different chain
2. **Your app shows a "Deposit from any chain" option** — powered by NEAR Intents
3. **User selects their source asset and chain** — from a token selector your app renders
4. **NEAR Intents routes and converts** — solvers compete to deliver the best rate
5. **One transaction, one signature** — or a static deposit address for walletless flow
6. **Your app receives the required token** — on your chain, in ~30 seconds

## Why This Matters

The biggest source of user drop-off in any on-chain app is cross-chain friction. A user holds BTC on Bitcoin but your app runs on Base. They need to bridge, swap, then deposit — three separate steps across apps they may never have used. Most give up.

Asset Onboarding collapses the entire flow into one step. You stop losing users at the deposit screen.

## The Native BTC Advantage

NEAR Intents uniquely supports native UTXO chains — Bitcoin, Dogecoin, Litecoin, Bitcoin Cash, Zcash, and Dash. A Bitcoin holder can deposit native BTC directly into your app on any EVM chain, where it arrives as cbBTC, WBTC, or tBTC automatically. No other cross-chain protocol handles native UTXO at this scale.

With $7.9B in WBTC and $6.0B in cbBTC, the addressable market for BTC onboarding alone is massive — and mostly inaccessible to apps that only accept EVM deposits.

## Integration Options

- **Widget** — Drop-in deposit UI. Integration time: ~1 day.
- **API** — Full control over the deposit UX. Integration time: ~1 week.
- **Deposit Addresses** — Generate static addresses for any source chain. Users deposit from any wallet or exchange with zero wallet connection required.
