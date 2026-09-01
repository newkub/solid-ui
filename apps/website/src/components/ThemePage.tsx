import { useSelector } from "@tanstack/solid-store";
import * as SolidUI from "@wrikka/solid-ui";
import { For, type JSX } from "solid-js";
import {
	colorSchemes,
	fontStacks,
	presets,
	radiusScales,
	setThemeColor,
	setThemeFont,
	setThemeMode,
	setThemeName,
	setThemeRadius,
	setThemeSpace,
	spaceScales,
	type ThemeColor,
	type ThemeFont,
	type ThemeMode,
	type ThemeRadius,
	type ThemeSpace,
	themeStore,
} from "../lib/theme";

const colorOptions: ThemeColor[] = [
	"slate",
	"blue",
	"indigo",
	"violet",
	"rose",
	"pink",
	"red",
	"orange",
	"amber",
	"yellow",
	"green",
	"teal",
	"cyan",
];
const fontOptions: ThemeFont[] = ["sans", "serif", "mono"];
const spaceOptions: ThemeSpace[] = ["compact", "normal", "spacious"];
const radiusOptions: ThemeRadius[] = ["none", "small", "medium", "large"];

function Section(props: { title: string; children: JSX.Element }) {
	return (
		<section class="mb-8 p-6 rounded-xl border border-border bg-surface">
			<h2 class="text-lg font-semibold mb-4">{props.title}</h2>
			{props.children}
		</section>
	);
}

function ModeButton(props: { mode: ThemeMode; label: string }) {
	const state = useSelector(themeStore, (s) => s);
	return (
		<button
			type="button"
			class="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
			classList={{ "bg-primary text-primary-foreground": state().mode === props.mode }}
			onClick={() => setThemeMode(props.mode)}
		>
			{props.label}
		</button>
	);
}

export function ThemePage() {
	const state = useSelector(themeStore, (s) => s);

	return (
		<section class="page">
			<div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-2xl font-bold tracking-tight">Theme Studio</h2>
			</div>
			<p class="mb-6 text-muted-foreground">
				Customize colors, font, spacing, and radius. Changes apply live across the site and all component previews.
			</p>

			<Section title="Presets">
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
					<For each={presets}>
						{(preset) => (
							<button
								type="button"
								class="flex items-center gap-2 rounded-lg border border-border bg-background p-3 text-left hover:bg-muted transition-colors"
								classList={{ "ring-2 ring-ring": state().name === preset.label }}
								onClick={() => setThemeName(preset.name)}
							>
								<span
									class="inline-block w-4 h-4 rounded-full"
									style={{ "background-color": `hsl(${colorSchemes[preset.state.color][preset.state.mode].primary})` }}
								/>
								<div>
									<div class="font-medium">{preset.label}</div>
									<div class="text-xs text-muted-foreground capitalize">
										{preset.state.mode} · {preset.state.color} · {preset.state.space}
									</div>
								</div>
							</button>
						)}
					</For>
				</div>
			</Section>

			<Section title="Mode">
				<div class="flex gap-3">
					<ModeButton mode="light" label="Light" />
					<ModeButton mode="dark" label="Dark" />
				</div>
			</Section>

			<Section title="Color">
				<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
					<For each={colorOptions}>
						{(color) => (
							<button
								type="button"
								class="flex flex-col items-center gap-2 rounded-lg border border-border p-3 hover:bg-muted transition-colors"
								classList={{ "ring-2 ring-ring": state().color === color }}
								aria-label={`Color ${color}`}
								onClick={() => setThemeColor(color)}
							>
								<span
									class="inline-block w-6 h-6 rounded-full"
									style={{ "background-color": `hsl(${colorSchemes[color][state().mode].primary})` }}
								/>
								<span class="text-xs capitalize">{color}</span>
							</button>
						)}
					</For>
				</div>
			</Section>

			<Section title="Font family">
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<For each={fontOptions}>
						{(font) => (
							<button
								type="button"
								class="rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
								classList={{ "bg-primary text-primary-foreground": state().font === font }}
								style={{ "font-family": fontStacks[font] }}
								onClick={() => setThemeFont(font)}
							>
								<div class="font-medium capitalize">{font}</div>
								<div class="text-sm opacity-80">The quick brown fox jumps over the lazy dog.</div>
							</button>
						)}
					</For>
				</div>
			</Section>

			<Section title="Spacing scale">
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<For each={spaceOptions}>
						{(space) => (
							<button
								type="button"
								class="rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
								classList={{ "bg-primary text-primary-foreground": state().space === space }}
								onClick={() => setThemeSpace(space)}
							>
								<div class="font-medium capitalize">{space}</div>
								<div class="text-sm text-muted-foreground">Sample gap: {spaceScales[space]["4"]}</div>
							</button>
						)}
					</For>
				</div>
			</Section>

			<Section title="Radius scale">
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
					<For each={radiusOptions}>
						{(radius) => (
							<button
								type="button"
								class="rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
								classList={{ "bg-primary text-primary-foreground": state().radius === radius }}
								onClick={() => setThemeRadius(radius)}
							>
								<div class="font-medium capitalize mb-2">{radius}</div>
								<div
									class="h-8 w-full border border-border"
									style={{ "border-radius": radiusScales[radius].DEFAULT }}
								/>
							</button>
						)}
					</For>
				</div>
			</Section>

			<section class="p-6 rounded-xl border border-border bg-surface">
				<h2 class="text-lg font-semibold mb-2">Live preview</h2>
				<p class="text-muted-foreground text-sm mb-4">This card uses the current theme tokens.</p>
				<div class="flex flex-wrap items-center gap-3 mb-4">
					<SolidUI.Button variant="primary">Primary</SolidUI.Button>
					<SolidUI.Button variant="secondary">Secondary</SolidUI.Button>
					<SolidUI.Button variant="ghost">Ghost</SolidUI.Button>
					<SolidUI.Badge>Badge</SolidUI.Badge>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<SolidUI.Input type="text" placeholder="Input preview" readOnly />
					<SolidUI.Select>
						<option>Select preview</option>
					</SolidUI.Select>
				</div>
			</section>
		</section>
	);
}
