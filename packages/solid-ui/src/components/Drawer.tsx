import { createSignal, type JSX, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { createFocusTrap } from "../hooks/useFocusTrap";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: string;
	description?: string;
	side?: DrawerSide;
	children?: JSX.Element;
	class?: string;
}

interface SideStyle {
	container: string;
	open: string;
	closed: string;
}

const sideMap: Record<DrawerSide, SideStyle> = {
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

function DrawerPanel(props: DrawerProps) {
	const [mounted, setMounted] = createSignal(false);
	const style = () => sideMap[props.side ?? "right"];
	let contentRef: HTMLDivElement | undefined;

	onMount(() => {
		setMounted(true);
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				props.onOpenChange?.(false);
			}
		}
		document.addEventListener("keydown", onKeyDown);

		const trap = contentRef ? createFocusTrap(contentRef) : null;
		trap?.activate();

		onCleanup(() => {
			document.removeEventListener("keydown", onKeyDown);
			trap?.deactivate();
		});
	});

	return (
		<Portal>
			<div
				class="fixed inset-0 z-modal-backdrop bg-overlay/80"
				onClick={() => props.onOpenChange?.(false)}
				aria-hidden="true"
			/>
			<div
				ref={(el) => (contentRef = el)}
				tabIndex={-1}
				class={`fixed z-modal rounded-xl border border-border bg-surface p-6 shadow-lg transition-transform duration-300 ease-out ${style().container} ${mounted() ? style().open : style().closed} ${props.class ?? ""}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={props.title ? "drawer-title" : undefined}
				aria-describedby={props.description ? "drawer-description" : undefined}
			>
				<Show when={props.title}>
					<h2 id="drawer-title" class="text-lg font-semibold text-foreground">
						{props.title}
					</h2>
				</Show>
				<Show when={props.description}>
					<p id="drawer-description" class="mt-1 text-sm text-muted-foreground">
						{props.description}
					</p>
				</Show>
				<div class="mt-4">{props.children}</div>
			</div>
		</Portal>
	);
}

export function Drawer(props: DrawerProps) {
	const merged = mergeProps({ open: false, side: "right" as DrawerSide }, props);
	return (
		<Show when={merged.open}>
			<DrawerPanel
				onOpenChange={merged.onOpenChange}
				title={merged.title}
				description={merged.description}
				side={merged.side}
				class={merged.class}
			>
				{merged.children}
			</DrawerPanel>
		</Show>
	);
}
