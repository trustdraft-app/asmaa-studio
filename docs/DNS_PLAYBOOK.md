# Asmaa Studio - DNS & Domain Playbook

**Last verified:** 2026-06-05 00:36 UTC
**Current launch state:** Canonical `asmaa.video` is live, but it is not launch-secure yet.

## Domain Inventory

| Domain | Purpose | Current DNS authority | Current edge | Header state |
|---|---|---|---|---|
| `asmaa.video` | Canonical site | Namecheap (`dns1.registrar-servers.com`, `dns2.registrar-servers.com`) | GitHub Pages / Fastly | Blocked: required launch security headers are missing |
| `www.asmaa.video` | Redirect to canonical | Namecheap / GitHub Pages | GitHub Pages / Fastly | Blocked: redirect does not add launch security headers |
| `asmaavideo.com` | Vanity redirect to canonical | Cloudflare (`megan.ns.cloudflare.com`, `ruben.ns.cloudflare.com`) | Cloudflare Worker | Passing: secure 301 to `https://asmaa.video/` |
| `asmaa-video.netlify.app` | Netlify preview / hardened edge proof | Netlify | Netlify Edge | Passing: required launch security headers are present |

## Verified Evidence

### Canonical domain is still on GitHub Pages

```
$ dig +short asmaa.video NS
dns1.registrar-servers.com.
dns2.registrar-servers.com.

$ dig +short asmaa.video A
185.199.108.153
185.199.110.153
185.199.109.153
185.199.111.153
```

### Canonical launch security headers are missing

```
$ npm run verify:live-security-headers
Security header verification failed for https://asmaa.video
- strict-transport-security: missing
- content-security-policy: missing
- x-frame-options: missing
- x-content-type-options: missing
- referrer-policy: missing
- permissions-policy: missing
```

### Netlify preview has the required headers

```
$ curl -sI https://asmaa-video.netlify.app/
content-security-policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; ...
permissions-policy: camera=(), microphone=(), geolocation=()
referrer-policy: strict-origin-when-cross-origin
strict-transport-security: max-age=31536000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
```

### Vanity domain redirect remains healthy

```
$ curl -sI https://asmaavideo.com/
HTTP/2 301
location: https://asmaa.video/
strict-transport-security: max-age=31536000; includeSubDomains; preload
content-security-policy: default-src 'none'; base-uri 'none'; frame-ancestors 'none'
permissions-policy: camera=(), microphone=(), geolocation=()
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-frame-options: DENY
```

## Required Production Fix

`asmaa.video` must move to an edge that can enforce headers before Asmaa can be called customer-launch secure.

Preferred path:

1. Bind `asmaa.video` to the existing Netlify site `asmaa-video`.
2. Change canonical DNS away from the GitHub Pages A records to the Netlify-required records.
3. Wait for TLS issuance and DNS propagation.
4. Re-run:

```
npm run verify:live-security-headers
curl -sI https://asmaa.video/
```

Accept only a pass that includes HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy on `https://asmaa.video/`.

Alternative path:

1. Put `asmaa.video` behind Cloudflare DNS/proxy.
2. Serve the GitHub Pages origin through a Cloudflare Worker or Ruleset that injects the same required headers.
3. Re-run the same verifier against `https://asmaa.video/`.

## Current Access Boundary

The repo contains the static site, Netlify header configuration, a hardened Netlify preview, and the live header verifier. The remaining canonical-domain fix requires DNS/domain authority or a Cloudflare/Netlify token with permission to bind `asmaa.video` and change the authoritative edge. A previous Cloudflare activation attempt failed because the available token could not create or manage the required zone.

## Do Not Claim

- Do not claim `asmaa.video` is launch-secure while it is served directly from GitHub Pages without the required headers.
- Do not use the passing `asmaa-video.netlify.app` preview as a substitute for canonical production proof.
- Do not remove the `asmaavideo.com` 301; it is healthy and should continue forwarding authority to the canonical domain.
