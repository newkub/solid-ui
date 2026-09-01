import { For } from "solid-js";
import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

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
			<PageHeader title="CLI" description="Use the solid-ui CLI to inspect and generate components locally." />

			<div class="space-y-6">
				<PageSection title="Installation">
					<pre class="overflow-auto rounded-lg bg-background p-4 text-xs text-foreground">
						<code>bun apps/cli/src/index.ts --help</code>
					</pre>
				</PageSection>

				<PageSection title="Commands">
					<div class="space-y-3">
						<For each={commands}>
							{(cmd) => (
								<div class="rounded-lg border border-border bg-background p-4">
									<div class="flex flex-wrap items-center gap-2">
										<h4 class="font-mono text-sm font-semibold text-foreground">solid-ui {cmd.name}</h4>
										<Tag label="cli" />
									</div>
									<p class="mt-1 text-sm text-muted-foreground">{cmd.description}</p>
									<code class="mt-2 block rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
										{cmd.example}
									</code>
								</div>
							)}
						</For>
					</div>
				</PageSection>
			</div>
		</section>
	);
}
