import { createStore } from "@tanstack/solid-store";

export type ThemeMode = "light" | "dark";

export type ThemeColor =
	| "slate"
	| "blue"
	| "indigo"
	| "violet"
	| "rose"
	| "pink"
	| "red"
	| "orange"
	| "amber"
	| "yellow"
	| "green"
	| "teal"
	| "cyan";

export type ThemeFont = "sans" | "serif" | "mono";
export type ThemeSpace = "compact" | "normal" | "spacious";
export type ThemeRadius = "none" | "small" | "medium" | "large";

export interface ThemeState {
	name: string;
	mode: ThemeMode;
	color: ThemeColor;
	font: ThemeFont;
	space: ThemeSpace;
	radius: ThemeRadius;
}

export interface ThemePreset {
	name: string;
	label: string;
	state: ThemeState;
}

const STORAGE_KEY = "solid-ui-theme";

function hsl(h: number, s: number, l: number): string {
	return `${h} ${s}% ${l}%`;
}

type ColorSet = {
	primary: string;
	primaryForeground: string;
	secondary: string;
	secondaryForeground: string;
	accent: string;
	accentForeground: string;
	ring: string;
	info: string;
	success: string;
	warning: string;
	destructive: string;
};

type ColorScheme = {
	light: ColorSet;
	dark: ColorSet;
};

export const colorSchemes: Record<ThemeColor, ColorScheme> = {
	slate: {
		light: {
			primary: hsl(215, 25, 27),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(215, 25, 95),
			secondaryForeground: hsl(215, 25, 10),
			accent: hsl(215, 25, 90),
			accentForeground: hsl(215, 35, 25),
			ring: hsl(215, 25, 27),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(215, 30, 80),
			primaryForeground: hsl(215, 30, 10),
			secondary: hsl(215, 30, 20),
			secondaryForeground: hsl(215, 30, 95),
			accent: hsl(215, 30, 20),
			accentForeground: hsl(215, 40, 90),
			ring: hsl(215, 60, 75),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	blue: {
		light: {
			primary: hsl(221, 83, 53),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(221, 70, 95),
			secondaryForeground: hsl(221, 83, 20),
			accent: hsl(221, 83, 90),
			accentForeground: hsl(221, 83, 25),
			ring: hsl(221, 83, 53),
			info: hsl(221, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(221, 90, 63),
			primaryForeground: hsl(221, 90, 10),
			secondary: hsl(221, 40, 20),
			secondaryForeground: hsl(221, 90, 95),
			accent: hsl(221, 60, 20),
			accentForeground: hsl(221, 90, 90),
			ring: hsl(221, 90, 63),
			info: hsl(221, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	indigo: {
		light: {
			primary: hsl(243, 75, 59),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(243, 70, 95),
			secondaryForeground: hsl(243, 75, 20),
			accent: hsl(243, 75, 90),
			accentForeground: hsl(243, 80, 25),
			ring: hsl(243, 75, 59),
			info: hsl(243, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(243, 90, 70),
			primaryForeground: hsl(243, 90, 10),
			secondary: hsl(243, 40, 20),
			secondaryForeground: hsl(243, 90, 95),
			accent: hsl(243, 60, 20),
			accentForeground: hsl(243, 90, 90),
			ring: hsl(243, 90, 70),
			info: hsl(243, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	violet: {
		light: {
			primary: hsl(258, 90, 66),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(258, 70, 95),
			secondaryForeground: hsl(258, 90, 20),
			accent: hsl(258, 90, 90),
			accentForeground: hsl(258, 90, 25),
			ring: hsl(258, 90, 66),
			info: hsl(258, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(258, 95, 75),
			primaryForeground: hsl(258, 95, 10),
			secondary: hsl(258, 40, 20),
			secondaryForeground: hsl(258, 95, 95),
			accent: hsl(258, 60, 20),
			accentForeground: hsl(258, 95, 90),
			ring: hsl(258, 95, 75),
			info: hsl(258, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	rose: {
		light: {
			primary: hsl(340, 82, 52),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(340, 70, 95),
			secondaryForeground: hsl(340, 82, 20),
			accent: hsl(340, 82, 90),
			accentForeground: hsl(340, 82, 25),
			ring: hsl(340, 82, 52),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(340, 95, 70),
			primaryForeground: hsl(340, 95, 10),
			secondary: hsl(340, 40, 20),
			secondaryForeground: hsl(340, 95, 95),
			accent: hsl(340, 60, 20),
			accentForeground: hsl(340, 95, 90),
			ring: hsl(340, 95, 70),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	pink: {
		light: {
			primary: hsl(330, 81, 60),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(330, 70, 95),
			secondaryForeground: hsl(330, 81, 20),
			accent: hsl(330, 81, 90),
			accentForeground: hsl(330, 81, 25),
			ring: hsl(330, 81, 60),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(330, 95, 75),
			primaryForeground: hsl(330, 95, 10),
			secondary: hsl(330, 40, 20),
			secondaryForeground: hsl(330, 95, 95),
			accent: hsl(330, 60, 20),
			accentForeground: hsl(330, 95, 90),
			ring: hsl(330, 95, 75),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	red: {
		light: {
			primary: hsl(0, 84, 60),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(0, 70, 95),
			secondaryForeground: hsl(0, 84, 20),
			accent: hsl(0, 84, 90),
			accentForeground: hsl(0, 84, 25),
			ring: hsl(0, 84, 60),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(0, 95, 70),
			primaryForeground: hsl(0, 95, 10),
			secondary: hsl(0, 40, 20),
			secondaryForeground: hsl(0, 95, 95),
			accent: hsl(0, 60, 20),
			accentForeground: hsl(0, 95, 90),
			ring: hsl(0, 95, 70),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 95, 70),
		},
	},
	orange: {
		light: {
			primary: hsl(24, 95, 53),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(24, 80, 95),
			secondaryForeground: hsl(24, 95, 20),
			accent: hsl(24, 95, 90),
			accentForeground: hsl(24, 95, 25),
			ring: hsl(24, 95, 53),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(24, 100, 60),
			primaryForeground: hsl(24, 100, 10),
			secondary: hsl(24, 50, 20),
			secondaryForeground: hsl(24, 100, 95),
			accent: hsl(24, 70, 20),
			accentForeground: hsl(24, 100, 90),
			ring: hsl(24, 100, 60),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	amber: {
		light: {
			primary: hsl(38, 92, 50),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(38, 80, 95),
			secondaryForeground: hsl(38, 92, 20),
			accent: hsl(38, 92, 90),
			accentForeground: hsl(38, 92, 25),
			ring: hsl(38, 92, 50),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 92, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(38, 100, 60),
			primaryForeground: hsl(38, 100, 10),
			secondary: hsl(38, 50, 20),
			secondaryForeground: hsl(38, 100, 95),
			accent: hsl(38, 70, 20),
			accentForeground: hsl(38, 100, 90),
			ring: hsl(38, 100, 60),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 100, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	yellow: {
		light: {
			primary: hsl(48, 96, 53),
			primaryForeground: hsl(0, 0, 0),
			secondary: hsl(48, 80, 95),
			secondaryForeground: hsl(48, 96, 20),
			accent: hsl(48, 96, 90),
			accentForeground: hsl(48, 96, 25),
			ring: hsl(48, 96, 53),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(48, 100, 65),
			primaryForeground: hsl(48, 100, 10),
			secondary: hsl(48, 60, 20),
			secondaryForeground: hsl(48, 100, 95),
			accent: hsl(48, 80, 20),
			accentForeground: hsl(48, 100, 90),
			ring: hsl(48, 100, 65),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	green: {
		light: {
			primary: hsl(142, 76, 36),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(142, 70, 95),
			secondaryForeground: hsl(142, 76, 20),
			accent: hsl(142, 76, 90),
			accentForeground: hsl(142, 76, 25),
			ring: hsl(142, 76, 36),
			info: hsl(215, 90, 55),
			success: hsl(142, 76, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(142, 90, 55),
			primaryForeground: hsl(142, 90, 10),
			secondary: hsl(142, 40, 20),
			secondaryForeground: hsl(142, 90, 95),
			accent: hsl(142, 60, 20),
			accentForeground: hsl(142, 90, 90),
			ring: hsl(142, 90, 55),
			info: hsl(215, 90, 65),
			success: hsl(142, 90, 60),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	teal: {
		light: {
			primary: hsl(168, 76, 36),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(168, 70, 95),
			secondaryForeground: hsl(168, 76, 20),
			accent: hsl(168, 76, 90),
			accentForeground: hsl(168, 76, 25),
			ring: hsl(168, 76, 36),
			info: hsl(215, 90, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(168, 90, 55),
			primaryForeground: hsl(168, 90, 10),
			secondary: hsl(168, 40, 20),
			secondaryForeground: hsl(168, 90, 95),
			accent: hsl(168, 60, 20),
			accentForeground: hsl(168, 90, 90),
			ring: hsl(168, 90, 55),
			info: hsl(215, 90, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
	cyan: {
		light: {
			primary: hsl(189, 94, 43),
			primaryForeground: hsl(0, 0, 100),
			secondary: hsl(189, 80, 95),
			secondaryForeground: hsl(189, 94, 20),
			accent: hsl(189, 94, 90),
			accentForeground: hsl(189, 94, 25),
			ring: hsl(189, 94, 43),
			info: hsl(189, 94, 55),
			success: hsl(142, 70, 45),
			warning: hsl(38, 90, 55),
			destructive: hsl(0, 84, 60),
		},
		dark: {
			primary: hsl(189, 100, 55),
			primaryForeground: hsl(189, 100, 10),
			secondary: hsl(189, 50, 20),
			secondaryForeground: hsl(189, 100, 95),
			accent: hsl(189, 70, 20),
			accentForeground: hsl(189, 100, 90),
			ring: hsl(189, 100, 55),
			info: hsl(189, 100, 65),
			success: hsl(142, 70, 55),
			warning: hsl(38, 90, 60),
			destructive: hsl(0, 90, 65),
		},
	},
};

export const fontStacks: Record<ThemeFont, string> = {
	sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
	mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const spaceScales: Record<ThemeSpace, Record<string, string>> = {
	compact: {
		"0": "0",
		"1": "0.125rem",
		"2": "0.25rem",
		"3": "0.375rem",
		"4": "0.5rem",
		"5": "0.625rem",
		"6": "0.75rem",
		"7": "0.875rem",
		"8": "1rem",
		"10": "1.25rem",
		"12": "1.5rem",
		"16": "2rem",
	},
	normal: {
		"0": "0",
		"1": "0.25rem",
		"2": "0.5rem",
		"3": "0.75rem",
		"4": "1rem",
		"5": "1.25rem",
		"6": "1.5rem",
		"7": "1.75rem",
		"8": "2rem",
		"10": "2.5rem",
		"12": "3rem",
		"16": "4rem",
	},
	spacious: {
		"0": "0",
		"1": "0.5rem",
		"2": "0.75rem",
		"3": "1rem",
		"4": "1.25rem",
		"5": "1.5rem",
		"6": "1.75rem",
		"7": "2rem",
		"8": "2.5rem",
		"10": "3rem",
		"12": "4rem",
		"16": "6rem",
	},
};

export const radiusScales: Record<ThemeRadius, { DEFAULT: string; sm: string; md: string; lg: string; xl: string }> = {
	none: { DEFAULT: "0", sm: "0", md: "0", lg: "0", xl: "0" },
	small: { DEFAULT: "0.25rem", sm: "0.125rem", md: "0.25rem", lg: "0.375rem", xl: "0.5rem" },
	medium: { DEFAULT: "0.5rem", sm: "0.25rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
	large: { DEFAULT: "0.75rem", sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" },
};

export const presets: ThemePreset[] = [
	{
		name: "solid-light",
		label: "Solid Light",
		state: { name: "Solid Light", mode: "light", color: "slate", font: "sans", space: "normal", radius: "medium" },
	},
	{
		name: "solid-dark",
		label: "Solid Dark",
		state: { name: "Solid Dark", mode: "dark", color: "slate", font: "sans", space: "normal", radius: "medium" },
	},
	{
		name: "ocean",
		label: "Ocean",
		state: { name: "Ocean", mode: "light", color: "blue", font: "sans", space: "normal", radius: "medium" },
	},
	{
		name: "ocean-dark",
		label: "Ocean Dark",
		state: { name: "Ocean Dark", mode: "dark", color: "blue", font: "sans", space: "normal", radius: "medium" },
	},
	{
		name: "violet",
		label: "Violet",
		state: { name: "Violet", mode: "light", color: "violet", font: "sans", space: "normal", radius: "medium" },
	},
	{
		name: "rose",
		label: "Rose",
		state: { name: "Rose", mode: "light", color: "rose", font: "serif", space: "normal", radius: "large" },
	},
	{
		name: "forest",
		label: "Forest",
		state: { name: "Forest", mode: "dark", color: "green", font: "sans", space: "spacious", radius: "small" },
	},
	{
		name: "compact",
		label: "Compact",
		state: { name: "Compact", mode: "light", color: "slate", font: "mono", space: "compact", radius: "small" },
	},
];

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

	html.style.setProperty("--color-primary", colorSet.primary);
	html.style.setProperty("--color-primary-foreground", colorSet.primaryForeground);
	html.style.setProperty("--color-secondary", colorSet.secondary);
	html.style.setProperty("--color-secondary-foreground", colorSet.secondaryForeground);
	html.style.setProperty("--color-accent", colorSet.accent);
	html.style.setProperty("--color-accent-foreground", colorSet.accentForeground);
	html.style.setProperty("--color-ring", colorSet.ring);
	html.style.setProperty("--color-info", colorSet.info);
	html.style.setProperty("--color-info-foreground", baseForeground);
	html.style.setProperty("--color-success", colorSet.success);
	html.style.setProperty("--color-success-foreground", baseForeground);
	html.style.setProperty("--color-warning", colorSet.warning);
	html.style.setProperty("--color-warning-foreground", baseForeground);
	html.style.setProperty("--color-destructive", colorSet.destructive);
	html.style.setProperty("--color-destructive-foreground", baseForeground);
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
