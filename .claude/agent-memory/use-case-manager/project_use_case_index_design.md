---
name: Use Case Index Page Design Patterns
description: Visual design decisions and component patterns established for the use-cases index page redesign
type: project
---

## Use Case Color Scheme (index and cards)
Each use case slug maps to a consistent accent color:
- cross-chain-swaps: blue
- cross-pay: purple
- asset-onboarding: emerald
- chain-integration: indigo
- cross-chain-custody: amber

These colors are applied to: icon badge background, revenue hook banner, user type badge pills, and hover border on the card.

## RoleSelector Component
Created `/src/lib/components/ui/RoleSelector.svelte` — a pill-button role picker that:
- Renders all user types from `user-types.ts` with Lucide icons
- Uses `near-green-dark` fill + white text for the active selection
- Has an "All use cases" option that clears the filter
- Is displayed in a bordered card section at the top of the index page

## UseCaseCard Redesign
`/src/lib/components/content/UseCaseCard.svelte` now:
- Shows a Lucide icon in a colored badge (via `iconMap` keyed to the use case's `icon` field)
- Renders a revenue hook banner (from `getRevenueHookForUserType`) only when a filter is active
- Shows human-readable user type names (resolved via `getUserType` from `user-types.ts`, not raw slugs)
- Has an `ArrowRight` icon in the header that nudges on hover via CSS

## Page Loader Change
`+page.ts` now returns both `useCases` and `userTypes` so the index page can render the role selector and context bar without re-importing the data directly in the page component.

## Context Bar Pattern
When a role filter is active, the index page renders a context bar showing:
- The role's icon + name + question string
- A "Clear filter" link
- A subtitle line "Revenue hooks shown for your role" in the results header

**Why:** Makes it obvious to the visitor what they're filtered to, and signals that the revenue hook text on each card is tailored to them.
**How to apply:** Follow this pattern on any future filter-aware list page.
