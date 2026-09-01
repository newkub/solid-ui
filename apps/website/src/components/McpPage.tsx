import { For } from "solid-js";
import { CodeBlock } from "./CodeBlock";
import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

const tools = [
	{ name: "list-components", desc: "List every component with tag and description." },
	{ name: "get-component", desc: "Get details, usage template, and import path." },
	{ name: "search-components", desc: "Search the registry by name, tag, or description." },
	{ name: "count-components", desc: "Return the total number of components." },
	{ name: "check-component-exists", desc: "Verify whether a component exists." },
	{ name: "get-usage-snippet", desc: "Generate a SolidJS import and usage snippet." },
];

const runExample = `bun --filter @wrikka/mcp dev`;

const configExample = `{
  "mcpServers": {
    "solid-ui": {
      "command": "bun",
      "args": ["run", "--filter", "@wrikka/mcp", "dev"]
    }
  }
}`;

const callExample = `{
  "name": "get-component",
  "arguments": { "name": "Button" }
}`;

export function McpPage() {
	return (
		<section class="page">
			<Seo
				title="MCP Server — solid-ui"
				description="Connect solid-ui to any Model Context Protocol client for component discovery and code snippets."
				path="/docs/integrations/mcp"
			/>
			<PageHeader
				title="MCP server"
				description="Use the solid-ui MCP server to discover components, read usage templates, and generate snippets from any MCP client."
			/>

			<div class="space-y-8">
				<PageSection title="Available tools">
					<ul class="divide-y divide-border rounded-xl border border-border bg-surface">
						<For each={tools}>
							{(tool) => (
								<li class="flex items-start justify-between gap-4 px-4 py-3">
									<div>
										<div class="font-mono text-sm font-medium text-foreground">{tool.name}</div>
										<div class="text-sm text-muted-foreground">{tool.desc}</div>
									</div>
									<div class="shrink-0">
										<Tag label="tool" />
									</div>
								</li>
							)}
						</For>
					</ul>
				</PageSection>

				<PageSection title="Run locally">
					<CodeBlock code={runExample} language="bash" />
				</PageSection>

				<PageSection title="Client config">
					<CodeBlock code={configExample} language="json" />
				</PageSection>

				<PageSection title="Example tool call">
					<CodeBlock code={callExample} language="json" />
				</PageSection>

				<PageSection title="Package">
					<div class="flex flex-col gap-2 text-sm text-muted-foreground">
						<p>
							<code class="rounded bg-muted px-1.5 py-0.5">@wrikka/mcp</code> — source in{" "}
							<code class="rounded bg-muted px-1.5 py-0.5">apps/mcp</code>.
						</p>
						<div class="flex flex-wrap gap-2">
							<Tag label="mcp" />
							<Tag label="components" variant="primary" />
						</div>
					</div>
				</PageSection>
			</div>
		</section>
	);
}
