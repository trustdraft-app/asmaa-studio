# Asmaa Studio Decisions

## 2026-05-28

- Use `Asmaa Studio` customer-facing name because the owner already wants the change and it broadens the brand beyond video.
- Use `asmaa.video` as the primary canonical domain because it is memorable and matches the service category.
- Use `asmaavideo.com` as a redirect/support domain to avoid splitting SEO authority.
- Keep v1 static and WhatsApp-first to launch quickly without privacy risk from forms or databases.
- Create local SEO pages for Al Ahsa, Dammam, and Khobar because the business is location-intent driven.
- Add `/reserve` and `/admin` as a Supabase-ready flow with WhatsApp fallback because the live GitHub Pages site is static and direct anonymous database writes would violate the security policy.
- Use IBM Plex Sans Arabic for body/UI, Noto Kufi Arabic for Arabic headings, and Cormorant Garamond only for Latin brand accents so Arabic text is clear, elegant, and native to the design.
- Customer-facing copy should sell the wedding memory, bride emotion, family ease, and package clarity; avoid visible privacy-style claims and internal growth/SEO/Admin wording.
- Reservation and WhatsApp flows must preserve customer intent in a polished way: city links preselect the city, WhatsApp prefill labels are human-readable, and admin phone links normalize Saudi numbers.
- Marketing pages are static and should be pruned of Next.js hydration scripts after export; keep JavaScript only on `/reserve` and `/admin` where interactivity is required.
