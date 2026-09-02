import { Link, useLocation, useNavigate, useSearch } from "@tanstack/solid-router";
import { createColumnHelper, createTable } from "@tanstack/solid-table";
import { registry } from "@wrikka/solid-ui/registry";
import { createEffect, createSignal, Show } from "solid-js";
import { categories } from "../categories";
import { useDebounce } from "../hooks/useDebounce";
import { ResourceListView, ResourceToolbar, resourceFeatures } from "./ResourceBrowser";

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

const columnHelper = createColumnHelper<typeof resourceFeatures, ComponentItem>();

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

function GalleryHeading(props: { count: number }) {
	return (
		<>
			<div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-2xl font-bold tracking-tight">Components ({props.count})</h2>
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
		features: resourceFeatures,
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

			<GalleryHeading count={table.getPreFilteredRowModel().rows.length} />

			<ResourceToolbar
				globalFilter={globalFilter()}
				onFilterChange={updateFilter}
				categoryFilter={categoryFilter()}
				onCategoryFilterChange={updateCategoryFilter}
				groupBy={groupBy()}
				onGroupByChange={toggleGroupBy}
				categoryOptions={CATEGORY_OPTIONS}
				searchPlaceholder="Search components…"
				searchLabel="Search components"
				searchId="components-search"
			/>

			<Show when={table.getRowModel().rows.length > 0} fallback={<EmptyState onClear={clearFilters} />}>
				<ResourceListView table={table} tableClass="min-w-[640px]" />
			</Show>
		</section>
	);
}
