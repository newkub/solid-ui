import { createEffect, createSignal } from "solid-js";

export function ThemeToggle() {
	const stored = typeof localStorage !== "undefined" ? localStorage.getItem("solid-ui-theme") : null;
	const [theme, setTheme] = createSignal<"light" | "dark">(stored === "dark" ? "dark" : "light");

	createEffect(() => {
		document.documentElement.setAttribute("data-theme", theme());
		localStorage.setItem("solid-ui-theme", theme());
	});

	const label = () => (theme() === "light" ? "Switch to dark theme" : "Switch to light theme");
	const icon = () => (theme() === "light" ? "🌙" : "☀️");

	return (
		<button
			type="button"
			class="theme-toggle"
			aria-label={label()}
			onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
		>
			<span aria-hidden="true">{icon()}</span>
		</button>
	);
}
