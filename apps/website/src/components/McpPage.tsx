import { createSignal } from "solid-js";
import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

function CheckIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

function CopyIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<rect x="9" y="9" width="13" height="13" rx="2" />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
	);
}

function FeatureItem(props: { children: string }) {
	return (
		<li class="flex items-start gap-2 text-sm text-muted-foreground">
			<CheckIcon class="mt-0.5 shrink-0 text-primary" />
			<span>{props.children}</span>
		</li>
	);
}

function CodeBlockWithCopy() {
	const command = "bun --filter @wrikka/mcp dev";
	const [copied, setCopied] = createSignal(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	}

	return (
		<div class="relative rounded-lg border border-border bg-background p-4">
			<pre class="overflow-auto text-xs text-foreground">
				<code>{command}</code>
			</pre>
			<button
				type="button"
				onClick={copy}
				class="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				aria-live="polite"
			>
				<CopyIcon />
				{copied() ? "Copied" : "Copy"}
			</button>
		</div>
	);
}

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
					<ul class="space-y-1.5">
						<FeatureItem>Browse the full component registry by name, tag, or category.</FeatureItem>
						<FeatureItem>Read component docs and copy usage snippets.</FeatureItem>
						<FeatureItem>Generate new components and website pages from prompts.</FeatureItem>
						<FeatureItem>Run review and analysis tools against the codebase.</FeatureItem>
					</ul>
				</PageSection>

				<PageSection title="Run locally">
					<CodeBlockWithCopy />
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
