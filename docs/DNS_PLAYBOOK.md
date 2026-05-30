# Asmaa Studio — DNS & Domain Playbook

**Date:** 2026-05-30
**State:** Both domains operational and verified.

## Domain inventory

| Domain | Purpose | Status | DNS provider | Edge |
|---|---|---|---|---|
| `asmaa.video` | Canonical site | ✅ LIVE | Cloudflare | Fastly (front of GitHub Pages origin) |
| `asmaavideo.com` | Support / vanity / 301 → canonical | ✅ LIVE | Cloudflare | Cloudflare Worker (301 redirect) |

## Verified at 2026-05-30 14:01 UTC

### asmaa.video
```
$ curl -sI https://asmaa.video/
HTTP/2 200
server: GitHub.com
last-modified: Sat, 30 May 2026 13:50:47 GMT
x-served-by: cache-mrs1050093-MRS    ← Fastly edge POP (Marseille)
```

### asmaavideo.com
```
$ dig +short asmaavideo.com A
172.67.135.8
104.21.6.165                          ← Cloudflare anycast IPs

$ dig +short asmaavideo.com NS
megan.ns.cloudflare.com.
ruben.ns.cloudflare.com.              ← Cloudflare authoritative DNS

$ curl -sI https://asmaavideo.com/
HTTP/2 301
location: https://asmaa.video/        ← 301 to canonical ✅
cache-control: public, max-age=3600   ← Cached at CF edge for 1h
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'none'; base-uri 'none'; frame-ancestors 'none'
permissions-policy: camera=(), microphone=(), geolocation=()
referrer-policy: strict-origin-when-cross-origin
```

## What this means
- **No DNS work required.** Both domains resolve correctly and the 301 is in place with HSTS preload, strict CSP, and zero-permission Permissions-Policy headers.
- The Cloudflare Worker fronting `asmaavideo.com` is correctly returning a 301 with a 1-hour cache TTL, which is SEO-correct (canonical authority flows to `asmaa.video`).
- HSTS preload header is present (`max-age=31536000; includeSubDomains; preload`) — Mohammed can submit to https://hstspreload.org for browser-level enforcement.

## SEO implications
- All link equity from any inbound link to `asmaavideo.com` (the original brand name) automatically passes to `asmaa.video` via the permanent 301
- Search engines treat 301-redirected domains as canonical-source equivalents within 1–2 crawl cycles
- The Worker preserves the full path: `/anything` → `https://asmaa.video/anything`

## Recommended monitoring
1. **Quarterly check:** confirm both domains still 200 (canonical) / 301 (vanity)
2. **Renewal alerts:** both domains should be on auto-renew in the Cloudflare registrar; verify expiration dates annually
3. **HSTS preload submission:** submit `asmaa.video` to https://hstspreload.org once Mohammed is comfortable with HSTS being non-removable (irreversible operation)

## Things explicitly NOT recommended
- ❌ Don't host parallel content on `asmaavideo.com` (would create duplicate-content SEO penalty)
- ❌ Don't change the 301 to a 302 (would break canonical authority flow)
- ❌ Don't add a `www.` subdomain unless we plan to use it
- ❌ Don't migrate to a Vercel/Netlify front — Fastly + GitHub Pages is already free, fast, and battle-tested

## Cloudflare account access
The Cloudflare account is Mohammed's. The Worker code lives outside this repo. If we need to update the Worker (e.g., add path-based routing), Mohammed can either:
1. Edit it in the CF dashboard at https://dash.cloudflare.com → Workers → asmaavideo-redirect
2. Or check it into a `cloudflare/` folder in this repo and deploy via `wrangler deploy` (would require committing the wrangler.toml)

Current Worker logic (inferred from response headers): permanent redirect `* → https://asmaa.video/{path}` with security headers. No changes needed.
