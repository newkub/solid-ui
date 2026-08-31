import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registry } from "@wrikka/solid-ui";
import { z } from "zod";

type McpToolServer = {
	tool: (name: string, description: string, params: unknown, cb: (args: { name: string }) => Promise<unknown>) => void;
};

const server = new McpServer({
	name: "solid-ui-mcp",
	version: "0.0.1",
});

const template = (name: string, tag: string) => `import { splitProps, type JSX } from 'solid-js'

export interface ${name}Props extends JSX.HTMLAttributes<HTML${tag[0].toUpperCase() + tag.slice(1)}Element> {}

export function ${name}(props: ${name}Props) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return <${tag} class={\`solidui-${name.toLowerCase()} \${local.class || ''}\`.trim()} {...rest}>{local.children}</${tag}>
}`;

server.tool("list-components", "List all components available in @wrikka/solid-ui", async () => {
	const components = registry.map((r) => `${r.name} (${r.tag})`).join("\n");
	return {
		content: [
			{
				type: "text",
				text: `Solid UI component registry (${registry.length} components):\n\n${components}`,
			},
		],
	};
});

(server as McpToolServer).tool(
	"get-component",
	"Get component details and a code template",
	{ name: z.string() },
	async ({ name }) => {
		const item = registry.find((r) => r.name.toLowerCase() === name.toLowerCase());
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
					text: `Component: ${item.name}\nTag: <${item.tag}>\n\nTemplate:\n${template(item.name, item.tag)}`,
				},
			],
		};
	},
);

server.tool("count-components", "Return the number of components in solid-ui", async () => ({
	content: [
		{
			type: "text",
			text: `There are ${registry.length} components in @wrikka/solid-ui.`,
		},
	],
}));

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
