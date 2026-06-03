const ORIGIN_HOST = "asmaa.video";
const ORIGIN_RESOLVE_HOST = "trustdraft-app.github.io";

const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; media-src 'self' data: blob: https:; frame-src 'none'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  "Permissions-Policy":
    "accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), usb=(), web-share=(self), xr-spatial-tracking=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function addSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function originRequest(request) {
  const inputUrl = new URL(request.url);
  inputUrl.protocol = "https:";
  inputUrl.hostname = ORIGIN_HOST;
  return new Request(inputUrl, request);
}

class SecurityProxy {
  async fetch(request) {
    const inputUrl = new URL(request.url);
    if (inputUrl.hostname === "www.asmaa.video") {
      inputUrl.hostname = "asmaa.video";
      return Response.redirect(inputUrl.toString(), 301);
    }

    const response = await fetch(originRequest(request), {
      cf: { resolveOverride: ORIGIN_RESOLVE_HOST },
    });
    return addSecurityHeaders(response);
  }
}

const securityProxy = new SecurityProxy();

export { securityProxy as default };
