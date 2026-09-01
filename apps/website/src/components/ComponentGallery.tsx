import { Link } from "@tanstack/solid-router";
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
import { createSignal, For, Show } from "solid-js";
import { categories } from "../categories";
import { ComponentCard } from "./ComponentCard";

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
				class="inline-flex h-8 items-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
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
		<section class="py-12 text-center md:py-16">
			<h2 class="text-3xl font-extrabold tracking-tight md:text-5xl mb-4">A comprehensive SolidJS UI library</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground mb-6">
				solid-ui ships with {props.totalCount} components, real form/table/image/transition packages, and the docs
				website you are viewing now.
			</p>
			<div class="flex flex-wrap items-center justify-center gap-3">
				<Link
					to="/components"
					class="inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
				>
					Browse components
				</Link>
				<Link
					to="/docs/intro"
					class="inline-flex h-10 items-center rounded-md border border-border bg-background px-5 text-sm font-medium hover:bg-muted"
				>
					Read docs
				</Link>
			</div>
		</section>
	);
}

const CATEGORY_OPTIONS = ["All", "Primitives", "Components", "Templates"];

function GalleryToolbar(props: {
	globalFilter: string;
	onFilterChange: (value: string) => void;
	categoryFilter: string;
	onCategoryFilterChange: (value: string) => void;
	groupBy: boolean;
	onGroupByChange: (enabled: boolean) => void;
	view: "grid" | "list";
	onViewChange: (view: "grid" | "list") => void;
}) {
	return (
		<div class="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
				<input
					type="search"
					class="flex h-9 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					placeholder="Search components…"
					value={props.globalFilter}
					onInput={(e) => props.onFilterChange(e.currentTarget.value)}
					aria-label="Search components"
					autocomplete="off"
				/>
				<select
					class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-40"
					value={props.categoryFilter}
					onChange={(e) => props.onCategoryFilterChange(e.currentTarget.value)}
					aria-label="Filter by category"
				>
					<For each={CATEGORY_OPTIONS}>{(opt) => <option value={opt === "All" ? "" : opt}>{opt}</option>}</For>
				</select>
				<select
					class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-44"
					value={props.groupBy ? "category" : "none"}
					onChange={(e) => props.onGroupByChange(e.currentTarget.value === "category")}
					aria-label="Group by"
				>
					<option value="none">No grouping</option>
					<option value="category">Group by category</option>
				</select>
			</div>
			<div class="flex rounded-lg border border-border bg-background p-1">
				<button
					type="button"
					class="rounded-md px-3 py-1.5 text-sm"
					classList={{ "bg-primary text-primary-foreground": props.view === "grid" }}
					onClick={() => props.onViewChange("grid")}
					aria-pressed={props.view === "grid"}
				>
					Grid
				</button>
				<button
					type="button"
					class="rounded-md px-3 py-1.5 text-sm"
					classList={{ "bg-primary text-primary-foreground": props.view === "list" }}
					onClick={() => props.onViewChange("list")}
					aria-pressed={props.view === "list"}
				>
					List
				</button>
			</div>
		</div>
	);
}

function GalleryListView(props: { table: ReturnType<typeof createTable<typeof features, ComponentItem>> }) {
	return (
		<div class="overflow-x-auto rounded-xl border border-border">
			<table class="w-full text-sm">
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

function GalleryGridView(props: { table: ReturnType<typeof createTable<typeof features, ComponentItem>> }) {
	return (
		<For each={props.table.getRowModel().rows}>
			{(row) => (
				<Show when={!row.getParentRow()}>
					<Show when={row.getIsGrouped()} fallback={<ComponentCard name={row.original.name} />}>
						<div class="col-span-full w-full">
							<button
								type="button"
								class="my-3 flex w-full items-center gap-2 text-left text-lg font-semibold"
								onClick={row.getToggleExpandedHandler()}
							>
								<span>{row.getIsExpanded() ? "−" : "+"}</span>
								<span>{row.getValue("categoryLabel") as string}</span>
								<span class="text-sm text-muted-foreground">({row.subRows.length})</span>
							</button>
							<Show when={row.getIsExpanded()}>
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
									<For each={row.subRows}>{(sub) => <ComponentCard name={sub.original.name} />}</For>
								</div>
							</Show>
						</div>
					</Show>
				</Show>
			)}
		</For>
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

function GalleryResults(props: {
	table: ReturnType<typeof createTable<typeof features, ComponentItem>>;
	view: "grid" | "list";
}) {
	return (
		<Show
			when={props.table.getRowModel().rows.length > 0}
			fallback={
				<div class="rounded-xl border border-border bg-surface py-12 text-center text-muted-foreground">
					<p>No components match your search.</p>
				</div>
			}
		>
			<Show when={props.view === "list"}>
				<GalleryListView table={props.table} />
			</Show>

			<Show when={props.view === "grid"}>
				<GalleryGridView table={props.table} />
			</Show>
		</Show>
	);
}

export function ComponentGallery(props: { withHero?: boolean }) {
	const [data] = createSignal(allItems);
	const [view, setView] = createSignal<"grid" | "list">("grid");
	const [groupBy, setGroupBy] = createSignal(false);
	const [globalFilter, setGlobalFilter] = createSignal("");
	const [categoryFilter, setCategoryFilter] = createSignal("");

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

	const updateFilter = (value: string) => {
		setGlobalFilter(value);
		table.setGlobalFilter(value);
	};

	const updateCategoryFilter = (value: string) => {
		setCategoryFilter(value);
		table.setColumnFilters(value ? [{ id: "categoryLabel", value }] : []);
	};

	const toggleGroupBy = (enabled: boolean) => {
		setGroupBy(enabled);
		table.setGrouping(enabled ? ["categoryLabel"] : []);
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
				view={view()}
				onViewChange={setView}
			/>

			<GalleryResults table={table} view={view()} />
		</section>
	);
}
