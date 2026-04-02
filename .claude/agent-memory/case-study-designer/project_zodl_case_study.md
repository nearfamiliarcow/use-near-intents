---
name: ZODL Case Study
description: ZODL (formerly Zashi) case study details, current page state, screenshots inventory, and use case joins
type: project
---

## Partner
- ZODL (formerly Zashi) — flagship Zcash wallet by Electric Coin Company
- Privacy-first mobile wallet, single-chain (Zcash), integrated NEAR Intents API in 2 weeks
- URL: https://zodl.com
- Slug: zodl, userType: single-chain-wallet

## Key Metrics (frontmatter)
- 31 chains connected
- 100+ assets available
- 2 weeks integration time
- 1 tap user experience
- ~30s avg swap time
- Revenue share model

## 3 Use Case Joins
1. asset-onboarding — HEADLINE capability; ecosystem growth angle: anyone with any crypto can join Zcash ecosystem by depositing into ZODL; no account creation needed; replaces the CEX onboarding path
2. cross-chain-swaps — ZEC → any asset on 31 chains, 1 tap ~30s; existing Zcash users staying connected to broader DeFi
3. cross-pay — pay anyone in any token from ZEC; merchant example (ZEC → USDC on Base)

## Narrative Framing (established in rewrite, maintain going forward)
- ZODL = official Zcash wallet, Zcash infrastructure only, single-chain by design
- Problem: CEX was the only onramp → high friction, slow, required accounts
- NEAR Intents = ecosystem rails; didn't change what ZODL is, changed who can reach it
- Do NOT mention KYC — frame friction as account creation / multi-step process / time
- Asset onboarding leads the narrative because it's the ecosystem growth lever
- Swaps + cross-pay are secondary: they serve existing users, not new ecosystem entrants
- Result section should anchor to the $3.13M fees figure as proof of ecosystem activity

## Screenshots (all live in /static/screenshots/)
- zodl-swap-input.jpg — "Getting a quote to swap Zcash from ZODL to USDC in an external wallet"
- zodl-swap-confirm.jpg — "Review & confirm the cross-chain swap"
- zodl-crosspay.jpg — "Paying 5 USDT to an Ethereum address using ZEC from ZODL — one tap, no bridging"
- zodl-crosspay-confirm.jpg — "Reviewing the cross-pay details — 0.0212 ZEC covers 5 USDT plus fees"
- zodl-onboard-input.jpg — "Depositing 1 BTC from Bitcoin into ZODL — arrives as ZEC with no extra steps"
- zodl-onboard-confirm.jpg — "Reviewing the quote — 1 BTC converts to 264.22 ZEC at $67,642"

## Current Page Structure (case-studies/[slug]/+page.svelte)
1. Hero section — logo, badges, name, description, external link
2. MetricsBar — 4 key numbers
3. STORY SECTION (between MetricsBar and use case cards) — currently showing BOTH design options for comparison:
   - Option 1: TransformationStrip (before/after panel, data from frontmatter.transformation)
   - Option 2: StoryBeats (3-card scannable narrative, data from frontmatter.storyBeats)
   - Prose markdown commented out (not deleted)
4. "How ZODL Uses NEAR Intents" — use case cards (summary + FlowArrows + before/after comparison + screenshots)
5. Integration Details — 3 Cards (method, chains, status)
6. Related case studies (sameUserType, sharedUseCases)
7. CTA block

## Transformation + StoryBeats Data (added to ZODL frontmatter)
transformation.before: "Single-chain Zcash wallet" / CEX friction copy
transformation.after: "Entry point for the Zcash ecosystem" / 100+ assets, 31 chains copy
storyBeats: 3 beats — lock (The wall), zap (The rails), trending-up (The result)

## Components Built
- TransformationStrip.svelte — before/after split panel; red left, green right, arrow divider; data-driven via TransformationData type
- StoryBeats.svelte — 3-column icon+label+body cards; icon map: lock/zap/trending-up; accent colors per index (red/blue/emerald)
- Both in src/lib/components/ui/

## Type Extensions (src/lib/types/index.ts)
- TransformationData: { before: { headline, body }, after: { headline, body } }
- StoryBeat: { icon: string, label: string, body: string }
- CaseStudy extended with: transformation?: TransformationData, storyBeats?: StoryBeat[]
- parseCaseStudy() in src/lib/content/index.ts also updated to pass these through

## Before/After (hardcoded in page template, not data-driven)
- With: "One tap, ~30 seconds, one signature"
- Without: "CEX, KYC, multiple steps, 30+ minutes"
Note: these strings are baked into the page template use case cards, not sourced from frontmatter

## Use Case Page (use-cases/[slug]/+page.svelte) Current State
- Text-heavy: prose content + UserStoryFlow cards + revenue model + partner list
- No screenshots shown on use case pages
- Partner cards show only name, description, badges, and FlowArrows — no visuals
- UserStoryFlow has numbered steps + red "without" block but is dense text
