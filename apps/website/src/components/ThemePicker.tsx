import { useSelector } from "@tanstack/solid-store";
import { createSignal, For, onCleanup, onMount, Show } from "solid-js";
import {
	colorSchemes,
	fontStacks,
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
		<section class="border-b border-border pb-4 last:border-0">
			<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Presets</h3>
			<div class="grid gap-1">
				<For each={presets}>
					{(preset) => {
						const active = props.state.name === preset.label;
						return (
							<button
								type="button"
								class={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors ${
									active ? "bg-primary/10 text-primary ring-1 ring-primary/20" : "text-foreground hover:bg-muted"
								}`}
								role="option"
								aria-selected={active}
								onClick={() => {
									setThemeName(preset.name);
									props.onSelect();
								}}
							>
								<span
									class="inline-block h-3 w-3 rounded-full"
									style={{
										"background-color": `hsl(${colorSchemes[preset.state.color][preset.state.mode].primary})`,
									}}
								/>
								<span>{preset.label}</span>
							</button>
						);
					}}
				</For>
			</div>
		</section>
	);
}

function ModeSection(props: { mode: ThemeMode; onSelect: () => void }) {
	return (
		<section class="border-b border-border pb-4 last:border-0">
			<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mode</h3>
			<div class="grid grid-cols-2 gap-2">
				<For each={["light", "dark"] as ThemeMode[]}>
					{(mode) => {
						const active = props.mode === mode;
						return (
							<button
								type="button"
								class={`rounded-md border border-border px-3 py-2 text-sm transition-colors ${
									active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
								}`}
								role="option"
								aria-selected={active}
								onClick={() => {
									setThemeMode(mode);
									props.onSelect();
								}}
							>
								{mode}
							</button>
						);
					}}
				</For>
			</div>
		</section>
	);
}

function ColorSection(props: { color: ThemeColor; mode: ThemeMode; onSelect: () => void }) {
	return (
		<section class="border-b border-border pb-4 last:border-0">
			<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Color</h3>
			<div class="grid grid-cols-4 gap-2">
				<For each={colorOptions}>
					{(color) => {
						const active = props.color === color;
						return (
							<button
								type="button"
								class={`flex items-center justify-center rounded-md border border-border p-2 transition-colors ${
									active ? "bg-primary/10 ring-2 ring-ring" : "hover:bg-muted"
								}`}
								role="option"
								aria-label={`Color ${color}`}
								aria-selected={active}
								onClick={() => {
									setThemeColor(color);
									props.onSelect();
								}}
							>
								<span
									class="inline-block h-4 w-4 rounded-full"
									style={{ "background-color": `hsl(${colorSchemes[color][props.mode].primary})` }}
								/>
							</button>
						);
					}}
				</For>
			</div>
		</section>
	);
}

function FontSection(props: { font: ThemeFont; onSelect: () => void }) {
	return (
		<section class="border-b border-border pb-4 last:border-0">
			<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Font</h3>
			<div class="grid grid-cols-3 gap-2">
				<For each={fontOptions}>
					{(font) => {
						const active = props.font === font;
						return (
							<button
								type="button"
								class={`rounded-md border border-border px-3 py-2 text-sm transition-colors ${
									active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
								}`}
								role="option"
								aria-selected={active}
								style={{ "font-family": fontStacks[font] }}
								onClick={() => {
									setThemeFont(font);
									props.onSelect();
								}}
							>
								{font}
							</button>
						);
					}}
				</For>
			</div>
		</section>
	);
}

function SpaceSection(props: { space: ThemeSpace; onSelect: () => void }) {
	return (
		<section class="border-b border-border pb-4 last:border-0">
			<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Spacing</h3>
			<div class="grid grid-cols-3 gap-2">
				<For each={spaceOptions}>
					{(space) => {
						const active = props.space === space;
						return (
							<button
								type="button"
								class={`rounded-md border border-border px-3 py-2 text-sm transition-colors ${
									active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
								}`}
								role="option"
								aria-selected={active}
								onClick={() => {
									setThemeSpace(space);
									props.onSelect();
								}}
							>
								{space}
							</button>
						);
					}}
				</For>
			</div>
		</section>
	);
}

function RadiusSection(props: { radius: ThemeRadius; onSelect: () => void }) {
	return (
		<section>
			<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Radius</h3>
			<div class="grid grid-cols-4 gap-2">
				<For each={radiusOptions}>
					{(radius) => {
						const active = props.radius === radius;
						return (
							<button
								type="button"
								class={`rounded-md border border-border px-2 py-2 text-sm transition-colors ${
									active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
								}`}
								role="option"
								aria-selected={active}
								onClick={() => {
									setThemeRadius(radius);
									props.onSelect();
								}}
							>
								{radius}
							</button>
						);
					}}
				</For>
			</div>
		</section>
	);
}

function ThemeDropdown(props: { state: ThemeState; onSelect: () => void }) {
	return (
		<div
			class="absolute right-0 top-full z-dropdown mt-2 w-80 max-h-[80vh] max-w-[calc(100vw_-_2rem)] overflow-y-auto rounded-xl border border-border bg-surface p-4 shadow-xl lg:left-full lg:right-auto lg:top-0 lg:mt-0 lg:ml-2 lg:w-96"
			role="listbox"
		>
			<div class="space-y-4">
				<PresetSection state={props.state} onSelect={props.onSelect} />
				<ModeSection mode={props.state.mode} onSelect={props.onSelect} />
				<ColorSection color={props.state.color} mode={props.state.mode} onSelect={props.onSelect} />
				<FontSection font={props.state.font} onSelect={props.onSelect} />
				<SpaceSection space={props.state.space} onSelect={props.onSelect} />
				<RadiusSection radius={props.state.radius} onSelect={props.onSelect} />
			</div>
		</div>
	);
}

function SunIcon() {
	return (
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
			<circle cx="12" cy="12" r="5" />
			<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
		</svg>
	);
}

function MoonIcon() {
	return (
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
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</svg>
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

	const activeColor = () => `hsl(${colorSchemes[state().color][state().mode].primary})`;

	return (
		<div ref={ref} class="relative inline-block">
			<button
				type="button"
				class="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-muted"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="listbox"
				aria-expanded={open()}
				aria-label={`Theme: ${state().name}`}
				title={`Theme: ${state().name}`}
			>
				<Show when={state().mode === "light"} fallback={<MoonIcon />}>
					<SunIcon />
				</Show>
				<span
					class="absolute right-1 top-1 h-2 w-2 rounded-full border border-surface"
					style={{ "background-color": activeColor() }}
					aria-hidden="true"
				/>
			</button>
			<Show when={open()}>
				<ThemeDropdown state={state()} onSelect={() => setOpen(false)} />
			</Show>
		</div>
	);
}
