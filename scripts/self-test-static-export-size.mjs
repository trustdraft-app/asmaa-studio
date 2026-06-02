import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const verifier = join(repoRoot, "scripts", "verify-static-export-size.mjs");

function runFixture({ files, bytes, maxFiles, maxBytes }) {
  const dir = mkdtempSync(join(tmpdir(), "asmaa-export-size-"));
  const outDir = join(dir, "out");
  mkdirSync(outDir, { recursive: true });

  const payload = "x".repeat(bytes);
  for (let index = 0; index < files; index += 1) {
    writeFileSync(join(outDir, `${index}.txt`), payload);
  }

  return spawnSync(process.execPath, [verifier], {
    cwd: dir,
    env: {
      ...process.env,
      ASMAA_EXPORT_MAX_FILES: String(maxFiles),
      ASMAA_EXPORT_MAX_BYTES: String(maxBytes),
    },
    encoding: "utf8",
  });
}

const pass = runFixture({ files: 2, bytes: 10, maxFiles: 3, maxBytes: 100 });
if (pass.status !== 0) {
  console.error(pass.stderr || pass.stdout);
  process.exit(1);
}

const failFiles = runFixture({ files: 4, bytes: 10, maxFiles: 3, maxBytes: 1000 });
if (failFiles.status === 0 || !failFiles.stderr.includes("file count")) {
  console.error("Expected file-count fixture to fail");
  process.exit(1);
}

const failBytes = runFixture({ files: 1, bytes: 200, maxFiles: 3, maxBytes: 100 });
if (failBytes.status === 0 || !failBytes.stderr.includes("size")) {
  console.error("Expected byte-size fixture to fail");
  process.exit(1);
}

console.log("Static export size verifier self-test passed");
