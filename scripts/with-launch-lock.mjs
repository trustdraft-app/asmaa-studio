#!/usr/bin/env node
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const separatorIndex = process.argv.indexOf("--");
const command = separatorIndex >= 0 ? process.argv.slice(separatorIndex + 1) : process.argv.slice(2);
const lockDir = join(tmpdir(), "asmaa-launch-verification.lock");
const staleAfterMs = Number(process.env.ASMAA_LAUNCH_LOCK_STALE_MS || 30 * 60 * 1000);
const waitTimeoutMs = Number(process.env.ASMAA_LAUNCH_LOCK_WAIT_MS || 20 * 60 * 1000);
const waitStepMs = 1000;

if (command.length === 0) {
  console.error("Usage: node scripts/with-launch-lock.mjs -- <command> [args...]");
  process.exit(2);
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function lockMetadata() {
  try {
    return JSON.parse(readFileSync(join(lockDir, "owner.json"), "utf8"));
  } catch {
    return null;
  }
}

function lockIsStale() {
  const metadata = lockMetadata();
  if (!metadata) return true;
  if (Date.now() - Date.parse(metadata.createdAt) > staleAfterMs) return true;
  if (Number.isInteger(metadata.pid) && metadata.pid > 0) {
    try {
      process.kill(metadata.pid, 0);
    } catch {
      return true;
    }
  }
  return false;
}

function acquireLock() {
  const startedAt = Date.now();
  while (true) {
    try {
      mkdirSync(lockDir, { mode: 0o700 });
      writeFileSync(
        join(lockDir, "owner.json"),
        `${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString(), command }, null, 2)}\n`,
        { mode: 0o600 },
      );
      return;
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
      if (lockIsStale()) {
        rmSync(lockDir, { force: true, recursive: true });
        continue;
      }
      if (Date.now() - startedAt > waitTimeoutMs) {
        console.error(`Timed out waiting for Asmaa launch verification lock: ${lockDir}`);
        process.exit(124);
      }
      sleep(waitStepMs);
    }
  }
}

acquireLock();
try {
  const [bin, ...args] = command;
  const result = spawnSync(bin, args, {
    cwd: process.cwd(),
    env: { ...process.env, ASMAA_LAUNCH_LOCK_HELD: "1" },
    shell: false,
    stdio: "inherit",
  });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  process.exit(result.status ?? 1);
} finally {
  rmSync(lockDir, { force: true, recursive: true });
}
