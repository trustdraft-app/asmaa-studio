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
