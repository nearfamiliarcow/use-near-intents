---
name: Site Structure & Component Library
description: SvelteKit site architecture, routes, content schema, component inventory, and design system tokens
type: project
---

## Stack
- SvelteKit with Svelte 5 runes ($props, $state, $derived, $effect)
- Tailwind CSS v4 with @theme tokens (no tailwind.config.js)
- Markdown via import.meta.glob with frontmatter metadata + rendered HTML body
- lucide-svelte for icons

## Design System Tokens (app.css)
- `near-green` / `near-green-dark` (#00963f) / `near-green-light` — brand colors
- `near-bg` (#fafafa) — page background
- `near-surface` (#ffffff) — card/panel surfaces
- `near-border` (#e5e7eb) — borders
- `near-text` / `near-text-secondary` — text hierarchy
- `near-gray-medium` / `near-light-gray` — muted text

## Routes
- `/` — Homepage (StatsBar, UserTypeSelector, TickerBoard, ChainGrid)
- `/case-studies` — Filtered list of case study cards
- `/case-studies/[slug]` — Full case study detail page
- `/use-cases` — Filtered list of use case cards
- `/use-cases/[slug]` — Use case detail page with UserStoryFlow, revenue model, partner list

## Content Model
### CaseStudy (src/content/case-studies/*.md)
Frontmatter fields: name, slug, logo, url, description, userType, chains[], status (live/building/opportunity), integrationMethod (widget/api/sdk), featured, metrics[], tags[], useCases[]
useCases join: { useCase: slug, summary, flow: string[], logoFlow?: { from: AssetLogo[], to: AssetLogo[] }, screenshots?: string[], captions?: string[], screenshot?: string }
AssetLogo: { symbol: string, logo: string } — logo is a CoinGecko CDN URL from the tokenLogos map in src/lib/data/tokens.ts
When logoFlow is present, case study page renders FlowLogoArrows instead of FlowArrows
Body: markdown prose rendered as HTML, injected via {@html}

### UseCase (src/content/use-cases/*.md)
Frontmatter fields: name, slug, icon, tagline, relevantUserTypes[], demoComponent, sortOrder, revenueHooks{}, userStories[], revenueModel{feeStructure, revShare}
UserStory: { persona, userType, context, app, partnerSlug, steps[], without }

## Component Library
### UI primitives
- `Card.svelte` — rounded-xl border surface; accepts href for link variant
- `Badge.svelte` — pill badge; variants: default/green/yellow/blue
- `StatCard.svelte` — centered value + label (used in StatsBar)
- `FilterBar.svelte` — pill button filter group
- `FlowArrows.svelte` — horizontal step → arrow chain (token flow pills); used on use case pages (text strings only)
- `FlowLogoArrows.svelte` — visual logo-based flow: stacked asset logo circles with arrow between from/to groups; used on case study pages when `logoFlow` is present in frontmatter
- `ZoomableImage.svelte` — click-to-fullscreen image with caption overlay
- `Lightbox.svelte` — imperative fullscreen image viewer (export show())

### Content components
- `CaseStudyCard.svelte` — card with name, description, badges (userType, chains, use cases)
- `UseCaseCard.svelte` — card with name, tagline, userType badges, case study count
- `UserStoryFlow.svelte` — numbered steps + red "without" comparison block

### Section components
- `StatsBar.svelte` — 4-column global stats grid
- `ChainGrid.svelte` — interactive chain logo grid with hover asset panel
- `TickerBoard.svelte` — live token price ticker
- `UserTypeSelector.svelte` — 6-card "what do you build?" selector

## Static Assets
- `/static/logos/zodl.svg` — ZODL logo
- `/static/logos/starknet.png` — Starknet logo (local, used by AVNU case study)
- `/static/screenshots/` — zodl-swap-input.jpg, zodl-swap-confirm.jpg, zodl-crosspay.jpg, zodl-crosspay-confirm.jpg, zodl-onboard-input.jpg, zodl-onboard-confirm.jpg, near-swap-btc-usdc.png, zcash-live-on-raydium.jpg, trustwallet-swap-btc-usdc.jpg

## Published Case Studies
- `zodl.md` — ZODL Zcash wallet; userType: single-chain-wallet; useCases: cross-chain-swaps, cross-pay, asset-onboarding
- `solana.md` — Solana chain integration; userType: blockchain; useCases: bridging, chain-integration, asset-onboarding
- `near-com.md` — near.com official site swap feature; userType: multi-chain-wallet; useCases: cross-chain-swaps, asset-onboarding

## Use Case Slugs (src/content/use-cases/)
asset-onboarding, bridging, chain-integration, cross-chain-custody, cross-chain-swaps, cross-pay

## Content Loading (src/lib/content/index.ts)
- parseCaseStudy / parseUseCase — map frontmatter to typed objects
- getCaseStudiesByUseCase returns { ...caseStudy, joinData } for use case pages
- getRelatedCaseStudies returns { sameUserType[], sharedUseCases[] }

**Why:** Architecture reference for building new components without breaking existing patterns. Always use Svelte 5 runes syntax.
**How to apply:** When creating new components, follow the Card/Badge/StatCard patterns. Use $props() not export let. Use @theme tokens not arbitrary colors.
