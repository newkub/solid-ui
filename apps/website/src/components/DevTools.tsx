import { useNavigate } from "@tanstack/solid-router";
import { createSignal, Show } from "solid-js";

function useBreakpoint() {
	const [width, setWidth] = createSignal(typeof window !== "undefined" ? window.innerWidth : 0);
	const breakpoint = () => {
		const w = width();
		if (w >= 1536) return "2xl";
		if (w >= 1280) return "xl";
		if (w >= 1024) return "lg";
		if (w >= 768) return "md";
		if (w >= 640) return "sm";
		return "xs";
	};

	if (typeof window !== "undefined") {
		window.addEventListener("resize", () => setWidth(window.innerWidth));
	}

	return { width, breakpoint };
}

export function DevTools() {
	const navigate = useNavigate();
	const [open, setOpen] = createSignal(false);
	const { width, breakpoint } = useBreakpoint();

	function nav(to: string) {
		setOpen(false);
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
						class="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3 text-sm font-medium text-muted-foreground shadow-lg transition-all hover:bg-muted hover:text-foreground"
						aria-label="Open developer tools"
					>
						<svg
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
						<span class="hidden sm:inline">Dev tools</span>
						<span class="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
							{breakpoint()}
						</span>
					</button>
				}
			>
				<div class="w-64 rounded-xl border border-border bg-surface p-3 shadow-xl">
					<div class="mb-3 flex items-center justify-between">
						<span class="text-sm font-semibold">Dev tools</span>
						<button
							type="button"
							onClick={() => setOpen(false)}
							class="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
							aria-label="Close developer tools"
						>
							×
						</button>
					</div>
					<div class="mb-3 flex items-center justify-between rounded-lg bg-muted p-2 text-xs">
						<span class="text-muted-foreground">Viewport</span>
						<span class="font-mono font-medium">
							{width()}px · {breakpoint()}
						</span>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<button
							type="button"
							onClick={() => nav("/plugins")}
							class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
						>
							Plugins
						</button>
						<button
							type="button"
							onClick={() => nav("/theme")}
							class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
						>
							Theme
						</button>
						<button
							type="button"
							onClick={() => nav("/components")}
							class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
						>
							Components
						</button>
						<button
							type="button"
							onClick={() => alert("Terminal log watcher is not implemented yet.")}
							class="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
						>
							Terminal
						</button>
					</div>
				</div>
			</Show>
		</div>
	);
}
