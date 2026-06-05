import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import playwright from "playwright";

const { chromium } = playwright;
const executablePath = chromium.executablePath();

if (existsSync(executablePath)) {
  console.log(`Playwright Chromium available: ${executablePath}`);
  process.exit(0);
}

const installer = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(installer, ["playwright", "install", "chromium"], {
  env: process.env,
  stdio: "inherit",
  timeout: 120_000,
});

if (result.error) {
  console.error(`Playwright Chromium install failed: ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`Playwright Chromium install exited ${result.status ?? "unknown"}`);
  process.exit(result.status ?? 1);
}

if (!existsSync(executablePath)) {
  console.error(`Playwright Chromium still missing after install: ${executablePath}`);
  process.exit(1);
}

console.log(`Playwright Chromium installed: ${executablePath}`);
