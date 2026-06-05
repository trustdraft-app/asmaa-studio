# Asmaa Studio Decision Log

## 2026-06-05 09:32 +03 — Asmaa Studio
**Question:** What is the next highest-impact safe Wave 2 slice after yesterday's `/ar/{city}/bride-checklist` launch?
**Decision:** Ship the `near-me` route family at `/ar/{city}/{service}/near-me`, then wire it into sitemap, llms discovery, attribution, and launch verification while leaving venue-coverage for a later run.
**Reasoning:** This captures high-intent voice/local queries using existing city and service data, without inventing venue-specific facts or depending on DeepSeek/off-site systems.
**Source:** `AGENTS.md`, `seo-waves/wave-2.json`, `app/ar/[city]/[service]/page.tsx`, `lib/seo-grid.ts`, professional judgment.

## 2026-06-04 17:36 +03 — Asmaa Studio
**Question:** What is the next highest-impact safe daily growth wave now that the 20-wave contact pass is already shipped and the 50k-URL system shows Wave 2 pending?
**Decision:** Ship the first real Wave 2 route family as city-specific `/ar/{city}/bride-checklist` pages for all SEO cities, wire them into sitemap, answer-engine files, city discovery, and launch verification, and leave the rest of Wave 2 pending for later route families.
**Reasoning:** This is the safest repo-owned Wave 2 slice: it creates real new search/conversion surfaces around pre-booking intent without inventing venue data or depending on DeepSeek, GSC, or off-site access.
**Source:** `AGENTS.md`, `seo-waves/state.json`, `seo-waves/wave-2.json`, existing `app/ar/*` route patterns, professional judgment.

## 2026-06-03 09:07 +03 — Asmaa Studio
**Question:** What is the next highest-impact safe live-site wave after the booking-source attribution pass, given that wave 18 is off-site Google posting work?
**Decision:** Translate wave 18 into a local-proof conversion upgrade on `/contact`: remove the weak `LocalBusiness` schema, replace it with `Organization` + `ContactPoint`, add a first-message checklist and direct city-page links, and gate the route in launch verification.
**Reasoning:** This preserves the wave’s local-discovery intent while shipping a repo-owned improvement that strengthens SEO integrity and helps support-domain or Google visitors convert faster.
**Source:** `AGENTS.md`, `lib/content.ts` 20-wave plan, `app/contact/page.tsx`, prior schema decisions, professional judgment.

## 2026-06-02 09:09 +03 — Asmaa Studio
**Question:** Which remaining 20-wave item should ship next on the live site after the engagement and trust waves?
**Decision:** Implement wave 20 as end-to-end booking-source attribution in `/reserve` and `/admin`, capturing source intent from internal referrers and query state, preserving it in the WhatsApp fallback and reservation submit payload, and surfacing a simple top-sources report in the admin dashboard.
**Reasoning:** Wave 18 is mostly off-site Google Business Profile work, while wave 20 can be turned into a real on-site conversion measurement improvement that helps the studio see which live pages and package paths create actual conversations.
**Source:** AGENTS.md, `lib/content.ts` 20-wave plan, reservation/admin project files, professional judgment.

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

## 2026-06-01 09:08 +03 — Asmaa Studio
**Question:** Which daily growth wave should ship next from the live site repo when wave 18 is an off-site Google post and `/reviews` currently contains invented placeholder testimonials?
**Decision:** Treat wave 19 as the highest-impact safe repo-owned fix: replace the fake-review `/reviews` surface with an honest pre-booking trust page, remove placeholder aggregate-rating schema, and add verification guards so fake testimonial markers cannot return.
**Reasoning:** Shipping fabricated reviews would weaken launch integrity and conversion trust; an honest trust/process page raises quality immediately without waiting on off-site Google access or real-client consent assets.
**Source:** `AGENTS.md`, `lib/content.ts` 20-wave plan, live `app/reviews/page.tsx`, project work log, professional judgment.

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

## 2026-05-28 18:52 +03 — Asmaa Studio
**Question:** How should the site respond to Mohammed saying the live website is still below ambition and asking for the strongest design pass?
**Decision:** Ship a homepage-first cinematic redesign using a clean generated wedding still, bilingual hero hierarchy, sticky glass navigation, animated showreel scrubber, service dock, testimonial marquee, persistent WhatsApp CTA, and mobile-specific typography fixes.
**Reasoning:** The fastest live improvement is to make the first viewport feel like a premium wedding film interface while preserving the existing static export, SEO pages, and WhatsApp conversion path.
**Source:** User instruction, Claude design-director critique, generated visual concept review, local mobile/desktop Playwright verification.

## 2026-05-29 09:11 +03 — Asmaa Studio
**Question:** Which remaining daily launch wave should ship next on the live site after the FAQ and guide layers were already live?
**Decision:** Implement wave 15 as a dedicated `/portfolio` album page, add homepage/internal links to it, refresh the Album highlight asset, and include the route in sitemap, `llms.txt`, and launch verification.
**Reasoning:** The next highest-impact safe improvement was conversion-focused proof: a search-indexable album page that explains the eight moments brides actually compare before booking, without inventing client testimonials or unsupported claims.
**Source:** 20-wave plan in `lib/content.ts`, live project files, professional judgment.

## 2026-05-29 21:22 +03 — Asmaa Studio
**Question:** How should the site handle the admin dashboard while `asmaavideo.com` is down on HTTPS?
**Decision:** Ship GitHub Pages with `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false`, remove the public `/admin` navigation link, remove the `/admin` static artifact unless explicitly enabled, and document `asmaavideo.com` as a DNS/hosting migration blocker because it still points to Namecheap forwarding IP `162.255.119.149` without first-class TLS.
**Reasoning:** Customers should not see an admin affordance at all, while the admin login/dashboard can still be verified safely in an explicit build mode; code cannot issue a certificate for a domain still hosted by URL forwarding.
**Source:** Live DNS/cURL checks, GitHub Pages build workflow, Supabase admin/RLS design, Semgrep/zizmor/security verification, professional judgment.

## 2026-05-29 21:23 +03 — Asmaa Studio
**Question:** How should scanner findings be resolved before launch deployment?
**Decision:** Centralize JSON-LD script injection in an escaping `JsonLd` component and harden the Pages workflow with SHA-pinned actions, job-scoped permissions, and `persist-credentials: false` on checkout.
**Reasoning:** These fixes remove concrete Semgrep and zizmor findings without widening scope or weakening the static export model.
**Source:** Semgrep auto scan, zizmor workflow audit, actionlint, professional judgment.

## 2026-05-29 21:44 +03 — Asmaa Studio
**Question:** How should the homepage meet a world-class agency UI/UX/content bar without inventing claims or exposing internal operations?
**Decision:** Remove internal SEO/social/hashtag/board-ops language from the public homepage, replace testimonial-looking copy with experience standards, reframe city and booking sections around bride decision clarity, remove the unsupported equipment claim, and enforce internal-term bans in launch verification.
**Reasoning:** Premium conversion needs truthful specificity and customer confidence, not operational artifacts, fake-feeling social proof, or claims a later auditor cannot verify.
**Source:** User directive, project context, live visual review, Figma QA page, local security/launch verification, professional judgment.

## 2026-05-29 21:52 +03 — Asmaa Studio
**Question:** Should a successful GitHub Pages deploy with Node 20 action deprecation annotations be accepted after the agency pass?
**Decision:** No; update the Pages workflow to official Node 24 action releases with pinned SHAs and remove the forced Node override.
**Reasoning:** A 10/10 launch audit should not leave known workflow deprecation warnings when official Node 24 action releases are available.
**Source:** GitHub Actions run `26655722828`, official action metadata from GitHub repositories, professional judgment.

## 2026-05-29 22:02 +03 — Asmaa Studio
**Question:** Which deep SEO/GEO/AEO findings should be applied to the live site without creating thin or unverifiable content?
**Decision:** Apply current Google Search Central-aligned structured data: remove deprecated FAQPage JSON-LD, strengthen homepage LocalBusiness/Service/WebSite/ItemList graph, add CollectionPage/ItemList/Breadcrumb graph to the guides hub, enrich guide Article schema, use deterministic sitemap `lastmod`, and update `llms.txt` with Eastern Province answer-engine guidance.
**Reasoning:** The strongest SEO move now is not more keyword pages; it is accurate local entity clarity for Al Ahsa, Dammam, and Khobar, current structured-data compliance, and regression gates that prevent outdated markup from returning.
**Source:** Google Search Central SEO starter guide, LocalBusiness structured data docs, FAQPage deprecation docs, sitemap docs, Asmaa project memory, professional judgment.

## 2026-05-29 22:36 +03 — Asmaa Studio
**Question:** How should the escalation audit handle public LocalBusiness schema when no public address, geo coordinates, or opening hours are verified?
**Decision:** Replace the homepage and city LocalBusiness nodes with Organization + Service structured data and gate against addressless LocalBusiness returning.
**Reasoning:** A later auditor can defend Organization/Service for this static wedding-videography site, while addressless LocalBusiness creates avoidable structured-data risk.
**Source:** SEO subagent audit, project files, professional judgment.

## 2026-05-29 23:02 +03 — Asmaa Studio
**Question:** Should the final 10/10 push keep `/reserve` in the sitemap while the route is `noindex, follow`?
**Decision:** No; remove `/reserve` from the sitemap and add a verifier gate that fails if any noindex reserve URL returns to `sitemap.xml`.
**Reasoning:** Indexing directives and sitemap inclusion must not conflict for launch-grade SEO hygiene.
**Source:** Fleet release verification, local source audit, professional judgment.

## 2026-05-29 23:02 +03 — Asmaa Studio
**Question:** How should the mobile floating WhatsApp overlap found by the UI fleet be handled?
**Decision:** Hide the floating WhatsApp pill on mobile and rely on existing nav/hero CTAs, with a Playwright launch check to prevent the overlap from returning.
**Reasoning:** A fixed CTA that covers proof content weakens the first mobile impression, and the page already has visible mobile WhatsApp conversion paths.
**Source:** Fleet UI screenshot audit, `app/globals.css`, `scripts/verify-launch.mjs`.

## 2026-05-29 23:02 +03 — Asmaa Studio
**Question:** Should Codex try to force `asmaavideo.com` live over HTTPS without DNS/provider access?
**Decision:** No; prepare Vercel host redirects and security headers in source, then keep the blocker explicit until DNS moves off Namecheap URL forwarding.
**Reasoning:** The current support-domain DNS resolves to Namecheap forwarding IP `162.255.119.149`, and app code cannot issue TLS or stable HTTPS redirects for that host.
**Source:** Live DNS/curl probes, `vercel.json`, Cloudflare/Vercel access checks.

## 2026-05-29 22:36 +03 — Asmaa Studio
**Question:** Should Codex force Sentry, Cloudflare, Vercel, or Supabase production activation during this escalation?
**Decision:** No; fix and gate code-owned readiness, then document the remaining infrastructure blockers because Vercel CLI is missing, Cloudflare auth is expired, Sentry CLI/DSN is absent, and no Asmaa Supabase project is linked.
**Reasoning:** Fake observability or unowned DNS/secrets changes would reduce launch integrity; production activation needs real credentials/host choices while the static site remains safe.
**Source:** CLI checks, Supabase project list, live DNS checks, professional judgment.

## 2026-05-29 22:36 +03 — Asmaa Studio
**Question:** Is the portfolio anti-rot gate failure a blocker for this Asmaa launch fix?
**Decision:** No; log it as unrelated because the gate failed only on existing Fattourh API-route findings outside `/Users/mohammedsa/Documents/AsmaaVideo`, while Asmaa-specific gates passed.
**Reasoning:** Sweeping unrelated Fattourh security work into an Asmaa domain/UI/SEO escalation would violate surgical-change and dirty-worktree discipline.
**Source:** `ai-empire-anti-rot-gate.mjs` output, AGENTS.md anti-rot rule, professional judgment.

## 2026-05-30 09:18 +03 — Asmaa Studio
**Question:** Which remaining 20-wave item should become the next live website improvement after the FAQ, portfolio, and GEO/schema passes?
**Decision:** Convert wave 16 into a dedicated `/zaffa` package landing page, add direct homepage/internal links, ship a matching highlight cover asset, and index the route in sitemap and `llms.txt`.
**Reasoning:** The next safe high-impact gain is a dedicated low-friction package path for the strongest budget-intent search and conversion query already present in the content model, rather than waiting on off-site Instagram execution.
**Source:** `lib/content.ts` 20-wave plan, existing package/guides model, live site structure, professional judgment.

## 2026-05-31 09:19 +03 — Asmaa Studio
**Question:** What is the next highest-impact daily growth wave after the live zaffa route?
**Decision:** Convert wave 17 into a dedicated `/engagement` landing page for الخطوبة والملكة, wire it into internal discovery, sitemap, `llms.txt`, and launch verification, and treat GitHub Pages CI as the deployment verifier because local Next 16 builds are hanging in compile before export completes.
**Reasoning:** The engagement intent already exists in packages and guides, but a first-class landing route gives it the same direct search and conversion surface as `/zaffa`; the build hang is an environment/runtime issue, not a content-strategy reason to skip the wave.
**Source:** `AGENTS.md`, `lib/content.ts` 20-wave plan, existing `app/zaffa/page.tsx` pattern, project files, professional judgment.
