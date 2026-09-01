import { Link } from "@tanstack/solid-router";
import { For } from "solid-js";
import { categories } from "../categories";

export function ComponentSidebar() {
	return (
		<nav class="space-y-5" aria-label="Component categories">
			<div class="space-y-2">
				<p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Categories</p>
				<ul class="space-y-0.5">
					<For each={categories}>
						{(cat) => (
							<li>
								<Link
									to={`/components?category=${cat.id}`}
									class="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									activeProps={() => ({
										class: "block rounded-md px-2 py-1.5 text-sm font-medium bg-primary text-primary-foreground",
									})}
								>
									{cat.label}
								</Link>
							</li>
						)}
					</For>
				</ul>
			</div>
			<div class="space-y-2">
				<p class="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">All components</p>
				<ul class="space-y-0.5 max-h-[40vh] overflow-y-auto pr-1">
					<For each={categories.flatMap((cat) => cat.items.map((name) => ({ ...cat, name })))}>
						{(item) => (
							<li>
								<Link
									to={`/docs/${item.id}/${item.name.toLowerCase()}`}
									class="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									activeProps={() => ({
										class: "block rounded-md px-2 py-1.5 text-sm font-medium bg-primary text-primary-foreground",
									})}
								>
									{item.name}
								</Link>
							</li>
						)}
					</For>
				</ul>
			</div>
		</nav>
	);
}
