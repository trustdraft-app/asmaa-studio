# Asmaa Studio Work Log

## 2026-06-13 +03

- **Security/XSS hardening:** converted `LocalBusinessJsonLd`, `PersonJsonLd`, `SpeakableJsonLd`, and `ContactPointJsonLd` to use the `JsonLd` wrapper component (which escapes `<`, `>`, `&`) instead of raw `dangerouslySetInnerHTML` with unescaped `JSON.stringify`. All four components now safe.
- **Structured data correctness:** removed fake `SearchAction potentialAction` from `websiteSchema` in `LocalBusinessJsonLd.tsx`. The static export has no `/search` route — the fake endpoint was invalid structured data that could degrade Google rich-result trust signals.
- **Lint hygiene:** suppressed 2 false-positive `@next/next/no-page-custom-font` ESLint warnings in `app/layout.tsx`. These fired because fonts are loaded in the App Router root layout `<head>` (correct for site-wide font loading) rather than `pages/_document.js` (Pages Router convention — not applicable here). Warnings are now silenced with per-line disable comments.
- **AEO/GEO index refresh (llms.txt):** added packages page, about, reviews, process, privacy, blog family (10 posts × 2 locales), tsweer-afrah family expansion, seasonal/budget/wedding-types programmatic families, and restructured section headers for clearer answer-engine routing.
- **AEO/GEO index refresh (llms-full.txt):** added all missing marketing pages (about, reviews, process, privacy, packages), seasonal/eid/national-day occasion pages, extended city list (tsweer-afrah family with saihat/tarout/buqayq), all 10 blog posts, accurate guide count (12 active), and full programmatic family summaries (seasonal 96 pages, budget 24, wedding-types 40, EN mirrors 3360+).
- **ar/blog page confirmed correct:** `app/ar/blog/page.tsx` exists, has proper ar-SA metadata, is in sitemap, and is a valid Arabic locale alias for the blog index.
- Verified: `npm run typecheck` clean, `npm run lint` clean (0 errors, 0 warnings), `node scripts/verify-static-launch-artifacts.mjs` pass, `node scripts/verify-static-export-size.mjs` pass.

## 2026-06-07 18:40 +03

- Portfolio (`app/portfolio/page.tsx`) rebuilt as an on-brand women's-wedding showcase: asymmetric masonry (tall/standard spans), richer layered cinematic gradient art with light-bloom + film-grain + vignette, real-service-city overlay text (الأحساء/الدمام/الخبر/القطيف/الجبيل — not the brief's Riyadh/Jeddah, which aren't the service area), per-card play button, and IntersectionObserver lazy reveal. Honest CTA: no public film links exist yet, so play/"watch" opens a consent-first WhatsApp sample request rather than fake video links.
- Booking deposit (`components/ReservationExperience.tsx`): kept the existing Moyasar online card/mada rail untouched; upgraded the no-key fallback into a structured 3-step bank-transfer deposit card with deposit amount and an "أرسلي إيصال التحويل عبر واتساب" button (prefilled message with package/deposit/bride/date). IBAN intentionally gated behind WhatsApp, not printed live (avoids misdirected transfers).
- Floating WhatsApp (`components/SiteFooter.tsx` + `globals.css`): recolored to WhatsApp green #25D366, prefilled message retained, animated "عادةً يرد خلال ساعتين" bubble added, pulse kept; remains `display:none` on mobile to satisfy the launch verifier (header WhatsApp covers mobile).
- SEO/perf: `LocalBusinessJsonLd` `areaServed` broadened to Country (Saudi Arabia) + Eastern Province + Qatif while keeping `@type:Organization` (verifier forbids addressless LocalBusiness); `/process` added to `sitemap.ts`; indexed hero backdrop given descriptive Arabic alt.
- Mission 4 (fabricated named testimonials) deliberately NOT shipped — conflicts with the documented consent-first policy, the launch verifier's banned-marketing guards, and no-fabrication non-negotiables. See decision-log 2026-06-07.
- Verified: `tsc --noEmit` clean, `eslint .` clean, `npm run build:pages` (3654 files) + static-export/launch-artifact checks pass, and the full browser `run-launch-verifier.mjs` reports "Asmaa launch verification passed".

## 2026-06-05 09:32 +03

- Shipped the next safe Wave 2 slice as a real `near-me` route family at `/ar/{city}/{service}/near-me`, covering local voice-search and "close by" wedding-intent queries without needing venue databases or off-site content generation.
- Wired the family into `sitemap.xml`, `llms.txt`, `llms-full.txt`, WhatsApp source attribution, and launch verification with explicit sample artifacts for Al Ahsa, Dammam, and Khobar.
- Preserved the existing Wave 2 scope as partially shipped rather than falsely marking the whole wave complete; venue-coverage routes still remain for a later pass.

## 2026-06-04 17:36 +03

- Shipped the next live growth wave as the first real Wave 2 slice: a city-specific `/ar/{city}/bride-checklist` route family covering all SEO cities in the existing programmatic grid.
- Added checklist-page metadata and JSON-LD, linked the new route from each main city page, added the family to `sitemap.xml`, and taught `llms.txt` / `llms-full.txt` to route answer engines to these pre-booking pages.
- Extended `scripts/verify-launch.mjs` so launch verification now requires sample bride-checklist artifacts and their sitemap/LLM entries.
- Local verification command evidence remains mixed in this environment: `npm run build:pages` reproduced the known Next compile-stage stall before export, and direct local `typecheck` / `lint` commands did not return usable output here, so deployment verification must come from the GitHub Pages / CI workflows after push.

## 2026-06-03 09:07 +03

- Implemented the next daily growth wave in source as a local-proof/contact conversion pass centered on `/contact`, translating the off-site Google-post intent into a repo-owned improvement that can go live safely.
- Replaced the contact page's weak `LocalBusiness` structured data with `Organization` + `ContactPoint`, added a clear first-message checklist, linked the three main city pages directly, and tagged WhatsApp clicks from the contact route as their own source.
- Extended `scripts/verify-launch.mjs` so launch checks now fail if `/contact` reintroduces `LocalBusiness` or loses the new local-proof/conversion content.
- Local commit created at `27fd555`, but deployment is not yet live because `git push origin main` did not complete and remote `main` still reports `03cda09`.

## 2026-06-02 09:09 +03

- Shipped wave 20 as a live booking-source measurement pass across the real reservation flow and admin dashboard instead of leaving attribution hidden inside raw WhatsApp text.
- Added source inference for `/reserve` from internal referrers and query intent, preserved the source in Supabase reservation submits and WhatsApp fallback messages, and surfaced the current source to the bride before sending.
- Added an admin-side source report showing top booking paths plus per-reservation source labels so the studio can see which pages and package intents are producing real conversations.
- Verification passed locally with `git diff --check`, `npm run typecheck`, and `npm run lint` (warnings only, pre-existing). `npm run build:pages` still hangs at the known local Next 16 compile stage in this environment, so deployment verification must come from the GitHub Pages workflow after push.

## 2026-06-01 09:08 +03

- Shipped wave 19 as a live trust/conversion correction on `/reviews`: removed invented placeholder testimonials and placeholder aggregate-rating schema, then rebuilt the route into an honest "الاطمئنان قبل الحجز" page.
- Added clear pre-booking trust content: what can be verified on-site now, what the bride should send in the first message, and the consent rule for any future published feedback or clips.
- Updated homepage/about labels and WhatsApp source naming so the route promise matches the new content, and extended launch verification to fail if placeholder review markers or aggregate-rating schema return.
- Local `npm run typecheck` passed; local `npm run lint` and `npm run build:pages` reproduced the existing long-running/hanging behavior already noted in prior memory, so GitHub Actions remains the deployment verifier for this wave.

## 2026-05-29 09:11 +03

- Shipped wave 15 as a live `/portfolio` album page focused on the eight wedding and engagement moments brides compare before booking: entrance, First Look, bridal details, hall styling, engagement moments, detail tables, BTS, and the closing shot.
- Wired the new album surface into the homepage navigation/highlights CTA, WhatsApp source tracking, sitemap, `llms.txt`, and launch verification so it contributes to both search discovery and booking flow.
- Refreshed `public/highlights/album.svg` to match the new album direction and added responsive portfolio grid styling for mobile and desktop.
- Verification passed locally with `npm run lint`, `npm run typecheck`, GitHub Pages export build, and `npm run verify:launch` after installing the required Playwright Chromium binary.

## 2026-05-28 09:04 +03

- Shipped wave 14 as a live `/faq` booking questions page in Arabic with FAQPage and BreadcrumbList structured data.
- Added homepage navigation and CTA links to `/faq`, plus sitemap inclusion so search engines can discover the page cleanly.
- Reused the live content model for pre-booking answers covering package choice, arrival timing, WhatsApp details, deposit step, service areas, and availability confirmation.

## 2026-05-28 03:17 +03

- Added `/reserve` bride-facing guided reservation flow to replace WhatsApp PDF package sending.
- Added `/admin` owner dashboard for upcoming reservations, status filtering, search, and WhatsApp follow-up.
- Added Supabase migration and Edge Function for secure reservation persistence.
- Added WhatsApp fallback for the current static GitHub Pages deployment when Supabase variables are not configured.
- Documented activation in `docs/reservation-system.md` and updated deployment/security notes.

## 2026-05-28

- Reconfigured the GitHub Pages export for the real custom domain `asmaa.video` instead of the temporary `/asmaa-studio` subpath.
- Added `public/CNAME` for GitHub Pages custom-domain publication.
- Updated Namecheap DNS for `asmaa.video` to the four GitHub Pages A records and `www` CNAME.
- Updated Namecheap DNS for `asmaavideo.com` with root and `www` URL redirects to `http://asmaa.video` while the GitHub Pages HTTPS certificate is pending.
- Verified GitHub Pages workflow success for commit `9826638`, `http://asmaa.video` returning `200`, and `asmaavideo.com`/`www.asmaavideo.com` returning `302` redirects to `http://asmaa.video`.
- HTTPS enforcement is still waiting on GitHub Pages certificate issuance.

## 2026-05-28 05:58 +03

- Shipped the 20x live homepage upgrade: command hero, operating-system cards, package decision engine, trust strip, conversion infographic, daily SEO wave board, local city cards, and expanded highlight grid.
- Rebuilt `/alahsa`, `/dammam`, and `/khobar` as distinct local SEO pages with search intent, neighborhood signals, package comparison, local proof, daily content wave, and FAQ structured data.
- Expanded `lib/content.ts` into the live package/content/SEO operating model and added Packages, First Look, and Snapchat highlight SVG covers.
- Created daily automation `asmaa-daily-seo-launch-wave` to execute one live SEO/conversion wave every day at 09:00.
- Verification passed locally: lint, typecheck, GitHub Pages export build, route smoke checks, and Playwright visual smoke on `/`, `/alahsa`, `/dammam`, `/khobar`, `/reserve`, and `/admin`.

## 2026-05-28 06:18 +03

- Softened live trust copy after Mohammed noted that stating obvious privacy claims can sound suspicious.
- Replaced repeated defensive framing with calm execution, suitable style, professional clarity, clear packages, and elegant workflow language.
- Verification passed: no remaining `privacy`/`خصوصية` wording in `app`, `lib`, or `docs`; lint, typecheck, and GitHub Pages export build passed.

## 2026-05-28 06:31 +03

- Converted the remaining plan findings into live homepage sections: all 20 daily SEO waves, Instagram/TikTok/WhatsApp profile copy, hashtag sets, channel launch actions, content pillars, and board growth levers.
- Updated the homepage navigation with a direct Social anchor and kept the full SEO wave board visible on desktop/mobile.

## 2026-05-28 06:37 +03

- Upgraded the live Arabic typography system: IBM Plex Sans Arabic for body/UI text, Noto Kufi Arabic for premium Arabic headings, and Cormorant Garamond only for the Latin monogram/brand accent.
- Removed viewport-width font scaling from major headings so Arabic text stays elegant, stable, and readable on mobile and desktop.
- Verified exported `/`, `/alahsa`, `/reserve`, and `/admin` pages at 390px mobile and 1440px desktop: correct Arabic fonts, RTL metadata, visible headings, and zero horizontal overflow.

## 2026-05-28 06:56 +03

- Rewrote the live website copy with an Arabic-first wedding buyer psychology lens: bride emotion, professional reassurance, clear package choice, and easy WhatsApp follow-up.
- Removed visible internal/agency language from the customer journey, including SEO/Admin/growth-system phrasing and privacy-style wording that could sound defensive.
- Updated homepage, city pages, reservation link, admin setup copy, and content model so the site sells the desired memory before the operational system.

## 2026-05-28 07:16 +03

- Ran a third-party-style audit across conversion copy, reservation UX, WhatsApp links, accessibility labels, export links, dependency audit, and mobile/desktop render behavior.
- Fixed city-specific reservation links so `/reserve?city=dammam` and `/reserve?city=khobar` preselect the correct city.
- Added a minimum event date, accessible package selected states, Arabic aria labels, Arabic highlight alt text, readable WhatsApp source labels, normalized admin WhatsApp phone numbers, and a clean text pause in the hero headline.
- Verification passed: lint, typecheck, GitHub Pages export build, internal export link audit, production dependency audit, Playwright mobile/desktop route audit, and axe smoke check on `/reserve`.

## 2026-05-28 07:42 +03

- Applied the 10/10 board gate to the customer-facing website: performance, accessibility, SEO, best practices, conversion UX, Arabic copy, reservation flow, admin flow, and live-domain readiness.
- Added static-export pruning for the marketing pages so `/`, `/alahsa`, `/dammam`, `/khobar`, and `404.html` ship without unnecessary Next.js hydration scripts while `/reserve` and `/admin` stay interactive.
- Added a brand favicon/icon and reduced loaded font weights to keep the Arabic typography elegant with less payload.
- Lighthouse local score improved from `76/100/100/100` to `97/100/100/100` for performance/accessibility/best-practices/SEO.
- GitHub Pages still reports no HTTPS certificate for `asmaa.video`; created hourly automation `asmaa-https-cert-enforcer` to enable HTTPS enforcement automatically when GitHub issues the certificate.

## 2026-05-28 08:00 +03

- Deployed the launch-score fixes to GitHub Pages at commit `a816a77`.
- Live verification passed for `http://asmaa.video`, plus Playwright smoke checks for `/`, `/alahsa`, `/dammam`, `/khobar`, `/reserve?city=dammam`, `/reserve?city=khobar`, and `/admin` across mobile and desktop.
- Live export check confirmed the marketing homepage ships without Next.js hydration scripts.
- `asmaavideo.com` currently routes through Namecheap URL forwarding to `asmaa.video`; `asmaa.video` HTTPS remains blocked because GitHub Pages still has no issued certificate and rejects HTTPS enforcement with `The certificate does not exist yet`.

## 2026-05-28 08:17 +03

- Removed unprofessional relative-role persona wording from live customer copy and internal positioning notes.
- Reframed the website language around the bride/client, package clarity, event details, and professional ease.

## 2026-05-28 08:34 +03

- Reduced mobile homepage and reservation heading scale after screenshot review showed oversized typography.
- Shortened the homepage hero headline and tightened the reservation mobile layout, stepper, inputs, package buttons, and infographic cards.
- Replaced robotic reservation copy that mentioned system fallback/automatic saving with customer-facing WhatsApp follow-up language.
- Verified locally at 390x844: homepage h1 height dropped to 121px, reserve h1 height to 76px, no horizontal overflow, and banned robotic phrases are absent.

## 2026-05-28 13:58 +03

- Created the Figma design direction file `Asmaa Studio Premium Motion Direction`: https://www.figma.com/design/AxnBD6JO0MR3YY5XDt8LEa
- Shipped a live premium visual pass from that direction: cinematic hero image stack, motion guide layers, richer proof cards, animated story cards, and package infographic meters.
- Reworked the package grid from a narrow price-list feeling into a responsive visual story with package progression meters and cleaner card hierarchy.
- Verification passed locally: lint, typecheck, static export build, mobile/desktop Playwright checks, no horizontal overflow, hero visual assets present, and all five package meters render.

## 2026-05-28 14:44 +03

- Scanned the useful local/GitHub portfolio repos for reusable Asmaa patterns: Fattourh, ScanAbility, HalalCrypto, Sawgly, and Founder Command Center.
- Applied the useful pieces directly: `public/llms.txt`, `npm run verify:launch`, FAQ static-script pruning, and neutral admin-team copy.
- Documented the repo reuse audit in `docs/repo-reuse-audit.md` and kept heavier dashboard/deployment patterns out of scope.

## 2026-05-28 15:05 +03

- Checked live DNS and GitHub Pages health for `asmaa.video`, `www.asmaa.video`, and `asmaavideo.com`.
- Confirmed `asmaa.video` apex resolves to the four GitHub Pages IPs and `www.asmaa.video` CNAME points to `trustdraft-app.github.io`.
- Confirmed GitHub Pages marks the domain valid, unproxied, served by Pages, and HTTPS-eligible, but the certificate is still not issued.
- Tried to enable/refresh HTTPS through the GitHub Pages API; GitHub still returns `The certificate does not exist yet`.
- Kept Cloudflare proxy/DNS migration on hold because the current unproxied Namecheap DNS is the correct state for GitHub certificate issuance.

## 2026-05-28 15:28 +03

- Replaced the fake text/CSS `A/S` logo treatment with the correct uploaded gold monogram artwork.
- Added dedicated logo assets for nav/hero/favicon/app icon: `asmaa-logo-primary.jpg`, `asmaa-logo-heritage.jpg`, `asmaa-logo-square.png`, `favicon.png`, `apple-touch-icon.png`, and `app/icon.png`.
- Updated homepage, reserve page, admin page, Open Graph image, favicon, and launch verification to require real logo artwork.
- Added a Figma page named `Logo System / Live Applied` with the selected logo treatment and implementation notes.
- Verification passed: lint, typecheck, GitHub Pages export build, launch verifier, and mobile/desktop Playwright visual checks.

## 2026-05-28 16:04 +03

- Added a new `/guides` SEO hub and 12 focused Arabic guide pages for local wedding videography, engagement coverage, zaffa package searches, First Look, bridal details, package comparison, checklist, choosing a videographer, and delivery/editing.
- Linked the guide layer from the homepage and generated metadata, canonical URLs, Article/Breadcrumb structured data, sitemap entries, and `llms.txt` entries for every new page.
- Updated the static export pruner to remove client scripts from marketing pages while preserving `application/ld+json` structured data.
- Extended launch verification to require all guide pages, sitemap coverage, static-script pruning with structured data preserved, and mobile/desktop no-overflow checks for guide routes.
- Verification passed: lint, typecheck, GitHub Pages export build, launch verifier, and Playwright screenshot review for desktop `/guides` and mobile `/guides/wedding-videography-al-ahsa`.

## 2026-05-28 18:52 +03

- Ran a Claude design-director critique and generated a clean cinematic bridal still for the homepage hero background.
- Upgraded the live homepage first viewport with sticky glass navigation, AR/EN control, bilingual editorial headline, animated showreel scrubber, focus reticle, service dock, testimonial marquee, and fixed WhatsApp CTA.
- Rejected the first generated concept asset after visual review because it embedded fake website UI; replaced it with a no-text cinematic still and changed the asset path to avoid stale image caching.
- Fixed mobile hero wrapping by separating Arabic and English headline spans, adding grid min-width constraints, and making the horizontal scrubber keyboard-focusable.
- Verification passed: lint, typecheck, GitHub Pages export build, launch verifier, and mobile/desktop Playwright screenshot checks with no horizontal overflow.

## 2026-05-29 21:23 +03

- Hardened the public GitHub Pages build so `/admin` is omitted by default and the homepage no longer exposes any `/admin` link.
- Added explicit admin readiness verification: with `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true`, `/admin` builds, stays `noindex`, shows only the Supabase login gate, and hides dashboard content before auth.
- Added launch verification checks that fail if the public homepage exposes `/admin` or if the public build starts shipping admin markup.
- Centralized JSON-LD rendering through an escaping `JsonLd` component after Semgrep flagged direct `dangerouslySetInnerHTML` usage.
- Hardened the GitHub Pages workflow with SHA-pinned actions, job-scoped Pages permissions, and non-persistent checkout credentials.
- Documented the `asmaavideo.com` production blocker: both apex and `www` resolve to Namecheap forwarding IP `162.255.119.149`, so HTTPS times out until DNS moves to a first-class HTTPS host such as Vercel or Cloudflare.
- Verification passed: `git diff --check`, lint, typecheck, production dependency audit, OSV lockfile scan, gitleaks history/staged scans, Semgrep auto scan, Trivy high/critical scan, actionlint, zizmor, `npm run verify:launch`, and `npm run verify:admin`.

## 2026-05-29 21:44 +03

- Ran a world-class agency-style UI/UX/content audit on the public Asmaa homepage and applied the findings directly to the live-bound source.
- Removed customer-visible internal marketing operations language around SEO waves, hashtags, channels, content pillars, and board levers.
- Replaced testimonial-looking marquee copy with experience standards, tightened the hero around the bride decision path, and reframed city/booking sections around clear package and date decisions.
- Removed the unsupported “latest equipment” package claim and changed the copy to verifiable execution quality.
- Added launch-verifier bans for internal terms so future audits fail if operational copy leaks back onto public pages.
- Added a Figma audit page, `Agency QA / Live Applied 2026-05-29`, to the existing Asmaa design file with the applied findings and verification criteria.
- Verification passed before deployment: lint, typecheck, launch verifier, admin verifier, Semgrep, gitleaks, actionlint, zizmor, npm audit, OSV scanner, Trivy high/critical, and desktop/mobile visual smoke checks.

## 2026-05-29 21:52 +03

- Treated the successful Pages deploy annotations as an audit issue instead of ignoring them.
- Updated the pinned GitHub Pages workflow actions to official Node 24 releases: `actions/checkout@v6.0.2`, `actions/setup-node@v6.4.0`, `actions/upload-pages-artifact@v5.0.0`, and `actions/deploy-pages@v5.0.0` by SHA.
- Removed the temporary `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` override because the workflow now uses native Node 24 action metadata.

## 2026-05-29 22:02 +03

- Ran a deep SEO/GEO/AEO pass from project memory plus current Google Search Central guidance.
- Removed FAQPage JSON-LD from the FAQ and city pages because Google's current FAQ rich-result guidance no longer fits a wedding studio site.
- Strengthened homepage structured data with LocalBusiness, Service, WebSite, OfferCatalog, and guide ItemList graph nodes targeted to Al Ahsa, Dammam, Khobar, and Eastern Province intent.
- Added CollectionPage, ItemList, and BreadcrumbList graph nodes to the guides hub, and enriched guide Article schema with image, dates, publisher, author, and topic context.
- Changed the sitemap to a deterministic content `lastmod` and updated `llms.txt` with answer-engine instructions for the canonical domain, support-domain status, geography, customer type, and no-invented-claims rule.
- Added launch-verifier checks for no deprecated FAQPage structured data, homepage graph coverage, guide graph coverage, and deterministic sitemap dates.
- Added a Figma page named `SEO GEO / Live Applied 2026-05-29` to the Asmaa design file with the geo intent map, schema decisions, AEO rules, and verification criteria.
- Verification passed: diff check, lint, typecheck, launch verifier, gitleaks history scan, Semgrep auto scan, production npm audit, OSV lockfile scan, and generated structured-data summary.
- Deployed commit `3134f0b` through GitHub Pages run `26656615729`; live probes confirmed homepage LocalBusiness/Service/WebSite/ItemList graph, guides CollectionPage/ItemList/Breadcrumb graph, FAQ without FAQPage schema, deterministic sitemap, geo-aware `llms.txt`, hidden `/admin`, and unchanged support-domain HTTP forwarding.

## 2026-05-29 23:02 +03

- Ran a maestro/fleet readiness pass with separate UI/SEO, security/data, and release-verification lanes after Mohammed escalated the quality bar again.
- Fixed the remaining SEO contradiction by removing noindex `/reserve` from `sitemap.xml` and adding a launch-verifier assertion that the sitemap must exclude it.
- Fixed the mobile first-viewport issue by hiding the floating WhatsApp pill on mobile while retaining nav/hero WhatsApp CTAs; added a Playwright assertion so the pill cannot regress into mobile proof-content overlap.
- Strengthened `vercel.json` for the DNS-migration path with host-based permanent redirects from `asmaavideo.com` / `www.asmaavideo.com` to `https://asmaa.video` plus HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.
- Added fleet audit evidence in `SECURITY.md` and `.planning/ui-reviews/000-UI-REVIEW.md`; screenshot binaries stay ignored.
- Verification passed locally after the fixes: lint, typecheck, launch verifier, admin verifier, npm audit, gitleaks, Semgrep, OSV lockfile scan, Deno check, and Vercel JSON validation.
- Remaining blocker is still infrastructure-owned: `asmaavideo.com` HTTPS cannot be fixed in app code while DNS points to Namecheap forwarding IP `162.255.119.149`.

## 2026-05-29 22:36 +03

- Ran an escalation audit across UI/UX, SEO/GEO, admin privacy, Supabase readiness, CI, and live domain constraints after Mohammed rejected the prior quality bar.
- Closed concrete source defects: removed remaining public campaign labels, replaced addressless LocalBusiness schema with Organization + Service graph, fixed duplicate page titles, made `/reserve` noindex/follow with route-specific social metadata, changed sitemap root canonicalization and removed unverifiable `lastmod`, narrowed `llms.txt` service focus, compressed the hero runtime image to WebP, and fixed city/package query prefill in the reservation flow.
- Hardened launch checks so future builds fail on the same classes of defects: banned public ops labels, duplicate titles, addressless LocalBusiness schema, indexable reserve page, unverifiable sitemap dates, missing WebP hero, lost reserve query intent, and mobile tap targets below 44px.
- Hardened operations: pinned package ranges to exact lockfile versions, added generated-artifact gitleaks allowlist, added CI lint/typecheck/audit/launch/admin gates before Pages deploy, and hardened the Supabase Edge Function to fail closed without configured origins/secrets, hash fingerprints, ignore spoofable `x-forwarded-for`, and use atomic RPC-backed rate limits.
- Added a populated Figma evidence page, `Escalation Audit / Live Applied 2026-05-29`, in file `AxnBD6JO0MR3YY5XDt8LEa`; the page now contains real audit frames instead of empty proof pages.
- Verification passed: lint, typecheck, `git diff --check`, `npm run verify:launch`, `npm run verify:admin`, `npm audit --omit=dev`, OSV lockfile scan, gitleaks history and no-git scans, Semgrep `p/default`, actionlint, zizmor, Deno check for the Supabase function, and SQLFluff parse for the migration.
- Remaining blockers are infrastructure-owned, not code-owned: `asmaavideo.com` HTTPS still requires DNS migration away from Namecheap forwarding; GitHub Pages cannot emit CSP/HSTS/security headers; Sentry needs real DSN/token; Supabase/admin production operation needs a linked Asmaa Supabase project and protected admin host.

## 2026-05-30 09:18 +03

- Shipped wave 16 as a live conversion page at `/zaffa` instead of leaving it as an off-site Instagram-only task.
- Added a dedicated Arabic landing page for the 600 SAR entrance-only package with structured data, package comparison, city links, and direct `/reserve?package=01` conversion paths.
- Added homepage, FAQ, and portfolio links to the new zaffa route so the cheapest-package intent now has a first-class internal path.
- Added the new route to `sitemap.xml`, updated `llms.txt` answer-engine guidance, required the static export artifact in launch verification, and created a matching `public/highlights/zaffa.svg` highlight cover.

## 2026-05-31 09:19 +03

- Shipped wave 17 in source as a dedicated `/engagement` landing page for الخطوبة والملكة with structured data, package comparison, city links, and direct `/reserve?package=05` conversion paths.
- Added internal discovery links from the homepage guide section, FAQ page, and portfolio page so engagement intent now has a direct on-site path instead of relying on service slugs or off-site social posts.
- Updated `sitemap.xml`, `llms.txt`, `llms-full.txt`, WhatsApp source labels, and launch verification expectations to include the new engagement route.
- Local verification evidence: `git diff --check` passed and `npm run typecheck` passed; local `npm run build:pages` / `npm run verify:launch` are currently blocked by a Next 16 compile-stage hang in this environment before export finishes, so live deploy verification must come from the GitHub Pages workflow run after push.

## 2026-06-01 15:41 +03

- Closed the Claude launch-audit blockers around `/faq`, `/contact`, `sitemap.xml`, `llms.txt`, and the static launch verifier.
- Resolved the `app/globals.css` merge conflict by preserving the FAQ accordion, contact page, package-pricing, and footer navigation styles.
- Removed deprecated FAQPage structured data from `/faq` so the launch verifier and current rich-result policy stay aligned.
- Added `/contact` to the sitemap, `llms.txt`, static artifact requirements, and marketing-route verification; kept `/reserve` out of the sitemap because it is intentionally `noindex`.
- Hardened `scripts/verify-launch.mjs` so browser verification falls back to the installed macOS Chrome when the Playwright cache executable is unavailable.
- Fixed homepage mobile footer tap targets to meet the 44px height and width verifier requirement.
- Verification passed: `npm run typecheck`, `npm run build:pages`, `node scripts/verify-launch.mjs`, and `git diff --check` for touched files. The final launch verifier passed all static, SEO, llms, mobile, desktop, imagery, reserve intent, and axe checks.

## 2026-06-01 21:49 +03

- Shipped the `/contact` production fix through PR #26 from a clean `origin/main` branch instead of merging the unrelated portfolio-gallery feature branch.
- PR and `main` CI passed: `npm ci`, `npm run lint`, `npm run typecheck`, `npm audit --omit=dev`, `npm run verify:launch`, `npm run verify:admin`, and `npm run build:pages`.
- GitHub Pages deploy run `26774808909` completed successfully.
- Live probes now pass: `https://asmaa.video/contact`, `https://asmaa.video/sitemap.xml`, and `https://asmaa.video/llms.txt` all return HTTP 200.

## 2026-06-02 12:50 +03

- Fixed the current branch reviews-page launch failure by replacing banned wording in `app/reviews/page.tsx` metadata, principle title, and hero headline with consent-first sharing-boundary copy.
- Repaired local Playwright launch verification by using isolated browser cache `/Users/mohammedsa/.cache/ai-empire-playwright-asmaa`.
- Verification passed: `npm run verify:launch` with `PLAYWRIGHT_BROWSERS_PATH=/Users/mohammedsa/.cache/ai-empire-playwright-asmaa` completed with `178` PASS checks and no failures.
- Live check: `https://asmaa.video/reviews` returned HTTP `200` and did not contain the banned wording; local `out/reviews.html` also did not contain it after the fix.

## 2026-06-02 23:14 +03

- Shipped the Sprint 16 route-theatre redesign pass in source: packages, portfolio, reviews, about, FAQ, contact, reserve, and process now share image-led cinematic hero treatment, premium card surfaces, balanced headings, stronger route rhythm, and repaired contact/review hit areas.
- Added portfolio class hooks so the existing inline portfolio route can be styled consistently without rewriting the page structure.
- Optimized `scripts/prune-static-js.mjs` and `scripts/verify-launch.mjs` with bounded async file reads/writes so the 9k+ HTML export can be pruned and verified without multi-minute sequential filesystem stalls.
- Verification passed: `git diff --check`, `npm run typecheck --silent`, `npm run lint --silent`, `npm run build:pages` (`587s` final run), `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false node scripts/verify-launch.mjs` (`58s` final run), and Playwright route screenshot QA across 9 routes x desktop/mobile with zero overflow, route-hero, console, network, or tap-target failures.
- Visual evidence: screenshots saved under `/tmp/asmaa-sprint16-route-qa/`; generated design reference saved under `/Users/mohammedsa/.codex/generated_images/019e86ff-88ac-7991-8c04-d331426399b5/`.

## 2026-06-03 00:50 +03

- Audited Asmaa.video live launch headers, DNS, static export, Netlify edge target, and local launch verification.
- Confirmed canonical `https://asmaa.video` is still served by GitHub Pages/Namecheap DNS and fails required security headers because GitHub Pages ignores `_headers`.
- Confirmed existing header-capable Netlify target `https://asmaa-video.netlify.app` passes `scripts/verify-live-security-headers.mjs` and returns HSTS, CSP, frame denial, nosniff, referrer policy, and permissions policy.
- Fixed `cloudflare/asmaa-video-security-proxy.js` to use a named default export for lint-safe Worker deployment readiness.
- Verification passed: `npm run lint`, `npm run build:pages`, `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false node scripts/verify-launch.mjs`, `node --check cloudflare/asmaa-video-security-proxy.js`, and `git diff --check`.
- Netlify MCP deploy to the existing site ID was attempted twice but the connector wedged during project upload; no deploy was completed from this local session.

## 2026-06-03 06:57 +03

- Rechecked Asmaa.video during the portfolio 10-of-10 hard-audit push.
- Confirmed the header-capable target is already live at `https://asmaa-video.netlify.app/` with CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
- Confirmed the canonical domain still points to GitHub Pages through Namecheap nameservers and GitHub Pages A records, so `https://asmaa.video/` and `/contact` still fail the required public endpoint security-header gate.
- Ran the activation self-test and dry-run; the prepared Namecheap cutover would preserve existing records and move `@`/`www` to Netlify, but all required Namecheap API credentials are absent from environment, Keychain, and approved local secret files.
- Confirmed `NETLIFY_SITE_ID` remains set to `6853b4e5-bc6b-42af-bd59-5a5a2eb12cbb`; no deploy workflow was triggered in this pass.
## 2026-06-03T09:54:25+0300 — Asmaa.video / homepage redesign

- Rebuilt the Asmaa.video homepage first viewport around a cinema-first visual system: full-bleed bridal still, stronger Arabic/English headline, visible director-stage composition, booking CTAs, trust cards, and a service dock.
- Preserved launch verifier contracts: `hero-photo-stack`, `hero-logo-image`, `package-motion-meter`, `moment-card`, `guide-card`, structured data, static export pruning, and mobile no-overflow checks.
- Verification passed: `npm run typecheck`, `npm run lint`, `npm run build:pages`, and `node scripts/verify-launch.mjs`.
- Visual evidence saved under `audits/visual-redesign-2026-06-03/`: `desktop-v2.png` and `mobile-v2.png` are the accepted final captures.
- Process cleanup passed: no local static server or stale Asmaa verifier process remained after the checks.
- Committed and pushed code as `c574481` (`feat: redesign asmaa homepage hero`); GitHub Pages deploy run `26869255797` completed successfully and `https://asmaa.video/` now contains the redesign marker and new hero headline.
- Attempted header-capable Netlify deployment twice through the authenticated Netlify MCP uploader; both failed during upload with `TypeError: fetch failed`.
- Dispatched GitHub Netlify production workflow `26869403042`; it failed in preflight because `NETLIFY_AUTH_TOKEN` is not configured, while `NETLIFY_SITE_ID=6853b4e5-bc6b-42af-bd59-5a5a2eb12cbb` is present.
- Current live boundary: Asmaa.video design is live; Netlify/security-header production path remains blocked until a real Netlify auth token is installed in GitHub secrets or another header-capable edge authority is available.

## 2026-06-05T05:55:09+0300 — Netlify activation preflight narrowed

- Fast-forwarded local main to include `40b4123` and `8ff246b`, bringing in the DNS playbook, Netlify credential aliasing, and hardened live security-header verifier.
- Added and merged PR #42: `https://github.com/trustdraft-app/asmaa-studio/pull/42`.
  - Merge commit: `b90efd4b0992a1b4648c58b4adb0d0f3e83f4548`.
  - `scripts/configure-netlify-custom-domain.mjs` now reads non-secret `NETLIFY_SITE_ID` and `NETLIFY_CUSTOM_DOMAIN` from GitHub repository variables.
  - `NETLIFY_AUTH_TOKEN` remains excluded from GitHub variable sources and must come from a secret-capable source.
- Verification passed:
  - PR #42 GitHub `Verify` check;
  - `node --check scripts/configure-netlify-custom-domain.mjs`;
  - `node scripts/configure-netlify-custom-domain.mjs --self-test` (`13/13`);
  - `node scripts/configure-netlify-custom-domain.mjs --verify-only --json`;
  - `npm run verify:launch`;
  - `npm run lint`;
  - `npm run verify:live-security-headers -- https://asmaa-video.netlify.app https://asmaa-video.netlify.app/contact`.
- Current launch boundary: local Netlify activation now reports only `NETLIFY_AUTH_TOKEN` missing, while canonical `https://asmaa.video` still resolves to GitHub Pages and fails required HTTP security headers until a real Netlify token or DNS/edge authority completes the cutover.

## 2026-06-05T06:13:14+0300 — Netlify CLI token-source activation hardening

- Added and merged PR #43: `https://github.com/trustdraft-app/asmaa-studio/pull/43`.
  - Merge commit: `7bf2ce8764ceaf4a8e7b3e811ab3742b7dbe97b1`.
  - `scripts/configure-netlify-custom-domain.mjs` now accepts standard Netlify CLI config files as a local secret-capable source for `NETLIFY_AUTH_TOKEN`.
  - GitHub repository variables remain excluded for `NETLIFY_AUTH_TOKEN`; they are still only used for non-secret site/domain values.
- Verification passed:
  - PR #43 GitHub `Verify` check;
  - `node --check scripts/configure-netlify-custom-domain.mjs`;
  - `node scripts/configure-netlify-custom-domain.mjs --self-test` (`17/17`);
  - `node scripts/configure-netlify-custom-domain.mjs --verify-only --json`;
  - `npm run lint`;
  - `npm run verify:launch`.
- Current launch boundary remains explicit: no `NETLIFY_AUTH_TOKEN` exists in env, Keychain, approved local files, GitHub secret, or Netlify CLI config, so canonical header cutover still cannot be completed honestly.

## 2026-06-05T09:40:57+0300 — Contact launch verifier repair

- Fast-forwarded local `main` to the failing GitHub Pages deploy source `bf1d39b` while preserving existing local log entries append-only.
- Fixed the `/contact` launch verifier failure by changing page JSON-LD from addressless `LocalBusiness` to address-safe `Organization` with `ContactPoint` and adding the required pre-message/local-city copy tokens.
- Verification passed: `/Users/mohammedsa/bin/ai-heavy-run 'npm run verify:launch'`.
- The verifier now passes the exact previously failing checks: contact page avoids `LocalBusiness`, contains `Organization`, contains `ContactPoint`, contains `قبل أول رسالة`, and contains `صفحات محلية لكل مدينة رئيسية`.

## 2026-06-05T09:57:29+0300 — Dynamic verifier port repair

- Fixed `scripts/verify-launch.mjs` so `PORT=0` now uses the actual OS-assigned listener port for browser verification instead of sending Playwright to unsafe `http://127.0.0.1:0/`.
- This unblocks the portfolio customer judge's `asmaa-launch-verify` command without weakening any static, mobile, desktop, or axe checks.
- Verification passed: `node --check scripts/verify-launch.mjs`.
- Verification passed: `PORT=0 PLAYWRIGHT_BROWSERS_PATH=/Users/mohammedsa/.ai-empire-playwright-browsers npm run verify:launch`, including static export, contact schema/copy checks, mobile and desktop no-overflow checks, reserve prefill checks, and axe checks.

## 2026-06-06T16:50:00+0300 — Asmaa.video A+++ audit pass (assets, SEO, privacy)

- Confirmed the security-header blocker is RESOLVED: canonical `https://asmaa.video` resolves to Netlify (75.2.60.5 / 99.83.231.61) and serves the full A+ header set; `node scripts/verify-live-security-headers.mjs https://asmaa.video https://asmaa.video/contact` passes.
- Established that fresh CONTENT deploys are owner-gated: Netlify GitHub App is not connected (no netlify commit checks) and no `NETLIFY_AUTH_TOKEN` exists in env, Keychain (all aliases), Netlify CLI config, or GitHub secrets. The live Netlify deploy is a stale one-off `netlify deploy`. Documented the exact owner action in `.agent/TODO.md` (one-off token workflow, or connect Netlify auto-deploy).
- PR #46 (`codex/asmaa-aplusplus-assets-seo-20260606`): removed ~11MB of dead weight (9 duplicate PDFs + 1.97MB hero PNG), added a correct 1200×630 OG image (100KB) wired into OpenGraph/Twitter/JSON-LD, shrank favicon.ico 370KB→15KB and logo/app-icon 220KB→59KB, broadened the launch verifier route coverage, and added a factual Arabic `/privacy` page (footer + sitemap).
- Verification: `npm run typecheck` and `npm run lint` clean; `npm run build:pages` exits 0 with privacy exported and in sitemap; CI `Verify` on PR #46 PASSED (full `verify:launch` incl. axe a11y + expanded mobile/desktop route checks + `verify:admin`) on ubuntu. Local Playwright runs are SIGKILL'd by the Mac mem-pressure watchdog, so CI is the authoritative gate.

## 2026-06-06 — Online booking + payment rail (book & pay)
- Added a Moyasar hosted payment-link rail to the existing `/reserve` funnel (no backend; static-export safe).
  `lib/reservations.ts`: `reservationPaymentLink()` reads `NEXT_PUBLIC_PAYMENT_LINKS` (JSON map packageId→link)
  or `NEXT_PUBLIC_PAYMENT_LINK` catch-all; `depositAmount()` computes 50% deposit. Malformed config falls back, never breaks.
- `components/ReservationExperience.tsx`: confirm step now shows a deposit panel — deposit amount + either the live
  online "ادفعي العربون الآن (مدى/بطاقة)" button (when a link is configured) or the bank-transfer + WhatsApp receipt
  path (live default). WhatsApp submit unchanged.
- Added `app/success/page.tsx` — Arabic noindex confirmation page, Moyasar redirect-after-payment target, WhatsApp follow-up.
- `lib/content.ts`: added `success-page` WhatsApp source label. `app/globals.css`: `.reserve-deposit` styling (brand palette).
- `scripts/verify-launch.mjs`: added `/success` to browser a11y/overflow route coverage.
- Verified: `npm run typecheck` clean, `npm run lint` clean, `npm run build:pages` exits 0 (`/success` prerendered static,
  excluded from sitemap, noindex confirmed; deposit panel + pay button present in shipped reserve JS). Full Playwright
  `verify:launch` is authoritative on CI (local runs SIGKILL'd by mem-pressure watchdog).
- Boundary respected: did NOT create a Moyasar merchant account (money/legal/brand = owner). Activation is one env var.
  Two owner actions remain for a fully-live book+pay: (1) Netlify deploy of fresh content, (2) optional Moyasar links.

## 2026-06-07 — WhatsApp booking notification (server push + deep-link audit)
- Audited existing WhatsApp handling: already complete and LIVE. `whatsappNumber = "966551606334"`.
  Reserve flow (`components/ReservationExperience.tsx`) is a 3-step wizard with full fields, validation,
  loading state, success message. Primary path POSTs to Supabase edge function when configured; fallback
  opens a fully-detailed `wa.me` deep link (`lib/reservations.ts:reservationWhatsappUrl`). Deposit rail:
  Moyasar link via `NEXT_PUBLIC_PAYMENT_LINKS`, else bank-transfer + WhatsApp-receipt fallback. Floating
  WhatsApp button site-wide.
- Architecture constraint: site is a static export (`output: export`, Netlify `out/`). A Next
  `app/api/book/route.ts` cannot run and would duplicate the reservation owner (anti-rot). Did NOT build it.
  No `WHATSAPP_ACCESS_TOKEN` in env. Honored brief's "no server WhatsApp API unless token present".
- Gap closed: extended the canonical `supabase/functions/submit-reservation/index.ts` to send the owner an
  instant WhatsApp Cloud API push after the durable insert — token-gated (`WHATSAPP_ACCESS_TOKEN` +
  `WHATSAPP_PHONE_NUMBER_ID`), recipient default `966551606334` (`RESERVATION_NOTIFY_WHATSAPP` override),
  best-effort (never fails the reservation). So the configured-endpoint path now also notifies, matching the
  always-working deep-link path.
- Verified: `deno check` on the function passes; `npm run typecheck` clean; live `asmaa.video/reserve` HTTP 200
  with `wa.me` + number present. Shipped as PR #49 (rebased onto main, MERGEABLE).
- Owner/infra activation (needs Supabase + Meta creds): set edge secrets, `supabase functions deploy
  submit-reservation`, set `NEXT_PUBLIC_RESERVATION_ENDPOINT`. Until then the deep-link path is live and works.

## 2026-06-07 — Homepage cinematic editorial overhaul (award-craft)
- Loaded the real luxury fonts the CSS already referenced but never loaded: added Google Fonts `<link>`
  (Cormorant Garamond, Playfair Display, Noto Kufi Arabic, IBM Plex Sans Arabic, Noto Naskh Arabic) in
  `app/layout.tsx` root `<head>` → instantly elevates typography across every page. Single biggest lift.
- Appended a fenced "EDITORIAL OVERHAUL 2026-06-07" block to `app/globals.css` (+263 lines), ALL pure-CSS
  motion because the static-export pipeline (`prune-static-js.mjs`) strips client JS from every page except
  /reserve, /packages, /admin. Effects: film-grain + vignette overlay, true scroll-driven reveals via
  `animation-timeline: view()` (zero JS) gated by `@supports`, hero Ken-Burns drift, per-word Arabic headline
  rise (per-word to preserve Arabic letter joining), animated gold rule, CTA sheen sweep, card lift+gold-glow,
  featured-package halo, editorial pull-quote band, mobile scroll-snap service rail. Full
  prefers-reduced-motion fallbacks (content always visible).
- `app/page.tsx`: per-word hero headline, `ed-stagger` on 15 card grids, new `.ed-statement` editorial band
  (honest brand copy, no fabricated claims). All existing content/links/SEO/footer/WhatsApp preserved.
- Verified: `npm run typecheck` clean; `npm run lint` (1 benign no-page-custom-font warning — it's the root
  layout so fonts load site-wide); `npm run build:pages` passes incl. static-export size + launch-artifact
  verifiers (files=3654, ~50MB); exported HTML confirmed to retain font links + animations and contain NO
  client JS (prune-safe). Browser preview confirmed all 5 fonts load, view-timeline supported, hero +
  statement + packages (desktop & mobile RTL) render award-level, zero console errors.

## 2026-06-09 — Asmaa.video — overnight: wedding-videographer-khobar SEO post (#57)
- Audited an overnight "build EVERYTHING / cinematic rebrand" brief; found all listed features
  (hero, /reserve wizard, /admin, package comparison, city pages, blog) already built + launch-verified.
- Refused the brief's money/brand parts (3,500/7,500/15,000 SAR pricing, #C9A84C gold rebrand,
  photography repositioning) — conflict with locked SAR 600–2500 + female-videography brand. Logged.
- Shipped the one genuine gap: new `/blog/wedding-videographer-khobar` (الخبر, city-specific, real
  pricing, FAQPage schema, zero client JS) → 8 blog posts. tsc clean; verify:launch 201/201. Merged #57.
- Deploy note: live Netlify (canonical asmaa.video) remains owner-gated on NETLIFY_AUTH_TOKEN per prior
  logs; merge to main triggers GitHub Pages only. Live Netlify deploy + IndexNow ping still owner-blocked.
