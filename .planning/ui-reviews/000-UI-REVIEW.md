# Phase Live — UI Review

**Audited:** 2026-05-29
**Baseline:** abstract 6-pillar standards + live readiness requirements for `asmaa.video` and `asmaavideo.com`
**Screenshots:** captured for `https://asmaa.video/` desktop/mobile and `/reserve` mobile in `.planning/ui-reviews/live-20260529-225411/`

---

## Pillar Scores

| Pillar | Score | Key Finding |
|--------|-------|-------------|
| 1. Copywriting | 4/4 | Arabic-first wedding copy is specific, conversion-led, and avoids customer-visible admin wording on public routes. |
| 2. Visuals | 3.5/4 | Primary hero is polished; the live screenshot exposed mobile floating WhatsApp overlap, and local CSS now hides it on mobile pending deployment. |
| 3. Color | 3/4 | Palette is premium and consistent, but dark/gold dominates heavily; sage/rose are too restrained to create a full 60/30/10 balance. |
| 4. Typography | 3/4 | Arabic display hierarchy works, but CSS has 40+ distinct font-size values and 5 weight values, increasing drift risk. |
| 5. Spacing | 3/4 | Responsive layout passes overflow/tap-target checks, but spacing uses many one-off px/rem values instead of a tighter scale. |
| 6. Experience Design | 3/4 | Reserve flow, admin hiding, sitemap/llms, and axe checks pass locally; support-domain HTTPS remains blocked live. |

**Overall: 19.5/24**

---

## Top 3 Priority Fixes

1. **`asmaavideo.com` HTTPS timeout** — users and crawlers cannot use the support domain securely — replace Namecheap URL forwarding with DNS hosting that supports HTTPS redirect to `https://asmaa.video/`.
2. **Deploy sitemap correction** — live `https://asmaa.video/sitemap.xml` still included noindex `/reserve` during audit, while local source now excludes it — deploy current build and re-curl the live sitemap.
3. **Deploy mobile CTA correction** — local CSS now hides `.floating-whatsapp` on mobile and the verifier asserts it stays hidden, but production still needs the new build.

---

## Detailed Findings

### Pillar 1: Copywriting (4/4)

- PASS: Public copy is Arabic-first and bride-specific in `app/page.tsx`, `components/ReservationExperience.tsx`, and `lib/content.ts`.
- PASS: Generic labels like `Submit`, `Click Here`, `OK`, and `No data` were not found in public UI scans.
- PASS: Customer-visible public pages do not expose admin links; `npm run verify:launch` confirms the homepage hides `/admin`.

### Pillar 2: Visuals (3.5/4)

- FIXED LOCALLY: Live mobile screenshot showed `.floating-whatsapp` overlapping the first `.proof-chip`; local CSS now hides the floating pill on mobile and the verifier checks it.
- PASS: Desktop hero has a clear focal point, real brand imagery, visible Arabic headline, package proof chips, and primary/secondary CTAs.

### Pillar 3: Color (3/4)

- WARNING: `app/globals.css` uses accent-like gold/champagne values about 80 times. The result is coherent but close to a dark/gold single-theme read.
- PASS: Contrast-sensitive controls are strong in screenshots and launch axe checks found no serious issues with color contrast disabled only in the automated rule set.

### Pillar 4: Typography (3/4)

- WARNING: CSS scan found 40+ distinct `font-size` values and weights `400/700/800/900/950`. This can drift across future content additions.
- PASS: Mobile H1 sizes are controlled by automated verification across homepage, reserve, FAQ, portfolio, guides, and city pages.

### Pillar 5: Spacing (3/4)

- WARNING: `app/globals.css` contains many one-off spacing values, including `5px`, `7px`, `14px`, `18px`, `22px`, `28px`, and multiple clamp expressions.
- PASS: `npm run verify:launch` reports no horizontal overflow and comfortable tap targets on tested mobile routes.

### Pillar 6: Experience Design (3/4)

- BLOCKER to 10/10: `https://asmaavideo.com/` times out on HTTPS because it is still on Namecheap forwarding; `http://asmaavideo.com/` redirects through Namecheap then to `https://asmaa.video/`.
- WARNING: Live sitemap still needed deployment at audit time to match the local fix excluding noindex `/reserve`.
- PASS: Reserve page preselects city/package from query strings, admin route is absent from public launch build, `robots.txt`, `llms.txt`, and structured data checks pass locally.

---

## Registry Safety

Skipped: `components.json` was not present, so no shadcn third-party registry audit applied.

---

## Files Audited

- `app/page.tsx`
- `app/reserve/page.tsx`
- `components/ReservationExperience.tsx`
- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/admin/page.tsx`
- `app/globals.css`
- `lib/content.ts`
- `lib/metadata.ts`
- `lib/reservations.ts`
- `public/llms.txt`
- `scripts/verify-launch.mjs`
- live `https://asmaa.video/`, `/reserve`, `/robots.txt`, `/sitemap.xml`, `/llms.txt`
- live `https://asmaavideo.com/` and `http://asmaavideo.com/`
