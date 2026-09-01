import { useNavigate } from "@tanstack/solid-router";
import { createSignal, onCleanup, onMount, Show } from "solid-js";

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

function GearIcon(props: { class?: string }) {
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

function TerminalIcon(props: { class?: string }) {
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
			<rect x="2" y="4" width="20" height="16" rx="2" />
			<path d="m6 9 3 3-3 3M12 15h6" />
		</svg>
	);
}

export function DevTools() {
	const navigate = useNavigate();
	const [open, setOpen] = createSignal(false);
	const [showTerminal, setShowTerminal] = createSignal(false);
	const { width, breakpoint } = useBreakpoint();

	function nav(to: string) {
		setOpen(false);
		setShowTerminal(false);
		navigate({ to });
	}

	return (
		<div class="fixed bottom-4 left-4 z-toast">
			<Show
				when={open()}
				fallback={
					<button
						type="button"
						onClick={() => setOpen(true)}
						class="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-medium text-muted-foreground shadow-lg transition-all hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						aria-label="Open developer tools"
						aria-pressed={open()}
					>
						<GearIcon />
						<span class="hidden sm:inline">Dev tools</span>
						<span class="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
							{breakpoint()}
						</span>
					</button>
				}
			>
				<div class="w-64 rounded-xl border border-border bg-surface p-3 shadow-xl">
					<div class="mb-3 flex items-center justify-between">
						<div class="flex items-center gap-1.5">
							<GearIcon class="text-muted-foreground" />
							<span class="text-sm font-semibold">Dev tools</span>
						</div>
						<button
							type="button"
							onClick={() => {
								setOpen(false);
								setShowTerminal(false);
							}}
							class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							aria-label="Close developer tools"
						>
							<CloseIcon />
						</button>
					</div>

					<div class="mb-3 flex items-center justify-between rounded-lg bg-muted p-2 text-xs">
						<span class="text-muted-foreground">Viewport</span>
						<span class="font-mono font-medium">
							{width()}px · {breakpoint()}
						</span>
					</div>

					<Show
						when={showTerminal()}
						fallback={
							<div class="grid grid-cols-2 gap-2">
								<button
									type="button"
									onClick={() => nav("/plugins")}
									class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								>
									Plugins
								</button>
								<button
									type="button"
									onClick={() => nav("/theme")}
									class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								>
									Theme
								</button>
								<button
									type="button"
									onClick={() => nav("/components")}
									class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								>
									Components
								</button>
								<button
									type="button"
									onClick={() => setShowTerminal(true)}
									class="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								>
									<TerminalIcon />
									Terminal
								</button>
							</div>
						}
					>
						<div class="space-y-3 text-center">
							<div class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
								<TerminalIcon />
							</div>
							<div class="text-sm text-muted-foreground">
								Terminal log watcher streams dev server output to the chat and is not available yet.
							</div>
							<button
								type="button"
								onClick={() => setShowTerminal(false)}
								class="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							>
								Back
							</button>
						</div>
					</Show>
				</div>
			</Show>
		</div>
	);
}
