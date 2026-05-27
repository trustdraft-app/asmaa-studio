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

This is live now because GitHub authentication was available. Vercel and Cloudflare CLI sessions were not authenticated in this environment.

## Vercel Settings

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: managed by Next.js
- Environment variables: none required for v1

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

Current public DNS still points both domains at Namecheap parking nameservers/parking records, so the custom domains are not live until Namecheap DNS or nameservers are changed.

## Security Notes

- v1 has no contact form, database, payments, auth, or API writes.
- All conversion is outbound WhatsApp.
- Security headers are configured in `vercel.json`.
- If a form or AI chat is added later, add origin checks, body limits, rate limits, PII-minimized logs, and server-side validation before launch.
