# Asmaa Studio Decision Log

## 2026-06-07 18:40 +03 — Asmaa Studio
**Question:** A "super beast mode" brief asked to (1) make the portfolio stunning, (2) add booking payment, (3) upgrade the floating WhatsApp, (4) add 3 named Saudi-women 5-star testimonials, and (5) push SEO. Which of these can ship safely as-is?
**Decision:** Shipped 1, 2, 3, 5 in full. Declined 4 (fabricated named testimonials). Specifics: portfolio rebuilt as on-brand women's-wedding asymmetric masonry with cinematic real-city overlays, play→consent-first WhatsApp sample request, and IntersectionObserver lazy reveal; reserve fallback gained a structured 3-step bank-transfer deposit card + "أرسلي إيصال التحويل" WhatsApp button (Moyasar online rail already present and untouched); floating WhatsApp recolored to brand green #25D366 with prefilled message, pulse, and a "عادةً يرد خلال ساعتين" bubble (kept hidden on mobile per the launch-verifier rule); `areaServed` broadened to Country/Eastern-Province + Qatif, `/process` added to sitemap, indexed hero backdrop given Arabic alt.
**Reasoning:** Items 1–3 and 5 are repo-owned quality/SEO upgrades that pass the strict launch verifier. Item 4 directly contradicts the documented consent-first policy (wave-19 decision and the reviews-page wording fix), is actively blocked by the launch verifier's banned-marketing guards, and fabricating named customer reviews for a real Saudi business is deceptive (fake-review/consumer-protection exposure). Honesty + the existing decision win.
**Source:** brief, `app/portfolio/page.tsx`, `components/ReservationExperience.tsx`, `components/SiteFooter.tsx`, `components/seo/LocalBusinessJsonLd.tsx`, `app/sitemap.ts`, `scripts/verify-launch.mjs`, prior consent-first decisions, AI Empire non-negotiables (no fabrication), professional judgment.

## 2026-06-07 18:40 +03 — Asmaa Studio
**Question:** Should the booking flow print a placeholder IBAN (SA…) on the live site as the brief suggested?
**Decision:** No. The bank-transfer card explains the deposit flow and routes the real IBAN through WhatsApp after availability is confirmed, rather than printing a placeholder account number publicly.
**Reasoning:** A non-real IBAN shown live on a real business site risks misdirected customer transfers (real money loss) and is the opposite of the Saudi-standard "confirm date → send account → send receipt" flow. Gating the IBAN behind WhatsApp is both safer and the genuine local practice. Real account publication is a money decision for the owner.
**Source:** brief Mission 2, `lib/content.ts` `paymentTerms`, `components/ReservationExperience.tsx`, AI Empire money-decision boundary, professional judgment.

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
## 2026-06-02 12:50 +03

**Question:** How should the current branch handle reviews-page wording that fails the launch verifier?
**Decision:** Replace the banned wording with consent-first sharing-boundary copy in `app/reviews/page.tsx` and keep the verifier strict.
**Reasoning:** The launch invariant is to avoid unsupported privacy/marketing claims while still explaining consent-first review handling clearly.
**Source:** `scripts/verify-launch.mjs`, `app/reviews/page.tsx`, local launch verification.

## 2026-06-02 23:14 +03 — Asmaa Studio

**Question:** How should the full-authority redesign order be applied after the homepage cinematic pass was already live?
**Decision:** Apply a route-wide theatre system instead of another homepage-only change: shared image-led heroes, darker premium proof surfaces, portfolio styling hooks, contact/review hit-area hardening, and faster export verification.
**Reasoning:** End-to-end launch polish requires the supporting user journeys to feel as deliberate as the homepage, and the verifier/pruner bottleneck had become a real launch-execution drag on the 11k-page static export.
**Source:** User directive, generated design reference, `app/globals.css`, `app/portfolio/page.tsx`, `scripts/prune-static-js.mjs`, `scripts/verify-launch.mjs`, Playwright screenshot QA.

## 2026-06-03 00:50 +03 — Asmaa Studio

**Question:** How should Asmaa.video close the public endpoint security-header blocker when the canonical domain is on GitHub Pages?
**Decision:** Treat Netlify/Cloudflare as the code-ready header-capable edge path, keep the existing `_headers`/`netlify.toml` configuration, fix the Cloudflare Worker export, and record DNS migration from GitHub Pages as the remaining operational blocker.
**Reasoning:** GitHub Pages cannot apply `_headers`; the existing Netlify host already proves the header policy works, while changing Namecheap DNS cannot be completed through the repo.
**Source:** Live header probes, `docs/deployment.md`, `netlify.toml`, `public/_headers`, `cloudflare/asmaa-video-security-proxy.js`, professional judgment.

## 2026-06-03 06:57 +03 — Asmaa Studio

**Question:** Can Codex force Asmaa.video to pass canonical public security headers without registrar/DNS authority?
**Decision:** No; keep the Netlify header path ready and block canonical launch readiness until Namecheap credentials or Cloudflare delegation authority is available.
**Reasoning:** The only failing surface is the canonical DNS target, which still resolves to GitHub Pages; in-repo `_headers`, Worker code, and Netlify config cannot change headers on GitHub Pages responses.
**Source:** `ai-empire-10of10-activation-apply.mjs --self-test`, activation dry-run, live `curl -sSI` probes for `https://asmaa.video/` and `https://asmaa-video.netlify.app/`, DNS `NS`/`A` evidence.
## 2026-06-03T09:54:25+0300 — Asmaa.video / Homepage Redesign
**Question:** How should Codex respond to Mohammed's judgment that Asmaa.video design is weak and must use the maximum of Claude-style design?
**Decision:** Replace the homepage first viewport with a code-native cinema-first redesign in `app/page.tsx` and `app/globals.css`, using the existing bridal still and Asmaa brand assets rather than adding generic decoration or fake claims.
**Reasoning:** The project design system calls for premium Arabic-first wedding cinema, the live blocker is design quality, and the safest high-impact fix is to strengthen the actual first user impression while preserving static export, SEO, accessibility, and launch-verifier contracts.
**Source:** `docs/DESIGN_SYSTEM.md`, `docs/figma-brief.md`, `app/page.tsx`, `app/globals.css`, `npm run typecheck`, `npm run lint`, `npm run build:pages`, `node scripts/verify-launch.mjs`, `audits/visual-redesign-2026-06-03/desktop-v2.png`, `audits/visual-redesign-2026-06-03/mobile-v2.png`, professional judgment.

## 2026-06-03T09:54:25+0300 — Asmaa.video / Live Design Deploy Boundary
**Question:** Can Codex make the redesigned Asmaa.video live and header-capable in the same pass?
**Decision:** Make the redesign live through the configured GitHub Pages push/deploy path, but keep Netlify/header-capable production fail-closed because the authenticated MCP uploader failed twice and the GitHub Netlify workflow lacks `NETLIFY_AUTH_TOKEN`.
**Reasoning:** GitHub Pages successfully deployed commit `c574481` and live `https://asmaa.video/` contains the redesign marker, but security headers cannot be honestly claimed until a real Netlify token or equivalent edge authority is present.
**Source:** GitHub Pages run `26869255797`, live marker probe for `https://asmaa.video/`, Netlify MCP deploy attempts, GitHub Netlify workflow `26869403042`, professional judgment.

## 2026-06-05T05:55:09+0300 — Asmaa.video / Netlify activation source boundary
**Question:** Should local Netlify activation keep reporting `NETLIFY_SITE_ID` as missing when the value exists as a GitHub repository variable?
**Decision:** No. Allow non-secret Netlify site/domain values to resolve from GitHub repository variables, but keep `NETLIFY_AUTH_TOKEN` limited to env, approved local secret files, Keychain, or GitHub secrets in CI.
**Reasoning:** `NETLIFY_SITE_ID` is not a secret and already exists in the repo variable surface, while the auth token is a credential; the activation preflight should expose the real blocker without weakening credential handling.
**Source:** PR #42 (`https://github.com/trustdraft-app/asmaa-studio/pull/42`), merge commit `b90efd4b0992a1b4648c58b4adb0d0f3e83f4548`, `scripts/configure-netlify-custom-domain.mjs`, PR `Verify` check, `node scripts/configure-netlify-custom-domain.mjs --self-test` `13/13`, merged preflight reporting only `NETLIFY_AUTH_TOKEN` missing, Netlify live security-header check passing.

## 2026-06-05T06:13:14+0300 — Asmaa.video / Netlify CLI token source
**Question:** Should `scripts/configure-netlify-custom-domain.mjs` accept `NETLIFY_AUTH_TOKEN` from standard Netlify CLI config files?
**Decision:** Yes. Add Netlify CLI config as a local secret-capable token source while continuing to reject GitHub repository variables for `NETLIFY_AUTH_TOKEN`.
**Reasoning:** Local Netlify CLI login is a legitimate secret-bearing activation surface, and matching the portfolio activation gate reduces operational friction without printing or fabricating credentials.
**Source:** PR #43 (`https://github.com/trustdraft-app/asmaa-studio/pull/43`), merge commit `7bf2ce8764ceaf4a8e7b3e811ab3742b7dbe97b1`, `scripts/configure-netlify-custom-domain.mjs`, PR `Verify` check, `node scripts/configure-netlify-custom-domain.mjs --self-test` `17/17`, `npm run lint`, `npm run verify:launch`.

## 2026-06-05T09:40:57+0300 — Asmaa.video / Contact launch schema repair
**Question:** How should Codex fix the Asmaa GitHub Pages launch verifier failure on contact-page `LocalBusiness` schema and missing copy tokens?
**Decision:** Keep the contact page address-safe by publishing `Organization` plus `ContactPoint` JSON-LD, and add the verifier-required pre-message/local-city copy directly to the page.
**Reasoning:** Asmaa has no verified public address in the repo, so `LocalBusiness` would be an unsupported schema claim; `Organization`/`ContactPoint` preserves booking discoverability without fabricating address evidence.
**Source:** GitHub Actions run `26998999543`, `app/contact/page.tsx`, `scripts/verify-launch.mjs`, `/Users/mohammedsa/bin/ai-heavy-run 'npm run verify:launch'`.

## 2026-06-05T09:57:29+0300 — Asmaa.video / Dynamic verifier port ownership
**Question:** Should the portfolio customer judge remove `PORT=0`, or should Asmaa's verifier support dynamic local ports correctly?
**Decision:** Fix `scripts/verify-launch.mjs` to derive the actual listener port after `server.listen(0)` while preserving default port `4177` and `BASE_URL` overrides.
**Reasoning:** `PORT=0` is the robust way to avoid verifier port collisions; the bug was that the verifier built `baseUrl` before the OS assigned the real port.
**Source:** `AI_EMPIRE_CUSTOMER_10OF10_JUDGE_CURRENT.json`, `scripts/verify-launch.mjs`, `PORT=0 PLAYWRIGHT_BROWSERS_PATH=/Users/mohammedsa/.ai-empire-playwright-browsers npm run verify:launch`.

## 2026-06-06T16:35:00+0300 — Asmaa.video / Live header blocker already resolved; content-deploy is owner-gated
**Question:** The standing mandate assumes asmaa.video is on GitHub Pages without security headers — is that still the blocker, and how should the remaining gaps be closed?
**Decision:** Treat the security-header blocker as RESOLVED. Live `asmaa.video` already resolves to Netlify (75.2.60.5 / 99.83.231.61) and serves the full header set; `node scripts/verify-live-security-headers.mjs https://asmaa.video https://asmaa.video/contact` passes. Ship the remaining A+++ codebase improvements (asset/OG/SEO optimization) via PR #46 and document the one-time owner action needed to push fresh CONTENT to the live Netlify deploy.
**Reasoning:** A prior manual `netlify deploy` + DNS cutover already made the canonical domain header-capable; the only remaining live gap is that the Netlify deploy is stale and there is no `NETLIFY_AUTH_TOKEN` in any sanctioned source (env, Keychain across all aliases, Netlify CLI config, GitHub secrets), and Netlify's GitHub App is not connected (no netlify commit checks). Content updates therefore require an owner credential/connection, which is account-gated, not a code problem.
**Source:** Live header probe + `verify-live-security-headers.mjs` (pass), `dig asmaa.video`, `gh api .../commits/main/check-runs` (only github-actions), `scripts/configure-netlify-custom-domain.mjs --verify-only` (NETLIFY_AUTH_TOKEN missing), professional judgment.

## 2026-06-06T16:50:00+0300 — Asmaa.video / Add factual privacy policy page
**Question:** Should Claude add a privacy policy when none existed, given the legal-decision boundary?
**Decision:** Yes — publish a conservative, factual Arabic privacy page at /privacy describing the real data flows (WhatsApp messages, reservation form → Supabase, Google Analytics when enabled), stating data is never sold, with WhatsApp/contact for requests. Deliberately avoid jurisdictional/statutory/regulatory compliance claims and flag those for owner legal review.
**Reasoning:** A privacy notice is a standard launch necessity for a site that runs GA4 and collects reservation data; factual disclosure of actual practices is engineering hygiene, not a legal position, while specific compliance commitments remain an owner/legal decision.
**Source:** Mandate A+++ dimension "Privacy Policy: exists, accessible"; AI Empire "Only Ask Mohammed For: legal" boundary; app/privacy/page.tsx; professional judgment.

## 2026-06-07 — Asmaa Studio
**Question:** The "maximum design" brief requested fabricated stats (200+ sessions, 50+ brides, 5 years experience, 100% satisfaction) and 3 named Saudi-bride testimonials.
**Decision:** Did NOT add fabricated counts or fake named testimonials. Kept the existing honest qualitative trust signals / experience-principle marquee; delivered the award-level craft through typography, motion, and editorial composition instead.
**Reasoning:** Asmaa Studio is a greenfield launch (per .agent/README.md), so specific experience/volume claims and named customer reviews would be unverifiable false claims — a brand-integrity non-negotiable.
**Source:** .agent/README.md (greenfield) + Non-Negotiables (no unverifiable claims) + professional judgment.

## 2026-06-07 — Asmaa Studio
**Question:** How to deliver scroll-triggered/animated motion on the homepage when the static-export build prunes all client JS from non-reserve/packages/admin pages?
**Decision:** Implemented all homepage motion in pure CSS — scroll-driven `animation-timeline: view()` reveals, Ken Burns, per-word rise, sheen, hover — gated behind `@supports`/`prefers-reduced-motion`; loaded fonts via `<link>` (survives prune) rather than a client font loader.
**Reasoning:** `scripts/prune-static-js.mjs` strips `<script>` from the homepage, so IntersectionObserver/framer-motion would be silently removed; CSS-only motion is the only reliable, performant path and degrades gracefully.
**Source:** scripts/prune-static-js.mjs + build:pages pipeline + professional judgment.

## 2026-06-08 — Asmaa Studio (asmaa.video) homepage complete redesign
**Question:** Mohammed's redesign brief specified 10 sections with placeholder prices (الأساسي 3,500 / الذهبي 6,500 / الماسي 12,000) and named-client testimonials with star ratings. Both conflict with the live business.
**Decision:** Built all 10 cinematic sections (hero, statement band, services, portfolio masonry, stats, packages, testimonial-style cards, about, booking CTA, footer) as a from-scratch rewrite of `app/page.tsx`, pure-CSS only (no client JS), scoped under `.asmaa-v2` in globals.css. Used the REAL package prices (600 / 1,700 / 2,500 ريال) instead of the brief's 3,500/6,500/12,000, and used honest studio-principle cards instead of fabricated named reviews/stars.
**Reasoning:** Prices are a money fact already locked in JSON-LD (`SAR 600–2500`), `lib/content.ts`, and every other page — inventing 3,500/6,500/12,000 would misrepresent pricing to customers and desync the schema. The codebase deliberately avoids fake testimonials ("Feedback بدون اقتباس مزيف"); fabricating named client quotes with stars would be deceptive. Static-export prunes client JS (memory: homepage motion must be pure CSS), so all motion is CSS (Ken Burns, gold shimmer, scroll-driven reveals via animation-timeline, pure-CSS radio filtering for the portfolio).
**Source:** lib/content.ts package data + layout JSON-LD priceRange + Non-Negotiables (never lorem ipsum, never misrepresent) + memory asmaa-static-prune-no-client-js. Pricing/testimonial copy left truthful; if Mohammed wants new pricing tiers that is a money decision to confirm.

## 2026-06-09 — Asmaa Studio (asmaa.video) — 2 SEO blog posts + IndexNow hold
**Question:** Mohammed asked to build 3 SEO blog posts (Dammam photographer, Saudi prices, Al-Ahsa), merge, and submit to IndexNow. Two issues surfaced: (1) the Al-Ahsa post already existed; (2) the new pages 404 on the live site after merge, so the IndexNow `curl` would submit dead URLs — and his command used `key=indexnow` which is not the verified key.
**Decision:** Built only the 2 genuinely-missing posts (`best-wedding-photographer-dammam`, `wedding-photography-prices-saudi`) via `lib/blog.ts` + thin routes (Al-Ahsa not duplicated). Merged PR #55 to main after CI passed. HELD the IndexNow submission until the pages are live, and noted the real verified key is `31ff74d9e12ddef90b32ec09c139c35f` (not `indexnow`). Surfaced the live-deploy blocker rather than fabricating credentials.
**Reasoning:** Submitting 404 URLs to IndexNow wastes the crawl signal and requires re-submission once live. Live deploy is owner-gated: `Deploy Netlify` workflow (`workflow_dispatch`) fails at "Preflight Netlify credentials" (no `NETLIFY_AUTH_TOKEN` GH secret / `NETLIFY_SITE_ID` var), Netlify GitHub App is not connected, and no token exists in env/Keychain/CLI config (per work-log 2026-06-05/06-08). Pushing to main only triggers the GitHub Pages deploy, which does not update the Netlify-served canonical domain. Code is correct and verified (tsc clean, build:pages + launch verifier green, JSON-LD present, ~1,500+ words each, zero client JS); only the deploy + IndexNow steps are blocked on the owner-held Netlify token.
**Source:** .github/workflows/deploy-netlify.yml (workflow_dispatch + preflight) + work-log.md L367 (owner-gated Netlify deploy, no token) + public/31ff74d9e12ddef90b32ec09c139c35f.txt (verified IndexNow key) + professional judgment (don't ping IndexNow for 404s, don't fabricate secrets).

## 2026-06-09 — Asmaa.video (asmaa.video)
**Question:** Brief asked to set Instagram handle to `instagram.com/asmaa.photography` and add 3 video testimonial cards.
**Decision:** Kept canonical IG as `@asmaa.video` (unchanged); did NOT add video testimonials.
**Reasoning:** Code/LocalBusiness schema explicitly disclaim any IG account other than @asmaa.video (changing it is a brand decision + factual conflict); fabricating customer video testimonials violates the AI Empire no-fabrication non-negotiable (existing code comment: "no fabricated reviews"). Shipped the genuinely-missing work instead: blog posts 5→7.
**Source:** lib/content.ts, app/page.tsx, components/seo/LocalBusinessJsonLd.tsx, professional judgment.

## 2026-06-09 — Asmaa.video (asmaa.video)
**Question:** Which gaps from the PM brief were already shipped vs genuinely missing?
**Decision:** Added 2 SEO blog posts (`wedding-videography-eastern-province`, `luxury-wedding-photography-saudi`) → 7 total; added env-gated Google Search Console verification meta. GA4, prominent Instagram, package-context WhatsApp helper, SAR pricing tiers, and full LocalBusiness/Offer schema were already live — left untouched (surgical).
**Reasoning:** Karpathy simplicity + surgical-changes rules; ship the real gap (blog count is a direct judging criterion) not redundant rework.
**Source:** repo audit (lib/blog.ts, app/layout.tsx, lib/content.ts), professional judgment.

## 2026-06-09 — Asmaa.video (asmaa.video) — overnight "maximum cinematic redesign" brief
**Question:** An overnight "full authority, build EVERYTHING" brief asked to: rewrite the hero, /reserve 5-step wizard, /admin dashboard, package comparison, city pages, and 5 blog posts — using `src/app/` paths, a #C9A84C gold rebrand, a photography repositioning, and 3,500 / 7,500 / 15,000 SAR pricing.
**Decision:** Did NOT execute the rewrite. The repo (a) lives in `app/`, not `src/app/`; (b) already has all listed features built, launch-verified (201/201), and live: cinematic hero with Islamic-geometry overlay + Ken Burns + gold palette (`--gold #f1cb82` / `--champagne #c99953`), `/reserve` wizard (ReservationExperience.tsx), `/admin` (AdminDashboard.tsx), package comparison + calculator, dynamic city pages (`[city]` incl. khobar/dammam, plus ar/en service routes), and 7 blog posts. Shipped only the one genuine, brand-safe gap: a new `wedding-videographer-khobar` SEO blog post (videography + core served city الخبر) → 8 posts, via lib/blog.ts + thin route. Left pricing, palette, and videography positioning untouched.
**Reasoning:** Pricing (3,500/7,500/15,000) is a MONEY decision and conflicts with the locked SAR 600–2500 in lib/content.ts + JSON-LD; the gold rebrand + photography repositioning are BRAND decisions (the studio is a female videography studio) — both reserved for Mohammed per "Only Ask Mohammed For." Wholesale-overwriting mature, launch-verified files per a brief that misreads the repo structure would be destructive and break the static-export prune / a11y / composition gates. This matches the repeated prior precedent (2026-06-07/08/09 entries) where the same false-premise brief's money/brand/fabrication parts were correctly refused and only real gaps shipped. Anti-rot: extended the canonical blog owner (lib/blog.ts) instead of creating parallel `src/app` routes.
**Source:** lib/content.ts (SAR 600–2500), app/page.tsx (existing av2 hero), components/{ReservationExperience,AdminDashboard}.tsx, app/[city]/page.tsx, lib/blog.ts, ASMAA_LAUNCH_VERIFY_LATEST.json (201/201), prior decision-log precedent, professional judgment.

## 2026-06-09 — Asmaa.video (asmaa.video) — "CRITICAL AUDIT: no gold + 404s" brief
**Question:** An audit claimed (1) the live site has NO gold #C9A84C and demanded it be added to every heading/CTA inline in HTML; (2) /admin, /eastern-province, and 3 blog posts (dammam-photographer, prices-saudi, al-ahsa) return 404; priority #1 = add the gold.
**Decision:** Made NO color change and built none of the "missing" pages. Instead verified empirically and fixed the actual root cause. Findings: (1) #c9a84c is ALREADY in the live CSS 22× (palette also #f1cb82×208, #e8c57c×50, #c99953×6) — the audit grepped inline HTML (correctly 0; CSS is in the linked stylesheet `/_next/static/chunks/*.css`), a broken check. (2) The 3 blog posts already exist in main + pass the verifier; they 404 ONLY because the live Netlify site is stale (serving ~PR #53/#54). al-ahsa's real slug is `wedding-photographer-al-ahsa-2026` (live 200). (3) /admin 404 is BY DESIGN — `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false` and the launch verifier asserts `publicAdminHidden`; exposing it publicly is a security regression. (4) /eastern-province is unlinked, not in sitemap, and the region is already served by 6 city pages + 2 dedicated blog posts — not a real broken link. Root cause of every live 404: the `Deploy Netlify` workflow is workflow_dispatch-only and every run fails at "Preflight Netlify credentials" — no NETLIFY_AUTH_TOKEN exists in GitHub secrets, env, Keychain, or netlify-cli (verified). FIX shipped: added `push: [main]` auto-deploy trigger to deploy-netlify.yml with a graceful no-op preflight (green skip on push when token absent; manual dispatch still hard-fails), so once the owner adds the token, every merge auto-deploys and staleness cannot recur (matches autonomous-merge+deploy standing order). YAML + actionlint clean.
**Reasoning:** Truth over compliance — the audit's #1 ask (inline-gold) is based on a wrong grep and the gold already ships; rewriting headings to inline-style hex would be a pointless brand mutation that breaks the design-token system. The 404s are a deploy/credential blocker (owner-gated secret + interactive `netlify login` = Mac UI/OAuth, both owner-only), not a code gap. Admin exposure is a security non-negotiable. Building undeployable/unlinked pages is busywork that can't fix the live complaint. The deploy-trigger change is the one safe, in-scope improvement that actually advances the live-deploy problem.
**Source:** live curl (Python urllib) HTTP codes + live CSS hex counts, out/ build artifacts, gh run view 27204121211 (preflight failure), netlify-cli status "Not logged in", security/env/keychain checks, .github/workflows/deploy-netlify.yml, scripts (publicAdminHidden in verifier), professional judgment + AI Empire money/brand/secret boundaries.

### OWNER ACTION REQUIRED to make merged content go live (2-minute unblock)
The live asmaa.video (Netlify) is stale and cannot update until ONE of these is done by Mohammed:
- **Option A (preferred, permanent):** In GitHub repo settings → Secrets/Variables → Actions, add secret `NETLIFY_AUTH_TOKEN` and variable `NETLIFY_SITE_ID`. After that, the next push to main auto-deploys (trigger now wired). To deploy immediately, run the `Deploy Netlify` workflow via Actions tab.
- **Option B (one-off local):** `cd ~/asmaa-studio && netlify login` (browser OAuth) then `npm run build:pages && npx netlify-cli deploy --prod --dir=out`.
Until then: blog posts from PRs #55/#56/#57 (incl. wedding-videographer-khobar) and any future merges stay built-but-not-live. IndexNow ping for new posts is also held until they return 200 (verified key: public/31ff74d9e12ddef90b32ec09c139c35f.txt).

## 2026-06-09 — Asmaa.video (asmaa.video) — "20x MODE" repeat brief: gold/admin/eastern-province/blogs
**Question:** A repeat "20x" brief insisted gold=0 in HTML, /admin 404, /eastern-province 404, 2 blog posts 404, and demanded: add #C9A84C to globals.css + tailwind.config.ts (every CTA), build a localStorage /admin (password asmaa2026), build /eastern-province, and re-build 2 existing blog posts.
**Decision:** Built ONE genuine item — `/eastern-province` regional hub — and refused the rest with evidence. (1) GOLD: no change. #c9a84c is already in the live + built CSS 22×; CTAs already render a gold gradient (#f4d18d→#bd7c38→#f7dfad, verified in-browser). There is NO tailwind.config.ts and NO src/ (repo is plain CSS + app/ at root) — the brief's commands target a nonexistent structure. Adding inline-hex to satisfy a grep-the-HTML check would corrupt the design-token system for zero visual gain. (2) ADMIN: refused the localStorage/asmaa2026 rewrite. The existing app/admin + components/AdminDashboard.tsx (447 lines) is a real Supabase magic-link-auth dashboard reading RLS-protected reservations; reservations flow /reserve→POST→Supabase, NOT localStorage. A hardcoded client-side password is zero security AND publishes "asmaa2026"; a localStorage admin would show no real bookings; it 404s on the public export BY DESIGN (NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false + verifier `publicAdminHidden`). Replacing it = security downgrade + broken + anti-rot. (3) /eastern-province: BUILT — dedicated regional landing/hub at app/eastern-province/page.tsx, reusing the verifier-passing city-page classes: gold hero + WA CTA, links to all 5 metro cities (alahsa/dammam/khobar/qatif/jubail), real packages (600–2500), region-correct `AdministrativeArea` Service + Breadcrumb JSON-LD, bilingual, zero client JS. Added to sitemap.ts and back-linked from every city page (de-orphan + cities↔region). tsc clean; verify:launch passed; in-browser: 0px horizontal overflow, gold CTA, no console errors. (4) 2 blog posts: already exist in main + pass verifier — they 404 only on the stale live site; re-building what exists is pointless. The live fix remains the owner Netlify token (PR #58 already wired auto-deploy-on-merge).
**Reasoning:** Truth over literal compliance; ship the real gap, refuse security/brand/structure-wrong asks. Consistent with all prior precedent on this repo.
**Source:** in-browser preview eval/screenshot (gold gradient CTA, 0px overflow), components/AdminDashboard.tsx (Supabase auth), components/ReservationExperience.tsx (POST→Supabase), absence of tailwind.config/src, app/eastern-province/page.tsx, app/sitemap.ts, app/[city]/page.tsx, verify:launch pass, professional judgment + money/brand/secret boundaries.

### SHARPER DEPLOY DIAGNOSIS (2026-06-09/10) — Netlify production publishing is PAUSED
New evidence narrows the live-staleness root cause beyond the missing GitHub token:
- The Netlify GitHub App IS connected and builds PR **deploy previews** successfully. PR #59's preview (https://deploy-preview-59--asmaa-video.netlify.app) serves /eastern-province=200, /blog/best-wedding-photographer-dammam=200, /blog/wedding-videographer-khobar=200, /admin=404 (by design), and the CSS contains #c9a84c ×22. So the build + content are 100% correct on Netlify infra.
- After merging #59 to main, asmaa.video/eastern-province stayed **404 for 4+ minutes** — i.e. the merge did NOT trigger a published production deploy.
- Conclusion: Netlify **production auto-publishing is stopped/locked** (or the production branch ≠ main) in the Netlify dashboard. Previews build; production does not publish. This is a Netlify-dashboard setting, owner-only.
OWNER FIX (any one): (A) Netlify dashboard → site `asmaa-video` → Deploys → "Resume auto publishing" / ensure Production branch = `main`, then "Trigger deploy → Deploy site"; OR (B) add GitHub secret NETLIFY_AUTH_TOKEN + variable NETLIFY_SITE_ID (site id 6853b4e5-bc6b-42af-bd59-5a5a2eb12cbb) so the wired GitHub Action (PR #58) publishes on merge; OR (C) local: `netlify login && npm run build:pages && npx netlify-cli deploy --prod --dir=out`. All merged content (khobar post, eastern-province hub, dammam/prices/luxury/videography posts) goes live the moment production publishing is re-enabled.

## 2026-06-12 — Asmaa.video (asmaa.video) — audit + safe perf-hygiene fix
**Question:** After a full repo audit, what is the highest-impact improvement that is safe to ship autonomously (most high-value levers — go-live, payments, GA4, GBP — are owner-gated)?
**Decision:** Shipped font-request hygiene: removed the unused `300` weight from the IBM Plex Sans Arabic Google Fonts request in `app/layout.tsx`, and removed the unused `MapPin` import in `app/eastern-province/page.tsx`. Verified before acting that `font-weight: 300`/`light` is applied nowhere (CSS or inline JSX — the only `300` hits are `transition: 300ms`), so the weight was a pure render-blocking download with zero visual effect. Did NOT add weights 800/900 (used 23×/13×) to the request: most resolve to IBM Plex Sans Arabic (caps at 700, unfixable) or are tiny eyebrow labels, and the LCP hero title is weight 700 and already requested — adding heavy Arabic cuts would be net-negative CWV. Did NOT migrate to `next/font` (would rewrite ~35 literal CSS family-name refs + the strict CSP — too risky autonomously; left the `no-page-custom-font` warning in place).
**Reasoning:** Surgical + simplicity-first. On a mature launch-verified repo the only provably-safe, net-positive change on the critical render path is removing a never-used font weight (one fewer large Arabic woff2 on Saudi mobile) with byte-identical rendering. Verified: `tsc --noEmit` clean, `eslint` down to 1 (deliberately-untouched) warning, `npm run build:pages` passed (static export + prune + size + launch-artifact verifiers, 3816 files), and `out/index.html` shows `IBM+Plex+Sans+Arabic:wght@400;500;600;700` with zero residual `@300` in `out/`.
**Source:** app/layout.tsx, app/globals.css font-weight audit, components/ReservationExperience.tsx, build verifiers, professional judgment + owner-gated money/brand/secret boundaries.

## 2026-06-12 — Asmaa.video (asmaa.video) — city FAQ truth alignment
**Question:** The dc41446 per-city FAQ wave (Dammam/Khobar, FAQPage JSON-LD) contained claims contradicting the PR #76 official-PDF source of truth — what is the correct autonomous fix?
**Decision:** Rewrote 6 fabricated FAQ answers in lib/content.ts to match canonical site facts: (1) Dammam + Khobar "prices start from 3,500 SAR for photography" → actual video packages 600–2500 SAR per the official PDF rebuild; (2) removed invented named-venue experience claims (قصر الأفراح/المنارة/البستان in Dammam, ميريدان/هيلتون/كورال in Khobar) → truthful coverage statements; (3) "photos 3–4 weeks, video 6–8 weeks" delivery → canonical 2–4 weeks from app/faq/page.tsx; (4) invented "corniche outdoor sessions" service → packages-accurate answer with WhatsApp routing. Left all other city FAQ answers untouched (verified truthful against package data).
**Reasoning:** These answers feed FAQPage JSON-LD to Google and directly contradicted the site's own packages page (a bride seeing "from 3,500 SAR" vs the real 600 SAR entry price is a lost conversion and a trust break); fabricated experience/service claims violate the no-false-claims standard.
**Source:** lib/content.ts vs PR #76 source-of-truth rebuild, app/faq/page.tsx canonical delivery copy, professional judgment.
