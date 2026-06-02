# Asmaa Studio TODO

## ✅ Done
- Build Arabic-first launch website with package, service-area, and WhatsApp conversion pages.
- Deploy the site — asmaa.video is live on GitHub Pages + Fastly CDN.
- All marketing routes, city pages, guides, services, SEO JSON-LD, accessibility, AEO/llms.txt.
- GA4 analytics code wired in layout.tsx via @next/third-parties/google.
- /process page fixed (CSS system rewrite + WhatsApp/reserve CTAs + hreflang + robots).
- /process added to sitemap, nav, llms.txt, llms-full.txt, verify-launch checks.

## 🔑 Activate GA4 — owner action required
1. Go to: https://analytics.google.com → create property for asmaa.video
2. Copy the Measurement ID (format: G-XXXXXXXXXX)
3. In GitHub: repo Settings → Variables → Actions → New repository variable
   - Name: NEXT_PUBLIC_GA_ID
   - Value: G-XXXXXXXXXX
4. Re-run the Deploy GitHub Pages workflow — tracking goes live with no code change.

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
