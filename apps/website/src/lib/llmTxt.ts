import { registry } from "@wrikka/solid-ui/registry";
import { docs } from "../docs/generated";

/**
 * Builds the plain-text `llm.txt` payload describing the solid-ui monorepo
 * for large language models and automated agents.
 *
 * Content is derived from `AGENTS.md`, `README.md`, the generated docs
 * headings (`src/docs/generated.ts`), and the component registry
 * (`packages/solid-ui/src/registry.ts`).
 */
export function buildLlmTxt(): string {
	return [
		buildHeader(),
		buildOverview(),
		buildTechStack(),
		buildCommands(),
		buildWorkspaces(),
		buildDocsSection(),
		buildComponentsSection(),
		buildFooter(),
	].join("\n\n");
}

function buildHeader(): string {
	return ["# llm.txt — solid-ui", "", "> Machine-readable project summary for LLMs and AI agents."].join("\n");
}

function buildOverview(): string {
	return [
		"## Overview",
		"",
		"solid-ui is a Bun/SolidJS design-system monorepo with a documentation website,",
		"an MCP server, an internal CLI, and supporting tooling. It ships 60+ accessible",
		"UI components, form/table/image/transition utilities, dark mode, and responsive",
		"design out of the box.",
	].join("\n");
}

function buildTechStack(): string {
	return [
		"## Tech Stack",
		"",
		"- runtime: Bun 1.3.14+ (Node compatibility 20.19.0)",
		"- language: TypeScript",
		"- framework: SolidJS",
		"- router-store: @tanstack/solid-router",
		"- styling: UnoCSS (semantic tokens: bg-surface, text-foreground, border-border)",
		"- lint-format: Biome",
		"- bundler: Vite",
		"- deployment: Cloudflare Workers via wrangler",
	].join("\n");
}

function buildCommands(): string {
	return [
		"## Commands",
		"",
		"```bash",
		"bun install",
		"bun run lint",
		"bun run format",
		"bun run typecheck",
		"bun run build",
		"bun run --filter @wrikka/website typecheck",
		"bun run --filter @wrikka/website build",
		"bun run review-codebase",
		"bun run deploy",
		"```",
	].join("\n");
}

function buildWorkspaces(): string {
	return [
		"## Workspaces",
		"",
		"- packages/solid-ui — component registry and templates (@wrikka/solid-ui)",
		"- packages/command-palette — command palette with search, snippets, workflows",
		"- packages/form — form primitives and validation helpers",
		"- packages/image — image and media components",
		"- packages/table — table and data-grid components",
		"- packages/transitions — transition and animation utilities",
		"- apps/website — documentation and showcase site (@wrikka/website)",
		"- apps/mcp — MCP server for component discovery (@wrikka/mcp)",
		"- apps/cli — CLI for listing and generating components (@wrikka/cli)",
		"- tools/analyze — 64-category analyzer suite",
		"- tools/review-codebase — Clean Architecture review CLI",
	].join("\n");
}

function buildDocsSection(): string {
	const groups = new Map<string, string[]>();
	for (const page of Object.values(docs)) {
		const titles = groups.get(page.group) ?? [];
		titles.push(page.title);
		groups.set(page.group, titles);
	}
	const lines = ["## Documentation Sections", ""];
	for (const [group, titles] of groups) {
		lines.push(`- ${group}: ${titles.join(", ")}`);
	}
	return lines.join("\n");
}

function buildComponentsSection(): string {
	const names = registry.map((item) => item.name).join(", ");
	return ["## Components", "", `solid-ui ships ${registry.length} components:`, "", names].join("\n");
}

function buildFooter(): string {
	return [
		"## Notes",
		"",
		"- Prefer UnoCSS semantic tokens over raw color utilities.",
		'- Import components from the workspace package: `import { Button, Card } from "@wrikka/solid-ui"`.',
		"- This file is also served statically at `/llm.txt` and rendered at `/llm`.",
	].join("\n");
}
