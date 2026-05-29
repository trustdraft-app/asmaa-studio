# Asmaa Studio Security Audit

Date: 2026-05-29
Commit audited: e7a91ed3dc9ab7ebe1fee7a545c6e327cadb06bf
Scope: security, data, admin, privacy, and supply chain only.

## Score

8.8/10 live readiness.

## Closed Controls

| Area | Status | Evidence |
| --- | --- | --- |
| Public admin on GitHub Pages | Closed | `app/admin/page.tsx` returns `notFound()` unless `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true`; live `https://asmaa.video/admin` returns 404; current `out/` has no `admin.html`. |
| Admin indexing | Closed | `app/admin/page.tsx` sets `robots: { index: false, follow: false }`; `app/robots.ts` disallows `/admin`; admin-check build verifies noindex. |
| Static export pruning | Closed | `scripts/prune-static-js.mjs` removes `/admin` artifacts when admin is disabled and prunes marketing scripts outside `/reserve` and `/admin`. |
| Supabase write boundary | Closed | `supabase/functions/submit-reservation/index.ts` fails closed without Supabase credentials or `RESERVATION_ALLOWED_ORIGINS`, verifies `Origin`, enforces POST-only, body cap, rate limit, validation, then service-role insert. |
| Supabase RLS | Closed | `supabase/migrations/202605280001_reservations.sql` enables RLS on reservation tables; admin read/update requires authenticated email in `reservation_admins`; no anon insert policy exists. |
| Rate limit RPC | Closed | `bump_reservation_rate_limit` is `security definer`, `search_path = public`, revoked from public, granted only to `service_role`. |
| Response privacy | Closed | Edge function JSON responses include `cache-control: private, no-store` and `referrer-policy: no-referrer`. |
| Secrets in repo | Closed | `gitleaks detect` found no leaks; raw secret regex search found no committed service-role/API secrets. |
| Dependency advisories | Closed | `npm audit --omit=dev` and `osv-scanner --lockfile package-lock.json` found no issues. |
| Semgrep scan | Closed | Semgrep registry rules for secrets, JavaScript, and TypeScript found 0 findings. |
| CI deploy gate | Closed | `.github/workflows/deploy-pages.yml` pins actions by SHA and gates deploy on `npm ci`, lint, typecheck, production audit, launch verification, admin verification, and public Pages build. |
| Sentry | Documented inactive | `docs/deployment.md` documents Sentry is not active because no DSN/release token is configured; no Sentry token or DSN is present in code. |

## Blockers To 10/10

1. `asmaavideo.com` is not HTTPS-ready. DNS still resolves to Namecheap forwarding IP `162.255.119.149`; `http://asmaavideo.com/` returns a 302 to `http://asmaa.video`, and `https://asmaavideo.com/` times out.
2. GitHub Pages cannot apply the configured security headers in `vercel.json`. Live `https://asmaa.video/` lacks `strict-transport-security`, `content-security-policy`, `x-content-type-options`, `referrer-policy`, and `permissions-policy` headers.
3. Supabase production activation is not verifiable from this repo alone. Before enabling `NEXT_PUBLIC_ADMIN_PANEL_ENABLED=true`, the live Supabase project must prove migration applied, `reservation_admins` populated, Auth redirect allowlist restricted, `RESERVATION_ALLOWED_ORIGINS` exact, and hostile-origin/missing-origin probes returning 403 before persistence.
4. Trivy did not run because the local machine's Docker credential helper points to missing `docker-credential-desktop`; this is an environment/tooling blocker, not a code finding.

## Exact Recommended Fixes

1. Move `asmaavideo.com` and `www.asmaavideo.com` off Namecheap URL Forwarding to a real HTTPS host. Preferred: add both domains to Vercel, set apex `A 76.76.21.21`, set `www CNAME cname.vercel-dns.com`, and configure 301 redirects to `https://asmaa.video`.
2. Put the live site behind Vercel, Cloudflare Pages, or a Cloudflare Worker/Proxy layer that applies: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
3. Before enabling live reservations/admin, run Supabase negative probes for hostile origin, missing origin, oversized body, invalid JSON, invalid payload, and rate-limit exhaustion against the deployed edge function.
4. Fix local Trivy by installing Docker Desktop credential helper or editing `~/.docker/config.json` to remove the missing `credsStore`; then rerun the Trivy filesystem scan.

## Commands Run

- `npm audit --omit=dev`
- `gitleaks detect --source . --config .gitleaks.toml --no-banner --redact --exit-code 1`
- `semgrep scan --config p/secrets --config p/javascript --config p/typescript --exclude node_modules --exclude .next --exclude out --exclude .git --exclude .planning --error`
- `osv-scanner --lockfile package-lock.json`
- `deno check supabase/functions/submit-reservation/index.ts`
- `trivy fs --scanners vuln,secret --skip-dirs node_modules --skip-dirs .next --skip-dirs out --skip-dirs .git --skip-dirs .planning --exit-code 1 --severity HIGH,CRITICAL .`
- `trivy fs --db-repository public.ecr.aws/aquasecurity/trivy-db --scanners vuln,secret --skip-dirs node_modules --skip-dirs .next --skip-dirs out --skip-dirs .git --skip-dirs .planning --exit-code 1 --severity HIGH,CRITICAL .`
- `curl -sS -D - -o /dev/null --max-time 20 https://asmaa.video/`
- `curl -sS -D - -o /dev/null --max-time 20 https://asmaa.video/admin`
- `curl -sS -D - -o /dev/null --max-time 20 https://www.asmaa.video/`
- `curl -sS -D - -o /dev/null --max-time 12 http://asmaavideo.com/`
- `curl -sS -D - -o /dev/null --max-time 12 https://asmaavideo.com/`
- `dig +short asmaavideo.com`, `www.asmaavideo.com`, `asmaa.video`, `www.asmaa.video`

## Files Changed By This Audit

- `SECURITY.md`
