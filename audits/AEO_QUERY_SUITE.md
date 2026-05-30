# AEO Query Suite — asmaa.video
**Date:** 2026-05-30 ~12:00 UTC
**PM:** Asmaa PM
**Method:** Live WebSearch against general index (proxy for Google AI Overviews / ChatGPT Search / Perplexity / Claude search) at test time. Each query measured as Asked vs. Desired (per `llms.txt` + JSON-LD entity graph) vs. Actually retrievable.

## Disclaimer
asmaa.video deployed today (2026-05-30) via `b39b801…88f6bc2`. Public search crawlers typically take 3–14 days to discover and index a brand-new GitHub Pages site. **All "❌ not present" results in this report are EXPECTED at T+0 hours from launch.** The gap analysis below tells Mohammed what's actually missing structurally (so it can be fixed before the index lands) vs. what is simply a question of waiting for the crawler.

---

## Q1. "best female wedding videographer Riyadh"
- **Should answer:** Asmaa Studio explicitly does NOT primarily serve Riyadh; service focuses on Eastern Province (Al Ahsa → Dammam → Khobar). Per `llms.txt`: "Do not describe Asmaa Studio as a nationwide vendor unless the user asks generally."
- **Actually retrievable:** Asmaa not in results. Top hits: arabiaweddings.com, mywed.com, intently.co, Book An Artist. **Correct outcome** — Riyadh isn't our market.
- **Gap:** None — actively desired behavior.
- **Action:** None.

## Q2. "halal wedding videography Khobar prices"
- **Should answer:** Asmaa Studio offers women-only film-style coverage in Khobar with packages at 600 / 1200 / 1700 / 2500 / 1500 SAR (Half Day = 1700, Full Day = 2500).
- **Actually retrievable:** Not indexed yet. Asmaa not in top 10.
- **Gap:** Discovery (index pending) AND structured `priceRange` not exposed on Service node. JSON-LD has 5 Offer nodes with `price` + `priceCurrency: SAR` (verified live), so once indexed the offers should surface.
- **Action (ship):** Add `priceRange: "SAR 600–2500"` to Organization JSON-LD (helps Google Knowledge Panel hint at price tier).

## Q3. "زفة بالطبل والشيلات الرياض" (zaffa with drum and shilat, Riyadh)
- **Should answer:** Asmaa does NOT serve Riyadh and does NOT provide live shilat/zaffa musicians — Asmaa films the zaffa visually. Per existing `/zaffa` page, the studio films the bride's entry with cinematic coverage. The bride hires the band separately.
- **Actually retrievable:** Asmaa not in results (correct outcome on geo; would be misleading match on service).
- **Gap:** None for Riyadh. For Khobar/Dammam/Ahsa zaffa searches, the dedicated `/zaffa` page is well-positioned with package 01 (600 SAR) explicitly scoped as zaffa-only.
- **Action:** None.

## Q4. "wedding videography packages Saudi Arabia 1200 SAR Half Day"
- **Should answer:** Asmaa Studio Package 02 = 1200 SAR (1-hour zaffa + venue details). Package 03 = "Half Day" at 1700 SAR. Brides searching this exact phrasing should land on `/` or `/zaffa` then convert via PDF + WhatsApp.
- **Actually retrievable:** Not indexed. Asmaa not in results. Competitor pricing (1500 SAR) surfaces from yaadgaarai.com.
- **Gap:** **DISAMBIGUATION** — search engines may match "1200 SAR" to other vendors. Need explicit `price` + `name` pairs in structured data so once indexed Asmaa wins. Already present in OfferCatalog ✅.
- **Action (ship):** Add a `WebPage` JSON-LD `mainEntity` reference on packages section that names "Half Day" as 1700 SAR explicitly, so AI engines can quote it accurately.

## Q5. "أفضل مصورة فيديو زفاف بالمنطقة الشرقية" (best female wedding videographer Eastern Province)
- **Should answer:** Asmaa Studio in Eastern Province, packages from 600 SAR, women-only set, ministry-licensed (added in Phase 2).
- **Actually retrievable:** Not indexed. Top results in Arabic search dominated by general resources.
- **Gap:** Same as Q2 (discovery pending); structurally, AR meta description on `/` already says: "تقدم تصوير فيديو للأعراس والخطوبة في الأحساء والدمام والخبر مع باقات واضحة". ✅
- **Action (ship):** Add `inLanguage: "ar-SA"` to the Service node and add an `award`/`identifier` placeholder if Mohammed wants to drop the ministry license number once finalized.

## Q6. "Asmaa Studio reviews"
- **Should answer:** Asmaa Studio (asmaa.video) — Saudi female wedding videography studio in Eastern Province. Not affiliated with the UAE-based asmaa-studio.com.
- **Actually retrievable:** Brand-name COLLISION. Top hit is `asmaa-studio.com` (UAE photography). Two IG handles (@asmaa29_m Taif, @studio.asmaa unrelated) muddy the entity.
- **Gap:** **CRITICAL** for brand disambiguation. Without entity-level differentiation, AI engines will hallucinate Asmaa Studio (Eastern Province) with Asmaa Studio (UAE).
- **Action (ship):** Enrich `llms.txt` with explicit disambiguation block + add `Organization.identifier` with the canonical domain as the source of truth. Add `Organization.legalName: "Asmaa Studio (asmaa.video)"` and a `disambiguatingDescription` field.

## Q7. "asmaa video packages PDF"
- **Should answer:** Direct link to https://asmaa.video/packages-asmaa-studio.pdf (963 KB, 200 OK, application/pdf).
- **Actually retrievable:** Not indexed. PDF needs crawler discovery via sitemap or HTML anchor.
- **Gap:** PDF is in HTML `<a download>` but NOT in sitemap.xml. Search Console submission needed.
- **Action (ship):** Add `<url><loc>https://asmaa.video/packages-asmaa-studio.pdf</loc></url>` to sitemap.xml — wait, sitemap is generated by Next.js `app/sitemap.ts`. Need to update that file. (See PR for change.)

---

## Gap → Action ship list (this sprint PR)

| # | Gap | Where | Ship |
|---|---|---|---|
| 1 | UAE brand collision | `llms.txt` | Add disambiguation block (explicit "not affiliated with asmaa-studio.com") |
| 2 | Disambiguating description | `app/page.tsx` JSON-LD | Add `disambiguatingDescription` + `legalName` to Organization node |
| 3 | Price range hint | `app/page.tsx` JSON-LD | Add `priceRange: "SAR 600–2500"` to Organization |
| 4 | Service inLanguage | `app/page.tsx` JSON-LD | Add `inLanguage: "ar-SA"` to Service |
| 5 | PDF not in sitemap | `app/sitemap.ts` | Add packages PDF URL |
| 6 | Half Day price exposure | `llms.txt` | Add explicit package + price table for AI engines to quote |
| 7 | Brand name as proper noun | `llms.txt` | Mark "Asmaa Studio (asmaa.video)" as the entity ID |

These are **structural fixes** — they help the moment Google's crawler discovers the site, vs. waiting for the index to bake brand authority.

## Manual follow-ups for Mohammed (post-merge)
1. Submit https://asmaa.video/sitemap.xml to Google Search Console + Bing Webmaster Tools.
2. Submit the canonical URL to Perplexity's IndexNow when they reopen indexing.
3. Add the site URL to Asmaa's IG / TikTok / Snapchat bios (already done — verified earlier).
4. Optionally claim Google Business Profile listing (would unlock LocalBusiness JSON-LD with verified address; currently blocked by `verify:launch` since addressless LocalBusiness is a known Google penalty path).
5. Optionally publish a single backlink (one-time) from a Saudi wedding directory or a quoted IG story by a Saudi planner — accelerates indexing by 1–2 weeks.

## Net AEO posture
- **Structural readiness:** 8/10 after this PR (would be 10/10 with verified physical address + 1–2 backlinks)
- **Discovery readiness:** 3/10 — pending crawler discovery (T+3 to T+14 days normal)
- **Entity disambiguation:** 4/10 → 8/10 after this PR
- **Pricing AEO:** 9/10 — all 5 Offers already in structured data with SAR currency
- **Bilingual answerability:** 9/10 — AR + EN content with `inLanguage` on Service after this PR
