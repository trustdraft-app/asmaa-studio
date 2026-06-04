import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { homedir } from "node:os";

const DEFAULT_DOMAIN = "asmaa.video";
const localSecretFiles = [
  `${homedir()}/.ai-empire/secrets.env`,
  `${homedir()}/.config/ai-empire/secrets.env`,
  `${homedir()}/.asmaa-studio/secrets.env`
];

const credentialAliases = {
  NETLIFY_AUTH_TOKEN: [
    "NETLIFY_AUTH_TOKEN",
    "NETLIFY_TOKEN",
    "ASMAA_NETLIFY_AUTH_TOKEN"
  ],
  NETLIFY_SITE_ID: [
    "NETLIFY_SITE_ID",
    "ASMAA_NETLIFY_SITE_ID"
  ],
  NETLIFY_CUSTOM_DOMAIN: [
    "NETLIFY_CUSTOM_DOMAIN",
    "ASMAA_NETLIFY_CUSTOM_DOMAIN"
  ]
};

const keychainAliases = {
  NETLIFY_AUTH_TOKEN: [
    "NETLIFY_AUTH_TOKEN",
    "NETLIFY_TOKEN",
    "ASMAA_NETLIFY_AUTH_TOKEN",
    "netlify-auth-token",
    "ai-empire-netlify-auth-token",
    "asmaa-netlify-auth-token"
  ],
  NETLIFY_SITE_ID: [
    "NETLIFY_SITE_ID",
    "ASMAA_NETLIFY_SITE_ID",
    "netlify-site-id",
    "asmaa-netlify-site-id",
    "asmaa-video-netlify-site-id"
  ],
  NETLIFY_CUSTOM_DOMAIN: [
    "NETLIFY_CUSTOM_DOMAIN",
    "ASMAA_NETLIFY_CUSTOM_DOMAIN",
    "asmaa-netlify-custom-domain",
    "asmaa-video-netlify-custom-domain"
  ]
};

function hasArg(name) {
  return process.argv.includes(name);
}

function acceptedCredentialNames(name) {
  return credentialAliases[name] || [name];
}

function keychainServiceNames(name) {
  return keychainAliases[name] || acceptedCredentialNames(name);
}

function keychainValue(service) {
  try {
    return execFileSync("security", ["find-generic-password", "-s", service, "-w"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return "";
  }
}

function localSecretFileValue(name) {
  const pattern = new RegExp(`^(?:export\\s+)?${name}=([^\\r\\n]*)`, "m");
  for (const path of localSecretFiles) {
    let content = "";
    try {
      content = readFileSync(path, "utf8");
    } catch {
      continue;
    }
    const match = content.match(pattern);
    if (match) return match[1].trim().replace(/^['"]|['"]$/g, "");
  }
  return "";
}

function credentialValues(name) {
  const values = [];
  for (const candidate of acceptedCredentialNames(name)) {
    if (process.env[candidate]) {
      values.push({ source: "environment", sourceName: candidate, value: process.env[candidate] });
    }
    const localSecretFile = localSecretFileValue(candidate);
    if (localSecretFile) {
      values.push({ source: "localSecretFile", sourceName: candidate, value: localSecretFile });
    }
  }
  for (const service of keychainServiceNames(name)) {
    const keychain = keychainValue(service);
    if (keychain) values.push({ source: "keychain", sourceName: service, value: keychain });
  }
  return values;
}

function credentialValue(name) {
  return credentialValues(name)[0] || null;
}

function credentialSourceHint(name) {
  return {
    environmentVariables: acceptedCredentialNames(name),
    keychainServices: keychainServiceNames(name),
    localSecretFiles
  };
}

function domainEntryMatches(entry, domain) {
  if (typeof entry === "string") return entry === domain;
  if (!entry || typeof entry !== "object") return false;
  return entry.name === domain || entry.domain === domain || entry.hostname === domain;
}

export function siteHasCustomDomain(site, domain = DEFAULT_DOMAIN) {
  return site?.custom_domain === domain
    || site?.domain === domain
    || (site?.ssl_url || "").includes(`://${domain}`)
    || (site?.url || "").includes(`://${domain}`)
    || (Array.isArray(site?.domain_aliases) && site.domain_aliases.some((entry) => domainEntryMatches(entry, domain)))
    || (Array.isArray(site?.domains) && site.domains.some((entry) => domainEntryMatches(entry, domain)));
}

export function domainVerificationSucceeded(response, domain = DEFAULT_DOMAIN) {
  return Boolean(response?.ok && siteHasCustomDomain(response.json, domain));
}

async function netlifyRequest(token, path, options = {}) {
  const response = await fetch(`https://api.netlify.com/api/v1${path}`, {
    method: options.method || "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const json = await response.json().catch(() => ({}));
  const errors = [
    json?.message,
    json?.error,
    ...(Array.isArray(json?.errors) ? json.errors.map((entry) => entry.message || entry.error || String(entry)) : []),
  ].filter(Boolean).slice(0, 3);
  return {
    ok: response.ok,
    status: response.status,
    json,
    errors,
  };
}

async function configure() {
  const tokenCredential = credentialValue("NETLIFY_AUTH_TOKEN");
  const siteCredential = credentialValue("NETLIFY_SITE_ID");
  const domainCredential = credentialValue("NETLIFY_CUSTOM_DOMAIN");
  const token = tokenCredential?.value || "";
  const siteId = siteCredential?.value || "";
  const domain = domainCredential?.value || DEFAULT_DOMAIN;
  const dryRun = hasArg("--dry-run");
  const verifyOnly = hasArg("--verify-only");

  if (!token || !siteId) {
    const missing = [
      ...(!token ? ["NETLIFY_AUTH_TOKEN"] : []),
      ...(!siteId ? ["NETLIFY_SITE_ID"] : [])
    ];
    return {
      ok: false,
      stage: "preflight",
      missing,
      acceptedSources: Object.fromEntries(missing.map((name) => [name, credentialSourceHint(name)])),
      secretValuesPrinted: false,
    };
  }

  const current = await netlifyRequest(token, `/sites/${siteId}`);
  if (!current.ok) {
    return {
      ok: false,
      stage: "read-site",
      status: current.status,
      errors: current.errors,
      secretValuesPrinted: false,
    };
  }

  if (siteHasCustomDomain(current.json, domain)) {
    return {
      ok: true,
      stage: "already-configured",
      siteId,
      domain,
      credentialSources: {
        token: tokenCredential.source,
        tokenSourceName: tokenCredential.sourceName,
        siteId: siteCredential.source,
        siteIdSourceName: siteCredential.sourceName,
        domain: domainCredential?.source || "default",
        domainSourceName: domainCredential?.sourceName || null
      },
      secretValuesPrinted: false,
    };
  }

  if (verifyOnly) {
    return {
      ok: false,
      stage: "verify-only",
      siteId,
      domain,
      reason: "custom-domain-not-configured",
      credentialSources: {
        token: tokenCredential.source,
        tokenSourceName: tokenCredential.sourceName,
        siteId: siteCredential.source,
        siteIdSourceName: siteCredential.sourceName,
        domain: domainCredential?.source || "default",
        domainSourceName: domainCredential?.sourceName || null
      },
      secretValuesPrinted: false,
    };
  }

  if (dryRun) {
    return {
      ok: false,
      stage: "dry-run",
      siteId,
      domain,
      plannedAction: "patch-site-custom-domain",
      credentialSources: {
        token: tokenCredential.source,
        tokenSourceName: tokenCredential.sourceName,
        siteId: siteCredential.source,
        siteIdSourceName: siteCredential.sourceName,
        domain: domainCredential?.source || "default",
        domainSourceName: domainCredential?.sourceName || null
      },
      secretValuesPrinted: false,
    };
  }

  const updated = await netlifyRequest(token, `/sites/${siteId}`, {
    method: "PATCH",
    body: { custom_domain: domain },
  });
  if (!updated.ok) {
    return {
      ok: false,
      stage: "patch-site-custom-domain",
      siteId,
      domain,
      status: updated.status,
      errors: updated.errors,
      secretValuesPrinted: false,
    };
  }

  const verified = domainVerificationSucceeded(updated, domain)
    ? updated
    : await netlifyRequest(token, `/sites/${siteId}`);
  return {
    ok: domainVerificationSucceeded(verified, domain),
    stage: "patch-site-custom-domain",
    siteId,
    domain,
    status: updated.status,
    verifyStatus: verified.status,
    errors: updated.errors,
    credentialSources: {
      token: tokenCredential.source,
      tokenSourceName: tokenCredential.sourceName,
      siteId: siteCredential.source,
      siteIdSourceName: siteCredential.sourceName,
      domain: domainCredential?.source || "default",
      domainSourceName: domainCredential?.sourceName || null
    },
    secretValuesPrinted: false,
  };
}

function runSelfTest() {
  const previousAsmaaNetlifyToken = process.env.ASMAA_NETLIFY_AUTH_TOKEN;
  process.env.ASMAA_NETLIFY_AUTH_TOKEN = "netlify-self-test-token";
  const aliasCredential = credentialValue("NETLIFY_AUTH_TOKEN");
  if (previousAsmaaNetlifyToken === undefined) delete process.env.ASMAA_NETLIFY_AUTH_TOKEN;
  else process.env.ASMAA_NETLIFY_AUTH_TOKEN = previousAsmaaNetlifyToken;
  const cases = [
    siteHasCustomDomain({ custom_domain: DEFAULT_DOMAIN }),
    siteHasCustomDomain({ domain_aliases: [{ name: DEFAULT_DOMAIN }] }),
    siteHasCustomDomain({ domains: [DEFAULT_DOMAIN] }),
    !siteHasCustomDomain({ custom_domain: "example.com", domain_aliases: [] }),
    domainVerificationSucceeded({ ok: true, json: { custom_domain: DEFAULT_DOMAIN } }),
    !domainVerificationSucceeded({ ok: true, status: 200, json: { custom_domain: "example.com" } }),
    !domainVerificationSucceeded({ ok: false, json: { custom_domain: DEFAULT_DOMAIN } }),
    acceptedCredentialNames("NETLIFY_AUTH_TOKEN").includes("ASMAA_NETLIFY_AUTH_TOKEN"),
    keychainServiceNames("NETLIFY_AUTH_TOKEN").includes("ai-empire-netlify-auth-token"),
    credentialSourceHint("NETLIFY_SITE_ID").keychainServices.includes("asmaa-video-netlify-site-id"),
    aliasCredential?.source === "environment" && aliasCredential.sourceName === "ASMAA_NETLIFY_AUTH_TOKEN",
  ];
  const ok = cases.every(Boolean);
  console.log(JSON.stringify({ ok, checksPassed: cases.filter(Boolean).length, checksTotal: cases.length }, null, 2));
  process.exitCode = ok ? 0 : 1;
}

if (hasArg("--self-test")) {
  runSelfTest();
} else {
  const result = await configure();
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}
