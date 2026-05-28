# Asmaa Studio Deployment

## Recommended Production Shape

- Hosting: Vercel
- DNS/CDN registrar layer: Cloudflare after moving nameservers from Namecheap
- Primary domain: `asmaa.video`
- Redirect/support domain: `asmaavideo.com`

## Live GitHub Pages Deployment

- GitHub repo: https://github.com/trustdraft-app/asmaa-studio
- Canonical live URL: http://asmaa.video
- Temporary GitHub Pages URL: https://trustdraft-app.github.io/asmaa-studio/
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Build mode: static export with `GITHUB_PAGES=true`, `GITHUB_PAGES_CUSTOM_DOMAIN=true`, and empty `NEXT_PUBLIC_BASE_PATH`
- Custom domain: `asmaa.video`
- Support domain: `asmaavideo.com` redirects to `http://asmaa.video` until the GitHub Pages certificate is issued

This is live now because GitHub authentication was available. Vercel and Cloudflare CLI sessions were not authenticated in this environment.

## Vercel Settings

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: managed by Next.js
- Environment variables for static marketing pages: none required
- Environment variables for live reservations:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_RESERVATION_ENDPOINT`

## DNS Plan

After the Vercel project exists:

1. Add `asmaa.video` as the production domain.
2. Add `www.asmaa.video` and redirect it to apex if desired.
3. Add `asmaavideo.com` and redirect it to `https://asmaa.video`.
4. In Cloudflare, create the DNS records Vercel gives for the domain verification and routing.
5. Keep one canonical URL in Google Search Console: `https://asmaa.video`.

## GitHub Pages DNS Records If Used As Canonical

Only apply these records when GitHub Pages is selected as the canonical host for `asmaa.video`.

```text
asmaa.video      A      185.199.108.153
asmaa.video      A      185.199.109.153
asmaa.video      A      185.199.110.153
asmaa.video      A      185.199.111.153
www.asmaa.video  CNAME  trustdraft-app.github.io
```

These records are active in Namecheap as of 2026-05-28 04:35 +03. Public DNS resolves `asmaa.video` to GitHub Pages and `www.asmaa.video` to `trustdraft-app.github.io`.

## Namecheap DNS Records For Current GitHub Pages Deployment

Set these under Namecheap Advanced DNS for `asmaa.video`:

```text
@    A      185.199.108.153
@    A      185.199.109.153
@    A      185.199.110.153
@    A      185.199.111.153
www  CNAME  trustdraft-app.github.io
```

For `asmaavideo.com`, use Namecheap URL Redirect Record to:

```text
@    URL Redirect  http://asmaa.video
www  URL Redirect  http://asmaa.video
```

If URL Redirect is unavailable, point `asmaavideo.com` to the same GitHub Pages records only after creating a separate redirect host. GitHub Pages supports one primary custom domain for this repo, so the clean support-domain behavior is redirecting `asmaavideo.com` to `asmaa.video`.

As of 2026-05-28 05:27 +03, both `asmaavideo.com` and `www.asmaavideo.com` return `302` redirects to `http://asmaa.video` through Namecheap URL Forwarding.

## HTTPS Status

GitHub Pages has accepted `asmaa.video` as the custom domain and the latest Pages workflow for commit `9826638` completed successfully. HTTP is live now at `http://asmaa.video`. HTTPS enforcement is pending GitHub certificate issuance; the GitHub API currently returns `The certificate does not exist yet` when enabling `https_enforced`.

## Current Live Product Baseline

The live deploy now includes the 20x conversion/SEO upgrade: motion-led homepage, package decision engine, city SEO pages, expanded highlight covers, `/reserve`, `/admin`, and the daily launch-wave automation.

## Security Notes

- `/reserve` has a WhatsApp fallback when no backend endpoint is configured.
- Live reservation persistence must use the Supabase Edge Function in `supabase/functions/submit-reservation`; do not enable direct anonymous table inserts from the browser.
- `/admin` is noindex and requires Supabase Auth plus the `reservation_admins` allowlist when Supabase is configured.
- Security headers are configured in `vercel.json`.
- The Edge Function applies origin checks, body limits, rate limits, no-store responses, and server-side validation before persistence.

See `docs/reservation-system.md` for the exact activation steps.
