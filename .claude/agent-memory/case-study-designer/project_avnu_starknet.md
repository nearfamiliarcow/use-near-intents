---
name: AVNU / Starknet Case Study
description: AVNU case study details, Starknet chain integration, and bridging use case creation context
type: project
---

## AVNU Case Study (avnu.md)

AVNU is Starknet's leading DEX aggregator. The case study covers two simultaneous events:
1. Starknet was added as a supported chain on the NEAR Intents network
2. AVNU integrated NEAR Intents via API — the first Starknet app to do so

Key details:
- slug: `avnu`
- userType: `dex`
- chains: `starknet`, `zcash`, `ethereum`
- status: `live`, integrationMethod: `api`, featured: `true`
- Logo: external URL (no static file in /static/logos/) — using raw GitHub URL for AVNU brand repo
- Use case joins: `bridging` (primary), `chain-integration`, `asset-onboarding`

**Why the logo is external:** No avnu.svg in /static/logos/. Using external URL avoids prerender 404 error. The case study page has an onerror handler on the img tag so broken logos degrade gracefully.

## Bridging Use Case (bridging.md)

New use case added to src/content/use-cases/bridging.md

Key distinctions vs. related use cases:
- **Bridging** = moving assets to a new destination chain (same or equivalent asset, new ecosystem access)
- **Cross-Chain Swaps** = exchanging different assets across chains (user wants a different asset)
- **Asset Onboarding** = depositing into a specific app from another chain (app-centric framing)

Frontmatter details:
- slug: `bridging`
- icon: `bridge`
- sortOrder: `2` (slots between cross-chain-swaps:1 and asset-onboarding:3)
- demoComponent: `null` (no interactive demo yet)
- featuredPartners: AVNU (using same external logo URL)
- relevantUserTypes: blockchain, dex, aggregator, bridge, lending, yield-vault, single-chain-wallet, multi-chain-wallet

**Why:** Bridging as a use case is distinct from cross-chain swaps because the user intent is ecosystem participation, not asset exchange. The UTXO chain story (ZEC/BTC/DOGE to Starknet) is the headline differentiator.

**How to apply:** When creating case studies for chains or apps where "bringing new assets to a destination" is the value prop, use bridging as the primary use case. When the value is "swap X for Y," use cross-chain-swaps.
