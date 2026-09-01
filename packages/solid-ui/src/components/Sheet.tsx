import { createSignal, type JSX, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: string;
	description?: string;
	side?: SheetSide;
	children?: JSX.Element;
	class?: string;
}

interface SideStyle {
	container: string;
	open: string;
	closed: string;
}

const sideMap: Record<SheetSide, SideStyle> = {
	left: {
		container: "bottom-0 left-0 top-0 h-full w-full max-w-sm rounded-r-xl",
		open: "translate-x-0",
		closed: "-translate-x-full",
	},
	right: {
		container: "bottom-0 right-0 top-0 h-full w-full max-w-sm rounded-l-xl",
		open: "translate-x-0",
		closed: "translate-x-full",
	},
	top: {
		container: "left-0 right-0 top-0 w-full max-h-96 rounded-b-xl",
		open: "translate-y-0",
		closed: "-translate-y-full",
	},
	bottom: {
		container: "bottom-0 left-0 right-0 w-full max-h-96 rounded-t-xl",
		open: "translate-y-0",
		closed: "translate-y-full",
	},
};

function SheetPanel(props: SheetProps) {
	const [mounted, setMounted] = createSignal(false);
	const style = () => sideMap[props.side ?? "bottom"];

	onMount(() => {
		setMounted(true);
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				props.onOpenChange?.(false);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => document.removeEventListener("keydown", onKeyDown));
	});

	return (
		<Portal>
			<div
				class="fixed inset-0 z-modal-backdrop bg-overlay/80"
				onClick={() => props.onOpenChange?.(false)}
				aria-hidden="true"
			/>
			<div
				class={`fixed z-modal rounded-xl border border-border bg-surface p-6 shadow-lg transition-transform duration-300 ease-out ${style().container} ${mounted() ? style().open : style().closed} ${props.class ?? ""}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={props.title ? "sheet-title" : undefined}
				aria-describedby={props.description ? "sheet-description" : undefined}
			>
				<Show when={props.title}>
					<h2 id="sheet-title" class="text-lg font-semibold text-foreground">
						{props.title}
					</h2>
				</Show>
				<Show when={props.description}>
					<p id="sheet-description" class="mt-1 text-sm text-muted-foreground">
						{props.description}
					</p>
				</Show>
				<div class="mt-4">{props.children}</div>
			</div>
		</Portal>
	);
}

export function Sheet(props: SheetProps) {
	const merged = mergeProps({ open: false, side: "bottom" as SheetSide }, props);
	return (
		<Show when={merged.open}>
			<SheetPanel
				onOpenChange={merged.onOpenChange}
				title={merged.title}
				description={merged.description}
				side={merged.side}
				class={merged.class}
			>
				{merged.children}
			</SheetPanel>
		</Show>
	);
}
