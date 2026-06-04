const DEFAULT_DOMAIN = "asmaa.video";

function hasArg(name) {
  return process.argv.includes(name);
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
  const token = process.env.NETLIFY_AUTH_TOKEN || "";
  const siteId = process.env.NETLIFY_SITE_ID || "";
  const domain = process.env.NETLIFY_CUSTOM_DOMAIN || DEFAULT_DOMAIN;
  const dryRun = hasArg("--dry-run");
  const verifyOnly = hasArg("--verify-only");

  if (!token || !siteId) {
    return {
      ok: false,
      stage: "preflight",
      missing: [
        ...(!token ? ["NETLIFY_AUTH_TOKEN"] : []),
        ...(!siteId ? ["NETLIFY_SITE_ID"] : []),
      ],
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
    secretValuesPrinted: false,
  };
}

function runSelfTest() {
  const cases = [
    siteHasCustomDomain({ custom_domain: DEFAULT_DOMAIN }),
    siteHasCustomDomain({ domain_aliases: [{ name: DEFAULT_DOMAIN }] }),
    siteHasCustomDomain({ domains: [DEFAULT_DOMAIN] }),
    !siteHasCustomDomain({ custom_domain: "example.com", domain_aliases: [] }),
    domainVerificationSucceeded({ ok: true, json: { custom_domain: DEFAULT_DOMAIN } }),
    !domainVerificationSucceeded({ ok: true, status: 200, json: { custom_domain: "example.com" } }),
    !domainVerificationSucceeded({ ok: false, json: { custom_domain: DEFAULT_DOMAIN } }),
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
