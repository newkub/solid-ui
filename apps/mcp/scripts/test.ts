import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
	command: "bun",
	args: ["src/index.ts"],
});

const client = new Client({ name: "test-client", version: "0.0.1" });

async function run() {
	await client.connect(transport);

	const tools = await client.listTools();
	console.log(
		"Tools:",
		tools.tools.map((t) => t.name),
	);

	const list = await client.callTool({ name: "list-components", arguments: {} });
	console.log("list-components text:", (list.content[0] as { text?: string }).text?.slice(0, 120));

	const button = await client.callTool({ name: "get-component", arguments: { name: "Button" } });
	console.log("get-component text:", (button.content[0] as { text?: string }).text?.slice(0, 120));

	const search = await client.callTool({ name: "search-components", arguments: { query: "input" } });
	console.log("search-components count:", (search.content[0] as { text?: string }).text?.split("\n").length);

	const count = await client.callTool({ name: "count-components", arguments: {} });
	console.log("count-components text:", (count.content[0] as { text?: string }).text);

	await client.close();
}

run().catch((err) => {
	console.error(err);
	process.exit(1);
});
