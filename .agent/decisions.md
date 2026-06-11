# Asmaa Studio Decisions

## 2026-05-28

- Use `Asmaa Studio` customer-facing name because the owner already wants the change and it broadens the brand beyond video.
- Use `asmaa.video` as the primary canonical domain because it is memorable and matches the service category.
- Use `asmaavideo.com` as a redirect/support domain to avoid splitting SEO authority.
- Keep v1 static and WhatsApp-first to launch quickly without unsafe anonymous database writes.
- Create local SEO pages for Al Ahsa, Dammam, and Khobar because the business is location-intent driven.
- Add `/reserve` and `/admin` as a Supabase-ready flow with WhatsApp fallback because the live GitHub Pages site is static and direct anonymous database writes would violate the security policy.
- Use IBM Plex Sans Arabic for body/UI, Noto Kufi Arabic for Arabic headings, and Cormorant Garamond only for Latin brand accents so Arabic text is clear, elegant, and native to the design.
- Customer-facing copy should sell the wedding memory, bride emotion, professional ease, and package clarity; avoid defensive claims and internal growth/SEO/Admin wording.
- Reservation and WhatsApp flows must preserve customer intent in a polished way: city links preselect the city, WhatsApp prefill labels are human-readable, and admin phone links normalize Saudi numbers.
- Marketing pages are static and should be pruned of Next.js hydration scripts after export; keep JavaScript only on `/reserve` and `/admin` where interactivity is required.
- Reuse portfolio repo patterns only when they directly improve Asmaa: answer-engine indexing from Fattourh, accessibility checks from ScanAbility, and deploy/static proof from HalalCrypto; avoid importing heavy dashboard or Cloudflare complexity while GitHub Pages remains the live target.

## 2026-06-12

- City FAQ answers in `lib/content.ts` must stay aligned with the official-PDF package source of truth (PR #76): video packages 600–2500 SAR, delivery 2–4 weeks, no named-venue experience claims, no services outside the package lineup. The dc41446 FAQ wave fabricated facts (3,500 SAR photography pricing, named Dammam halls / Khobar hotels, 6–8 week delivery, corniche outdoor sessions) and was corrected in PR #78. Any future generated city copy must be checked against `packages`, `paymentTerms`, and `app/faq/page.tsx` before merge because these blocks feed FAQPage JSON-LD.
- Google Fonts requests in `app/layout.tsx` carry only used weights; IBM Plex Sans Arabic 300 was removed (used nowhere). Check weight usage before adding any weight to the request URL.
