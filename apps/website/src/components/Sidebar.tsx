import { Link, useParams } from "@tanstack/solid-router";
import { type Accessor, createMemo, For } from "solid-js";
import { docs } from "../docs/generated";

const groupLabels: Record<string, string> = {
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

export function Sidebar() {
	const params = useParams({ strict: false }) as Accessor<{ group: string; name?: string }>;
	const activeGroup = () => params().group;

	const sections = createMemo(() => {
		const byGroup: Record<string, { id: string; title: string; order: number }[]> = {};
		for (const [id, page] of Object.entries(docs)) {
			byGroup[page.group] = byGroup[page.group] ?? [];
			byGroup[page.group].push({ id, title: page.title, order: page.order });
		}
		for (const group of Object.keys(byGroup)) {
			byGroup[group].sort((a, b) => a.order - b.order);
		}
		return groupOrder
			.map((group) => ({ group, label: groupLabels[group] ?? group, items: byGroup[group] ?? [] }))
			.filter((s) => s.items.length > 0);
	});

	return (
		<aside class="docs-sidebar" aria-label="Docs sidebar">
			<For each={sections()}>
				{(section) => (
					<div class="docs-sidebar__section">
						<h3
							class={
								section.group === activeGroup()
									? "docs-sidebar__title docs-sidebar__title--active"
									: "docs-sidebar__title"
							}
						>
							{section.label}
						</h3>
						<ul class="docs-sidebar__list">
							<For each={section.items}>
								{(item) => (
									<li>
										<Link
											to={pagePath(item.id)}
											class="docs-sidebar__link"
											activeProps={() => ({ class: "docs-sidebar__link docs-sidebar__link--active" })}
											activeOptions={{ exact: true }}
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
		</aside>
	);
}
