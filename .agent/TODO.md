# Asmaa Studio TODO

## ✅ Done
- Build Arabic-first launch website with package, service-area, and WhatsApp conversion pages.
- Deploy the site — asmaa.video is LIVE on Netlify with the full A+ security-header set
  (HSTS preload, strict CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy).
  Verified: `node scripts/verify-live-security-headers.mjs https://asmaa.video https://asmaa.video/contact`.
  (The DNS cutover from GitHub Pages → Netlify already happened; security-header blocker is RESOLVED.)
- All marketing routes, city pages, guides, services, SEO JSON-LD, accessibility, AEO/llms.txt.
- Optimized assets: 1200×630 OG image, ~11MB of duplicate/oversized assets removed (PR #46).
- GA4 analytics code wired in layout.tsx via @next/third-parties/google.
- /process page fixed (CSS system rewrite + WhatsApp/reserve CTAs + hreflang + robots).
- /process added to sitemap, nav, llms.txt, llms-full.txt, verify-launch checks.

## 💳 Activate online card/mada deposit (Moyasar) — owner action required
The booking funnel now has a payment rail built in. It activates with ONE config value, no code change:
1. Create a Moyasar merchant account (moyasar.com) — KYC + Saudi bank account. (Money/legal = owner only.)
2. In the Moyasar dashboard create a hosted **payment link** for each package's 50% deposit, e.g.:
   - Full Day deposit 1250 SAR, Half Day 850 SAR, Engagement 750 SAR, Zaffa+ 600 SAR, Zaffa 300 SAR.
   - Set each link's "redirect after payment" URL to: https://asmaa.video/success
3. Set the build/deploy env var `NEXT_PUBLIC_PAYMENT_LINKS` to a JSON map of packageId → link, e.g.:
   `{"01":"https://...","02":"https://...","03":"https://...","04":"https://...","05":"https://..."}`
   (Or set a single `NEXT_PUBLIC_PAYMENT_LINK` catch-all.) Set it in Netlify site env vars (or GitHub Actions Variables) — same place as NEXT_PUBLIC_GA_ID.
4. Re-deploy. The reserve confirm step then shows "ادفعي العربون الآن (مدى/بطاقة)".
Until configured, the live, working path is bank-transfer deposit + WhatsApp receipt (already shown to brides).

## 🔑 Push fresh CONTENT to the live Netlify site — owner action required
The canonical domain already serves correct security headers, but the live Netlify deploy is
STALE (a one-off manual `netlify deploy`). Netlify's GitHub App is not connected and there is no
`NETLIFY_AUTH_TOKEN` in any sanctioned source, so new commits do not auto-publish to asmaa.video.
Pick ONE (B recommended — durable auto-deploy):

A. One-off token deploy (~60s):
   1. app.netlify.com → User settings → Applications → New access token. Copy it.
   2. GitHub: repo Settings → Secrets and variables → Actions → New repository SECRET
      - Name: NETLIFY_AUTH_TOKEN   Value: <the token>
   3. Actions → "Deploy Netlify" → Run workflow (main). It builds + deploys out/ + verifies headers.
B. Connect auto-deploy (~2min, recommended):
   1. app.netlify.com → the asmaa-video site → Site configuration → Build & deploy → Link repository
      → trustdraft-app/asmaa-studio, branch `main`, build `npm run build:pages`, publish `out`.
   2. Every push to main then deploys automatically (netlify.toml + public/_headers carry the headers).

## 🔑 Activate GA4 — owner action required
1. Go to: https://analytics.google.com → create property for asmaa.video
2. Copy the Measurement ID (format: G-XXXXXXXXXX)
3. In GitHub: repo Settings → Variables → Actions → New repository variable
   - Name: NEXT_PUBLIC_GA_ID
   - Value: G-XXXXXXXXXX
4. Re-deploy via the Netlify path above (workflow A/B) — tracking goes live with no code change.
   (If using Netlify auto-deploy, set NEXT_PUBLIC_GA_ID in Netlify site env vars instead.)

## 🔑 Activate Supabase reservations — owner action required
1. Create a Supabase project at supabase.com
2. Apply migration: supabase/migrations/ (run via Supabase dashboard SQL editor)
3. Deploy Edge Function: supabase functions deploy submit-reservation
4. Set secrets in Supabase dashboard:
   - RESERVATION_ALLOWED_ORIGINS=https://asmaa.video
   - (owner email for notifications — add to Edge Function env)
5. Set in GitHub Actions Variables:
   - NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

## Remaining tasks
- Create Google Business Profile at https://business.google.com (owner only — requires phone verification)
- Add real bride reviews when consent is received (edit reviews array in app/reviews/page.tsx)
- Instagram highlight cover system using brand/logo assets
- asmaavideo.com DNS migration to Cloudflare for HTTPS redirect support
