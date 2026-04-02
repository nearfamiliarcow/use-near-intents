---
name: Cross-Chain Custody
slug: cross-chain-custody
icon: shield-check
tagline: "Custody assets on any chain using a single wallet signature"
relevantUserTypes:
  - single-chain-wallet
  - multi-chain-wallet
demoComponent: null
sortOrder: 5
revenueHooks:
  default: "Your wallet becomes a multi-chain vault — users hold assets everywhere without switching apps"
  single-chain-wallet: "Turn your single-chain wallet into a multi-chain vault — users custody assets on 31 chains with one key"
  multi-chain-wallet: "One signature controls assets across every chain — simplify key management for your users"
userStories:
  - persona: "Alice"
    userType: single-chain-wallet
    context: "Has an ETH wallet but wants to hold SOL on Solana without a Solana wallet"
    app: "An Ethereum wallet"
    partnerSlug: null
    steps:
      - "Opens her ETH wallet → sees 'Multi-Chain Vault' section"
      - "NEAR Intents chain abstraction derives a Solana address from her ETH key"
      - "Alice sends SOL to her derived Solana address"
      - "SOL is custodied on Solana, controlled by her ETH signature"
      - "Alice can send, swap, or withdraw her SOL — all signed from Ethereum"
    without: "Install a Solana wallet, manage a separate seed phrase, manually bridge assets. Two wallets, two keys, two apps."
  - persona: "Bob"
    userType: single-chain-wallet
    context: "Uses ZODL (Zcash wallet) and wants to hold USDC on Base without leaving ZODL"
    app: ZODL
    partnerSlug: zodl
    steps:
      - "Opens ZODL → navigates to cross-chain holdings"
      - "NEAR Intents derives a Base address from his Zcash key"
      - "Bob receives USDC on Base to his derived address"
      - "USDC sits on Base, fully controlled by his ZODL wallet"
      - "Bob can move it, spend it, or swap it — all from ZODL"
    without: "Install MetaMask or Coinbase Wallet, create new account, bridge assets manually. Defeats the purpose of a privacy-focused single-chain wallet."
  - persona: "A wallet builder"
    userType: multi-chain-wallet
    context: "Wants to support 31 chains without managing 31 different key derivation paths"
    app: "A multi-chain wallet"
    partnerSlug: null
    steps:
      - "Integrates NEAR Intents chain abstraction SDK"
      - "User's single master key derives addresses on all 31 supported chains"
      - "Users see a unified portfolio across all chains"
      - "All transactions signed with one key — no chain-switching UX"
    without: "Implement key derivation for each chain separately. Manage different signing schemes (ECDSA, Ed25519, etc.). Months of engineering per chain."
revenueModel:
  feeStructure: "Fee on cross-chain operations from custodied assets"
  revShare: "Up to 50/50 with integrator"
---

## What is Cross-Chain Custody?

Cross-Chain Custody lets your users hold and control assets on any blockchain using a single wallet signature. Through NEAR Intents chain abstraction, a key on one chain can derive addresses and sign transactions on other chains — without the user ever needing a second wallet.

Your ETH key controls a Solana address. Your Zcash key controls a Base address. One signature, assets everywhere.

## How it Works

1. **User has a wallet on one chain** (e.g., Ethereum)
2. **NEAR Intents chain abstraction derives addresses** on other chains from their existing key
3. **Assets sent to those derived addresses** are fully custodied on the destination chain
4. **The user's original key signs all transactions** — send, swap, withdraw — across all chains
5. **No new seed phrases, no new wallets** — one key rules them all

## Why This Matters

Today, holding assets on multiple chains means managing multiple wallets with multiple keys. This is a security nightmare for users and a UX disaster for wallet builders.

Cross-Chain Custody collapses this. A single-chain wallet becomes a multi-chain vault. Users get the security of one key with the reach of 31 chains.

## For Wallet Builders

Instead of implementing key derivation for every chain (different curves, different standards, months of work per chain), you integrate NEAR Intents once and your wallet supports all 31 chains. Your users see a unified portfolio. Your engineering team ships in weeks, not years.

## The Chain Abstraction Advantage

This is powered by NEAR's chain abstraction layer — the same infrastructure that enables cross-chain swaps and payments. The key insight: NEAR can derive and control accounts on other chains through its multi-party computation (MPC) network. Your user's intent is signed once, and the MPC network executes it on the destination chain.

This means true custody — the assets actually live on the destination chain (not wrapped, not bridged, not synthetic). Native SOL on Solana. Native USDC on Base. Controlled by your ETH key.
