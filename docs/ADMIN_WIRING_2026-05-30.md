# Admin Wiring — Brevo magic-link + CF KV (blueprint)
**Date:** 2026-05-30
**Status:** Frontend ready, backend requires Brevo + CF API keys

## Current state on the repo

- `app/admin/page.tsx` — existing admin route, gated behind `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true`. Currently uses Supabase. Hidden from public build.
- `components/AdminDashboard.tsx` — 15 KB working dashboard skeleton (Supabase-backed)
- `gh secret list` on this repo — returned empty. **`BREVO_API_KEY` is NOT in repo secrets at the time of this commit.** Brevo magic-link cannot be wired by the agent until that secret is added.

## What ships in this PR

1. `/highlights` — public page with 12 IG/TikTok highlight icons (PNG + SVG download per icon), instructions for Instagram upload.

2. `marketing/instagram-highlights-v2/` — 12 new icon SVG sources + 12 PNG exports (each ~80-115 KB, 1080×1080).

3. `public/highlights-v2/` — production-served copies of the 24 files above.

4. This blueprint documenting the exact Brevo + CF KV admin wiring steps when secrets become available.

## 5-step admin MVA (execute when `BREVO_API_KEY` and `CF_API_TOKEN` are in `gh secret list`)

### Step 1 — Brevo magic-link endpoint (45 min)
Create a Cloudflare Worker at `https://api.asmaa.video/auth/*`:
```ts
// /auth/request (POST email) → Brevo sendTransacEmail → 200
// /auth/verify (GET ?token=...) → verify JWT → set cookie → 302 to /admin
```
Brevo Transactional Email template (create in Brevo dashboard, template id 1):
```
Subject: رابط دخولك للوحة Asmaa Studio
Body: اضغطي على الرابط للدخول (صالح لـ 10 دقائق): {{LINK}}
```

### Step 2 — Cloudflare KV namespace (15 min)
- Create namespace `asmaa-admin-state` in CF dashboard
- Bind to the Worker as `STATE_KV`
- Endpoints:
  - `GET /api/packages` → returns `STATE_KV.get('packages.json')` (falls back to `public/content/packages.json` shipped today)
  - `PUT /api/packages` (auth-gated) → writes to KV + invokes GitHub Actions repository_dispatch to rebuild the site
  - `GET /api/availability` / `PUT /api/availability` — date-blackout list
  - `GET /api/testimonials/pending` / `POST /api/testimonials/:id/approve` — moderation queue

### Step 3 — Replace Supabase in AdminDashboard.tsx with fetch to CF Worker (45 min)
- Remove Supabase imports
- Replace data fetches with fetch to `https://api.asmaa.video/api/...`
- Add JWT-cookie credentials handling

### Step 4 — Stats dashboard (30 min, post-Brevo wiring)
- Pull WhatsApp click counts from the existing `whatsappLink(source)` source labels — these are URL-tracked and can be aggregated from CF Pages access logs OR a Cloudflare Analytics Engine query
- PDF download counts from same logs
- Reserve form submission counts from existing Supabase table

### Step 5 — Asmaa's allow-list (5 min)
In the Worker code:
```ts
const ALLOWED_EMAILS = new Set(['md.alsaeed@hotmail.com', 'asmaa@asmaa.video']);
if (!ALLOWED_EMAILS.has(email)) return new Response('Not authorized', { status: 403 });
```

## Why I can't ship the Brevo + KV wiring today
- `gh secret list` empty → no `BREVO_API_KEY`, no `CF_API_TOKEN`
- The existing CF Worker fronting `asmaavideo.com → asmaa.video` lives outside this repo (its source isn't checked in)
- Adding a Worker to this repo requires `wrangler.toml` + a new `cloudflare/` directory + the Worker source — all doable, but they need the CF token to deploy

## Mobile-first admin (already designed)
The existing `AdminDashboard.tsx` is responsive (uses the same grid + card patterns from the live site CSS), so once auth wiring lands, Asmaa can manage from her phone with no further design work.

## Brand-rule guardrail in the admin (already specified)
- Price edit form will show a "Are you about to change a price the PDF doesn't agree with?" warning before save
- Testimonial moderation form enforces "initials + city + date only" pattern (form blocks any input matching `/[ء-ي]{2,}\s+[ء-ي]{2,}/` which would be a full Arabic name)
- All edits write to a `STATE_KV.audit_log[]` array with timestamp + actor email + diff
