import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubPagesBasePath =
  process.env.GITHUB_PAGES_BASE_PATH ??
  (process.env.GITHUB_PAGES_CUSTOM_DOMAIN === "true" ? "" : "/asmaa-studio");
const basePath = isGithubPages ? githubPagesBasePath : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
