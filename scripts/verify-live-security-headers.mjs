const requiredHeaders = [
  ["strict-transport-security", /max-age=\d+/i],
  ["content-security-policy", /default-src/i],
  ["x-frame-options", /^DENY$/i],
  ["x-content-type-options", /^nosniff$/i],
  ["referrer-policy", /^strict-origin-when-cross-origin$/i],
  ["permissions-policy", /camera=\(\)/i]
];

const defaultTarget = "https://asmaa.video";
const allowedFlags = new Set(["--help", "-h", "--self-test"]);

function usage() {
  return [
    "Usage: node scripts/verify-live-security-headers.mjs [target-url ...]",
    "",
    "Options:",
    "  --self-test  Run verifier unit self-tests without network access",
    "  --help       Print this help without network access",
    "",
    "Environment:",
    `  ASMAA_SECURITY_HEADER_URL  Default target URL when no target is passed (default: ${defaultTarget})`
  ].join("\n");
}

export function parseArgs(argv = process.argv.slice(2), env = process.env) {
  const targets = [];
  const unknownFlags = [];
  let help = false;
  let selfTest = false;

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      help = true;
      continue;
    }
    if (arg === "--self-test") {
      selfTest = true;
      continue;
    }
    if (arg.startsWith("-")) {
      unknownFlags.push(arg);
      continue;
    }
    targets.push(arg);
  }

  return {
    ok: unknownFlags.length === 0,
    unknownFlags,
    help,
    selfTest,
    targets: targets.length > 0 ? targets : [env.ASMAA_SECURITY_HEADER_URL || defaultTarget],
  };
}

export function validateTargets(targets) {
  return targets.flatMap((target) => {
    let url;
    try {
      url = new URL(target);
    } catch {
      return [`${target}: invalid URL`];
    }

    if (!["http:", "https:"].includes(url.protocol)) {
      return [`${target}: unsupported protocol`];
    }

    return [];
  });
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
  let response;
  try {
    response = await fetch(target, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "asmaa-security-header-verifier/1.0"
      }
    });
  } catch (error) {
    return [`fetch: ${error.message}`];
  }

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
    parseArgs(["--help"], {}).help === true,
    parseArgs(["--self-test"], {}).selfTest === true,
    parseArgs(["--unknown"], {}).unknownFlags.includes("--unknown"),
    parseArgs(["https://preview.example.com"], {}).targets[0] === "https://preview.example.com",
    parseArgs([], { ASMAA_SECURITY_HEADER_URL: "https://headers.example.com" }).targets[0] === "https://headers.example.com",
    allowedFlags.has("--self-test") && allowedFlags.has("--help") && allowedFlags.has("-h"),
    validateTargets(["https://asmaa.video"]).length === 0,
    validateTargets(["asmaa.video"]).includes("asmaa.video: invalid URL"),
    validateTargets(["ftp://asmaa.video"]).includes("ftp://asmaa.video: unsupported protocol"),
  ];
  const ok = cases.every(Boolean);
  console.log(JSON.stringify({ ok, checksPassed: cases.filter(Boolean).length, checksTotal: cases.length }, null, 2));
  process.exitCode = ok ? 0 : 1;
}

const parsedArgs = parseArgs();

if (!parsedArgs.ok) {
  console.error(`Unknown option(s): ${parsedArgs.unknownFlags.join(", ")}`);
  console.error(usage());
  process.exitCode = 2;
} else if (parsedArgs.help) {
  console.log(usage());
} else if (parsedArgs.selfTest) {
  runSelfTest();
} else {
  const targetFailures = validateTargets(parsedArgs.targets);
  if (targetFailures.length > 0) {
    console.error("Security header verification target validation failed");
    for (const failure of targetFailures) {
      console.error(`- ${failure}`);
    }
    process.exitCode = 2;
  } else {
    const results = await Promise.all(parsedArgs.targets.map(async (target) => ({
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
}
