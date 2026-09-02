import { Link } from "@tanstack/solid-router";
import { createSignal, For, Show } from "solid-js";
import { buildExamples, type ExampleItem } from "../data/examples";
import { CodeBlock } from "./CodeBlock";
import { ExampleWorkbench } from "./ExampleWorkbench";
import { PageHeader } from "./PageHeader";
import { Seo } from "./Seo";

function ViewToggle(props: { view: "gallery" | "workbench"; onChange: (view: "gallery" | "workbench") => void }) {
	return (
		<div class="flex rounded-lg border border-border bg-background p-1">
			<button
				type="button"
				class="rounded-md px-3 py-1.5 text-sm"
				classList={{ "bg-primary text-primary-foreground": props.view === "gallery" }}
				onClick={() => props.onChange("gallery")}
				aria-pressed={props.view === "gallery"}
			>
				Gallery
			</button>
			<button
				type="button"
				class="rounded-md px-3 py-1.5 text-sm"
				classList={{ "bg-primary text-primary-foreground": props.view === "workbench" }}
				onClick={() => props.onChange("workbench")}
				aria-pressed={props.view === "workbench"}
			>
				Workbench
			</button>
		</div>
	);
}

export function ExamplesPage() {
	const [view, setView] = createSignal<"gallery" | "workbench">("gallery");
	const groups = () => {
		const map = new Map<string, ExampleItem[]>();
		for (const item of buildExamples()) {
			const list = map.get(item.source) ?? [];
			list.push(item);
			map.set(item.source, list);
		}
		return map;
	};

	return (
		<section class="page">
			<Seo
				title="Examples — solid-ui"
				description="Collected code examples from components, templates, and docs with an interactive workbench."
				path="/examples"
			/>
			<PageHeader
				title="Examples"
				description="Code snippets and previews collected from components, templates, and docs."
			>
				<ViewToggle view={view()} onChange={setView} />
			</PageHeader>

			<Show when={view() === "workbench"}>
				<ExampleWorkbench onClose={() => setView("gallery")} />
			</Show>

			<Show when={view() === "gallery"}>
				<div class="space-y-12">
					<For each={Array.from(groups().entries())}>
						{([source, items]) => (
							<div>
								<h2 class="mb-4 text-xl font-semibold">{source}</h2>
								<div class="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
									<For each={items}>
										{(item) => (
											<div class="break-inside-avoid rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
												<Link
													to={item.to}
													class="mb-2 block text-base font-semibold text-foreground no-underline hover:text-primary"
												>
													{item.title}
												</Link>
												<Show when={item.snippet}>
													{(snippet) => (
														<div class="mt-3">
															<CodeBlock code={snippet()} language="tsx" />
														</div>
													)}
												</Show>
											</div>
										)}
									</For>
								</div>
							</div>
						)}
					</For>
				</div>
			</Show>
		</section>
	);
}
