# Asmaa Studio — Admin Page Blueprint

**Status:** Blueprint (not yet implemented as functional admin)
**Existing artifact:** `app/admin/page.tsx` + `components/AdminDashboard.tsx` exist and render a working dashboard, but the route is gated behind `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false` in the public launch build (correctly hidden via the verify:launch gate).

## What the admin needs (from Mohammed)
1. **Magic-link auth** via Brevo (email-only, no passwords) — only Mohammed and Asmaa should be able to log in
2. **Read-only stats** — page views (Plausible API), WhatsApp clicks per source label, PDF downloads, contact form submissions
3. **Editable content** — package prices, availability calendar, testimonial moderation queue
4. **State:** Cloudflare KV or D1 (server-side, free tier, KSA-edge-fast)
5. **URL:** `/admin`

## Why this isn't a 45-min build

A production-ready admin with magic-link auth + editable JSON-backed content + analytics integration requires:
- Brevo MCP credentials (account, sender domain verification, transactional email template configured)
- Cloudflare API token + KV namespace ID + Worker route configuration
- Plausible API key (or alternate analytics — currently the site ships zero client JS so there is no analytics layer to query)
- A small backend (currently the site is 100% static; admin needs at least a Worker to hold mutable state)

None of this can be wired without Mohammed's credentials, and standing up Brevo + KV + Plausible from scratch with proper testing is a 4–6 hour build, not 45 minutes. Better to ship the **blueprint** so it's ready to execute the moment credentials are available.

## Minimum viable admin (MVA) — 2-hour build plan

When Mohammed provides credentials, here's the execution order:

### Step 1 — Brevo magic-link auth (45 min)
- Add `lib/auth/magic-link.ts` that signs a JWT into a one-time URL and emails via Brevo MCP
- Add `app/admin/login/page.tsx` — single email field, "Send me a login link" button
- Add `app/admin/verify/page.tsx` — consumes the JWT, sets a 90-day signed cookie, redirects to `/admin`
- Whitelist: only `md.alsaeed@hotmail.com` and Asmaa's email may receive a link

### Step 2 — Cloudflare KV for mutable state (30 min)
- Create KV namespace `asmaa-admin-state`
- Bind to a new Worker at `https://api.asmaa.video/*` (or `/api/*` on the existing CF Worker fronting asmaavideo.com)
- Endpoints:
  - `GET /api/packages` — read packages JSON
  - `PUT /api/packages` — write packages JSON (auth-gated)
  - `GET /api/availability` — read calendar of booked dates
  - `PUT /api/availability` — write calendar (auth-gated)
  - `GET /api/testimonials` — read approved testimonials
  - `PUT /api/testimonials/:id` — moderate (auth-gated)

### Step 3 — Editable packages (30 min)
- Move `lib/content.ts` `packages` export to read from `public/content/packages.json` at build time (already created in this PR as a snapshot)
- Admin edits push to KV → CF Worker → triggers a GitHub Actions webhook → site rebuilds → Fastly purges
- Alternative: serve packages.json directly from KV via a `/api/packages` endpoint that the homepage hydrates client-side (would break the "0 client JS" rule — not recommended)

### Step 4 — Stats dashboard (45 min)
- Plausible API integration (read-only, server-side fetch via the same Worker)
- Display: 7d page views per route, top WhatsApp source labels, PDF download count, /reserve form submission rate
- NO client JS on the public site; analytics is dashboard-only

### Step 5 — Testimonial moderation (30 min)
- Asmaa pastes a WhatsApp testimonial → KV `testimonials.pending`
- Admin reviews, approves with bride's consent — initials + city + date only per brand rule
- Approved testimonials surface on `/portfolio` and `/` in a Phase 3 carousel section

## Current `/admin` artifact (already in repo)

The repo has `app/admin/page.tsx` and `components/AdminDashboard.tsx` (15 KB) — a working dashboard skeleton. It's gated by:
```bash
NEXT_PUBLIC_ADMIN_PANEL_ENABLED=false  # public build (default)
NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true   # admin build
```

The verify:launch gate explicitly checks that the public build does NOT expose `/admin` or any admin link. Verified passing on the last 3 PRs.

To preview the admin locally:
```bash
NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... npm run dev
```

The current AdminDashboard uses Supabase as a backend. Per the brief above, the recommended migration path is:
- Supabase → Cloudflare KV (cheaper, simpler, KSA-edge-fast, no PostgreSQL surface)
- Supabase auth → Brevo magic-link (no password complexity, simpler UX)

OR keep Supabase but enforce the auth allow-list. Both work.

## Brand-rule compliance for admin

- The `/admin` route must NEVER appear in the public sitemap ✅ (verify:launch enforces)
- Admin must never expose Mohammed's personal email in logs (use `md.alsaeed@hotmail.com` only as allow-list seed, never echo back to UI) ✅
- All testimonial moderation must enforce **initials + city + date only**, no full names ✅
- Stats dashboard is internal — never publish counts publicly ✅

## What ships in THIS PR

This Sprint 3 PR ships:
- `public/content/packages.json` — the future admin-editable snapshot, currently a sidecar (not yet wired to a runtime fetch; lib/content.ts remains canonical)
- This blueprint document
- The existing admin artifact remains gated and unchanged

Functional admin shipping = a separate PR after Mohammed delivers credentials.
