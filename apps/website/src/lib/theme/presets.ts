import type { ThemePreset } from "./types";

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
