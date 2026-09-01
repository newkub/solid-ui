import { type JSX, mergeProps, Show } from "solid-js";

export type ToastVariant = "default" | "info" | "success" | "warning" | "destructive";

const variantMap: Record<ToastVariant, string> = {
	default: "border-border bg-surface text-foreground",
	info: "border-info bg-info/10 text-info-foreground",
	success: "border-success bg-success/10 text-success-foreground",
	warning: "border-warning bg-warning/10 text-warning-foreground",
	destructive: "border-destructive bg-destructive/10 text-destructive-foreground",
};

export interface ToastProps {
	title?: string;
	description?: string;
	variant?: ToastVariant;
	onClose?: () => void;
	children?: JSX.Element;
	class?: string;
}

export function Toast(props: ToastProps) {
	const merged = mergeProps({ variant: "default" as ToastVariant }, props);
	return (
		<div
			class={`relative w-80 rounded-lg border p-4 shadow-md ${variantMap[merged.variant]} ${merged.class ?? ""}`}
			role="status"
		>
			<Show when={merged.title}>
				<h4 class="mb-1 pr-5 text-sm font-semibold">{merged.title}</h4>
			</Show>
			<Show when={merged.description || merged.children}>
				<p class="pr-5 text-sm opacity-80">{merged.description ?? merged.children}</p>
			</Show>
			<Show when={merged.onClose}>
				<button
					type="button"
					onClick={() => merged.onClose?.()}
					class="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-md opacity-70 transition-opacity hover:bg-muted hover:opacity-100"
					aria-label="Close"
				>
					<span aria-hidden="true">×</span>
				</button>
			</Show>
		</div>
	);
}
