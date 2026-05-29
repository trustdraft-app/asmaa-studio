# Reservation System

## What Changed

- `/reserve` is the bride-facing link that replaces sending the PDF package file in WhatsApp.
- `/admin` is the owner dashboard for upcoming reservations, lead status, and WhatsApp follow-up when explicitly enabled.
- The site keeps a WhatsApp fallback when the secure backend endpoint is not configured yet.
- Real persistence is designed for Supabase Edge Functions, not direct anonymous browser database writes.

## Security Shape

The website is currently deployed as a static GitHub Pages site. A public form on a static site must not write directly to Supabase tables with anonymous insert access because hostile sites could trigger browser writes.

The production write boundary is:

1. Browser posts to `submit-reservation` Supabase Edge Function.
2. Edge Function verifies `Origin` against `RESERVATION_ALLOWED_ORIGINS`.
3. Edge Function enforces JSON body size limit.
4. Edge Function rate-limits by request fingerprint.
5. Edge Function validates and normalizes the payload.
6. Edge Function writes with service role.
7. Admin reads and updates reservations only after Supabase Auth and `reservation_admins` allowlist.
8. The public GitHub Pages build returns a static 404 artifact for `/admin` unless `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true`.

## Files

- UI: `app/reserve/page.tsx`, `components/ReservationExperience.tsx`
- Admin: `app/admin/page.tsx`, `components/AdminDashboard.tsx`
- Shared browser validation: `lib/reservations.ts`
- Database: `supabase/migrations/202605280001_reservations.sql`
- Edge Function: `supabase/functions/submit-reservation/index.ts`
- Edge validation: `supabase/functions/_shared/reservation-validation.ts`

## Activation Steps

1. Create or select a Supabase project.
2. Run the SQL in `supabase/migrations/202605280001_reservations.sql`.
3. Add the owner email:

```sql
insert into public.reservation_admins (email)
values ('OWNER_EMAIL_HERE')
on conflict (email) do nothing;
```

4. Deploy the Edge Function:

```bash
supabase functions deploy submit-reservation
```

5. Set Edge Function secret:

```bash
supabase secrets set RESERVATION_ALLOWED_ORIGINS="https://asmaa.video,https://www.asmaa.video,https://trustdraft-app.github.io"
```

6. Add build variables wherever the site is deployed:

```text
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PUBLIC_ANON_KEY
NEXT_PUBLIC_RESERVATION_ENDPOINT=https://PROJECT_REF.supabase.co/functions/v1/submit-reservation
NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true
```

Do not set `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true` until the Supabase project, Auth email links, and `reservation_admins` allowlist are active. Without that flag, `/admin` returns the static 404 artifact instead of the admin login or dashboard.

7. Rebuild and redeploy the website.

## Owner Workflow

1. Send `https://asmaa.video/reserve` to the bride instead of sending the PDF.
2. Bride fills the short guided flow.
3. If Supabase and `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true` are active, the reservation appears in `/admin`.
4. If Supabase is not active, the page opens WhatsApp with the full structured message.
5. Owner uses `/admin` to mark each lead as new, contacted, confirmed, deposit paid, shot, delivered, or cancelled.
