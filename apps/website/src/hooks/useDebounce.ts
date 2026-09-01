import { createEffect, createMemo, createSignal } from "solid-js";

export function useDebounce<T>(value: () => T, delay = 300) {
	const [debounced, setDebounced] = createSignal(value());

	createEffect(() => {
		const v = value();
		const timer = setTimeout(() => setDebounced(() => v), delay);
		return () => clearTimeout(timer);
	});

	return createMemo(() => debounced());
}
