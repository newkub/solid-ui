---
name: run-solid-ui-website
description: Run, build, and deploy the Solid UI website
allowed-tools: [exec, read, browser_preview]
permissions:
  allow:
    - Exec(bun run)
    - Exec(bunx)
  ask:
    - Exec(wrangler deploy)
triggers: [user, model]
---

## Goal

Run the Solid UI documentation and showcase website in development or production mode, and deploy it to Cloudflare Workers when requested.

## Scope

This skill targets `apps/website` in the `solid-ui` monorepo. It covers dev server startup, type checking, linting, building, and optional Cloudflare deployment. It does not modify application source code.

## Execute

### 1. Verify Workspace

> Goal: Confirm the website workspace is ready

1. Verify the workspace exists at `apps/website`
2. Read `apps/website/package.json` to confirm scripts (`dev`, `build`, `deploy`, `typecheck`, `cf-typegen`)
3. Run `bun install` from the monorepo root if dependencies are missing

### 2. Development Server

> Goal: Start the Vite dev server

1. Run `bun run --filter @wrikka/website dev`
2. Wait for the `Local:` URL in the output (default `localhost:5173`)
3. Open `browser_preview` with the local URL
4. Watch terminal for build errors or HMR issues
5. Stop the server with `kill_shell` when finished

### 3. Quality Checks

> Goal: Validate the website before shipping

1. Run `bun run --filter @wrikka/website typecheck`
2. Run `bun run lint` from the root to lint all packages and apps
3. Run `bun run format` if formatting is needed
4. Report any failures and stop on errors

### 4. Production Build

> Goal: Build the static site

1. Run `bun run --filter @wrikka/website build`
2. Confirm `apps/website/dist/index.html` and assets are generated
3. Report build time and bundle size

### 5. Deploy

> Goal: Deploy to Cloudflare Workers

1. Confirm the build succeeded in step 4
2. Ask for confirmation before running `bun run --filter @wrikka/website deploy`
3. Report deploy output and any Cloudflare errors

## Rules

### 1. Dev Server Safety
- Use `timeout: 0` for long-running dev commands
- Use `browser_preview` to expose the UI; ask the user to share captures if interactivity is required
- Do not run `wrangler deploy` without user confirmation

### 2. Error Handling
- If `typecheck` fails, capture errors and stop before build
- If the build fails, check `apps/website/vite.config.ts` and `apps/website/uno.config.ts`
- If UnoCSS classes are missing, verify `packages/solid-ui/src/styles/tokens.css` is imported

### 3. Reporting
- Report the local preview URL
- Report build success/failure and exit codes
- Summarize the next actions based on the result

## Expected Outcome

- The website dev server is running and accessible via a browser preview
- `typecheck`, `lint`, and `build` pass unless an existing issue is blocking
- Deployment runs only after user confirmation and reports the result
