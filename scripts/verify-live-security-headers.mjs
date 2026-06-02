const target = process.argv[2] || process.env.ASMAA_SECURITY_HEADER_URL || "https://asmaa.video";

const requiredHeaders = [
  ["strict-transport-security", /max-age=\d+/i],
  ["content-security-policy", /default-src/i],
  ["x-frame-options", /^DENY$/i],
  ["x-content-type-options", /^nosniff$/i],
  ["referrer-policy", /^strict-origin-when-cross-origin$/i],
  ["permissions-policy", /camera=\(\)/i]
];

const response = await fetch(target, {
  method: "GET",
  redirect: "follow",
  headers: {
    "User-Agent": "asmaa-security-header-verifier/1.0"
  }
});

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

if (failures.length > 0) {
  console.error(`Security header verification failed for ${target}`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Security header verification passed for ${target}`);
