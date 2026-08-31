import { createSignal } from "solid-js";

function getInitialTheme(): "light" | "dark" {
	if (typeof localStorage !== "undefined") {
		const stored = localStorage.getItem("solid-ui-theme");
		if (stored === "dark" || stored === "light") return stored;
	}

	if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}

	return "light";
}

const initial = getInitialTheme();

export const [theme, setTheme] = createSignal<"light" | "dark">(initial);

export function toggleTheme() {
	setTheme((t) => (t === "light" ? "dark" : "light"));
}

export function applyTheme(value: "light" | "dark") {
	if (typeof document !== "undefined") {
		document.documentElement.setAttribute("data-theme", value);
	}
}

export function initTheme() {
	applyTheme(initial);

	if (typeof window !== "undefined") {
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
			const stored = localStorage.getItem("solid-ui-theme");
			if (!stored) {
				setTheme(e.matches ? "dark" : "light");
			}
		});
	}
}
