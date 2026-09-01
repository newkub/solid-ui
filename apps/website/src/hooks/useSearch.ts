import { createMemo, createSignal } from "solid-js";
import { useDebounce } from "./useDebounce";

export function useSearch<T>(items: () => T[], predicate: (item: T, query: string) => boolean, delay = 200) {
	const [query, setQuery] = createSignal("");
	const debounced = useDebounce(query, delay);

	const filtered = createMemo(() => {
		const q = debounced().toLowerCase();
		if (!q) return items();
		return items().filter((item) => predicate(item, q));
	});

	return {
		query,
		setQuery,
		debouncedQuery: debounced,
		filtered,
	};
}
