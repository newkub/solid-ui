import { For } from "solid-js";
import { Seo } from "./Seo";

const commands = [
	{
		name: "list",
		description: "List all solid-ui components with their HTML tag.",
		example: "bun apps/cli/src/index.ts list",
	},
	{
		name: "count",
		description: "Count total components in the registry.",
		example: "bun apps/cli/src/index.ts count",
	},
	{
		name: "show <name>",
		description: "Show component details and a generated template.",
		example: "bun apps/cli/src/index.ts show Button",
	},
	{
		name: "add <name> [tag]",
		description: "Generate a new component template with the given tag.",
		example: "bun apps/cli/src/index.ts add Card div",
	},
];

export function CliPage() {
	return (
		<section class="page mx-auto max-w-3xl">
			<Seo
				title="CLI — solid-ui"
				description="solid-ui CLI commands for listing, showing, and generating components."
				path="/cli"
			/>
			<header class="mb-8">
				<h2 class="text-2xl font-bold tracking-tight">CLI</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Use the solid-ui CLI to inspect and generate components locally.
				</p>
			</header>

			<div class="rounded-xl border border-border bg-surface p-6 shadow-sm">
				<h3 class="mb-2 text-lg font-semibold">Installation</h3>
				<pre class="mb-6 overflow-auto rounded-lg bg-background p-4 text-xs text-foreground">
					<code>bun apps/cli/src/index.ts --help</code>
				</pre>

				<h3 class="mb-4 text-lg font-semibold">Commands</h3>
				<div class="space-y-4">
					<For each={commands}>
						{(cmd) => (
							<div class="rounded-lg border border-border bg-background p-4">
								<h4 class="font-mono text-sm font-semibold text-foreground">solid-ui {cmd.name}</h4>
								<p class="mt-1 text-sm text-muted-foreground">{cmd.description}</p>
								<code class="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
									{cmd.example}
								</code>
							</div>
						)}
					</For>
				</div>
			</div>
		</section>
	);
}
