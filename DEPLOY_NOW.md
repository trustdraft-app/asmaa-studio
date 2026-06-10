# DEPLOY_NOW — getting asmaa.video to serve the latest main

The site is stale because the GitHub → Netlify auto-deploy silently no-ops
when the `NETLIFY_AUTH_TOKEN` secret is missing. Three ways to fix, fastest first.

## Option 1 — Deploy from this machine right now (2 minutes)

```bash
npx netlify-cli login          # one-time browser login
./netlify-deploy.sh            # builds + deploys out/ to production
```

If the site is not linked locally, pass the site explicitly:

```bash
NETLIFY_SITE_ID=<site-id-from-Netlify-dashboard> ./netlify-deploy.sh
```

(Site ID lives at Netlify dashboard → Site configuration → General → Site ID.
It starts with `6853b4e5-`.)

## Option 2 — Enable auto-deploy on every merge to main (permanent fix)

1. Netlify dashboard → User settings → Applications → **New access token** → copy it.
2. GitHub repo → Settings → Secrets and variables → Actions:
   - **Secret** `NETLIFY_AUTH_TOKEN` = the token from step 1.
   - **Variable** `NETLIFY_SITE_ID` = the site ID (`6853b4e5-...`).
3. Re-run the "Deploy Netlify" workflow (Actions tab → Deploy Netlify → Run workflow),
   or merge anything to main. Every future merge auto-deploys.

## Option 2b — Build-hook fallback (no token needed)

If you prefer not to mint an access token:

1. Netlify dashboard → Site configuration → Build & deploy → **Build hooks** → Add build hook.
2. Add the hook URL as GitHub secret `NETLIFY_BUILD_HOOK_URL`.
3. The "Deploy Netlify" workflow now POSTs that hook on every merge to main
   when the auth token is absent — Netlify rebuilds from `netlify.toml`
   (`npm run build:pages`, publish `out/`).

## Option 3 — Vercel (migration target)

See `VERCEL_SETUP.md`. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
secrets and the "Deploy to Vercel" workflow takes over (it already lints,
typechecks, audits, builds, and verifies live security headers).

## Verify after any deploy

```bash
npm run verify:live-security-headers -- https://asmaa.video https://asmaa.video/contact
curl -s https://asmaa.video | grep -o "نُوثِّقُ" | head -1   # latest hero copy present
```
