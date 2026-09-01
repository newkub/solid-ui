import { createStore } from "@tanstack/solid-store";
import { colorSchemes } from "./colors";
import { presets } from "./presets";
import { fontStacks, radiusScales, spaceScales } from "./scales";
import type { ThemeColor, ThemeFont, ThemeMode, ThemeRadius, ThemeSpace, ThemeState } from "./types";

const STORAGE_KEY = "solid-ui-theme";

function adjustLightness(hsl: string, delta: number): string {
	const match = hsl.match(/^([\d.]+)\s+([\d.]+)%\s+([\d.]+)%$/);
	if (!match) return hsl;
	const [h, s, l] = match.slice(1).map(Number);
	return `${h} ${s}% ${Math.max(0, Math.min(100, l + delta))}%`;
}

function getSystemMode(): ThemeMode {
	if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		return "dark";
	}
	return "light";
}

function getInitialState(): ThemeState {
	const base: ThemeState = {
		name: "Solid Light",
		mode: getSystemMode(),
		color: "slate",
		font: "sans",
		space: "normal",
		radius: "medium",
	};

	if (typeof localStorage !== "undefined") {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as Partial<ThemeState>;
				return { ...base, ...parsed };
			} catch {
				/* ignore invalid storage */
			}
		}
	}

	return base;
}

export const themeStore = createStore<ThemeState>(getInitialState());

export function applyThemeState(state: ThemeState) {
	if (typeof document === "undefined") return;

	const html = document.documentElement;
	html.setAttribute("data-theme", state.mode);

	const colorSet = colorSchemes[state.color][state.mode];
	const baseForeground = state.mode === "dark" ? "222 47% 11%" : "0 0% 100%";
	const primaryShift = state.mode === "dark" ? -5 : 5;
	const surfaceShift = state.mode === "dark" ? 5 : -5;

	html.style.setProperty("--color-primary", colorSet.primary);
	html.style.setProperty("--color-primary-foreground", colorSet.primaryForeground);
	html.style.setProperty("--color-primary-hover", adjustLightness(colorSet.primary, primaryShift));
	html.style.setProperty("--color-primary-active", adjustLightness(colorSet.primary, primaryShift * 2));
	html.style.setProperty("--color-secondary", colorSet.secondary);
	html.style.setProperty("--color-secondary-foreground", colorSet.secondaryForeground);
	html.style.setProperty("--color-secondary-hover", adjustLightness(colorSet.secondary, surfaceShift));
	html.style.setProperty("--color-secondary-active", adjustLightness(colorSet.secondary, surfaceShift * 2));
	html.style.setProperty("--color-accent", colorSet.accent);
	html.style.setProperty("--color-accent-foreground", colorSet.accentForeground);
	html.style.setProperty("--color-accent-hover", adjustLightness(colorSet.accent, surfaceShift));
	html.style.setProperty("--color-accent-active", adjustLightness(colorSet.accent, surfaceShift * 2));
	html.style.setProperty("--color-ring", colorSet.ring);
	html.style.setProperty("--color-info", colorSet.info);
	html.style.setProperty("--color-info-foreground", baseForeground);
	html.style.setProperty("--color-success", colorSet.success);
	html.style.setProperty("--color-success-foreground", baseForeground);
	html.style.setProperty("--color-warning", colorSet.warning);
	html.style.setProperty("--color-warning-foreground", baseForeground);
	html.style.setProperty("--color-destructive", colorSet.destructive);
	html.style.setProperty("--color-destructive-foreground", baseForeground);
	html.style.setProperty("--color-destructive-hover", adjustLightness(colorSet.destructive, primaryShift));
	html.style.setProperty("--color-destructive-active", adjustLightness(colorSet.destructive, primaryShift * 2));
	html.style.setProperty("--su-font-sans", fontStacks[state.font]);

	const spaces = spaceScales[state.space];
	for (const [key, value] of Object.entries(spaces)) {
		html.style.setProperty(`--su-space-${key}`, value);
	}

	const radius = radiusScales[state.radius];
	html.style.setProperty("--su-radius", radius.DEFAULT);
	html.style.setProperty("--su-radius-sm", radius.sm);
	html.style.setProperty("--su-radius-md", radius.md);
	html.style.setProperty("--su-radius-lg", radius.lg);
	html.style.setProperty("--su-radius-xl", radius.xl);
	html.style.setProperty("--su-radius-full", "9999px");
}

export function applyThemeFromStore() {
	applyThemeState(themeStore.state);
}

export function setThemeName(name: string) {
	const preset = presets.find((p) => p.name === name);
	if (preset) {
		themeStore.setState(() => ({ ...preset.state }));
	} else {
		themeStore.setState((prev) => ({ ...prev, name }));
	}
}

export function setThemeMode(mode: ThemeMode) {
	themeStore.setState((prev) => ({
		...prev,
		mode,
		name: prev.name.startsWith("Solid ") ? `${mode === "dark" ? "Solid Dark" : "Solid Light"}` : prev.name,
	}));
}

export function setThemeColor(color: ThemeColor) {
	themeStore.setState((prev) => ({ ...prev, color, name: "Custom" }));
}

export function setThemeFont(font: ThemeFont) {
	themeStore.setState((prev) => ({ ...prev, font, name: "Custom" }));
}

export function setThemeSpace(space: ThemeSpace) {
	themeStore.setState((prev) => ({ ...prev, space, name: "Custom" }));
}

export function setThemeRadius(radius: ThemeRadius) {
	themeStore.setState((prev) => ({ ...prev, radius, name: "Custom" }));
}

export function initTheme() {
	if (typeof window === "undefined") return;

	applyThemeFromStore();

	themeStore.subscribe((state) => {
		applyThemeState(state);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch {
			/* ignore */
		}
	});

	const mq = window.matchMedia("(prefers-color-scheme: dark)");
	mq.addEventListener("change", (e) => {
		const current = themeStore.state;
		if (current.name.startsWith("Solid ") && !localStorage.getItem(STORAGE_KEY)) {
			setThemeMode(e.matches ? "dark" : "light");
		}
	});
}

// Backwards-compatible helpers for simple light/dark toggling
export function toggleThemeMode() {
	themeStore.setState((prev) => ({ ...prev, mode: prev.mode === "light" ? "dark" : "light" }));
}
