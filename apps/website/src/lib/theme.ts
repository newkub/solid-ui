import { createSignal } from "solid-js";

const stored = typeof localStorage !== "undefined" ? localStorage.getItem("solid-ui-theme") : null;
const initial: "light" | "dark" = stored === "dark" ? "dark" : "light";

export const [theme, setTheme] = createSignal<"light" | "dark">(initial);

export function toggleTheme() {
	setTheme((t) => (t === "light" ? "dark" : "light"));
}
