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
- Updated Namecheap DNS for `asmaavideo.com` with root and `www` URL redirects to `https://asmaa.video`.
- Verified GitHub Pages workflow success for commit `7e5cfbe`, `http://asmaa.video` returning `200`, and `asmaavideo.com`/`www.asmaavideo.com` returning `302` redirects.
- HTTPS enforcement is still waiting on GitHub Pages certificate issuance.
