import { Link } from "@tanstack/solid-router";
import { For } from "solid-js";
import { docs } from "../docs/generated";

function templateEntries() {
	return Object.entries(docs)
		.filter(([, page]) => page.group === "templates")
		.map(([id, page]) => ({
			id,
			slug: id.split("/").pop() ?? "",
			title: page.title,
			order: page.order,
		}))
		.sort((a, b) => a.order - b.order);
}

export function TemplateSidebar() {
	return (
		<nav class="space-y-2" aria-label="Templates">
			<p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Templates</p>
			<ul class="space-y-0.5">
				<For each={templateEntries()}>
					{(entry) => (
						<li>
							<Link
								to={`/docs/${entry.id}`}
								class="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								activeProps={() => ({
									class: "block rounded-md px-2 py-1.5 text-sm font-medium bg-primary text-primary-foreground",
								})}
							>
								{entry.title}
							</Link>
						</li>
					)}
				</For>
			</ul>
		</nav>
	);
}
