import { Link, useLocation, useNavigate, useSearch } from "@tanstack/solid-router";
import {
	columnFilteringFeature,
	columnGroupingFeature,
	columnVisibilityFeature,
	createColumnHelper,
	createExpandedRowModel,
	createFilteredRowModel,
	createGroupedRowModel,
	createSortedRowModel,
	createTable,
	FlexRender,
	filterFn_includesString,
	globalFilteringFeature,
	rowExpandingFeature,
	rowSortingFeature,
	sortFn_alphanumeric,
	tableFeatures,
} from "@tanstack/solid-table";
import { registry } from "@wrikka/solid-ui";
import { createEffect, createSignal, For, Show } from "solid-js";
import { categories } from "../categories";
import { useDebounce } from "../hooks/useDebounce";

interface ComponentItem {
	name: string;
	tag: string;
	description: string;
	category: string;
	categoryLabel: string;
}

const allItems: ComponentItem[] = registry.map((r) => {
	const group = categories.find((c) => c.items.includes(r.name));
	return {
		...r,
		category: group?.id ?? "other",
		categoryLabel: group?.label ?? "Other",
	};
});

const features = tableFeatures({
	columnVisibilityFeature,
	columnFilteringFeature,
	globalFilteringFeature,
	filteredRowModel: createFilteredRowModel(),
	filterFns: { includesString: filterFn_includesString },
	rowSortingFeature,
	sortedRowModel: createSortedRowModel(),
	sortFns: { alphanumeric: sortFn_alphanumeric },
	columnGroupingFeature,
	groupedRowModel: createGroupedRowModel(),
	rowExpandingFeature,
	expandedRowModel: createExpandedRowModel(),
});

const columnHelper = createColumnHelper<typeof features, ComponentItem>();

const columns = columnHelper.columns([
	columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => <span class="font-medium">{info.getValue()}</span>,
		enableSorting: true,
	}),
	columnHelper.accessor("tag", {
		header: "Tag",
		cell: (info) => `<${info.getValue()}>`,
	}),
	columnHelper.accessor("categoryLabel", {
		header: "Category",
		cell: (info) => (
			<span class="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-xs">{info.getValue()}</span>
		),
		enableSorting: true,
		enableGrouping: true,
		enableColumnFilter: true,
		filterFn: "includesString",
	}),
	columnHelper.accessor("description", {
		header: "Description",
		cell: (info) => info.getValue(),
		enableColumnFilter: true,
		filterFn: "includesString",
	}),
	columnHelper.display({
		id: "actions",
		header: "",
		cell: ({ row }) => (
			<Link
				to={`/docs/${row.original.category}/${row.original.name.toLowerCase()}`}
				class="inline-flex h-8 items-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground no-underline shadow-sm transition-all hover:bg-secondary-hover hover:shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				View
			</Link>
		),
	}),
]);

function sortIcon(state: "asc" | "desc" | false) {
	if (state === "asc") return "↑";
	if (state === "desc") return "↓";
	return "⇅";
}

function HeroSection(props: { totalCount: number }) {
	return (
		<section class="relative overflow-hidden rounded-2xl border border-border bg-surface px-4 py-12 text-center sm:px-6 sm:py-16">
			<div class="pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true">
				<div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
				<div class="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
			</div>
			<div class="mx-auto max-w-3xl">
				<div class="mb-4 inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
					<span class="mr-1.5 h-2 w-2 rounded-full bg-primary" />
					{props.totalCount} components available
				</div>
				<h2 class="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
					A comprehensive <span class="text-primary">SolidJS</span> UI library
				</h2>
				<p class="mx-auto mb-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
					solid-ui ships with {props.totalCount} components, real form/table/image/transition packages, and the docs
					website you are viewing now.
				</p>
				<div class="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
					<Link
						to="/components"
						class="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm no-underline transition-all hover:bg-primary-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-auto"
					>
						Browse components
					</Link>
					<Link
						to="/docs/intro"
						class="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-medium no-underline transition-all hover:bg-muted hover:border-border-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-auto"
					>
						Read docs
					</Link>
				</div>
			</div>
		</section>
	);
}

const CATEGORY_OPTIONS = [
	{ id: "", label: "All" },
	{ id: "primitives", label: "Primitives" },
	{ id: "components", label: "Components" },
	{ id: "templates", label: "Templates" },
];

const categoryById = Object.fromEntries(categories.map((c) => [c.id, c.label]));

function GalleryToolbar(props: {
	globalFilter: string;
	onFilterChange: (value: string) => void;
	categoryFilter: string;
	onCategoryFilterChange: (value: string) => void;
	groupBy: boolean;
	onGroupByChange: (enabled: boolean) => void;
}) {
	return (
		<div class="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
				<input
					type="search"
					class="flex h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					placeholder="Search components…"
					value={props.globalFilter}
					onInput={(e) => props.onFilterChange(e.currentTarget.value)}
					aria-label="Search components"
					autocomplete="off"
				/>
				<select
					class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-40"
					value={props.categoryFilter}
					onChange={(e) => props.onCategoryFilterChange(e.currentTarget.value)}
					aria-label="Filter by category"
				>
					<For each={CATEGORY_OPTIONS}>{(opt) => <option value={opt.id}>{opt.label}</option>}</For>
				</select>
				<select
					class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-44"
					value={props.groupBy ? "category" : "none"}
					onChange={(e) => props.onGroupByChange(e.currentTarget.value === "category")}
					aria-label="Group by"
				>
					<option value="none">No grouping</option>
					<option value="category">Group by category</option>
				</select>
			</div>
		</div>
	);
}

function GalleryListView(props: { table: ReturnType<typeof createTable<typeof features, ComponentItem>> }) {
	return (
		<div class="overflow-x-auto rounded-xl border border-border">
			<table class="w-full min-w-[640px] text-sm">
				<thead class="bg-muted">
					<For each={props.table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => (
										<th
											class="px-4 py-3 text-left font-semibold text-foreground cursor-pointer select-none hover:text-primary"
											onClick={header.column.getToggleSortingHandler()}
										>
											<span class="inline-flex items-center gap-1">
												<FlexRender header={header} />
												<span class="text-muted-foreground">{sortIcon(header.column.getIsSorted())}</span>
											</span>
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody class="divide-y divide-border">
					<For each={props.table.getRowModel().rows}>
						{(row) => (
							<Show
								when={row.getIsGrouped()}
								fallback={
									<tr class="hover:bg-muted/50">
										<For each={row.getVisibleCells()}>
											{(cell) => (
												<td class="px-4 py-3 align-top">
													<FlexRender cell={cell} />
												</td>
											)}
										</For>
									</tr>
								}
							>
								<tr class="bg-muted/30">
									<td colSpan={row.getAllCells().length} class="px-4 py-2">
										<button
											type="button"
											class="flex items-center gap-2 font-semibold text-sm"
											onClick={row.getToggleExpandedHandler()}
										>
											<span>{row.getIsExpanded() ? "−" : "+"}</span>
											<span>{row.getValue("categoryLabel") as string}</span>
											<span class="text-muted-foreground text-xs">({row.subRows.length})</span>
										</button>
									</td>
								</tr>
							</Show>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
}

function GalleryHeading(props: { table: ReturnType<typeof createTable<typeof features, ComponentItem>> }) {
	const count = () => props.table.getPreFilteredRowModel().rows.length;
	return (
		<>
			<div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-2xl font-bold tracking-tight">Components ({count()})</h2>
			</div>
			<p class="mb-6 text-muted-foreground">
				Each component is importable from <code class="rounded bg-muted px-1.5 py-0.5 text-sm">@wrikka/solid-ui</code>.
			</p>
		</>
	);
}

function EmptyState(props: { onClear: () => void }) {
	return (
		<div class="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-4 py-16 text-center">
			<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
				<svg
					class="h-6 w-6 text-muted-foreground"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					role="img"
					aria-label="Search icon"
				>
					<title>Search icon</title>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
			</div>
			<h3 class="mb-1 text-base font-semibold text-foreground">No components found</h3>
			<p class="mb-4 max-w-sm text-sm text-muted-foreground">
				Try adjusting your search or filters to find what you are looking for.
			</p>
			<button
				type="button"
				onClick={props.onClear}
				class="inline-flex h-9 items-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				Clear filters
			</button>
		</div>
	);
}

function GalleryResults(props: {
	table: ReturnType<typeof createTable<typeof features, ComponentItem>>;
	onClear: () => void;
}) {
	return (
		<Show when={props.table.getRowModel().rows.length > 0} fallback={<EmptyState onClear={props.onClear} />}>
			<GalleryListView table={props.table} />
		</Show>
	);
}

export function ComponentGallery(props: { withHero?: boolean }) {
	const navigate = useNavigate();
	const location = useLocation();
	const search = useSearch({ strict: false });

	const [data] = createSignal(allItems);
	const [groupBy, setGroupBy] = createSignal(true);
	const [globalFilter, setGlobalFilter] = createSignal("");
	const [categoryFilter, setCategoryFilter] = createSignal(search().category ?? "");
	const debouncedFilter = useDebounce(globalFilter, 150);

	const table = createTable({
		features,
		columns,
		get data() {
			return data();
		},
		initialState: {
			grouping: ["categoryLabel"],
			expanded: true,
		},
	});

	function applyCategoryFilter(id: string) {
		const label = categoryById[id];
		table.setColumnFilters(id && label ? [{ id: "categoryLabel", value: label }] : []);
	}

	createEffect(() => {
		table.setGlobalFilter(debouncedFilter());
	});

	createEffect(() => {
		const id = search().category ?? "";
		setCategoryFilter(id);
		applyCategoryFilter(id);
	});

	const updateFilter = (value: string) => {
		setGlobalFilter(value);
	};

	const updateCategoryFilter = (id: string) => {
		setCategoryFilter(id);
		applyCategoryFilter(id);
		if (location().pathname === "/components") {
			navigate({ to: "/components", search: id ? { category: id } : {} });
		}
	};

	const toggleGroupBy = (enabled: boolean) => {
		setGroupBy(enabled);
		table.setGrouping(enabled ? ["categoryLabel"] : []);
	};

	const clearFilters = () => {
		setGlobalFilter("");
		setCategoryFilter("");
		applyCategoryFilter("");
		table.setGrouping(groupBy() ? ["categoryLabel"] : []);
		navigate({ to: location().pathname, search: {} });
	};

	return (
		<section class="page">
			<Show when={props.withHero}>
				<HeroSection totalCount={registry.length} />
			</Show>

			<GalleryHeading table={table} />

			<GalleryToolbar
				globalFilter={globalFilter()}
				onFilterChange={updateFilter}
				categoryFilter={categoryFilter()}
				onCategoryFilterChange={updateCategoryFilter}
				groupBy={groupBy()}
				onGroupByChange={toggleGroupBy}
			/>

			<GalleryResults table={table} onClear={clearFilters} />
		</section>
	);
}
