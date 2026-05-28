# Asmaa Studio Deployment

## Recommended Production Shape

- Hosting: Vercel
- DNS/CDN registrar layer: Cloudflare after moving nameservers from Namecheap
- Primary domain: `asmaa.video`
- Redirect/support domain: `asmaavideo.com`

## Live Fallback Now Active

- GitHub repo: https://github.com/trustdraft-app/asmaa-studio
- Live URL: https://trustdraft-app.github.io/asmaa-studio/
- Deployment workflow: `.github/workflows/deploy-pages.yml`
- Build mode: static export with `GITHUB_PAGES=true`
- Custom domain target: `asmaa.video`
- Support domain target: `asmaavideo.com` should redirect to `https://asmaa.video`

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

Current public DNS still points both domains at Namecheap parking records, so the custom domains are not live until Namecheap DNS records are changed.

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
@    URL Redirect  https://asmaa.video
www  URL Redirect  https://asmaa.video
```

If URL Redirect is unavailable, point `asmaavideo.com` to the same GitHub Pages records only after creating a separate redirect host. GitHub Pages supports one primary custom domain for this repo, so the clean support-domain behavior is redirecting `asmaavideo.com` to `asmaa.video`.

## Security Notes

- `/reserve` has a WhatsApp fallback when no backend endpoint is configured.
- Live reservation persistence must use the Supabase Edge Function in `supabase/functions/submit-reservation`; do not enable direct anonymous table inserts from the browser.
- `/admin` is noindex and requires Supabase Auth plus the `reservation_admins` allowlist when Supabase is configured.
- Security headers are configured in `vercel.json`.
- The Edge Function applies origin checks, body limits, rate limits, no-store responses, and server-side validation before persistence.

See `docs/reservation-system.md` for the exact activation steps.
