---
name: deploy-website
description: Build and deploy the solid-ui website to Cloudflare Workers
---

# deploy-website

Use this skill when the user asks to deploy the `apps/website` Solid app to Cloudflare Workers.

## Workflow

1. Run typecheck for the whole workspace:
   ```bash
   bun run typecheck
   ```
2. Build the website:
   ```bash
   bun run --filter @wrikka/website build
   ```
3. Deploy with Wrangler:
   ```bash
   bun run --filter @wrikka/website deploy
   ```

## Verification

- After a successful deploy, open `https://solid-ui-wrikka-com.newkubise.workers.dev`.
- A `200` response and visible component gallery confirm the deployment.

## Requirements

- `CLOUDFLARE_API_TOKEN` must be set as a GitHub secret for CI deploys.
- `CLOUDFLARE_ACCOUNT_ID` is already configured.
