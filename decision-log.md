# Asmaa Studio Decision Log

## 2026-05-28 03:17 +03 — Asmaa Studio
**Question:** How should the bride reservation link and owner admin dashboard work on the current static GitHub Pages deployment?
**Decision:** Implement `/reserve` and `/admin` as Supabase-ready client pages, require Supabase Edge Function persistence for live writes, and keep a structured WhatsApp fallback when backend variables are missing.
**Reasoning:** A direct anonymous browser insert from a static website would violate the required origin/rate-limit/security boundary, while the WhatsApp fallback lets the new bride link work immediately.
**Source:** AGENTS.md, AI Empire security findings, project files, professional judgment.

## 2026-05-28 — Asmaa Studio
**Question:** Which domain should be canonical for the live site?
**Decision:** Use `asmaa.video` as the GitHub Pages custom domain and temporarily redirect `asmaavideo.com` to `http://asmaa.video` until the GitHub Pages certificate is issued.
**Reasoning:** One canonical domain avoids splitting SEO authority, and the temporary HTTP target avoids sending support-domain visitors into a certificate mismatch while GitHub prepares HTTPS.
**Source:** User instruction, project `.agent/decisions.md`, professional judgment.

## 2026-05-28 05:58 +03 — Asmaa Studio
**Question:** Should the requested 20x SEO/Figma/Canva/board upgrades remain in docs or become live customer-facing product surface?
**Decision:** Ship the upgrades into `app/page.tsx`, `app/[city]/page.tsx`, `lib/content.ts`, and `public/highlights`, then keep docs only as operating evidence.
**Reasoning:** Mohammed explicitly asked for real live progress and breakthrough, so the correct artifact is a deployed conversion/SEO experience, not another plan.
**Source:** User instruction, live project files, professional judgment.

## 2026-05-28 06:18 +03 — Asmaa Studio
**Question:** How should the site communicate trust without making normal expectations sound suspicious?
**Decision:** Remove repeated defensive framing and express trust indirectly through calm execution, suitable style, professional clarity, clear packages, and elegant workflow language.
**Reasoning:** Over-explaining an obvious expectation can trigger doubt; premium service copy should make the buyer feel comfortable without sounding defensive.
**Source:** User feedback, live copy review, professional judgment.

## 2026-05-28 06:31 +03 — Asmaa Studio
**Question:** How should all remaining strategic findings be made live instead of remaining in documentation?
**Decision:** Add live homepage sections for the full 20-wave plan, profile copy, hashtags, channel actions, content pillars, and board growth levers.
**Reasoning:** The user explicitly requested all findings live, so the website must become the operating surface rather than pointing to docs.
**Source:** User instruction, docs findings, project files, professional judgment.

## 2026-05-28 06:37 +03 — Asmaa Studio
**Question:** Which Arabic fonts should make the live website feel elegant, clear, beautiful, and user friendly?
**Decision:** Use IBM Plex Sans Arabic for body/UI copy, Noto Kufi Arabic for display headings, and keep Cormorant Garamond limited to the Latin monogram/brand accent.
**Reasoning:** This pairing gives readable Arabic forms for forms/navigation while giving headings a premium wedding-studio character without forcing Latin serif styling onto Arabic text.
**Source:** User instruction, live typography review, professional judgment.

## 2026-05-28 06:56 +03 — Asmaa Studio
**Question:** How should the website copy speak to brides and women clients without sounding suspicious or overly operational?
**Decision:** Reframe the live copy around emotion, elegance, clear package choice, ease of decision, and local relevance while removing defensive phrasing and internal growth/SEO/Admin language from the customer journey.
**Reasoning:** The customer buys the memory and feeling first; simple package and date clarity should support that without awkward persona targeting.
**Source:** User instruction, growth-and-offer playbook, live page review, professional judgment.

## 2026-05-28 07:16 +03 — Asmaa Studio
**Question:** Which third-party audit findings should be fixed immediately?
**Decision:** Fix all clear, code-owned issues found in the pass: city query preselection, date guard, package accessibility state, Arabic accessibility labels, customer-friendly WhatsApp source labels, admin phone normalization, hero text spacing, and highlight alt text.
**Reasoning:** These issues directly affect booking clarity, accessibility, and owner follow-up reliability without requiring brand, legal, or money decisions.
**Source:** User instruction, live audit scripts, Playwright/axe checks, professional judgment.

## 2026-05-28 07:42 +03 — Asmaa Studio
**Question:** What must change for the site to approach a board-level 10/10 launch score?
**Decision:** Strip unnecessary client JavaScript from static marketing pages, add a brand favicon/icon, reduce font payload, and monitor/enforce GitHub Pages HTTPS as soon as the certificate exists.
**Reasoning:** The customer-facing pages do not need hydration; removing it materially improves Lighthouse performance while preserving interactivity where it is actually required.
**Source:** User instruction, Lighthouse audit, GitHub Pages API, professional judgment.

## 2026-05-28 08:00 +03 — Asmaa Studio
**Question:** Can the board honestly mark the live domains 10/10 right now?
**Decision:** Mark the code-owned website experience as launch-passed, but keep the domain layer open until `asmaa.video` has a valid GitHub Pages HTTPS certificate and `asmaavideo.com` is moved from Namecheap forwarding to first-class HTTPS routing.
**Reasoning:** Live Lighthouse and cURL show the remaining score loss comes from HTTP, redirects, and edge cache/transport behavior outside the committed website code.
**Source:** Live cURL, Lighthouse, GitHub Pages API, professional judgment.

## 2026-05-28 08:17 +03 — Asmaa Studio
**Question:** Should Asmaa Studio copy mention relative-role decision-maker personas?
**Decision:** No. Use professional bride/client language only: العروس، العميلة، اختيار الباقة، تفاصيل المناسبة.
**Reasoning:** Explicit relative-role personas sound unprofessional and distract from the premium studio positioning.
**Source:** User instruction and live copy review.

## 2026-05-28 08:34 +03 — Asmaa Studio
**Question:** How should the site respond to oversized mobile fonts and robotic reservation copy?
**Decision:** Reduce mobile hero and section heading scale, shorten the homepage headline, tighten the reservation mobile layout, and replace system-mechanics copy with polished customer-facing language.
**Reasoning:** Premium mobile UX needs readable hierarchy and human wording; exposing backend fallback logic or oversized display type weakens trust.
**Source:** User screenshots, local mobile Playwright screenshots, professional judgment.

## 2026-05-28 13:58 +03 — Asmaa Studio
**Question:** What is the next professional move after Mohammed rejected the site as not Figma-grade or motion-led enough?
**Decision:** Create a real Figma direction file and ship a live premium visual-system pass: integrated cinematic hero imagery, motion guide layers, upgraded story cards, package infographic meters, and tighter responsive package layout.
**Reasoning:** The complaint is valid; the site needed stronger visual composition and motion language, not another document or cosmetic copy tweak.
**Source:** User instruction, Figma file `AxnBD6JO0MR3YY5XDt8LEa`, UI/UX Pro Max, Emil design engineering principles, local Playwright verification.

## 2026-05-28 09:04 +03 — Asmaa Studio
**Question:** Which remaining daily launch wave should ship next on the live site?
**Decision:** Implement wave 14 as a dedicated `/faq` booking questions page with Arabic answers, FAQ structured data, breadcrumb structured data, homepage links, and sitemap coverage.
**Reasoning:** The site already shipped the broad homepage/social/city work, and the highest-impact remaining code-owned gap was reducing repeated pre-booking questions with an indexable conversion page.
**Source:** 20-wave plan in `lib/content.ts`, live project files, professional judgment.

## 2026-05-28 14:44 +03 — Asmaa Studio
**Question:** Which reusable patterns from the existing AI Empire repos should be applied to Asmaa now?
**Decision:** Import the useful operating patterns only: Fattourh-style answer-engine indexing, ScanAbility-style Playwright/axe checks, and HalalCrypto-style static/deploy proof.
**Reasoning:** These raise launch quality and catch the exact mobile/copy/performance failures already seen, without importing unrelated dashboard or deployment complexity.
**Source:** Repo scan of `fattourh`, `scanability`, `halalcrypto`, `sawgly`, and `founder-command-center`; professional judgment.

## 2026-05-28 15:05 +03 — Asmaa Studio
**Question:** Should the domain be moved through Cloudflare now because Namecheap and Cloudflare are logged in?
**Decision:** No Cloudflare DNS/proxy change yet; keep `asmaa.video` unproxied on the current GitHub Pages records until GitHub issues the Pages certificate.
**Reasoning:** GitHub Pages health reports the apex and `www` records are valid, unproxied, served by Pages, and HTTPS-eligible; changing to Cloudflare proxy now can hide the GitHub records and delay certificate issuance.
**Source:** GitHub Pages health API, live DNS checks, professional judgment.

## 2026-05-28 15:28 +03 — Asmaa Studio
**Question:** How should the website fix the forced-looking logo treatment?
**Decision:** Use the uploaded gold monogram artwork directly across navigation, hero, favicon, app icon, reserve, and admin, and remove the CSS-drawn `A/S` substitute.
**Reasoning:** The correct brand asset already exists; drawing a replacement monogram makes the site feel less professional and weakens recognition.
**Source:** User-provided logo files, live UI review, Figma logo-system page `AxnBD6JO0MR3YY5XDt8LEa`.

## 2026-05-28 16:04 +03 — Asmaa Studio
**Question:** How should Asmaa Studio create more SEO traffic pages without adding thin content?
**Decision:** Add a `/guides` hub plus 12 Arabic long-tail pages for city intent, package intent, and decision-stage wedding videography searches, then wire them into homepage links, sitemap, `llms.txt`, and launch verification.
**Reasoning:** Useful search pages should answer a specific booking question and move the visitor toward the reservation flow rather than duplicate homepage copy.
**Source:** User request, Google Search Central guidance, existing package/city content model, local Playwright verification.
