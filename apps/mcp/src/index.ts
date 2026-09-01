import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	type CallToolRequest,
	CallToolRequestSchema,
	type CallToolResult,
	ListToolsRequestSchema,
	type Tool,
} from "@modelcontextprotocol/sdk/types.js";
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

const text = (message: string): CallToolResult => ({
	content: [{ type: "text", text: message }],
});

const error = (message: string): CallToolResult => ({
	content: [{ type: "text", text: message }],
	isError: true,
});

const inputSchema = (properties: Record<string, { type: string }>): Tool["inputSchema"] => ({
	type: "object",
	properties,
	required: Object.keys(properties),
});

function listComponents(): CallToolResult {
	const lines = registry.map(formatComponent).join("\n\n");
	return text(`Solid UI component registry (${registry.length} components):\n\n${lines}`);
}

function getComponent(args: unknown): CallToolResult {
	const { name } = nameSchema.parse(args);
	const item = findComponent(name);
	if (!item) return error(`Component "${name}" not found.`);
	return text(
		`Component: ${item.name}\nTag: <${item.tag}>\nDescription: ${item.description}\n\nUsage template:\n${renderComponentTemplate(item)}`,
	);
}

function searchComponents(args: unknown): CallToolResult {
	const { query } = querySchema.parse(args);
	const q = query.toLowerCase();
	const matches = registry.filter(
		(r) =>
			r.name.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q) || r.description.toLowerCase().includes(q),
	);
	if (matches.length === 0) return text(`No components found for "${query}".`);
	return text(`Found ${matches.length} component(s) for "${query}":\n\n${matches.map(formatComponent).join("\n\n")}`);
}

function countComponents(): CallToolResult {
	return text(`There are ${registry.length} components in @wrikka/solid-ui.`);
}

function checkComponentExists(args: unknown): CallToolResult {
	const { name } = nameSchema.parse(args);
	const item = findComponent(name);
	return text(
		item
			? `Yes, ${item.name} exists in @wrikka/solid-ui (tag: <${item.tag}>).`
			: `No component named "${name}" was found.`,
	);
}

function getUsageSnippet(args: unknown): CallToolResult {
	const { name } = nameSchema.parse(args);
	const item = findComponent(name);
	if (!item) return error(`Component "${name}" not found.`);
	return text(
		`import { ${item.name} } from "@wrikka/solid-ui";\n\nfunction App() {\n  return (\n    <${item.name}>\n      Content\n    </${item.name}>\n  );\n}`,
	);
}

const tools: Tool[] = [
	{
		name: "list-components",
		description: "List every component available in @wrikka/solid-ui with its tag and description.",
		inputSchema: { type: "object" },
	},
	{
		name: "get-component",
		description: "Get details, usage template, and import path for a single solid-ui component.",
		inputSchema: inputSchema({ name: { type: "string" } }),
	},
	{
		name: "search-components",
		description: "Search the solid-ui component registry by name, tag, or description.",
		inputSchema: inputSchema({ query: { type: "string" } }),
	},
	{
		name: "count-components",
		description: "Return the total number of components in the solid-ui registry.",
		inputSchema: { type: "object" },
	},
	{
		name: "check-component-exists",
		description: "Verify whether a component exists in the solid-ui registry.",
		inputSchema: inputSchema({ name: { type: "string" } }),
	},
	{
		name: "get-usage-snippet",
		description: "Generate a SolidJS import and usage snippet for a component.",
		inputSchema: inputSchema({ name: { type: "string" } }),
	},
];

const handlers: Record<string, (args: unknown) => CallToolResult> = {
	"list-components": listComponents,
	"get-component": getComponent,
	"search-components": searchComponents,
	"count-components": countComponents,
	"check-component-exists": checkComponentExists,
	"get-usage-snippet": getUsageSnippet,
};

const server = new Server({ name: "solid-ui-mcp", version: "0.0.1" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, () => ({
	tools,
}));

server.setRequestHandler(CallToolRequestSchema, (request: CallToolRequest) => {
	const handler = handlers[request.params.name];
	if (!handler) {
		return error(`Tool "${request.params.name}" not found.`);
	}
	return handler(request.params.arguments);
});

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
