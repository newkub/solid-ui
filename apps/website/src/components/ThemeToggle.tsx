import { createEffect } from "solid-js";
import { setTheme, theme } from "../lib/theme";

export function ThemeToggle() {
	const label = () => (theme() === "light" ? "Switch to dark theme" : "Switch to light theme");
	const icon = () => (theme() === "light" ? "🌙" : "☀️");

	createEffect(() => {
		document.documentElement.setAttribute("data-theme", theme());
		localStorage.setItem("solid-ui-theme", theme());
	});

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
