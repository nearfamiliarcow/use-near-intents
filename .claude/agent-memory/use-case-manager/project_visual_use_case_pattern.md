---
name: Visual use case detail page pattern
description: How visual sections are conditionally rendered for specific use cases vs the default text layout in [slug]/+page.svelte
type: project
---

The `[slug]/+page.svelte` template uses a branching pattern: `isSwapUseCase` (slug === 'cross-chain-swaps') renders the visual layout; all other slugs fall through to the existing default layout. The gate is `data.useCase.slug`, not the `demoComponent` field — more explicit and predictable.

**Why:** Allows progressive visual enhancement of specific use cases without breaking the shared template for others.

**How to apply:** When adding a new visual use case, add a new `is[Name]UseCase` derived, a new `{#if}` branch in the template, and create a parallel set of components in `src/lib/components/use-cases/`.

Visual component set for cross-chain-swaps:
- `SwapVisualHero.svelte` — animated mock swap card cycling through token pairs + value prop copy
- `SwapHowItWorks.svelte` — 4-step animated flow (pick → route → sign → arrive) with auto-play + manual step selection
- `SwapUserStory.svelte` — side-by-side before/after grid replacing plain UserStoryFlow for this use case
- `PartnerScreenshots.svelte` — screenshot gallery with phone-frame chrome + full lightbox (keyboard nav); accepts `{ src, caption, partnerName, partnerLogo?, partnerSlug? }[]`
- `UseCaseProofBar.svelte` — green gradient metric bar, accepts `metrics: Metric[]` + optional `label`/`labelHref`

Visual component set for cross-pay (slug: 'cross-pay'):
- `CrossPayVisualHero.svelte` — payment card cycling through "You pay / Recipient gets" scenarios; tabs: Direct Pay / Payment Link (QR). Stat: "exact recipient amount" instead of settlement time.
- `CrossPayHowItWorks.svelte` — 4-step flow (enter details → route → sign or share link → exact delivery). 7200ms auto-play, same stepper pattern as SwapHowItWorks.

Visual component set for asset-onboarding (slug: 'asset-onboarding'):
- `OnboardingVisualHero.svelte` — deposit card cycling through "You deposit / You receive in [App]" scenarios; tabs: Connected Wallet / Deposit Address. Stat: "native BTC support" highlight.
- `OnboardingHowItWorks.svelte` — 4-step flow (select asset → generate route → sign or deposit → native token arrives). 7200ms auto-play.

Screenshots are sourced dynamically from `data.caseStudies[].joinData.screenshots` — so adding screenshots to any case study's `.md` file automatically populates the gallery on the use case page with zero template changes. Use-case-level screenshots can also be specified in frontmatter (`screenshots` array with `src`, `caption`, `source` fields).

Partner logos are served from `/logos/` via the `CaseStudy.logo` field.

cross-pay.md and asset-onboarding.md frontmatter: both now have `coverImage`, `screenshots` (ZODL zodl-crosspay/zodl-onboard screenshots), and an updated `feeStructure` matching the swap pattern ("typically 20–100 bps, customizable per route"). `revShare` is empty string (not shown in visual layout).
