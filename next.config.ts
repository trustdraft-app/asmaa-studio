import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/asmaa-studio" : undefined,
  assetPrefix: isGithubPages ? "/asmaa-studio/" : undefined,
  turbopack: {
    root: process.cwd()
  },
  images: {
    unoptimized: isGithubPages,
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
