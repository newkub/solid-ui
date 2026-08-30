# AGENTS.md — solid-ui

## Project Overview

`solid-ui` is a SolidJS design-system monorepo with packages, apps, tools, and skills. It targets publication as `newkub/solid-ui` and deployment to Cloudflare Workers.

## Tech Stack

- Bun `1.3.14` (package manager)
- SolidJS `^1.9.15`
- TypeScript `^5.6.0`
- Vite (build)
- Biome (lint/format)
- shiki + custom Markdown parser (docs)
- Cloudflare Workers / wrangler
- MCP (Model Context Protocol) server
- `tsdown` for package builds
- `arktype` for validation

## Workspace Layout

```
packages/*   # reusable libraries
apps/*       # applications and docs site
tools/*      # internal tooling
```

## Common Commands

```bash
bun install
bun run lint                  # biome check packages apps tools
bun run format                # biome format --write packages apps tools
bun run typecheck             # typecheck all workspaces
bun run build                 # build website
bun run deploy                # deploy website to Cloudflare
bun run review-codebase       # human-readable report
bun run review-codebase:json  # JSON report
```

## Development Conventions

- Use TypeScript with explicit types; avoid `any`.
- Prefer optional chaining over non-null assertions.
- Run `bun run format` before committing.
- Generated files (`generated.ts`, `*.report.json`) should be ignored.
- Use `workspace:*` for in-monorepo dependencies.

## Review CLI

- `tools/review-codebase` is a Clean Architecture CLI.
- `tools/analyze` contains analyzers for 64+ categories across 5 domains.
- Exit code is `0` for grade A/B/C and `1` for D/F.

## Notes

- Node `20.19.0` works for the project.
- `mise` is optional; if not present, ensure `node` is in `PATH`.
