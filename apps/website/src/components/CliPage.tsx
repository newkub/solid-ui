import { For } from "solid-js";
import { CodeBlock } from "./CodeBlock";
import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

const commands = [
	{
		name: "list",
		description: "List all solid-ui components with their HTML tag.",
		example: "solid-ui list",
	},
	{
		name: "count",
		description: "Count total components in the registry.",
		example: "solid-ui count",
	},
	{
		name: "show <name>",
		description: "Show component details and a generated template.",
		example: "solid-ui show Button",
	},
	{
		name: "search <query>",
		description: "Search the registry by name, tag, or description.",
		example: "solid-ui search input",
	},
	{
		name: "add <name> [tag]",
		description: "Generate a new component template with the given tag.",
		example: "solid-ui add Card div",
	},
];

export function CliPage() {
	return (
		<section class="page">
			<Seo
				title="CLI — solid-ui"
				description="solid-ui CLI commands for listing, searching, showing, and generating components."
				path="/cli"
			/>
			<PageHeader title="CLI" description="Use the solid-ui CLI to inspect, search, and generate components locally." />

			<div class="space-y-8">
				<PageSection title="Installation">
					<CodeBlock code="bun apps/cli/src/index.ts --help" language="bash" />
				</PageSection>

				<PageSection title="Commands">
					<div class="grid gap-4 sm:grid-cols-2">
						<For each={commands}>
							{(cmd) => (
								<div class="rounded-xl border border-border bg-surface p-4 shadow-sm">
									<div class="mb-2 flex flex-wrap items-center justify-between gap-2">
										<h4 class="font-mono text-sm font-semibold text-foreground">{cmd.name}</h4>
										<Tag label="cli" />
									</div>
									<p class="mb-3 text-sm text-muted-foreground">{cmd.description}</p>
									<CodeBlock code={cmd.example} language="bash" />
								</div>
							)}
						</For>
					</div>
				</PageSection>
			</div>
		</section>
	);
}
