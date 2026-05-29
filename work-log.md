# Asmaa Studio Work Log

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
