import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

export function McpPage() {
	return (
		<section class="page mx-auto max-w-3xl">
			<Seo
				title="MCP — solid-ui"
				description="Use the solid-ui MCP server to discover components, templates, and skills from any MCP client."
				path="/mcp"
			/>
			<PageHeader
				title="MCP server"
				description="Connect solid-ui to any Model Context Protocol client for component discovery and code generation."
			/>

			<div class="space-y-6">
				<PageSection title="What it provides">
					<ul class="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
						<li>Browse the full component registry by name, tag, or category.</li>
						<li>Read component docs and copy usage snippets.</li>
						<li>Generate new components and website pages from prompts.</li>
						<li>Run review and analysis tools against the codebase.</li>
					</ul>
				</PageSection>

				<PageSection title="Run locally">
					<pre class="overflow-auto rounded-lg bg-background p-4 text-xs text-foreground">
						<code>bun --filter @wrikka/mcp dev</code>
					</pre>
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
