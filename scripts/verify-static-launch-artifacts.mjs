import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const canonicalDomain = "asmaa.video";
const requiredHeaders = new Map([
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload"],
  [
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: blob: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co https://*.supabase.in"
  ],
  ["X-Frame-Options", "DENY"],
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=()"]
]);

function readRequired(path) {
  if (!existsSync(path)) {
    throw new Error(`missing required launch artifact: ${path}`);
  }
  return readFileSync(path, "utf8");
}

function requireContains(path, text, expected) {
  if (!text.includes(expected)) {
    throw new Error(`${path} does not contain expected launch artifact value: ${expected}`);
  }
}

function verifyHeadersFile(path) {
  const text = readRequired(path);
  requireContains(path, text, "/*");
  for (const [name, value] of requiredHeaders) {
    requireContains(path, text, `${name}: ${value}`);
  }
}

function verifyVercelConfig(path) {
  const config = JSON.parse(readRequired(path));
  const flattened = new Map(
    (config.headers || [])
      .flatMap((entry) => entry.headers || [])
      .map((header) => [header.key, header.value])
  );
  for (const [name, value] of requiredHeaders) {
    if (flattened.get(name) !== value) {
      throw new Error(`${path} is missing expected ${name} launch header`);
    }
  }
  const redirects = JSON.stringify(config.redirects || []);
  for (const legacyDomain of ["asmaavideo.com", "www.asmaavideo.com"]) {
    requireContains(path, redirects, legacyDomain);
  }
  requireContains(path, redirects, `https://${canonicalDomain}/:path*`);
}

function verifyNetlifyConfig(path) {
  const text = readRequired(path);
  requireContains(path, text, 'publish = "out"');
  for (const [name, value] of requiredHeaders) {
    requireContains(path, text, `${name} = "${value}"`);
  }
}

function verifyCname(path) {
  const text = readRequired(path).trim();
  if (text !== canonicalDomain) {
    throw new Error(`${path} must contain only ${canonicalDomain}`);
  }
}

verifyHeadersFile(join(root, "public", "_headers"));
verifyHeadersFile(join(root, "out", "_headers"));
verifyCname(join(root, "public", "CNAME"));
verifyCname(join(root, "out", "CNAME"));
verifyVercelConfig(join(root, "vercel.json"));
verifyNetlifyConfig(join(root, "netlify.toml"));

console.log("Static launch artifacts verified for asmaa.video.");
