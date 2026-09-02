import { useLocation, useNavigate } from "@tanstack/solid-router";
import { useSelector } from "@tanstack/solid-store";
import { type Accessor, createSignal, type JSX, onCleanup, onMount, Show } from "solid-js";
import { themeStore } from "../lib/theme";
import { VibeCoding } from "./VibeCoding";

interface DevToolsProps {
	open: Accessor<boolean>;
	onOpenChange: (open: boolean) => void;
}

function useBreakpoint() {
	const [width, setWidth] = createSignal(0);
	const breakpoint = () => {
		const w = width();
		if (w >= 1536) return "2xl";
		if (w >= 1280) return "xl";
		if (w >= 1024) return "lg";
		if (w >= 768) return "md";
		if (w >= 640) return "sm";
		return "xs";
	};

	onMount(() => {
		setWidth(window.innerWidth);
		const onResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", onResize);
		onCleanup(() => window.removeEventListener("resize", onResize));
	});

	return { width, breakpoint };
}

function CloseIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path d="M18 6 6 18M6 6l12 12" />
		</svg>
	);
}

export function GearIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="3" />
			<path d="M12 1v6m0 6v6m4.22-13.22-4.24 4.24M7.76 16.24l4.24-4.24M23 12h-6M7 12H1m16.22 4.22-4.24-4.24M7.76 7.76l4.24 4.24" />
		</svg>
	);
}

function VibeIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10Z" />
			<path d="M12 6v6l4 2" />
		</svg>
	);
}

export function DevTools(props: DevToolsProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const [showVibe, setShowVibe] = createSignal(false);
	const { width, breakpoint } = useBreakpoint();
	const theme = useSelector(themeStore, (s) => s);

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape" && props.open()) {
				close();
			}
		}
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => document.removeEventListener("keydown", onKeyDown));
	});

	function close() {
		props.onOpenChange(false);
		setShowVibe(false);
	}

	function nav(to: string) {
		close();
		navigate({ to });
	}

	function InfoRow(props: { label: string; value: string }) {
		return (
			<div class="flex items-center justify-between rounded-lg bg-muted px-2.5 py-1.5 text-xs">
				<span class="text-muted-foreground">{props.label}</span>
				<span class="font-mono font-medium text-foreground">{props.value}</span>
			</div>
		);
	}

	function ToolButton(props: { onClick: () => void; label: string; icon: JSX.Element }) {
		return (
			<button
				type="button"
				onClick={props.onClick}
				class="inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				{props.icon}
				{props.label}
			</button>
		);
	}

	return (
		<Show when={props.open()}>
			<div
				class="fixed right-0 top-0 z-toast h-full w-80 max-w-full overflow-y-auto border-l border-border bg-surface p-4 shadow-2xl lg:right-4 lg:top-14 lg:h-auto lg:max-h-[80vh] lg:w-80 lg:rounded-xl lg:border"
				role="dialog"
				aria-label="Developer tools"
			>
				<div class="mb-3 flex items-center justify-between">
					<div class="flex items-center gap-1.5">
						<GearIcon class="h-4 w-4 text-muted-foreground" />
						<span class="text-sm font-semibold text-foreground">Dev tools</span>
					</div>
					<div class="flex items-center gap-1.5">
						<span class="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
							{breakpoint()}
						</span>
						<button
							type="button"
							onClick={close}
							class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							aria-label="Close developer tools"
						>
							<CloseIcon />
						</button>
					</div>
				</div>

				<div class="space-y-2">
					<InfoRow label="Route" value={location().pathname} />
					<InfoRow label="Viewport" value={`${width()}px · ${breakpoint()}`} />
					<InfoRow label="Theme" value={theme().name} />
				</div>

				<Show
					when={showVibe()}
					fallback={
						<div class="mt-4 grid grid-cols-2 gap-2">
							<ToolButton
								onClick={() => nav("/settings")}
								label="Settings"
								icon={
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<circle cx="12" cy="12" r="3" />
										<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
									</svg>
								}
							/>
							<ToolButton
								onClick={() => nav("/plugins")}
								label="Plugins"
								icon={
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<path d="M12 22v-5" />
										<path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
										<path d="M12 11v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2" />
										<path d="M9 17H7a2 2 0 0 1-2-2v-2" />
										<path d="M15 17h2a2 2 0 0 0 2-2v-2" />
									</svg>
								}
							/>
							<ToolButton
								onClick={() => nav("/components")}
								label="Components"
								icon={
									<svg
										class="h-3.5 w-3.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										aria-hidden="true"
									>
										<rect x="3" y="3" width="7" height="7" rx="1" />
										<rect x="14" y="3" width="7" height="7" rx="1" />
										<rect x="14" y="14" width="7" height="7" rx="1" />
										<rect x="3" y="14" width="7" height="7" rx="1" />
									</svg>
								}
							/>
							<ToolButton
								onClick={() => setShowVibe(true)}
								label="Vibe coding"
								icon={<VibeIcon class="h-3.5 w-3.5" />}
							/>
						</div>
					}
				>
					<div class="mt-3">
						<div class="mb-2 flex items-center justify-between">
							<span class="text-sm font-semibold text-foreground">Vibe coding</span>
							<button
								type="button"
								onClick={() => setShowVibe(false)}
								class="rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
							>
								Back
							</button>
						</div>
						<VibeCoding />
					</div>
				</Show>
			</div>
		</Show>
	);
}
