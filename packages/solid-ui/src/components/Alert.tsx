import { type JSX, mergeProps, Show } from "solid-js";

export type AlertVariant = "default" | "info" | "success" | "warning" | "destructive";

export interface AlertProps {
	variant?: AlertVariant;
	title?: string;
	children?: JSX.Element;
	class?: string;
}

const variantMap: Record<AlertVariant, string> = {
	default: "border-border bg-muted text-foreground",
	info: "border-info bg-info/10 text-info-foreground",
	success: "border-success bg-success/10 text-success-foreground",
	warning: "border-warning bg-warning/10 text-warning-foreground",
	destructive: "border-destructive bg-destructive/10 text-destructive-foreground",
};

export function Alert(props: AlertProps) {
	const merged = mergeProps({ variant: "default" as AlertVariant }, props);
	return (
		<div class={`rounded-xl border p-4 ${variantMap[merged.variant]} ${props.class ?? ""}`} role="alert">
			<Show when={merged.title}>
				<h4 class="mb-1 text-sm font-semibold">{merged.title}</h4>
			</Show>
			<div class="text-sm">{merged.children}</div>
		</div>
	);
}
