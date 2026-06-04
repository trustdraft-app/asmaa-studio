#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";

const browserPath =
  process.env.PLAYWRIGHT_BROWSERS_PATH || join(homedir(), ".ai-empire-playwright-browsers");

const env = {
  ...process.env,
  PLAYWRIGHT_BROWSERS_PATH: browserPath,
};

function run(command, args) {
  const result = spawnSync(command, args, {
    env,
    stdio: "inherit",
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

run(npxCommand, ["playwright", "install", "chromium"]);
run(process.execPath, ["scripts/verify-launch.mjs"]);
