---
name: solid-ui
description: SolidJS design-system monorepo with packages, apps, tools, and skills
related:
  - update-project-skills
  - update-agents-md
  - deep-validate
  - follow-global-rules
---

## Goal

Maintain the `solid-ui` monorepo as a production-ready SolidJS design system with a documentation website, an MCP server, an internal CLI, and supporting tooling.

## Scope

This `AGENTS.md` covers the root workspace `D:\newkub\solid-ui` and its Bun/SolidJS monorepo:

- `packages/*` reusable libraries (`solid-ui`, `form`, `image`, `table`, `transitions`, `command-palette`)
- `apps/*` applications (`website`, `mcp`, `cli`)
- `tools/*` internal tooling (`analyze`, `review-codebase`)
- `.devin/skills/` project-level Devin skills

It does not replace global Devin skills in `%APPDATA%\devin\skills\`.

## Execute

### 1. Start Every Task

> Goal: Check workspace status and references before starting

1. Read this `AGENTS.md` and follow `global_rules.md` from `C:\Users\Veerapong\.codeium\windsurf\memories\global_rules.md`
2. Run `/update-project-skills` when project skills need to be created or updated
3. Run `/update-agents-md` when this file or workspace `AGENTS.md` files change
4. Check `package.json` and workspace `package.json` files to confirm the tech stack

### 2. Common Workflow

> Goal: Run checks before changing code

1. Run `bun install` if dependencies are stale
2. Run `bun run lint` and `bun run format` before committing
3. Run `bun run typecheck` to validate all workspaces
4. Run `bun run build` to build the website (`apps/website`)
5. For package builds, note that `tsdown` currently fails on some workspaces due to `Promise.withResolvers` and `unrun` issues; report these as environment limitations

### 3. Component Work

> Goal: Work with generated components safely

1. Inspect `packages/solid-ui/scripts/generate.ts` before changing the generator
2. Run the generator with `bun packages/solid-ui/scripts/generate.ts`
3. Type check the `solid-ui` package after regeneration
4. Prefer UnoCSS semantic tokens (`bg-background`, `text-foreground`, `border-border`) in new or updated components

### 4. Website And Theme Work

> Goal: Keep the website and theme system consistent

1. Update `apps/website/src/lib/theme.ts` for theme state changes
2. Keep `packages/solid-ui/src/styles/tokens.css` and `uno.config.ts` in sync
3. Use `run-solid-ui-website` to start the dev server, run checks, and build
4. Use `browser_preview` to verify UI and ask the user to share captures

### 5. MCP Work

> Goal: Maintain a usable MCP server

1. Edit `apps/mcp/src/index.ts` to add or update tools
2. Use `run-solid-ui-mcp` to typecheck, run, and test the server
3. Keep the `biome-ignore` workaround for `@modelcontextprotocol/sdk` generic inference documented

### 6. Validate And Ship

> Goal: Verify and deliver changes

1. Run `bun run lint`
2. Run `bun run typecheck`
3. Run `bun run --filter @wrikka/website build`
4. Run `/deep-validate` for `.devin/skills/` changes
5. Run `/git-commit` when the task is complete and the user has approved
6. Run `/report-session-status` before ending the session

## Rules

### 1. Format

- Use frontmatter `name`, `description`, `related` in `AGENTS.md` and project `SKILL.md` files
- Keep `AGENTS.md` and `SKILL.md` files under 250 lines
- Use backticks for `tools`, `commands`, `paths`, and `skill-name`
- Project `SKILL.md` files are written in English

### 2. Architecture

- `runtime: /follow-runtime-bun`
- `language: /follow-lang-typescript`
- `framework: /follow-framework-solidjs`
- `router-store: /follow-solid-tanstack`
- `table: /follow-lib-tanstack-ecosystem`
- `styling: /follow-lib-unocss`
- `theme: /follow-lib-unocss-theme`
- `lint-format: /follow-tool-biome`
- `bundler: /follow-tool-vite`
- `mcp: /follow-create-mcp`
- `deploy: /create-cloudflare-project` and `/deploy-to-cloudflare`
- `component-library: /follow-lib-shadcn-solid`

### 3. Platform

- `OS: Windows`
- `package-manager: Bun 1.3.14 (declared), Bun 1.4.x observed`
- `node-compatibility: 20.19.0`
- `repo-type: Bun/SolidJS monorepo`
- `deployment: Cloudflare Workers via wrangler`

### 4. Target User

- `primary: SolidJS developers using the design system`
- `secondary: contributors and AI agents maintaining the monorepo`

### 5. Skills

Project skills (invoke with `/<skill-name>`):

- `run-solid-ui-website: .devin/skills/run-solid-ui-website`
- `run-solid-ui-mcp: .devin/skills/run-solid-ui-mcp`
- `run-solid-ui-generator: .devin/skills/run-solid-ui-generator`
- `run-review-codebase-cli: .devin/skills/run-review-codebase-cli`

Relevant global skills:

- `follow-runtime-bun: /follow-runtime-bun`
- `follow-lang-typescript: /follow-lang-typescript`
- `follow-lang-nodejs: /follow-lang-nodejs`
- `follow-framework-solidjs: /follow-framework-solidjs`
- `follow-solid-tanstack: /follow-solid-tanstack`
- `follow-solid-tanstack-architecture: /follow-solid-tanstack-architecture`
- `follow-lib-tanstack-ecosystem: /follow-lib-tanstack-ecosystem`
- `follow-lib-unocss: /follow-lib-unocss`
- `follow-lib-unocss-theme: /follow-lib-unocss-theme`
- `follow-tool-vite: /follow-tool-vite`
- `follow-tool-biome: /follow-tool-biome`
- `follow-create-mcp: /follow-create-mcp`
- `follow-create-bun-cli: /follow-create-bun-cli`
- `create-cloudflare-project: /create-cloudflare-project`
- `create-cloudflare-token: /create-cloudflare-token`
- `deploy-to-cloudflare: /deploy-to-cloudflare`
- `use-ast-grep: /use-ast-grep`
- `use-bun-shell: /use-bun-shell`
- `deep-validate: /deep-validate`
- `deep-review-codebase: /deep-review-codebase`
- `check-monorepo: /check-monorepo`
- `analyze-project: /analyze-project`

### 6. Workspaces

- `packages/solid-ui` uses `packages/form`, `packages/image`, `packages/table`, `packages/transitions`
- `apps/website` uses `packages/solid-ui`
- `apps/mcp` uses `packages/solid-ui` (registry)
- `apps/cli` uses `packages/solid-ui`
- `tools/analyze` and `tools/review-codebase` are standalone internal tools

### 7. Safety

- Do not edit global skills in `%APPDATA%\devin\skills\` from this workspace
- Do not commit generated report files
- Run `bun run format` before committing
- Ask for confirmation before `wrangler deploy` or destructive file operations

## Expected Outcome

- `AGENTS.md` is up to date and under 250 lines
- `.devin/skills/` contains project skills referenced in `### Skills`
- Every skill reference resolves to an existing `SKILL.md`
- Changes are validated with `lint`, `typecheck`, and build where possible
