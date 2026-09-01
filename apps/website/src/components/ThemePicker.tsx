import { useSelector } from "@tanstack/solid-store";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import {
	colorSchemes,
	presets,
	setThemeColor,
	setThemeFont,
	setThemeMode,
	setThemeName,
	setThemeRadius,
	setThemeSpace,
	type ThemeColor,
	type ThemeFont,
	type ThemeMode,
	type ThemeRadius,
	type ThemeSpace,
	type ThemeState,
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

function PresetSection(props: { state: ThemeState; onSelect: () => void }) {
	return (
		<section class="mb-4">
			<h3 class="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wide">Presets</h3>
			<div class="grid gap-1">
				<For each={presets}>
					{(preset) => (
						<button
							type="button"
							class="flex items-center gap-2 w-full text-left rounded-md px-2 py-2 text-sm hover:bg-muted"
							classList={{ "bg-muted": props.state.name === preset.label }}
							onClick={() => {
								setThemeName(preset.name);
								props.onSelect();
							}}
						>
							<span
								class="inline-block w-3 h-3 rounded-full"
								style={{
									"background-color": `hsl(${colorSchemes[preset.state.color][preset.state.mode].primary})`,
								}}
							/>
							<span>{preset.label}</span>
						</button>
					)}
				</For>
			</div>
		</section>
	);
}

function ModeSection(props: { mode: ThemeMode }) {
	return (
		<section class="mb-4">
			<h3 class="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wide">Mode</h3>
			<div class="grid grid-cols-2 gap-2">
				<For each={["light", "dark"] as ThemeMode[]}>
					{(mode) => (
						<button
							type="button"
							class="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
							classList={{ "bg-primary text-primary-foreground": props.mode === mode }}
							onClick={() => setThemeMode(mode)}
						>
							{mode}
						</button>
					)}
				</For>
			</div>
		</section>
	);
}

function ColorSection(props: { color: ThemeColor; mode: ThemeMode }) {
	return (
		<section class="mb-4">
			<h3 class="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wide">Color</h3>
			<div class="grid grid-cols-4 gap-2">
				<For each={colorOptions}>
					{(color) => (
						<button
							type="button"
							class="flex items-center justify-center rounded-md border border-border p-2 hover:bg-muted"
							classList={{ "ring-2 ring-ring": props.color === color }}
							aria-label={`Color ${color}`}
							onClick={() => setThemeColor(color)}
						>
							<span
								class="inline-block w-4 h-4 rounded-full"
								style={{ "background-color": `hsl(${colorSchemes[color][props.mode].primary})` }}
							/>
						</button>
					)}
				</For>
			</div>
		</section>
	);
}

function FontSection(props: { font: ThemeFont }) {
	return (
		<section class="mb-4">
			<h3 class="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wide">Font</h3>
			<div class="grid grid-cols-3 gap-2">
				<For each={fontOptions}>
					{(font) => (
						<button
							type="button"
							class="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
							classList={{ "bg-primary text-primary-foreground": props.font === font }}
							style={{ "font-family": font === "serif" ? "serif" : font === "mono" ? "monospace" : "sans-serif" }}
							onClick={() => setThemeFont(font)}
						>
							{font}
						</button>
					)}
				</For>
			</div>
		</section>
	);
}

function SpaceSection(props: { space: ThemeSpace }) {
	return (
		<section class="mb-4">
			<h3 class="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wide">Spacing</h3>
			<div class="grid grid-cols-3 gap-2">
				<For each={spaceOptions}>
					{(space) => (
						<button
							type="button"
							class="rounded-md border border-border px-3 py-2 text-sm hover:bg-muted"
							classList={{ "bg-primary text-primary-foreground": props.space === space }}
							onClick={() => setThemeSpace(space)}
						>
							{space}
						</button>
					)}
				</For>
			</div>
		</section>
	);
}

function RadiusSection(props: { radius: ThemeRadius }) {
	return (
		<section>
			<h3 class="mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wide">Radius</h3>
			<div class="grid grid-cols-4 gap-2">
				<For each={radiusOptions}>
					{(radius) => (
						<button
							type="button"
							class="rounded-md border border-border px-2 py-2 text-sm hover:bg-muted"
							classList={{ "bg-primary text-primary-foreground": props.radius === radius }}
							onClick={() => setThemeRadius(radius)}
						>
							{radius}
						</button>
					)}
				</For>
			</div>
		</section>
	);
}

function ThemeDropdown(props: { state: ThemeState; onSelect: () => void }) {
	return (
		<div
			class="absolute right-0 top-full z-dropdown mt-2 w-80 max-h-96 overflow-y-auto rounded-lg border border-border bg-surface p-4 shadow-lg"
			role="listbox"
		>
			<PresetSection state={props.state} onSelect={props.onSelect} />
			<ModeSection mode={props.state.mode} />
			<ColorSection color={props.state.color} mode={props.state.mode} />
			<FontSection font={props.state.font} />
			<SpaceSection space={props.state.space} />
			<RadiusSection radius={props.state.radius} />
		</div>
	);
}

export function ThemePicker() {
	const [open, setOpen] = createSignal(false);
	const state = useSelector(themeStore, (s) => s);
	let ref: HTMLDivElement | undefined;

	onMount(() => {
		function onClick(event: MouseEvent) {
			if (ref && !ref.contains(event.target as Node) && open()) {
				setOpen(false);
			}
		}
		function onKey(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}
		document.addEventListener("mousedown", onClick);
		document.addEventListener("keydown", onKey);
		onCleanup(() => {
			document.removeEventListener("mousedown", onClick);
			document.removeEventListener("keydown", onKey);
		});
	});

	return (
		<div ref={ref} class="relative inline-block">
			<button
				type="button"
				class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground hover:bg-muted transition-colors"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open()}
				aria-label={`Theme: ${state().name}`}
				title={`Theme: ${state().name}`}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" />
					<path d="M12 12a4 4 0 0 0 4-4 4 4 0 0 0-4-4" />
				</svg>
			</button>
			<Show when={open()}>
				<ThemeDropdown state={state()} onSelect={() => setOpen(false)} />
			</Show>
		</div>
	);
}
