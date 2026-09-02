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
	if (name === "Accordion") {
		return `# Accordion

A vertically stacked set of expandable panels.

## Usage

\`\`\`tsx
import { Accordion, AccordionItem } from "@wrikka/solid-ui";

function Example() {
	return (
		<Accordion class="my-accordion">
			<AccordionItem title="Section one">
				First panel content.
			</AccordionItem>
			<AccordionItem title="Section two" defaultOpen>
				Second panel content.
			</AccordionItem>
		</Accordion>
	);
}
\`\`\`

## Props

- \`Accordion\` extends the standard JSX attributes for \`<div>\`
- \`AccordionItem\` accepts \`title\`, \`children\`, and \`defaultOpen\`
`;
	}
	if (name === "Calendar") {
		return `# Calendar

A month grid with previous/next navigation.

## Usage

\`\`\`tsx
import { Calendar } from "@wrikka/solid-ui";

function Example() {
	return <Calendar value={new Date()} onChange={(date) => void date} />;
}
\`\`\`

## Props

- \`value\` — selected date
- \`onChange\` — called when a day is selected
- Accepts \`class\` for custom styling
`;
	}
	if (name === "Chart") {
		return `# Chart

A simple bar chart for data visualization.

## Usage

\`\`\`tsx
import { Chart } from "@wrikka/solid-ui";

function Example() {
	return (
		<Chart
			title="Weekly views"
			data={[
				{ label: "Mon", value: 40 },
				{ label: "Tue", value: 70 },
			]}
		/>
	);
}
\`\`\`

## Props

- \`data\` — array of { label, value, color? }
- \`title\` — optional chart title
- \`height\` — bar area height in pixels
`;
	}
	if (name === "Command") {
		return `# Command

A searchable list for command selection.

## Usage

\`\`\`tsx
import { Command } from "@wrikka/solid-ui";

function Example() {
	return (
		<Command
			items={[
				{ value: "profile", label: "Profile" },
				{ value: "settings", label: "Settings" },
			]}
			onSelect={(item) => void item.value}
		/>
	);
}
\`\`\`

## Props

- \`items\` — array of { value, label, shortcut?, onSelect? }
- \`placeholder\` — input placeholder
- \`emptyText\` — message when no results match
`;
	}
	if (name === "CommandPalette") {
		return `# Command Palette

A full-screen overlay with a searchable command list.

## Usage

\`\`\`tsx
import { CommandPalette } from "@wrikka/solid-ui";

function Example() {
	return (
		<CommandPalette
			items={[
				{ value: "home", label: "Go home" },
				{ value: "docs", label: "Open docs" },
			]}
			onSelect={(item) => void item.value}
		/>
	);
}
\`\`\`

## Props

- \`open\` — controlled open state
- \`onOpenChange\` — called when the overlay is toggled
- Toggle with \`Cmd+K\` (macOS) or \`Ctrl+K\` (Windows/Linux)
`;
	}
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
	"Get started",
	"getting-started",
	0,
	`# Get started

**solid-ui** is a SolidJS design system that gives you typed, accessible, and themeable components without rebuilding the basics.

## What you get

- **60+ UI components** — from buttons and inputs to data tables, command palettes, and dialogs.
- **Composable packages** — form, table, image, and transitions utilities for real-world use cases.
- **MCP server** — discover components and generate snippets from any MCP client.
- **CLI** — list, inspect, and scaffold new components from the terminal.
- **Built-in theming** — switch light/dark mode, pick a color, and tune spacing/radius live.

## Quick start

Install the workspace and run the docs site:

\`\`\`bash
bun install
bun run dev
\`\`\`

Import a component:

\`\`\`tsx
import { Button } from "@wrikka/solid-ui";

function App() {
	return <Button>Get started</Button>;
}
\`\`\`

Browse the [components](/components) gallery, read the [docs](/docs/intro), or customize the [theme](/theme) to see it in action.
`,
);

add(
	"installation",
	"Installation",
	"getting-started",
	1,
	`# Installation

solid-ui is a Bun monorepo. Make sure you have [Bun](https://bun.sh) installed, then run:

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

- \`list-components\` — list every component in the registry with tag and description
- \`get-component\` — get details, usage template, and import path for a component
- \`search-components\` — search the registry by name, tag, or description
- \`count-components\` — return the total number of components
- \`check-component-exists\` — verify whether a component exists
- \`get-usage-snippet\` — generate a SolidJS import and usage snippet
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

add(
	"templates/chatbot",
	"Chatbot template",
	"templates",
	5,
	`# Chatbot template

A minimal chatbot UI built from solid-ui primitives.

\`\`\`tsx
import { createSignal, For } from "solid-js";
import { Button, Input, Card } from "@wrikka/solid-ui";

function Chatbot() {
	const [messages, setMessages] = createSignal([{ role: "assistant", text: "How can I help you?" }]);
	const [input, setInput] = createSignal("");

	function send() {
		const text = input().trim();
		if (!text) return;
		setMessages((prev) => [...prev, { role: "user", text }]);
		setInput("");
		setTimeout(() => {
			setMessages((prev) => [...prev, { role: "assistant", text: "This is a placeholder reply." }]);
		}, 600);
	}

	return (
		<Card class="flex h-[600px] flex-col">
			<div class="flex-1 space-y-3 overflow-y-auto p-4">
				<For each={messages()}>
					{(msg) => (
						<div class={["rounded-lg px-3 py-2", msg.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"].join(" ")}>
							{msg.text}
						</div>
					)}
				</For>
			</div>
			<div class="flex gap-2 border-t border-border p-3">
				<Input value={input()} onInput={(e) => setInput(e.currentTarget.value)} placeholder="Type a message…" />
				<Button onClick={send}>Send</Button>
			</div>
		</Card>
	);
}
\`\`\`
`,
);

add(
	"principles",
	"Principles",
	"core",
	0,
	`# Principles

solid-ui is built on a small set of principles that guide every component and API decision.

## Composability first

Components are small, focused, and easy to compose. Higher-level patterns are built from primitives, not hard-coded.

## Type safety

Every component is written in TypeScript and ships with typed props. Form, table, and image helpers use type inference so you catch mistakes early.

## Accessibility

Keyboard navigation, focus management, ARIA roles, and color contrast are considered by default. Components work with screen readers and reduced-motion preferences.

## Themeability

Colors, fonts, spacing, and radius are driven by CSS custom properties. Switch presets or fine-tune tokens without touching component internals.

## SolidJS native

The library uses SolidJS primitives — signals, stores, and fine-grained reactivity — without extra abstraction layers.
`,
);

add(
	"key-concepts",
	"Key concepts",
	"core",
	1,
	`# Key concepts

A few concepts make solid-ui easier to work with.

## Primitives and components

**Primitives** are low-level controls like \`Button\`, \`Input\`, and \`Select\`. **Components** are higher-level patterns like \`CommandPalette\`, \`DataTable\`, and \`NavigationMenu\`.

## The theme system

The site and components read from CSS custom properties. The \`ThemePicker\` in the header writes to these tokens so every preview updates live.

## Registry-driven docs

The component registry powers the docs, the MCP server, and the CLI. Adding a component to the registry and a category makes it discoverable everywhere.

## Workspace packages

- \`@wrikka/solid-ui\` — UI components
- \`@wrikka/form\` — form field helpers
- \`@wrikka/table\` — typed table columns
- \`@wrikka/image\` — image transform URLs
- \`@wrikka/transitions\` — CSS transition utilities
`,
);

add(
	"comparison",
	"Comparison",
	"core",
	2,
	`# Comparison

How solid-ui compares to common alternatives.

## vs. shadcn/ui

shadcn/ui is a collection of copy-paste React components. solid-ui is a SolidJS design system with a registry, MCP server, CLI, and built-in docs.

## vs. other SolidJS libraries

Many SolidJS libraries are small sets of primitives. solid-ui adds higher-level components, real-world packages, and an AI-ready MCP layer.

## When to use solid-ui

Choose solid-ui when you want:

- A single, consistent design system
- SolidJS-native, fine-grained reactivity
- Typed form, table, and image helpers
- Component discovery through MCP or CLI
- Live theme customization out of the box
`,
);

const lines = [
	`// Auto-generated docs content — do not edit manually`,
	`export interface DocPage { title: string; group: string; order: number; content: string }`,
	`export const docs: Record<string, DocPage> = ${JSON.stringify(docs, null, "\t")};`,
];

await writeFile(new URL("../src/docs/generated.ts", import.meta.url), lines.join("\n"), "utf8");
