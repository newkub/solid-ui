import {
	type Cell,
	columnFilteringFeature,
	columnGroupingFeature,
	columnVisibilityFeature,
	createExpandedRowModel,
	createFilteredRowModel,
	createGroupedRowModel,
	createSortedRowModel,
	type createTable,
	FlexRender,
	filterFn_includesString,
	globalFilteringFeature,
	type RowData,
	rowExpandingFeature,
	rowSortingFeature,
	sortFn_alphanumeric,
	tableFeatures,
} from "@tanstack/solid-table";
import { For, Show } from "solid-js";
import { SearchInput } from "./SearchInput";

export const resourceFeatures = tableFeatures({
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

export type ResourceTable<TData extends RowData> = ReturnType<typeof createTable<typeof resourceFeatures, TData>>;

export function sortIcon(state: "asc" | "desc" | false) {
	if (state === "asc") return "↑";
	if (state === "desc") return "↓";
	return "⇅";
}

export interface ResourceListViewProps<TData extends RowData> {
	table: ResourceTable<TData>;
	tableClass?: string;
	cellClass?: (cell: Cell<typeof resourceFeatures, TData, unknown>) => string;
}

export function ResourceListView<TData extends RowData>(props: ResourceListViewProps<TData>) {
	return (
		<div class="overflow-x-auto rounded-xl border border-border">
			<table class={`w-full text-sm ${props.tableClass ?? ""}`}>
				<thead class="bg-muted">
					<For each={props.table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => (
										<th
											class="cursor-pointer select-none px-4 py-3 text-left font-semibold text-foreground hover:text-primary"
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
												<td class={`px-4 py-3 align-top ${props.cellClass?.(cell) ?? ""}`}>
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
											class="flex items-center gap-2 text-sm font-semibold"
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

export interface ResourceToolbarOption {
	id: string;
	label: string;
}

export interface ResourceToolbarProps {
	globalFilter: string;
	onFilterChange: (value: string) => void;
	categoryFilter: string;
	onCategoryFilterChange: (value: string) => void;
	groupBy: boolean;
	onGroupByChange: (enabled: boolean) => void;
	categoryOptions: ResourceToolbarOption[];
	searchPlaceholder: string;
	searchLabel: string;
	searchId?: string;
}

export function ResourceToolbar(props: ResourceToolbarProps) {
	return (
		<div class="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
			<div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
				<SearchInput
					id={props.searchId}
					value={props.globalFilter}
					onInput={props.onFilterChange}
					placeholder={props.searchPlaceholder}
					label={props.searchLabel}
					class="w-full"
				/>
				<select
					class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-40"
					value={props.categoryFilter}
					onChange={(e) => props.onCategoryFilterChange(e.currentTarget.value)}
					aria-label="Filter by category"
				>
					<For each={props.categoryOptions}>{(opt) => <option value={opt.id}>{opt.label}</option>}</For>
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
