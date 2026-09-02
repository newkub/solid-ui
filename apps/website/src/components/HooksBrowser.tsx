import { createColumnHelper, createTable } from "@tanstack/solid-table";
import { createEffect, createSignal, Show } from "solid-js";
import { useDebounce } from "../hooks/useDebounce";
import { CodeBlock } from "./CodeBlock";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";
import { ResourceListView, ResourceToolbar, resourceFeatures } from "./ResourceBrowser";
import { Seo } from "./Seo";

export interface HookItem {
	name: string;
	description: string;
	category: "solid-ui" | "website" | "primitive";
	categoryLabel: string;
	source?: string;
	example?: string;
	isExternal: boolean;
}

const CATEGORY_OPTIONS = [
	{ id: "", label: "All" },
	{ id: "solid-ui", label: "solid-ui" },
	{ id: "website", label: "Website" },
	{ id: "primitive", label: "SolidJS primitive" },
];

const descriptions: Record<string, string> = {
	useButton: "Resolve button variant and size classes.",
	useClassName: "Merge base, variant and custom class strings into a single className.",
	useFocusTrap: "Trap focus inside a container for accessible dialogs and modals.",
	useDebounce: "Delay updating a value until the user stops changing it.",
	useLocalStorage: "Persist and sync state with localStorage.",
	useMediaQuery: "Reactively track a CSS media query (e.g., prefers-color-scheme, min-width).",
	useSearch: "Filter an array by a debounced query string.",
	createSignal: "Reactive primitive for a single mutable value.",
	createEffect: "Run side effects when signals used inside change.",
	createMemo: "Derived signal that caches its value and only re-runs when dependencies change.",
	createResource: "Async signal with loading, error, and refetch support.",
	createStore: "Nested reactivity for objects and arrays.",
	useContext: "Read a value from Solid context.",
	onMount: "Run code once when the component mounts.",
	onCleanup: "Register cleanup to run when the component unmounts or scope disposes.",
};

const primitiveExamples: Record<string, string> = {
	createSignal: "const [count, setCount] = createSignal(0);",
	createEffect: "createEffect(() => { track(count()); });",
	createMemo: "const double = createMemo(() => count() * 2);",
	createResource: "const [data] = createResource(fetcher);",
	createStore: "const [state, setState] = createStore({ list: [] });",
	useContext: "const theme = useContext(ThemeContext);",
	onMount: "onMount(() => { /* init */ });",
	onCleanup: "onCleanup(() => clearInterval(id));",
};

const packageHookSources = import.meta.glob("../../../../packages/solid-ui/src/hooks/*.ts", {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

const websiteHookSources = import.meta.glob("../hooks/*.ts", {
	query: "?raw",
	import: "default",
	eager: true,
}) as Record<string, string>;

function extractHookName(path: string): string | undefined {
	const parts = path.split(/[/\\]/);
	const file = parts[parts.length - 1];
	if (!file || file === "index.ts") return undefined;
	return file.replace(/\.ts$/, "");
}

function collectLocalHooks(
	sources: Record<string, string>,
	category: HookItem["category"],
	categoryLabel: string,
): HookItem[] {
	return Object.entries(sources)
		.filter(([path]) => !path.endsWith("/index.ts"))
		.map(([path, source]) => {
			const name = extractHookName(path) ?? path;
			return {
				name,
				description: descriptions[name] ?? "Hook from source.",
				category,
				categoryLabel,
				source,
				isExternal: false,
			};
		});
}

function buildAllItems(): HookItem[] {
	const locals: HookItem[] = [
		...collectLocalHooks(packageHookSources, "solid-ui", "solid-ui"),
		...collectLocalHooks(websiteHookSources, "website", "Website"),
	];
	const externals: HookItem[] = Object.entries(primitiveExamples).map(([name, example]) => ({
		name,
		description: descriptions[name] ?? "SolidJS primitive.",
		category: "primitive" as const,
		categoryLabel: "SolidJS primitive",
		example,
		isExternal: true,
	}));
	const all = [...locals, ...externals];
	all.sort((a, b) => a.name.localeCompare(b.name));
	return all;
}

const allItems = buildAllItems();

const columnHelper = createColumnHelper<typeof resourceFeatures, HookItem>();

const columns = columnHelper.columns([
	columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => <span class="font-medium">{info.getValue()}</span>,
		enableSorting: true,
	}),
	columnHelper.accessor("categoryLabel", {
		header: "Category",
		cell: (info) => (
			<span
				class={`inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-xs ${
					info.row.original.isExternal ? "text-amber-600" : ""
				}`}
			>
				{info.getValue()}
			</span>
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
		id: "source",
		header: "Source / Snippet",
		cell: ({ row }) => (
			<div class="min-w-80">
				<Show when={row.original.isExternal}>
					<div class="mb-1 text-xs text-muted-foreground">Example usage</div>
				</Show>
				<CodeBlock code={row.original.source ?? row.original.example ?? ""} language="ts" />
			</div>
		),
	}),
]);

function cellClass(cell: { column: { id: string } }) {
	return cell.column.id === "source" ? "min-w-80" : "";
}

export function HooksBrowser() {
	const [data] = createSignal(allItems);
	const [groupBy, setGroupBy] = createSignal(true);
	const [globalFilter, setGlobalFilter] = createSignal("");
	const [categoryFilter, setCategoryFilter] = createSignal("");
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
		const label = CATEGORY_OPTIONS.find((c) => c.id === id)?.label;
		table.setColumnFilters(id && label ? [{ id: "categoryLabel", value: label }] : []);
	}

	createEffect(() => {
		table.setGlobalFilter(debouncedFilter());
	});

	createEffect(() => {
		applyCategoryFilter(categoryFilter());
	});

	createEffect(() => {
		table.setGrouping(groupBy() ? ["categoryLabel"] : []);
	});

	return (
		<section class="page">
			<Seo
				title="Hooks — solid-ui"
				description="SolidJS hooks and reactivity patterns used across solid-ui."
				path="/hooks"
			/>
			<PageHeader
				title="Hooks"
				description="Reactive primitives and patterns that power solid-ui. Browse source-backed local hooks and SolidJS primitives."
				count={table.getPreFilteredRowModel().rows.length}
			/>
			<ResourceToolbar
				globalFilter={globalFilter()}
				onFilterChange={setGlobalFilter}
				categoryFilter={categoryFilter()}
				onCategoryFilterChange={setCategoryFilter}
				groupBy={groupBy()}
				onGroupByChange={setGroupBy}
				categoryOptions={CATEGORY_OPTIONS}
				searchPlaceholder="Search hooks…"
				searchLabel="Search hooks"
				searchId="hooks-search"
			/>
			<Show
				when={table.getRowModel().rows.length > 0}
				fallback={<EmptyState query={debouncedFilter()} label="hooks" />}
			>
				<ResourceListView table={table} tableClass="min-w-[900px]" cellClass={cellClass} />
			</Show>
		</section>
	);
}
