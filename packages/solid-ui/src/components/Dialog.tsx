import { type JSX, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";

export interface DialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: string;
	description?: string;
	children?: JSX.Element;
	class?: string;
}

function DialogContent(props: DialogProps) {
	onMount(() => {
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
			<div class="fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none" role="presentation">
				<div
					class={`pointer-events-auto relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-lg ${props.class ?? ""}`}
					role="dialog"
					aria-modal="true"
					aria-labelledby={props.title ? "dialog-title" : undefined}
					aria-describedby={props.description ? "dialog-description" : undefined}
				>
					<Show when={props.title}>
						<h2 id="dialog-title" class="text-lg font-semibold text-foreground">
							{props.title}
						</h2>
					</Show>
					<Show when={props.description}>
						<p id="dialog-description" class="mt-1 text-sm text-muted-foreground">
							{props.description}
						</p>
					</Show>
					<div class="mt-4">{props.children}</div>
				</div>
			</div>
		</Portal>
	);
}

export function Dialog(props: DialogProps) {
	const merged = mergeProps({ open: false }, props);
	return (
		<Show when={merged.open}>
			<DialogContent
				onOpenChange={merged.onOpenChange}
				title={merged.title}
				description={merged.description}
				class={merged.class}
			>
				{merged.children}
			</DialogContent>
		</Show>
	);
}
