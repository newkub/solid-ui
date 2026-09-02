import { type ColumnDef, createTable, type RowData } from "@tanstack/solid-table";
import { createEffect, createSignal } from "solid-js";
import { resourceFeatures } from "../components/ResourceBrowser";
import { useDebounce } from "./useDebounce";

export interface UseResourceTableOptions<TData extends RowData> {
	data: TData[];
	columns: ColumnDef<typeof resourceFeatures, TData, unknown>[];
	groupByColumn?: string;
	debounceMs?: number;
}

export function useResourceTable<TData extends RowData>(options: UseResourceTableOptions<TData>) {
	const [data] = createSignal(options.data);
	const [groupBy, setGroupBy] = createSignal(true);
	const [globalFilter, setGlobalFilter] = createSignal("");
	const [categoryFilter, setCategoryFilter] = createSignal("");
	const debouncedFilter = useDebounce(globalFilter, options.debounceMs ?? 150);

	const table = createTable({
		features: resourceFeatures,
		columns: options.columns,
		get data() {
			return data();
		},
		initialState: {
			grouping: options.groupByColumn ? [options.groupByColumn] : [],
			expanded: true,
		},
	});

	createEffect(() => {
		table.setGlobalFilter(debouncedFilter());
	});

	createEffect(() => {
		table.setGrouping(groupBy() && options.groupByColumn ? [options.groupByColumn] : []);
	});

	return {
		table,
		groupBy,
		setGroupBy,
		globalFilter,
		setGlobalFilter,
		categoryFilter,
		setCategoryFilter,
		debouncedFilter,
	};
}
