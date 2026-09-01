import { createEffect, createSignal, onCleanup } from "solid-js";

export function useMediaQuery(query: string) {
	const [matches, setMatches] = createSignal(false);

	createEffect(() => {
		if (typeof window === "undefined") return;
		const mql = window.matchMedia(query);
		setMatches(mql.matches);

		const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
		mql.addEventListener("change", handler);
		onCleanup(() => mql.removeEventListener("change", handler));
	});

	return matches;
}
