#!/usr/bin/env bun
import { registry } from "@wrikka/solid-ui";
import { cac } from "cac";

const cli = cac("solid-ui");

const template = (name: string, tag: string) => `import { splitProps, type JSX } from 'solid-js'

export interface ${name}Props extends JSX.HTMLAttributes<HTML${tag[0].toUpperCase() + tag.slice(1)}Element> {}

export function ${name}(props: ${name}Props) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return <${tag} class={\`solidui-${name.toLowerCase()} \${local.class || ''}\`.trim()} {...rest}>{local.children}</${tag}>
}`;

cli.command("list", "List all solid-ui components").action(() => {
	console.log(`Components (${registry.length}):`);
	for (const c of registry) {
		console.log(`  ${c.name} — <${c.tag}>`);
	}
});

cli.command("count", "Count all solid-ui components").action(() => {
	console.log(`Total: ${registry.length}`);
});

cli.command("show <name>", "Show component details and code template").action((name: string) => {
	const item = registry.find((r) => r.name.toLowerCase() === name.toLowerCase());
	if (!item) {
		console.error(`Component "${name}" not found.`);
		process.exit(1);
	}
	console.log(`Component: ${item.name}`);
	console.log(`Tag: <${item.tag}>`);
	console.log("\nTemplate:");
	console.log(template(item.name, item.tag));
});

cli.command("add <name> [tag]", "Generate a new component template").action((name: string, tag?: string) => {
	const t = tag || "div";
	console.log(template(name, t));
});

cli.help();

const parsed = cli.parse();

if (!parsed.args.length && !parsed.options.help) {
	cli.outputHelp();
	process.exit(0);
}
