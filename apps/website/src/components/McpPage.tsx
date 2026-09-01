import { Seo } from "./Seo";

export function McpPage() {
	return (
		<section class="page mx-auto max-w-3xl">
			<Seo
				title="MCP — solid-ui"
				description="Use the solid-ui MCP server to discover components, templates, and skills from any MCP client."
				path="/mcp"
			/>
			<header class="mb-8">
				<h2 class="text-2xl font-bold tracking-tight">MCP server</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Connect solid-ui to any Model Context Protocol client for component discovery and code generation.
				</p>
			</header>

			<div class="rounded-xl border border-border bg-surface p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold">What it provides</h3>
				<ul class="mb-6 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
					<li>Browse the full component registry by name, tag, or category.</li>
					<li>Read component docs and copy usage snippets.</li>
					<li>Generate new components and website pages from prompts.</li>
					<li>Run review and analysis tools against the codebase.</li>
				</ul>

				<h3 class="mb-2 text-lg font-semibold">Run locally</h3>
				<pre class="mb-6 overflow-auto rounded-lg bg-background p-4 text-xs">
					<code>bun --filter @wrikka/mcp dev</code>
				</pre>

				<h3 class="mb-2 text-lg font-semibold">Package</h3>
				<p class="text-sm text-muted-foreground">
					<code class="rounded bg-muted px-1.5 py-0.5">@wrikka/mcp</code> — source in{" "}
					<code class="rounded bg-muted px-1.5 py-0.5">apps/mcp</code>.
				</p>
			</div>
		</section>
	);
}
