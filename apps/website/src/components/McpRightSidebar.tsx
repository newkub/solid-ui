import { CodeBlock } from "./CodeBlock";

const files = [
	{ name: "index.ts", path: "apps/mcp/src/index.ts", desc: "MCP server entry" },
	{ name: "registry.ts", path: "apps/mcp/src/registry.ts", desc: "Component registry" },
	{ name: "package.json", path: "apps/mcp/package.json", desc: "Package config" },
	{ name: "wrangler.toml", path: "apps/mcp/wrangler.toml", desc: "Deploy config" },
];

const listExample = `{
  "name": "list-components",
  "arguments": {}
}`;

const getExample = `{
  "name": "get-component",
  "arguments": { "name": "Button" }
}`;

const searchExample = `{
  "name": "search-components",
  "arguments": { "query": "input" }
}`;

function FileIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
			class="mt-0.5 shrink-0"
		>
			<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
			<polyline points="13 2 13 9 20 9" />
		</svg>
	);
}

function FolderIcon() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
			class="mt-0.5 shrink-0"
		>
			<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
		</svg>
	);
}

export function McpRightSidebar() {
	return (
		<div class="sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto pr-2">
			<div class="mb-6">
				<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">File structure</h3>
				<ul class="space-y-2 text-sm">
					<li>
						<div class="flex items-center gap-2 text-muted-foreground">
							<FolderIcon />
							<span>apps/mcp</span>
						</div>
						<ul class="mt-1 space-y-1 border-l border-border pl-4">
							{files.map((file) => (
								<li class="flex items-start gap-2" title={file.desc}>
									<FileIcon />
									<div>
										<div class="text-foreground">{file.name}</div>
										<div class="text-xs text-muted-foreground">{file.path}</div>
									</div>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</div>

			<div class="mb-6">
				<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Run locally</h3>
				<CodeBlock code="bun --filter @wrikka/mcp dev" language="bash" />
			</div>

			<div class="space-y-4">
				<h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tool examples</h3>
				<div>
					<div class="mb-1 text-xs text-muted-foreground">list-components</div>
					<CodeBlock code={listExample} language="json" />
				</div>
				<div>
					<div class="mb-1 text-xs text-muted-foreground">get-component</div>
					<CodeBlock code={getExample} language="json" />
				</div>
				<div>
					<div class="mb-1 text-xs text-muted-foreground">search-components</div>
					<CodeBlock code={searchExample} language="json" />
				</div>
			</div>
		</div>
	);
}
