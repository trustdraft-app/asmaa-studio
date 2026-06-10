#!/bin/bash
# One-command production deploy for asmaa.video.
# Usage:
#   ./netlify-deploy.sh                      # uses NETLIFY_SITE_ID env or linked site
#   NETLIFY_SITE_ID=xxxx ./netlify-deploy.sh # explicit site id
#   ./netlify-deploy.sh --skip-build         # deploy existing out/ as-is
set -euo pipefail
cd "$(dirname "$0")"

SITE_ID="${NETLIFY_SITE_ID:-asmaa-video}"

if [ "${1:-}" != "--skip-build" ]; then
  echo "Building static export (npm run build)..."
  npm run build
fi

if [ ! -d out ]; then
  echo "ERROR: out/ directory missing — build failed or was skipped without a prior build." >&2
  exit 1
fi

echo "Deploying out/ to Netlify site: $SITE_ID ..."
# netlify-cli accepts a site ID or site name for --site.
# Auth: uses NETLIFY_AUTH_TOKEN env var if set, otherwise the local
# `netlify login` session (~/.config/netlify). Run `npx netlify-cli login` once.
npx --yes netlify-cli deploy --prod --dir=out --site "$SITE_ID" ${NETLIFY_AUTH_TOKEN:+--auth "$NETLIFY_AUTH_TOKEN"}

echo "Deployed. Verify: https://asmaa.video"
