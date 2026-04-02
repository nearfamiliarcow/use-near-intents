---
name: near.com
slug: near-com
logo: https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png
url: https://near.com
description: "The official NEAR Protocol website ships cross-chain swaps directly — letting anyone trade BTC, ETH, SOL, and 100+ assets from a single browser tab, powered by NEAR Intents."
userType: multi-chain-wallet
chains:
  - near
  - bitcoin
  - ethereum
  - solana
status: live
integrationMethod: api
featured: true
coverImage: /screenshots/near-com-trade-btc-usdc.png
metrics:
  - label: "Chains Supported"
    value: "31"
    period: "available at near.com/swap"
  - label: "Assets Available"
    value: "100+"
    period: "including native BTC & ETH"
  - label: "Settlement"
    value: "~30s"
    period: "cross-chain, no bridging steps"
  - label: "Integration"
    value: "Native"
    period: "built into the official NEAR app"
tags: []
transformation:
  before:
    headline: "NEAR's homepage, no swap capability"
    body: "Users visiting near.com who wanted to trade or move assets had to leave the site entirely — navigating to a DEX, a bridge, or a CEX to do anything with their crypto."
  after:
    headline: "Cross-chain swaps built into the NEAR homepage"
    body: "near.com now ships a full cross-chain swap interface. Anyone can trade BTC, ETH, SOL, USDC, NEAR, and 100+ assets from a single tab — no bridge, no DEX hop, no extra account."
storyBeats:
  - icon: blocks
    label: "The gap"
    body: "The official NEAR website had no built-in way to swap or move assets. Users who wanted to trade had to leave — finding a DEX, bridge, or CEX on their own, often never coming back."
  - icon: zap
    label: "The fix"
    body: "NEAR Intents powers a native swap interface at near.com. Quote, review, confirm — in one place, on the NEAR ecosystem's own front door. A 1.2 BTC to USDC trade executes in ~30 seconds."
  - icon: trending-up
    label: "The signal"
    body: "near.com using NEAR Intents for its own swap feature is the clearest signal of what NEAR Intents enables: production-grade cross-chain swaps that any app can ship, built by the team that knows the stack best."
useCases:
  - useCase: cross-chain-swaps
    summary: "near.com users can swap BTC, ETH, SOL, and 100+ assets directly from the NEAR homepage — powered by NEAR Intents. The screenshot shows a live quote for 1.2 BTC to 81,601 USDC. One tab, one confirmation, ~30 seconds."
    flow:
      - "BTC / ETH / SOL (any chain)"
      - "NEAR Intents"
      - "USDC / NEAR / any asset"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 148
      to:
        assets:
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
          - symbol: USDT
            logo: "https://coin-images.coingecko.com/coins/images/325/small/Tether.png"
        moreCount: 148
    screenshots:
      - /screenshots/near-swap-btc-usdc.png
    captions:
      - "Trading 1.2 BTC for 81,601 USDC on near.com"
  - useCase: cross-chain-custody
    summary: "near.com lets users custody and manage assets across 31 chains from a single NEAR account. One wallet, one signature — hold BTC, ETH, SOL, and more without switching apps or managing multiple keys."
    flow:
      - "NEAR account"
      - "NEAR Intents"
      - "Assets on 31 chains"
    logoFlow:
      from:
        assets:
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
      to:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 28
  - useCase: asset-onboarding
    summary: "near.com serves as an on-ramp for the NEAR ecosystem. Users arriving from Bitcoin, Ethereum, or Solana can swap their native assets into NEAR or any NEAR-ecosystem token — without leaving the site or creating a new account."
    flow:
      - "BTC / ETH / SOL (external chains)"
      - "NEAR Intents"
      - "NEAR / USDC (NEAR ecosystem)"
    logoFlow:
      from:
        assets:
          - symbol: BTC
            logo: "https://coin-images.coingecko.com/coins/images/1/small/bitcoin.png"
          - symbol: ETH
            logo: "https://coin-images.coingecko.com/coins/images/279/small/ethereum.png"
          - symbol: SOL
            logo: "https://coin-images.coingecko.com/coins/images/4128/small/solana.png"
        moreCount: 148
      to:
        assets:
          - symbol: NEAR
            logo: "https://coin-images.coingecko.com/coins/images/10365/small/near_icon.png"
          - symbol: USDC
            logo: "https://coin-images.coingecko.com/coins/images/6319/small/usdc.png"
---

## Why near.com?

near.com is the official home of the NEAR Protocol — the first place developers, users, and newcomers land when they encounter NEAR. It's not just a marketing site. It's the primary interface for the NEAR ecosystem: wallet, explorer, and now, swap.

The decision to ship a cross-chain swap feature directly into near.com — using NEAR Intents — is both a product choice and a statement of confidence. The NEAR team built the swap experience they wanted every partner to be able to offer.

## The Problem

Until recently, near.com had no built-in way to move or trade assets. A user holding Bitcoin who wanted NEAR had to leave the site, find a bridge or DEX that supported NEAR, navigate an unfamiliar interface, and come back. Each step in that journey is a user who doesn't return.

For the NEAR ecosystem, the homepage was a dead end for users who arrived with assets on other chains. There was no native path from "I have ETH" to "I'm in the NEAR ecosystem."

## The Integration

NEAR Intents powers the swap feature at near.com directly. Users select their source asset — BTC, ETH, SOL, or any of 100+ supported tokens — choose a destination, and get an immediate quote. The interface shows exactly what they'll receive before they confirm.

The screenshot shows a live example: 1.2 BTC quoted at 81,601 USDC. No bridge UI, no wrapped token selection, no manual chain configuration. The user sees input and output. They confirm once. NEAR Intents routes the trade through its solver network and settles in roughly 30 seconds.

The integration covers 31 chains and 100+ assets — the full NEAR Intents network — available from the NEAR Protocol's own front door.

## What This Means for Partners

near.com is a reference implementation. When NEAR introduces NEAR Intents to a prospective partner, the pitch is simple: the same swap experience live at near.com is what you can ship.

The near.com integration demonstrates that NEAR Intents is production-ready at the highest-stakes integration point in the ecosystem. If the official NEAR website trusts NEAR Intents to power its swap feature, that signal carries weight in every partner conversation that follows.

## Cross-Chain Custody

Beyond swaps, near.com demonstrates cross-chain custody powered by NEAR Intents. Users can hold and manage assets across 31 chains from a single NEAR account — one wallet, one key, assets everywhere. No need to manage separate wallets for Bitcoin, Ethereum, and Solana.

## Asset Onboarding

For new NEAR users, near.com's swap feature is an on-ramp. A user discovering NEAR for the first time, holding BTC or ETH, can convert directly into NEAR without leaving the site. There's no friction point where they have to find an exchange, buy NEAR separately, and transfer it.

This matters for ecosystem growth. Every chain and every wallet that integrates NEAR Intents can offer the same on-ramp.
