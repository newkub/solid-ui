import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { type RegistryItem, registry } from "./registry.ts";

const nameSchema = z.object({ name: z.string() });
const querySchema = z.object({ query: z.string() });

function renderComponentTemplate(item: RegistryItem): string {
	return `import { ${item.name} } from "@wrikka/solid-ui";

// Basic usage
<${item.name} />

// HTML tag equivalent
<${item.tag} class="solidui-${item.name.toLowerCase()}" />`;
}

function findComponent(name: string): RegistryItem | undefined {
	return registry.find((r) => r.name.toLowerCase() === name.toLowerCase());
}

function formatComponent(item: RegistryItem): string {
	return `• ${item.name} — <${item.tag}>\n  ${item.description}`;
}

const server = new McpServer({
	name: "solid-ui-mcp",
	version: "0.0.1",
});

server.registerTool(
	"list-components",
	{
		description: "List every component available in @wrikka/solid-ui with its tag and description.",
	},
	async () => {
		const lines = registry.map(formatComponent).join("\n\n");
		return {
			content: [
				{
					type: "text",
					text: `Solid UI component registry (${registry.length} components):\n\n${lines}`,
				},
			],
		};
	},
);

server.registerTool(
	"get-component",
	{
		description: "Get details, usage template, and import path for a single solid-ui component.",
		inputSchema: nameSchema,
		// biome-ignore lint/suspicious/noExplicitAny: SDK registerTool generic causes tsc OOM
	} as any,
	async (args: unknown) => {
		const { name } = nameSchema.parse(args);
		const item = findComponent(name);
		if (!item) {
			return {
				content: [{ type: "text", text: `Component "${name}" not found.` }],
				isError: true,
			};
		}
		return {
			content: [
				{
					type: "text",
					text: `Component: ${item.name}\nTag: <${item.tag}>\nDescription: ${item.description}\n\nUsage template:\n${renderComponentTemplate(item)}`,
				},
			],
		};
	},
);

server.registerTool(
	"search-components",
	{
		description: "Search the solid-ui component registry by name, tag, or description.",
		inputSchema: querySchema,
		// biome-ignore lint/suspicious/noExplicitAny: SDK registerTool generic causes tsc OOM
	} as any,
	async (args: unknown) => {
		const { query } = querySchema.parse(args);
		const q = query.toLowerCase();
		const matches = registry.filter(
			(r) =>
				r.name.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q) || r.description.toLowerCase().includes(q),
		);
		if (matches.length === 0) {
			return {
				content: [{ type: "text", text: `No components found for "${query}".` }],
			};
		}
		return {
			content: [
				{
					type: "text",
					text: `Found ${matches.length} component(s) for "${query}":\n\n${matches.map(formatComponent).join("\n\n")}`,
				},
			],
		};
	},
);

server.registerTool(
	"count-components",
	{
		description: "Return the total number of components in the solid-ui registry.",
	},
	async () => ({
		content: [
			{
				type: "text",
				text: `There are ${registry.length} components in @wrikka/solid-ui.`,
			},
		],
	}),
);

server.registerTool(
	"check-component-exists",
	{
		description: "Verify whether a component exists in the solid-ui registry.",
		inputSchema: nameSchema,
		// biome-ignore lint/suspicious/noExplicitAny: SDK registerTool generic causes tsc OOM
	} as any,
	async (args: unknown) => {
		const { name } = nameSchema.parse(args);
		const item = findComponent(name);
		return {
			content: [
				{
					type: "text",
					text: item
						? `Yes, ${item.name} exists in @wrikka/solid-ui (tag: <${item.tag}>).`
						: `No component named "${name}" was found.`,
				},
			],
		};
	},
);

server.registerTool(
	"get-usage-snippet",
	{
		description: "Generate a SolidJS import and usage snippet for a component.",
		inputSchema: nameSchema,
		// biome-ignore lint/suspicious/noExplicitAny: SDK registerTool generic causes tsc OOM
	} as any,
	async (args: unknown) => {
		const { name } = nameSchema.parse(args);
		const item = findComponent(name);
		if (!item) {
			return {
				content: [{ type: "text", text: `Component "${name}" not found.` }],
				isError: true,
			};
		}
		return {
			content: [
				{
					type: "text",
					text: `import { ${item.name} } from "@wrikka/solid-ui";\n\nfunction App() {\n  return (\n    <${item.name}>\n      Content\n    </${item.name}>\n  );\n}`,
				},
			],
		};
	},
);

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
