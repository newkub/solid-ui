import { For, Show } from "solid-js";
import { useSearch } from "../hooks/useSearch";
import { EmptyState } from "./EmptyState";
import { LayoutCard, layouts } from "./LayoutPreview";
import { PageHeader } from "./PageHeader";
import { SearchInput } from "./SearchInput";
import { Seo } from "./Seo";

function matchesQuery(item: (typeof layouts)[number], query: string) {
	const haystack = `${item.name} ${item.description}`.toLowerCase();
	return haystack.includes(query.toLowerCase());
}

export function LayoutsPage() {
	const { query, setQuery, debouncedQuery, filtered } = useSearch(
		() => layouts,
		(item, q) => matchesQuery(item, q),
	);

	return (
		<section class="page">
			<Seo
				title="Layouts — solid-ui"
				description="Layout components for building responsive, structured pages with solid-ui."
				path="/layouts"
			/>
			<PageHeader
				title="Layouts"
				description="Structural components to compose responsive, accessible layouts. Each card shows a visual preview of the layout pattern."
				count={filtered().length}
			>
				<SearchInput
					id="layouts-search"
					placeholder="Search layouts…"
					value={query()}
					onInput={setQuery}
					label="Search layouts"
					class="max-w-sm"
				/>
			</PageHeader>

			<Show when={filtered().length > 0} fallback={<EmptyState query={debouncedQuery()} label="layouts" />}>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<For each={filtered()}>{(item) => <LayoutCard item={item} />}</For>
				</div>
			</Show>
		</section>
	);
}
