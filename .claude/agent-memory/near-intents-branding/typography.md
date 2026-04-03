---
name: NEAR Intents Typography
description: FK Grotesk typeface usage rules per NEAR AI brand guidelines
type: reference
---

## Primary Typeface: FK Grotesk

All text uses FK Grotesk exclusively. Available weights installed in `/static/fonts/`:
- `FKGrotesk-Black.otf` — weight 900 — use for main headings (h1, hero text)
- `FKGrotesk-Bold.otf` — weight 700 — use for subheadings (h2, h3, card titles)
- `FKGrotesk-Medium.otf` — weight 500 — use for UI labels, nav items, buttons
- `FKGrotesk-Regular.otf` — weight 400 — use for body copy, descriptions, long-form text

## CSS @font-face Declaration
Already set up in `/src/app.css` as `font-family: 'FK Grotesk'` with four weights.

## Tailwind Font Stack
```
--font-sans: 'FK Grotesk', system-ui, -apple-system, sans-serif;
```

## Usage Rules (from brand guidelines)
- FK Grotesk **Black** (900): `font-black` — h1, hero headings, display text
- FK Grotesk **Bold** (700): `font-bold` — h2, h3, card headings
- FK Grotesk **Regular** (400): `font-normal` — body paragraphs, descriptions
- No mixing with other typefaces — FK Grotesk is the single system

## Do NOT
- Do not change the font for logo use (the logo has its own letterforms embedded in SVG)
- Do not use Inter, or other sans-serif fonts
