import { type JSX, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { createFocusTrap } from "../hooks/useFocusTrap";
import { Button } from "./Button";

export interface AlertDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	title?: string;
	description?: string;
	children?: JSX.Element;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	class?: string;
}

function AlertDialogContent(
	props: Required<Pick<AlertDialogProps, "confirmLabel" | "cancelLabel">> & AlertDialogProps,
) {
	let contentRef: HTMLDivElement | undefined;

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") {
				props.onOpenChange?.(false);
				props.onCancel?.();
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

	const handleConfirm = () => {
		props.onOpenChange?.(false);
		props.onConfirm?.();
	};

	const handleCancel = () => {
		props.onOpenChange?.(false);
		props.onCancel?.();
	};

	return (
		<Portal>
			<div class="fixed inset-0 z-modal-backdrop bg-overlay/80" onClick={handleCancel} aria-hidden="true" />
			<div class="fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none" role="presentation">
				<div
					ref={(el) => (contentRef = el)}
					tabIndex={-1}
					class={`pointer-events-auto relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-surface p-6 shadow-lg ${props.class ?? ""}`}
					role="alertdialog"
					aria-modal="true"
					aria-labelledby={props.title ? "alertdialog-title" : undefined}
					aria-describedby={props.description ? "alertdialog-description" : undefined}
				>
					<Show when={props.title}>
						<h2 id="alertdialog-title" class="text-lg font-semibold text-foreground">
							{props.title}
						</h2>
					</Show>
					<Show when={props.description}>
						<p id="alertdialog-description" class="mt-1 text-sm text-muted-foreground">
							{props.description}
						</p>
					</Show>
					<div class="mt-4">{props.children}</div>
					<div class="mt-6 flex justify-end gap-2">
						<Button variant="secondary" onClick={handleCancel}>
							{props.cancelLabel}
						</Button>
						<Button onClick={handleConfirm}>{props.confirmLabel}</Button>
					</div>
				</div>
			</div>
		</Portal>
	);
}

export function AlertDialog(props: AlertDialogProps) {
	const merged = mergeProps({ open: false, confirmLabel: "Confirm", cancelLabel: "Cancel" }, props);
	return (
		<Show when={merged.open}>
			<AlertDialogContent {...props} confirmLabel={merged.confirmLabel} cancelLabel={merged.cancelLabel} />
		</Show>
	);
}
