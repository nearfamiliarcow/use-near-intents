---
name: Site Brand Implementation Status
description: What was updated in the use-near-intents SvelteKit site to match NEAR Intents brand guidelines
type: project
---

## Changes Made (2026-04-02)

### Colors: Green → Orange
The original site used green (`#00c853`, `#00963f`) which was off-brand. All updated to NEAR Intents orange (`#fb4d01`).

**Why:** NEAR Intents logo system uses orange (#fb4d01) as its accent, not green. Green was a placeholder.

### Files Updated
- `src/app.css` — full color palette rewrite: orange tokens, neutral palette from brand guidelines, FK Grotesk @font-face declarations
- `src/app.html` — favicon links (SVG + PNG Tertiary logo), theme-color meta tag
- `src/routes/+layout.svelte` — removed redundant favicon import, added OG meta tags
- `src/lib/components/layout/Header.svelte` — replaced text wordmark with `NEAR_Intents_Logo_Primary_Black.svg` image
- `src/lib/components/layout/Footer.svelte` — replaced text wordmark with logo image
- `src/routes/+page.svelte` — green → orange on hero and CTA button
- `src/lib/components/use-cases/UseCaseProofBar.svelte` — emerald gradient → orange tint gradient
- 8x visual hero components — replaced hardcoded `#00c853`/`#00963f` inline styles with `#fb4d01`

### Assets Added
- `/static/fonts/FKGrotesk-Black.otf` (weight 900)
- `/static/fonts/FKGrotesk-Bold.otf` (weight 700)
- `/static/fonts/FKGrotesk-Medium.otf` (weight 500)
- `/static/fonts/FKGrotesk-Regular.otf` (weight 400)
- `/static/logos/*.svg` — all 7 SVG logo variants
- `/static/logos/NEAR_Intents_Logo_Tertiary.png` — favicon PNG fallback

### Backward Compatibility
CSS custom properties `near-green`, `near-green-dark`, `near-green-light` kept as aliases pointing to orange values, so any components still using these class names continue to work.

## Comprehensive Branding Audit (2026-04-02)

A full audit was completed after the initial migration. Additional fixes applied:

### Components fixed
- `SwapVisualHero.svelte` — CTA button, swap arrow icon, "User receives" panel, stat values, "31 chains" pill, "Powered by" text
- `CrossPayVisualHero.svelte` — "31 chains" pill, CTA button, arrow icon, stat values, "Powered by" text
- `BridgingVisualHero.svelte` — NEAR Intents badge dot/text/arrow, CTA button, stat values, "Powered by" text
- `EarnVisualHero.svelte` — NEAR Intents routing badge, CTA button, stat values, "Powered by" text
- `CustodyVisualHero.svelte` — MPC badge dot/text, CTA button, stat values, "Powered by" text
- `OnboardingVisualHero.svelte` — "Your app receives" panel (emerald → orange-light), "Powered by" text
- `SwapUserStory.svelte` — "With NEAR Intents" label, partner link color, step connector line, outcome callout (emerald → orange-light)
- `TransformationStrip.svelte` — "With NEAR Intents" after-panel (emerald-50 → near-orange-light)
- `UseCaseHero.svelte` — pill border/bg, animated dot, NEAR hub node, heading accent
- `UseCaseProofBar.svelte` — metric values, label dot, divider color
- `FilterBar.svelte` — active filter button bg
- `RoleSelector.svelte` — active role button border/bg, hover border
- `FlowLogoArrows.svelte` — arrow color
- `FlowArrows.svelte` — arrow color
- `StatCard.svelte` — value text
- `MetricsBar.svelte` — value text (both variants)
- `Card.svelte` — hover border
- `PartnerScreenshots.svelte` — hover border, focus ring, partner name label
- `UserStoryFlow.svelte` — persona text, step circle bg/text
- `UseCaseCard.svelte` — fallback color scheme (orange instead of emerald)
- `ChainGrid.svelte` — active item bg/ring, chain name accent
- `TickerBoard.svelte` — active card border/bg, hover border, show-more button hover

### Route pages fixed
- `src/routes/use-cases/[slug]/+page.svelte` — partner pill hover, CTA button
- `src/routes/use-cases/+page.svelte` — user type context icon bg/color
- `src/routes/case-studies/[slug]/+page.svelte` — transformation panel, links, CTA buttons, secondary button hover

### Markdown content fixed
- All 6 use-case `.md` files: `color: "#00c853"` → `color: "#fb4d01"` on NEAR Intents network flow steps

### Deliberately preserved as-is (not brand accent)
- `Badge.svelte` `green` variant (`bg-emerald-50 text-emerald-700`) — semantic "live" status
- `StoryBeats.svelte` third beat emerald colors — sequential decorative palette (red/blue/green), not brand accent
- `UseCaseCard.svelte` per-slug color schemes (blue, purple, emerald, indigo, cyan, amber, teal) — intentionally distinct per use case
- `case-studies/[slug]/+page.svelte` `useCaseColors` map emerald entry for `asset-onboarding` — same per-use-case rationale
