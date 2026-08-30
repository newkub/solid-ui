import { writeFile } from "node:fs/promises";
import { registry } from "../../../packages/solid-ui/src/registry.ts";
import { categories } from "../src/categories.ts";

interface DocPage {
	title: string;
	group: string;
	order: number;
	content: string;
}

const docs: Record<string, DocPage> = {};

function add(id: string, title: string, group: string, order: number, content: string) {
	docs[id] = { title, group, order, content };
}

function componentUsage(name: string, tag: string, category: string) {
	const variants =
		category === "primitives"
			? `
## Variants

Many primitive components accept a \`class\` prop. Higher-level components such as \`Button\` accept \`variant\` and \`size\`.

\`\`\`tsx
<Button variant="primary" size="lg">Primary large</Button>
<Button variant="ghost" size="sm">Ghost small</Button>
\`\`\`
`
			: "";
	const isSelfClose = ["input", "img", "progress", "hr", "br"].includes(tag);
	return `# ${name}

Renders a \`<${tag}>\` element.

## Usage

\`\`\`tsx
import { ${name} } from "@wrikka/solid-ui";

function Example() {
	return <${name} class="my-${name.toLowerCase()}"${isSelfClose ? " />" : `>${name} content</${name}>`};
}
\`\`\`
${variants}## Props

- Extends the standard JSX attributes for \`<${tag}>\`
- Accepts \`class\` for custom styling
`;
}

add(
	"intro",
	"Introduction",
	"getting-started",
	0,
	`# Introduction

**solid-ui** is a comprehensive, accessible SolidJS component library built for Cloudflare Workers and real-world applications.

It ships with:

- 60+ reusable UI components
- Form, table, image, and transition utilities
- An MCP server for component discovery
- A CLI for listing and generating component templates
- Dark mode and responsive design out of the box

This site is the documentation and showcase for solid-ui. Use the sidebar to navigate through primitives, components, templates, theming, and integrations.
`,
);

add(
	"installation",
	"Installation",
	"getting-started",
	1,
	`# Installation

solid-ui is organized as a Bun monorepo. Install the website dependencies and build with:

\`\`\`bash
bun install
bun run build
\`\`\`

Import components from the workspace package:

\`\`\`tsx
import { Button, Card } from "@wrikka/solid-ui";
\`\`\`
`,
);

add(
	"theme",
	"Theming",
	"theming",
	0,
	`# Theming

solid-ui uses CSS custom properties for theming. Toggle dark mode with the sun/moon button in the header.

## CSS variables

\`\`\`css
:root {
	--su-bg: #f8fafc;
	--su-surface: #ffffff;
	--su-text: #0f172a;
	--su-text-muted: #64748b;
	--su-border: #e2e8f0;
	--su-primary: #0f172a;
	--su-primary-text: #ffffff;
	--su-radius: 0.5rem;
}
\`\`\`

Dark mode is activated by setting \`data-theme="dark"\` on \`<html>\`.
`,
);

add(
	"mcp",
	"MCP Server",
	"integrations",
	0,
	`# MCP Server

The solid-ui MCP server exposes component discovery and template generation tools.

## Start

\`\`\`bash
bun run --filter @wrikka/mcp start
\`\`\`

## Tools

- \`list_components\` — list all components in the registry
- \`show_component\` — show metadata for a component
- \`generate_component\` — generate a Solid component template
`,
);

add(
	"cli",
	"CLI",
	"integrations",
	1,
	`# CLI

The solid-ui CLI lists, inspects, and generates component templates.

## Commands

\`\`\`bash
bun run --filter @wrikka/cli start list
bun run --filter @wrikka/cli start show Button
bun run --filter @wrikka/cli start add MyComponent div
\`\`\`
`,
);

for (const category of categories) {
	const list = category.items.map((name) => `- [${name}](/docs/${category.id}/${name.toLowerCase()})`).join("\n");
	add(
		category.id,
		category.label,
		category.id,
		0,
		`# ${category.label}

The following ${category.label.toLowerCase()} are available in solid-ui:

${list}
`,
	);

	for (const name of category.items) {
		const item = registry.find((r) => r.name === name) ?? { name, tag: "div", description: `${name} component` };
		add(
			`${category.id}/${name.toLowerCase()}`,
			item.name,
			category.id,
			1,
			componentUsage(item.name, item.tag, category.id),
		);
	}
}

add(
	"templates/form",
	"Form template",
	"templates",
	1,
	`# Form template

Use \`createTextField\` from \`@wrikka/form\` to build a form field factory.

\`\`\`tsx
import { createTextField } from "@wrikka/solid-ui";

function EmailField() {
	const field = createTextField("email", "Email", { placeholder: "Enter your email" });
	return (
		<FormField label={field.label}>
			<Input type="email" placeholder={field.placeholder} />
		</FormField>
	);
}
\`\`\`
`,
);

add(
	"templates/table",
	"Table template",
	"templates",
	2,
	`# Table template

Use \`textColumn\` from \`@wrikka/table\` to build typed columns.

\`\`\`tsx
import { textColumn } from "@wrikka/solid-ui";

const columns = [
	textColumn("email", "Email"),
	textColumn("name", "Name"),
];
\`\`\`
`,
);

add(
	"templates/image",
	"Image template",
	"templates",
	3,
	`# Image template

Use \`buildIpxUrl\` and \`buildTransformString\` from \`@wrikka/image\`.

\`\`\`tsx
import { buildIpxUrl, buildTransformString } from "@wrikka/solid-ui";

const transform = buildTransformString({ width: 400, format: "webp", quality: 80 });
const url = buildIpxUrl("https://example.com/photo.jpg", transform);
\`\`\`
`,
);

add(
	"templates/transitions",
	"Transitions template",
	"templates",
	4,
	`# Transitions template

Use \`buildCssTransition\` and \`mergeTransitionOptions\` from \`@wrikka/transitions\`.

\`\`\`tsx
import { buildCssTransition, mergeTransitionOptions } from "@wrikka/solid-ui";

const css = buildCssTransition(mergeTransitionOptions({ duration: 300, easing: "ease-in-out" }));
\`\`\`
`,
);

const lines = [
	`// Auto-generated docs content — do not edit manually`,
	`export interface DocPage { title: string; group: string; order: number; content: string }`,
	`export const docs: Record<string, DocPage> = ${JSON.stringify(docs, null, "\t")};`,
];

await writeFile(new URL("../src/docs/generated.ts", import.meta.url), lines.join("\n"), "utf8");

console.log(`Generated ${Object.keys(docs).length} docs pages`);
