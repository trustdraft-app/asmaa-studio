# Asmaa Studio Deployment

## Recommended Production Shape

- Hosting: Vercel
- DNS/CDN registrar layer: Cloudflare after moving nameservers from Namecheap
- Primary domain: `asmaa.video`
- Redirect/support domain: `asmaavideo.com`

## Current Domain Reality

- `asmaa.video` and `www.asmaa.video` are live on GitHub Pages with HTTPS enforced.
- `asmaavideo.com` and `www.asmaavideo.com` are separate public hostnames, not just marketing aliases.
- As of 2026-05-29 22:32 +03, both `asmaavideo.com` hostnames resolve to Namecheap forwarding IP `162.255.119.149`.
- HTTP forwarding reaches `https://asmaa.video/`, but HTTPS on `asmaavideo.com` times out because Namecheap URL forwarding is not a first-class HTTPS host with a certificate for this domain.

The required fix is DNS/hosting migration for `asmaavideo.com`; code changes alone cannot issue a TLS certificate for a domain that still points at Namecheap forwarding.

## Live GitHub Pages Deployment

- GitHub repo: https://github.com/trustdraft-app/asmaa-studio
- Canonical live URL: https://asmaa.video
- Temporary GitHub Pages URL: https://trustdraft-app.github.io/asmaa-studio/
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Build mode: `npm run build:pages`, which sets `GITHUB_PAGES=true`, `GITHUB_PAGES_CUSTOM_DOMAIN=true`, and removes the `/admin` static artifact unless the admin flag is explicitly enabled.
- Deploy gate: the Pages workflow now runs lint, typecheck, production dependency audit, launch verification, and admin-readiness verification before rebuilding the public artifact for upload.
- Custom domain: `asmaa.video`
- Support domain: `asmaavideo.com` must move away from Namecheap URL forwarding before HTTPS can work.

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

After the Vercel project exists and DNS access is available:

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

Do not leave `asmaavideo.com` on Namecheap URL Redirect for production HTTPS. The current records are only a temporary HTTP bridge:

```text
@    URL Redirect  http://asmaa.video
www  URL Redirect  http://asmaa.video
```

To fix `https://asmaavideo.com`, change the DNS at Namecheap to a real HTTPS host:

```text
# Preferred Vercel shape after adding both domains to the Vercel project
@    A      76.76.21.21
www  CNAME  cname.vercel-dns.com
```

Then configure Vercel to redirect both `asmaavideo.com` and `www.asmaavideo.com` to `https://asmaa.video`.
The repository `vercel.json` already contains host-based permanent redirects for both support-domain hostnames plus deploy-time security headers for the Vercel path.

If Cloudflare becomes authoritative DNS, move nameservers to Cloudflare, create proxied DNS records for both hostnames, and use a Redirect Rule or Worker to return a 301 to `https://asmaa.video$request_uri`.

If GitHub Pages remains the only available host, use a separate redirect host for `asmaavideo.com`; do not point it at this same repo because GitHub Pages supports one primary custom domain per Pages site.

As of 2026-05-28 05:27 +03, both `asmaavideo.com` and `www.asmaavideo.com` return `302` redirects to `http://asmaa.video` through Namecheap URL Forwarding.

## HTTPS Status

GitHub Pages has accepted `asmaa.video` as the custom domain, the certificate exists, and HTTPS enforcement is enabled for the primary domain. `https://asmaa.video` and `https://www.asmaa.video` are the only first-class HTTPS hostnames on the current GitHub Pages deployment. `asmaavideo.com` remains an HTTP forwarding bridge until DNS moves to Vercel, Cloudflare, or another redirect host that can issue TLS for both apex and `www`.

## Current Live Product Baseline

The live deploy now includes the 20x conversion/SEO upgrade: motion-led homepage, package decision engine, city SEO pages, expanded highlight covers, `/reserve`, `/faq`, `/portfolio`, `/guides`, structured data, `llms.txt`, and strict launch verification. Public `/admin` is intentionally hidden on GitHub Pages; the admin login is verified only in explicit admin-check builds.

## Security Notes

- `/reserve` has a WhatsApp fallback when no backend endpoint is configured.
- Live reservation persistence must use the Supabase Edge Function in `supabase/functions/submit-reservation`; do not enable direct anonymous table inserts from the browser.
- `/admin` is omitted from the public GitHub Pages build unless `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true`; when enabled, it is noindex and requires Supabase Auth plus the `reservation_admins` allowlist before reservation data is visible.
- Security headers are configured in `vercel.json`, but GitHub Pages does not apply them. Full CSP/HSTS/header control requires Vercel, Cloudflare Pages, or a Cloudflare Worker/Proxy layer in front of the static site.
- `vercel.json` includes HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and support-domain host redirects, but these only take effect after the site is actually deployed behind Vercel.
- The Edge Function applies explicit origin checks, body limits, hashed Cloudflare-IP fingerprints, atomic RPC-backed rate limits, no-store responses, and server-side validation before persistence. It fails closed if Supabase credentials or allowed origins are missing.
- Sentry is not active in the GitHub Pages build because no Sentry project/DSN is configured in this repo. Add Sentry only after a real DSN and release-upload token are available; do not fake monitoring with placeholder credentials.

See `docs/reservation-system.md` for the exact activation steps.
