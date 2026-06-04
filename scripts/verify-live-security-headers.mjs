const requiredHeaders = [
  ["strict-transport-security", /max-age=\d+/i],
  ["content-security-policy", /default-src/i],
  ["x-frame-options", /^DENY$/i],
  ["x-content-type-options", /^nosniff$/i],
  ["referrer-policy", /^strict-origin-when-cross-origin$/i],
  ["permissions-policy", /camera=\(\)/i]
];

function targetsFromArgs() {
  const args = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
  if (args.length > 0) return args;
  return [process.env.ASMAA_SECURITY_HEADER_URL || "https://asmaa.video"];
}

export function verifySecurityHeaders(response) {
  const failures = [];

  for (const [name, expected] of requiredHeaders) {
    const value = response.headers.get(name);
    if (!value) {
      failures.push(`${name}: missing`);
      continue;
    }
    if (!expected.test(value)) {
      failures.push(`${name}: unexpected value`);
    }
  }

  if (!response.ok) {
    failures.push(`status: ${response.status}`);
  }

  return failures;
}

async function verifyTarget(target) {
  const response = await fetch(target, {
    method: "GET",
    redirect: "follow",
    headers: {
      "User-Agent": "asmaa-security-header-verifier/1.0"
    }
  });

  return verifySecurityHeaders(response);
}

function runSelfTest() {
  const headerValue = (name) => ({
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=()",
    "strict-transport-security": "max-age=31536000; includeSubDomains",
    "content-security-policy": "default-src 'self'",
  })[name];
  const passingHeaders = new Headers(Object.fromEntries(requiredHeaders.map(([name]) => [name, headerValue(name)])));
  const cases = [
    verifySecurityHeaders({ ok: true, status: 200, headers: passingHeaders }).length === 0,
    verifySecurityHeaders({ ok: false, status: 500, headers: passingHeaders }).includes("status: 500"),
    verifySecurityHeaders({ ok: true, status: 200, headers: new Headers() }).some((failure) => failure === "strict-transport-security: missing"),
  ];
  const ok = cases.every(Boolean);
  console.log(JSON.stringify({ ok, checksPassed: cases.filter(Boolean).length, checksTotal: cases.length }, null, 2));
  process.exitCode = ok ? 0 : 1;
}

if (process.argv.includes("--self-test")) {
  runSelfTest();
} else {
  const results = await Promise.all(targetsFromArgs().map(async (target) => ({
    target,
    failures: await verifyTarget(target),
  })));

  for (const result of results) {
    if (result.failures.length > 0) {
      console.error(`Security header verification failed for ${result.target}`);
      for (const failure of result.failures) {
        console.error(`- ${failure}`);
      }
    } else {
      console.log(`Security header verification passed for ${result.target}`);
    }
  }

  process.exitCode = results.every((result) => result.failures.length === 0) ? 0 : 1;
}
