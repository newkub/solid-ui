import { createSignal, For, Show } from "solid-js";
import { docs } from "../docs/generated";
import { useSearch } from "../hooks/useSearch";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";
import { SearchInput } from "./SearchInput";
import { Seo } from "./Seo";
import { TemplateCard, type TemplateEntry } from "./TemplateCard";

function templateEntries(): TemplateEntry[] {
	return Object.entries(docs)
		.filter(([, page]) => page.group === "templates")
		.map(([key, page]) => ({
			page,
			slug: key.split("/").pop() ?? "",
		}))
		.sort((a, b) => a.page.order - b.page.order);
}

function matchesQuery(entry: TemplateEntry, query: string) {
	const haystack = `${entry.page.title} ${entry.page.content}`.toLowerCase();
	return haystack.includes(query.toLowerCase());
}

function ViewToggle(props: { view: "grid" | "list"; onChange: (view: "grid" | "list") => void }) {
	return (
		<div class="flex rounded-lg border border-border bg-background p-1">
			<button
				type="button"
				class="rounded-md px-3 py-1.5 text-sm"
				classList={{ "bg-primary text-primary-foreground": props.view === "grid" }}
				onClick={() => props.onChange("grid")}
				aria-pressed={props.view === "grid"}
			>
				Grid
			</button>
			<button
				type="button"
				class="rounded-md px-3 py-1.5 text-sm"
				classList={{ "bg-primary text-primary-foreground": props.view === "list" }}
				onClick={() => props.onChange("list")}
				aria-pressed={props.view === "list"}
			>
				List
			</button>
		</div>
	);
}

export function TemplateGallery() {
	const [view, setView] = createSignal<"grid" | "list">("grid");
	const { query, setQuery, debouncedQuery, filtered } = useSearch(
		() => templateEntries(),
		(entry, q) => matchesQuery(entry, q),
	);

	return (
		<section class="page">
			<Seo
				title="Templates — solid-ui"
				description="Ready-to-use starter templates for form, table, image, and transitions."
				path="/templates"
			/>
			<PageHeader
				title="Templates"
				description="Starter templates that wire solid-ui primitives into real pages. Copy, paste, and adapt."
				count={filtered().length}
				countLabel="templates"
			>
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<SearchInput
						id="templates-search"
						placeholder="Search templates…"
						value={query()}
						onInput={setQuery}
						label="Search templates"
						class="max-w-sm"
					/>
					<ViewToggle view={view()} onChange={setView} />
				</div>
			</PageHeader>

			<Show when={filtered().length > 0} fallback={<EmptyState query={debouncedQuery()} label="templates" />}>
				<Show when={view() === "grid"}>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<For each={filtered()}>{(entry) => <TemplateCard entry={entry} />}</For>
					</div>
				</Show>
				<Show when={view() === "list"}>
					<div class="flex flex-col gap-3">
						<For each={filtered()}>{(entry) => <TemplateCard entry={entry} />}</For>
					</div>
				</Show>
			</Show>
		</section>
	);
}
