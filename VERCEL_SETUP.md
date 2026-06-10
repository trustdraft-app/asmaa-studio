# Vercel Migration Setup — asmaa.video

The repo is fully wired for Vercel (`vercel.json` + `.github/workflows/deploy-vercel.yml`).
Until the 3 secrets below are added, the workflow no-ops gracefully (green) on push.
Five steps, ~10 minutes total.

## 1. Create a Vercel token
1. Sign in at https://vercel.com (use the GitHub login tied to `trustdraft-app`).
2. Go to https://vercel.com/account/tokens → **Create Token**.
3. Name: `asmaa-studio-gha`, scope: full account, expiry: no expiration (or 1 year).
4. Copy the token — you will not see it again.

## 2. Create the Vercel project and get the IDs
1. In Vercel dashboard → **Add New… → Project** → import `trustdraft-app/asmaa-studio`.
2. Framework preset: **Next.js**. Build command and output dir are already set by
   `vercel.json` (`npm run build:pages` → `out`). Deploy once.
3. Open the project → **Settings → General**:
   - **Project ID** → this is `VERCEL_PROJECT_ID`
   - **Team/Org ID** (Settings → General of the team, or `.vercel/project.json`
     after `npx vercel link`) → this is `VERCEL_ORG_ID`

## 3. Add the 3 GitHub secrets
On https://github.com/trustdraft-app/asmaa-studio/settings/secrets/actions add:

| Secret name         | Value                          |
|---------------------|--------------------------------|
| `VERCEL_TOKEN`      | token from step 1              |
| `VERCEL_ORG_ID`     | team/org ID from step 2        |
| `VERCEL_PROJECT_ID` | project ID from step 2         |

Then re-run **Deploy to Vercel** from the Actions tab (workflow_dispatch) to confirm
a green production deploy. PRs get preview deploys; merges to `main` go to production.

## 4. Point asmaa.video at Vercel
1. Vercel project → **Settings → Domains** → add `asmaa.video` (and `www.asmaa.video`,
   plus `asmaavideo.com` / `www.asmaavideo.com` — the redirects to the canonical
   domain are already in `vercel.json`).
2. At the DNS provider (Cloudflare), set:
   - `asmaa.video` A record → `76.76.21.21`
   - `www` CNAME → `cname.vercel-dns.com`
   (Vercel shows the exact records on the Domains page; if Cloudflare proxy is on,
   set these records to DNS-only while validating.)
3. Wait for the domain to show **Valid Configuration** and the SSL cert to issue.
4. Verify headers survive the move:
   `npm run verify:live-security-headers -- https://asmaa.video https://asmaa.video/contact`

## 5. Decommission Netlify (only after DNS is stable on Vercel)
1. Confirm https://asmaa.video serves from Vercel for 24–48h (response header
   `server: Vercel`).
2. Delete the GitHub workflow `.github/workflows/deploy-netlify.yml` (and optionally
   `deploy-pages.yml` if GitHub Pages is also being retired).
3. In Netlify dashboard: remove the custom domain from the old site, then delete the
   site. Remove the `NETLIFY_AUTH_TOKEN` secret and `NETLIFY_SITE_ID` variable from
   the GitHub repo.

Notes:
- `netlify.toml` / `public/_headers` are ignored by Vercel; all headers + redirects
  live in `vercel.json` (kept 1:1 with the Netlify config, plus immutable caching
  for `/_next/static/*` and `/fonts/*`).
- The site is a static export (`out/`); no Vercel serverless functions are used.
