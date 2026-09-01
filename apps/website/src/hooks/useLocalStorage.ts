import { createEffect, createSignal } from "solid-js";

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = createSignal<T>(initialValue);

	const read = () => {
		if (typeof window === "undefined") return initialValue;
		try {
			const stored = window.localStorage.getItem(key);
			return stored ? (JSON.parse(stored) as T) : initialValue;
		} catch {
			return initialValue;
		}
	};

	createEffect(() => {
		setValue(() => read());
	});

	createEffect(() => {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem(key, JSON.stringify(value()));
		} catch {}
	});

	return [value, setValue] as const;
}
