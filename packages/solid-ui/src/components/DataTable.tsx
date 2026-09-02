import {
	createPaginatedRowModel,
	createSortedRowModel,
	createTable,
	FlexRender,
	rowPaginationFeature,
	rowSortingFeature,
	sortFn_alphanumeric,
	tableFeatures,
} from "@tanstack/solid-table";
import { For, type JSX, mergeProps, Show, splitProps } from "solid-js";
import { Button } from "./Button";

export interface DataTableProps {
	data: unknown[];
	columns: unknown[];
	pageSize?: number;
	sortable?: boolean;
	paginate?: boolean;
	class?: string;
	children?: JSX.Element;
}

const features = tableFeatures({
	rowSortingFeature,
	rowPaginationFeature,
	sortedRowModel: createSortedRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortFns: { alphanumeric: sortFn_alphanumeric },
});

function sortIcon(state: "asc" | "desc" | false) {
	if (state === "asc") return "↑";
	if (state === "desc") return "↓";
	return "⇅";
}

export function DataTable(props: DataTableProps) {
	const merged = mergeProps({ sortable: true, paginate: true, pageSize: 10 }, props);
	const [local, rest] = splitProps(merged, [
		"class",
		"data",
		"columns",
		"pageSize",
		"sortable",
		"paginate",
		"children",
	]);

	const table = createTable({
		features,
		columns: () => local.columns as any,
		get data() {
			return local.data as any;
		},
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: local.pageSize,
			},
		},
	} as any);

	const anyTable = table as any;

	const className = () =>
		["w-full rounded-xl border border-border bg-card text-card-foreground shadow-sm", local.class ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<div class={className()} {...rest}>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead class="bg-muted">
						<For each={anyTable.getHeaderGroups()}>
							{(headerGroup) => (
								<tr>
									<For each={headerGroup.headers}>
										{(header) => (
											<th class="px-4 py-3 text-left">
												<button
													type="button"
													disabled={!local.sortable}
													class="w-full bg-transparent p-0 text-left font-semibold text-foreground"
													classList={{
														"cursor-pointer select-none hover:text-primary": local.sortable,
													}}
													onClick={local.sortable ? header.column.getToggleSortingHandler() : undefined}
													aria-label={
														local.sortable ? `Sort by ${String(header.column.columnDef.header ?? "column")}` : undefined
													}
												>
													<span class="inline-flex items-center gap-1">
														<FlexRender header={header as any} />
														<Show when={local.sortable && header.column.getIsSorted()}>
															<span class="text-muted-foreground">
																{sortIcon(header.column.getIsSorted() as "asc" | "desc" | false)}
															</span>
														</Show>
													</span>
												</button>
											</th>
										)}
									</For>
								</tr>
							)}
						</For>
					</thead>
					<tbody class="divide-y divide-border">
						<Show
							when={anyTable.getRowModel().rows.length > 0}
							fallback={
								<tr>
									<td class="px-4 py-3 text-center text-muted-foreground" colSpan={anyTable.getAllColumns().length}>
										No data
									</td>
								</tr>
							}
						>
							<For each={anyTable.getRowModel().rows}>
								{(row) => (
									<tr class="hover:bg-muted/50">
										<For each={row.getVisibleCells()}>
											{(cell) => (
												<td class="px-4 py-3 align-top">
													<FlexRender cell={cell as any} />
												</td>
											)}
										</For>
									</tr>
								)}
							</For>
						</Show>
					</tbody>
				</table>
			</div>
			<Show when={local.paginate && anyTable.getPageCount() > 1}>
				<div class="flex items-center justify-between border-t border-border px-4 py-3">
					<span class="text-xs text-muted-foreground">
						Page {anyTable.getState().pagination.pageIndex + 1} of {anyTable.getPageCount()}
					</span>
					<div class="flex items-center gap-2">
						<Button
							variant="secondary"
							size="sm"
							onClick={() => anyTable.previousPage()}
							disabled={!anyTable.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="secondary"
							size="sm"
							onClick={() => anyTable.nextPage()}
							disabled={!anyTable.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</Show>
			{local.children}
		</div>
	);
}
