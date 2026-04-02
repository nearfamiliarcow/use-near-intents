---
name: Cross-Pay and Asset Onboarding page polish
description: Improvements made to cross-pay and asset-onboarding use case pages to match the quality bar of cross-chain-swaps
type: project
---

Cross-pay and asset-onboarding pages were polished to match the cross-chain-swaps quality bar. Key changes:

**CrossPayVisualHero.svelte**
- Replaced ZEC-first scenarios with BTC-first (more universally relatable)
- Added scenario `label` field and replaced static "You pay" uppercase label with the animated scenario label so each card shows its payment context (e.g., "Pay freelancer on Base")
- Sharpened right-side h2 to be integrator-focused: "Your users pay with anything. Recipients get exact stablecoins."

**OnboardingVisualHero.svelte**
- Removed ZODL-specific `appName` field; replaced with generic `appLabel` (e.g., "DeFi lending protocol", "Perps exchange")
- Updated "You receive in {appName}" label to "Arrives in your {appLabel}" — animates out with the scenario transition
- Rewrote h2 to be problem-focused: "Stop losing users to bridging friction. Let anyone deposit from any chain."
- Scenarios now show diverse destination app types across the four slots (lending, L2 DeFi, perps, liquid staking)

**cross-pay.md frontmatter**
- Added `featuredPartners` (ZODL)
- Added a third user story (multi-chain wallet persona)
- Generalized first user story away from ZODL-first to "your wallet app"
- Sharpened tagline to emphasize integrator angle
- Updated body with Integration Options section

**asset-onboarding.md frontmatter**
- Added `featuredPartners` (ZODL)
- Added fourth user story (ZODL as one real example among four)
- Rewrote howItWorksSteps step 4 to say "Your app receives the right token" (app perspective, not user perspective)
- Updated tagline to emphasize "Turn any crypto holder into your user"
- Updated body with Integration Options section and strengthened native BTC section

**Why:** These pages target BD — potential wallet/DEX/DeFi integrators. The original copy was too user-perspective ("pay with anything") vs integrator-perspective ("your users can pay with anything, you configure the fee").

**How to apply:** When writing or reviewing use case page copy, frame the hero headline and description from the integrator's perspective (what their app gains), not the end user's perspective (what they can do).
