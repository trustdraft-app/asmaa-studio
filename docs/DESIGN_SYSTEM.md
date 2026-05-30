# Asmaa Studio — Design System (Figma master spec)

**Status:** Spec authoritative; Figma file to be created by Mohammed using these tokens.
**Source of truth:** `docs/design-tokens.json` (W3C Design Tokens format) + `app/globals.css` (CSS variables).
**Updated:** 2026-05-30

## Why this document exists
Mohammed wants a world-class Figma library, but the Figma file must be created by an authenticated user (Mohammed) — Maestro cannot do that without his Figma seat credentials. This spec gives the Figma file a complete, pre-validated blueprint so building the library in Figma is mechanical: open a fresh file, import `docs/design-tokens.json` via the Tokens Studio plugin, paste the component specs below.

## Token files
- `docs/design-tokens.json` — W3C-format tokens, importable via Tokens Studio for Figma
- `app/globals.css` :root block — CSS variables, source of truth for the live site

## Foundations

### Color
Five-tier system:
1. **Ink family** (`--ink` #0c0c0d → `--ink-soft` #171514) — backgrounds
2. **Ivory family** (`--ivory` #fff8ec, `--muted` rgba(255,248,236,0.72)) — text on dark
3. **Gold family** (`--champagne` #c99953, `--gold` #f1cb82, `--sand` #d8c7a5) — accents and CTAs
4. **Warm tertiary** (`--rose` #d58a86) — reserved for special moments
5. **Cool tertiary** (`--sage` #829176) — reserved use only

### Typography
Three families:
- **Display Arabic:** Noto Kufi Arabic 700 — headings and brand wordmark
- **UI Arabic:** IBM Plex Sans Arabic 400/700 — body and UI
- **Display Latin:** Cormorant Garamond 700 italic — Latin display, romantic feel
All self-hosted via `next/font/google` at build time (no runtime fetch).

### Motion
- Premium ease-out: `cubic-bezier(0.23, 1, 0.32, 1)` — entrance animations
- Premium ease-in-out: `cubic-bezier(0.77, 0, 0.175, 1)` — page transitions, scroll-triggered
- Durations: 180ms / 240ms / 420ms

### Spacing & Tap Targets
- WCAG 2.5.5 minimum: **44×44px** (CI gate enforced)
- Comfort minimum: **48×48px** (used on PDF download CTA)
- Section gap: 96px
- Card padding: 22px

## Component library (Figma file structure)

The Figma file should be organized into 7 pages:

### Page 1 — Tokens & Foundations
- Color swatches table
- Type ramp at 5 weights × 3 families
- Shadow examples × 3
- Motion examples (record into video frames)

### Page 2 — Atomic components
- Button / Primary CTA (`.cta` — gold gradient pill, ≥48px height)
- Button / Ghost CTA (`.ghost-cta` — transparent with gold border)
- Button / Nav WhatsApp pill (`.nav-whatsapp` — green-tinted accent)
- Input / Text field (used in `/reserve`)
- Select / Dropdown (used in `/reserve`)
- Badge / Eyebrow label (`.eyebrow`)

### Page 3 — Cards
- Operating card (`.operating-card`)
- Package card (`.package-card-20x` — with featured variant)
- Moment card (`.moment-card`)
- Highlight card (`.highlight-card`)
- Add-on card (`.addon-card` — Phase 2)
- Payment step card (`.payment-step` — Phase 2)
- Trust credential card (`.trust-credential` — Phase 2)
- Guide card (`.guide-card`)

### Page 4 — Compositions
- Hero (`.hero-20x` with bilingual h1 + dock + photo stack)
- Packages grid (5 cards)
- Cities band
- Highlights grid (13 highlights)
- Payment terms section (Phase 2)
- Add-ons section (Phase 2)
- Payment trust footer (Phase 2)

### Page 5 — Pages (artboards)
- `/` (mobile 390×844 + desktop 1440×1200)
- `/reserve`
- `/portfolio`
- `/faq`
- `/zaffa`
- `/guides` + each guide
- Each city: alahsa, dammam, khobar (+ 6 new in Sprint 3)

### Page 6 — Instagram highlight covers
- Import the 8 SVGs from `marketing/instagram-highlights/`
- Display in 4×2 grid at 1080×1080 each

### Page 7 — Brand rules
- Banned phrase list (the 23 from `scripts/verify-launch.mjs`)
- Female-only context rule (llms.txt ONLY, not visible)
- No Mohammed personal handles
- No Stripe

## How to bring this into Figma
1. Create a new Figma file: **Asmaa Studio — Design System v2026.05**
2. Install the **Tokens Studio for Figma** plugin
3. In Tokens Studio, click "+ Import" and select `docs/design-tokens.json`
4. Create the 7 pages above; on Page 1, draw color swatches by reading the token values
5. On Page 2-4, build components and bind their fills/text styles to the imported tokens
6. On Page 5, build the artboards by composing Page 2-4 components
7. Publish as a Team Library

Once published, the Figma file URL goes into the README of this repo and becomes the canonical source of truth for new designs. Component changes propagate from Figma → tokens.json → globals.css via the planned `scripts/tokens-to-tailwind.mjs` (Phase 4).

## Brand-rule pre-check applied to this system
- No `نسائي 100%` badge component in the library ✅
- Female-only context lives in `llms.txt` only — NOT a Figma component ✅
- No personal handles in the sameAs list — only `@asmaa.video` IG/TikTok ✅
- No Stripe checkout in any composition — payment terms are bank transfer + 50% deposit ✅
