import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const outDir = join(process.cwd(), "out");
const maxFiles = Number(process.env.ASMAA_EXPORT_MAX_FILES ?? 5000);
const maxBytes = Number(process.env.ASMAA_EXPORT_MAX_BYTES ?? 150 * 1024 * 1024);

function walk(dir, acc = { files: 0, bytes: 0, largest: [] }) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, acc);
      continue;
    }

    const stat = statSync(fullPath);
    acc.files += 1;
    acc.bytes += stat.size;
    acc.largest.push({ file: relative(outDir, fullPath), bytes: stat.size });
  }

  return acc;
}

if (!existsSync(outDir)) {
  console.error("Static export output directory does not exist: out");
  process.exit(1);
}

const inventory = walk(outDir);
const failures = [];

if (inventory.files > maxFiles) {
  failures.push(`file count ${inventory.files} exceeds limit ${maxFiles}`);
}

if (inventory.bytes > maxBytes) {
  failures.push(`size ${inventory.bytes} bytes exceeds limit ${maxBytes}`);
}

const summary = {
  files: inventory.files,
  bytes: inventory.bytes,
  maxFiles,
  maxBytes,
  largest: inventory.largest.sort((a, b) => b.bytes - a.bytes).slice(0, 10),
};

if (failures.length > 0) {
  console.error("Static export size verification failed");
  console.error(JSON.stringify({ ...summary, failures }, null, 2));
  process.exit(1);
}

console.log(`Static export size verification passed: files=${summary.files} bytes=${summary.bytes}`);
