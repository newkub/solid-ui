import { Link } from "@tanstack/solid-router";
import { For } from "solid-js";
import { docs } from "../docs/generated";

interface DocItem {
	id: string;
	title: string;
	order: number;
}

interface DocSection {
	group: string;
	label: string;
	items: DocItem[];
}

const groupMeta: Record<string, string> = {
	"getting-started": "Getting started",
	primitives: "Primitives",
	components: "Components",
	templates: "Templates",
	theming: "Theming",
	integrations: "Integrations",
};

const groupOrder = ["getting-started", "primitives", "components", "templates", "theming", "integrations"];

function pagePath(id: string) {
	const [group, ...rest] = id.split("/");
	return rest.length ? `/docs/${group}/${rest.join("/")}` : `/docs/${group}`;
}

function buildSections(): DocSection[] {
	const byGroup: Record<string, DocItem[]> = {};
	for (const [id, page] of Object.entries(docs)) {
		byGroup[page.group] = byGroup[page.group] ?? [];
		byGroup[page.group].push({ id, title: page.title, order: page.order });
	}
	for (const group of Object.keys(byGroup)) {
		byGroup[group].sort((a, b) => a.order - b.order);
	}
	return groupOrder
		.map((group) => ({
			group,
			label: groupMeta[group] ?? group,
			items: byGroup[group] ?? [],
		}))
		.filter((s) => s.items.length > 0);
}

interface DocsModuleProps {
	onClick?: () => void;
}

export function DocsModule(props: DocsModuleProps) {
	return (
		<nav class="space-y-4 max-h-[60vh] overflow-y-auto pr-1" aria-label="Documentation">
			<For each={buildSections()}>
				{(section) => (
					<div class="space-y-2">
						<p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{section.label}</p>
						<ul class="space-y-0.5">
							<For each={section.items}>
								{(item) => (
									<li>
										<Link
											to={pagePath(item.id)}
											class="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
											activeProps={() => ({
												class: "block rounded-md px-2 py-1.5 text-sm font-medium bg-primary text-primary-foreground",
												"aria-current": "page",
											})}
											activeOptions={{ exact: true }}
											onClick={props.onClick}
										>
											{item.title}
										</Link>
									</li>
								)}
							</For>
						</ul>
					</div>
				)}
			</For>
		</nav>
	);
}
