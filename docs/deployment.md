# Asmaa Studio Deployment

## Recommended Production Shape

- Hosting: Vercel
- DNS/CDN registrar layer: Cloudflare after moving nameservers from Namecheap
- Primary domain: `asmaa.video`
- Redirect/support domain: `asmaavideo.com`

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

## Security Notes

- v1 has no contact form, database, payments, auth, or API writes.
- All conversion is outbound WhatsApp.
- Security headers are configured in `vercel.json`.
- If a form or AI chat is added later, add origin checks, body limits, rate limits, PII-minimized logs, and server-side validation before launch.
