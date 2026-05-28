# Asmaa Studio Work Log

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
- Replaced repeated privacy framing with calm execution, suitable style, family comfort, clear packages, and elegant workflow language.
- Verification passed: no remaining `privacy`/`خصوصية` wording in `app`, `lib`, or `docs`; lint, typecheck, and GitHub Pages export build passed.

## 2026-05-28 06:31 +03

- Converted the remaining plan findings into live homepage sections: all 20 daily SEO waves, Instagram/TikTok/WhatsApp profile copy, hashtag sets, channel launch actions, content pillars, and board growth levers.
- Updated the homepage navigation with a direct Social anchor and kept the full SEO wave board visible on desktop/mobile.

## 2026-05-28 06:37 +03

- Upgraded the live Arabic typography system: IBM Plex Sans Arabic for body/UI text, Noto Kufi Arabic for premium Arabic headings, and Cormorant Garamond only for the Latin monogram/brand accent.
- Removed viewport-width font scaling from major headings so Arabic text stays elegant, stable, and readable on mobile and desktop.
- Verified exported `/`, `/alahsa`, `/reserve`, and `/admin` pages at 390px mobile and 1440px desktop: correct Arabic fonts, RTL metadata, visible headings, and zero horizontal overflow.

## 2026-05-28 06:56 +03

- Rewrote the live website copy with an Arabic-first wedding buyer psychology lens: bride emotion, family reassurance, clear package choice, and easy WhatsApp follow-up.
- Removed visible internal/agency language from the customer journey, including SEO/Admin/growth-system phrasing and privacy-style wording that could sound defensive.
- Updated homepage, city pages, reservation link, admin setup copy, and content model so the site sells the desired memory before the operational system.

## 2026-05-28 07:16 +03

- Ran a third-party-style audit across conversion copy, reservation UX, WhatsApp links, accessibility labels, export links, dependency audit, and mobile/desktop render behavior.
- Fixed city-specific reservation links so `/reserve?city=dammam` and `/reserve?city=khobar` preselect the correct city.
- Added a minimum event date, accessible package selected states, Arabic aria labels, Arabic highlight alt text, readable WhatsApp source labels, normalized admin WhatsApp phone numbers, and a clean text pause in the hero headline.
- Verification passed: lint, typecheck, GitHub Pages export build, internal export link audit, production dependency audit, Playwright mobile/desktop route audit, and axe smoke check on `/reserve`.
