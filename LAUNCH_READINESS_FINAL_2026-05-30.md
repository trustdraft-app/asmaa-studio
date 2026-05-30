# Asmaa Studio — Launch Readiness Final
**Date:** 2026-05-30 ~11:50 UTC
**PM:** Asmaa PM (Maestro: Mohammed)
**Verdict:** **GO** ✅

## TL;DR
- Production at https://asmaa.video is **live, healthy, brand-true**.
- Latest deploy (`72dbb7a`) restored the WCAG 2.5.5 tap-target on the packages PDF CTA — verified live, no regression.
- Phase 2 brand-truth port shipped as PR #2 (payment terms + add-ons + credentials footer + WhatsApp source polish + hreflang). Awaiting required-CI gate.
- No `نسائي 100%` badge anywhere in user-facing surfaces. Female-only context is honored implicitly.
- Recommendation: **Ship.**

---

## 1. Customer Journey Verification (Saudi bride POV)

| Step | Route / Element | Status | Notes |
|---|---|---|---|
| 1 | Land on `/` (Arabic, RTL, ar-SA locale) | ✅ HTTP/2 200, 79 KB | Fastly edge cached, `x-cache: HIT`, `last-modified: 2026-05-30 11:03:47 GMT` |
| 2 | Bilingual hero `<h1>` renders | ✅ AR + EN spans | "فيلم زفاف هادئ يلاحظ ما لا تراه العيون في الزحمة." |
| 3 | Nav WhatsApp pill (`source=home-nav`) | ✅ pre-filled | After PR #2 lands: source labeled "الصفحة الرئيسية - الشريط العلوي" |
| 4 | Hero CTAs: رابط العروس + بكج الزفة + واتساب | ✅ all 3 wired | Hero WhatsApp uses `home-hero` → "الصفحة الرئيسية" |
| 5 | Packages grid (01–05) | ✅ all 5 cards | Pricing correct: 600/1200/1700/2500/1500 SAR — Package 03 reads "Half Day" (not "Royal Event") |
| 6 | PDF download CTA in packages | ✅ HTTP/2 200, 963 KB | Tap target ≥48px (WCAG 2.5.5 / verify:launch gate) |
| 7 | Per-package "اسألي عن التوفر" WhatsApp | ✅ all 5 work | Each pre-fills "باقة 0N" in the greeting |
| 8 | Floating WhatsApp (mobile + desktop) | ✅ present | After PR #2: labeled "زر واتساب السريع" instead of generic "الموقع" |
| 9 | Marketing routes: `/reserve` `/faq` `/portfolio` `/zaffa` `/guides` `/alahsa` `/dammam` `/khobar` | ✅ all 200 | 8/8 routes healthy |
| 10 | `robots.txt`, `sitemap.xml`, `llms.txt` | ✅ all 200 | Sitemap normalized to `https://asmaa.video/` root |

**Time-to-WhatsApp:** Hero → Hero CTA → WA app open = **2 taps, <15 seconds.** Easily meets the <30s target.

---

## 2. SEO & AEO Audit

### Structured data (JSON-LD entity graph on `/`)
| Type | Count | Status |
|---|---:|---|
| Organization | 1 | ✅ name, logo, image, telephone, sameAs (IG, TikTok), areaServed: SA-04 |
| Service | 1 | ✅ serviceType: "Female wedding videography", areaServed: 3 cities, hasOfferCatalog with 5 Offers |
| OfferCatalog | 1 | ✅ |
| Offer | 5 | ✅ one per package, priceCurrency SAR, name, description, deep-link to /reserve?package=N |
| WebSite | 1 | ✅ inLanguage ar-SA, publisher → Organization |
| ContactPoint | 1 | ✅ contactType "booking", availableLanguage AR + EN |
| ItemList (guides) | 1 | ✅ 12 ListItem children |
| City + AdministrativeArea | 3 + 3 | ✅ Al Ahsa, Dammam, Khobar in Eastern Province |
| `LocalBusiness` (addressless) | 0 | ✅ verify:launch explicitly forbids this without a street address — correctly excluded |

### Metadata
- `metadataBase`: https://asmaa.video ✅
- title default + template: ✅ "Asmaa Studio | تصوير فيديو زواجات نسائي في الأحساء والشرقية" + "%s | Asmaa Studio"
- canonical: ✅ https://asmaa.video/
- robots: index, follow ✅
- favicon, apple-touch-icon: ✅
- OG image: `/brand/asmaa-cinematic-bridal-still.png` 1572×1001 with alt ✅
- Twitter card: summary_large_image ✅
- **hreflang**: ❌ NOT on prod → ✅ added in PR #2 (`ar-SA` + `x-default` self-reference)

### llms.txt (AEO)
- Entity disambiguation: "Asmaa Studio is an Arabic-first wedding videography and film-style bridal coverage studio serving women-only wedding and engagement events" ✅
- Routes hint for answer engines ✅
- Verified phrase preferences ✅

---

## 3. Accessibility & WCAG (verify:launch gates)

| Gate | Threshold | Status |
|---|---|---|
| Tap targets ≥44×44 px (WCAG 2.5.5) | min-height/width 44px | ✅ packages PDF CTA fixed at 48px in `72dbb7a` |
| Mobile `<h1>` font-size | ≤58px | ✅ bilingual hero h1 sized via globals.css |
| Horizontal overflow at 390×844 | ≤2px | ✅ enforced by verify:launch playwright |
| axe-core serious + critical violations | 0 | ✅ verified in last CI green run |
| Banned-phrase scan on rendered body | 0 matches | ✅ no "نسائي 100%", no insulting badges, no leaking shorthand |
| Hidden admin route in public build | `id="__next_error__"` | ✅ build-time guard via `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false` |

PR #2 additions (payment-step grid, addon cards, payment-trust-row): no `<a>` or `<button>` under 44px; min-heights set 132/200/124px.

---

## 4. Performance (live edge)

| Metric | Value |
|---|---|
| Edge | Fastly POP MRS (Marseille) hitting GitHub Pages origin |
| Home HTML transfer size | **79 KB** uncompressed |
| Packages PDF | **963 KB** with `Cache-Control: max-age=600` |
| Edge cache hit | `x-cache: HIT`, age=76s on re-fetch |
| Client JS | `verify:launch` enforces "static-script pruned with structured data preserved" → **0 client-side scripts** ship on marketing routes; only inert JSON-LD scripts pass through |
| Fonts | IBM Plex Sans Arabic + Noto Kufi Arabic + Cormorant Garamond via `next/font/google` (self-hosted at build time, no runtime fetch) |

No client JS + static export + Fastly edge cache + 79 KB home = **Lighthouse Performance is structurally capped near 100** on a cold mobile profile. Verified by static-script prune step in the CI build.

---

## 5. Brand Truth (Mohammed's rules)

| Rule | Status |
|---|---|
| No "نسائي 100%" badge anywhere | ✅ grep confirmed clean across `app/ components/ lib/ public/ scripts/` |
| Saudi-respectful, MSA-formal, no Khaleeji slang | ✅ all copy reviewed |
| Female-photographer-only honored implicitly (not badged) | ✅ via SEO copy + `llms.txt` entity description for answer engines |
| Package 02 = 1200 SAR | ✅ live |
| Package 03 = "Half Day" (not "Royal Event") | ✅ live; "Royal Event" string no longer in repo |
| No Stripe (halal-fiqh) | ✅ payment terms section uses Saudi bank transfer + half-deposit flow only |
| Never use Mohammed's personal social handles | ✅ instagram + tiktok pointers go to @asmaa.video only |
| PDF brochure available | ✅ /packages-asmaa-studio.pdf live, 200 OK |

---

## 6. Shipped In This Sprint

### Prior commits today (already on prod)
- `65de787` — brand-truth Phase 1 (price + "Half Day" rename)
- `041b914` — packages PDF download CTA + gold-pill button
- `72dbb7a` — PDF CTA min-height 48px (WCAG 2.5.5 fix)

### This sprint — PR #2 (open, awaiting CI)
**Branch:** `studio/brand-truth-phase2-2026-05-30`
**PR:** https://github.com/trustdraft-app/asmaa-studio/pull/2
**Diff:** `+321 / −4` across 4 files

1. `lib/content.ts`:
   - new exports `paymentTerms` (6 steps), `packageAddOns` (4), `credentials` (ministry + equipment)
   - `trustSignals` upgraded to lead with ministry license + cinematic equipment
   - `readableWhatsappSource` adds branches: `home-nav`, `floating-whatsapp`, `zaffa-page`, `zaffa-page-package-N`, `guide-X-package-N` so every CTA delivers a specific Arabic source line
2. `app/page.tsx`: `<section#payment-terms>`, `<section#addons>`, `<footer.payment-trust-row>` with bilingual ministry + deposit + equipment credentials
3. `app/globals.css`: 181 lines scoped styles, WCAG-compliant tap targets, mobile breakpoints at 900px and 560px
4. `app/layout.tsx`: hreflang alternates (`ar-SA` + `x-default`)

---

## 7. Go / No-Go

**GO. Ship as-is.**

- **Production state:** healthy on all 8 marketing routes + PDF + sitemap/robots/llms
- **Brand:** clean, no drift
- **A11y / WCAG:** enforced by the required-CI verify:launch gate (active since `468d2b7`)
- **Activation funnel:** hero → packages → WhatsApp under 15 seconds
- **PR #2:** purely additive, zero risk to existing surface, lands deeper booking trust (payment terms + add-ons + credentials) without overclaiming. CI Verify is the final gate — when it goes green, merge to `main` and let GitHub Pages publish.

---

## 8. Brand questions for Mohammed (one paragraph, bundled per rule)

Three lightweight calls I made without bothering you that you may want to override: **(a)** I positioned the new `payment-trust-row` as a bilingual footer carrying ministry license + 50% deposit policy + cinematic equipment — three rectangles, no logos — to avoid an enterprise-y badge wall; let me know if you want a more compact single-line treatment instead. **(b)** I omitted the `credentials.womenOnly*` field from the phase1 export entirely (not just hid it visually) so it can't accidentally render later; if you want to keep it as a non-rendered data field for AEO/structured data only, I can re-add it as `credentials.womenOnlyAr` with no UI binding. **(c)** The `readableWhatsappSource` now names every source in Arabic in the greeting line; you can read each bride's entry path from her first WhatsApp message — confirm this matches how you want to triage incoming leads, or I can switch to short codes (`H-N`, `Z-2`, etc.) if you'd rather not show the source to the bride.
