import { For } from "solid-js";
import { mcpExamples } from "../data/navigation";
import { CodeBlock } from "./CodeBlock";

export function McpRightSidebar() {
	return (
		<div class="sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto pr-2">
			<For each={mcpExamples}>
				{(section) => (
					<div class="mb-6">
						<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{section.title}</h3>
						<div class="space-y-4">
							<For each={section.items}>
								{(item) => (
									<div>
										<div class="mb-1 text-xs text-muted-foreground">{item.command}</div>
										{item.description && <p class="mb-1 text-2xs text-muted-foreground">{item.description}</p>}
										<CodeBlock
											code={
												section.title === "Run locally"
													? item.command
													: `{\n  "name": "${item.command}",\n  "arguments": {}\n}`
											}
											language={section.title === "Run locally" ? "bash" : "json"}
										/>
									</div>
								)}
							</For>
						</div>
					</div>
				)}
			</For>
		</div>
	);
}
