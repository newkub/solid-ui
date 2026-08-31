import { createEffect } from "solid-js";
import { applyTheme, theme, toggleTheme } from "../lib/theme";

export function ThemeToggle() {
	const label = () => (theme() === "light" ? "Switch to dark theme" : "Switch to light theme");
	const icon = () => (theme() === "light" ? "🌙" : "☀️");

	createEffect(() => {
		const t = theme();
		applyTheme(t);
		localStorage.setItem("solid-ui-theme", t);
	});

	return (
		<button type="button" class="theme-toggle" aria-label={label()} onClick={() => toggleTheme()}>
			<span aria-hidden="true">{icon()}</span>
		</button>
	);
}
