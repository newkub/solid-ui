import { type JSX, mergeProps, Show } from "solid-js";

export type NotificationVariant = "default" | "info" | "success" | "warning" | "destructive";

export interface NotificationProps {
	variant?: NotificationVariant;
	title?: string;
	children?: JSX.Element;
	class?: string;
}

const variantMap: Record<NotificationVariant, string> = {
	default: "border-border bg-surface text-foreground",
	info: "border-info bg-info/10 text-info-foreground",
	success: "border-success bg-success/10 text-success-foreground",
	warning: "border-warning bg-warning/10 text-warning-foreground",
	destructive: "border-destructive bg-destructive/10 text-destructive-foreground",
};

export function Notification(props: NotificationProps) {
	const merged = mergeProps({ variant: "default" as NotificationVariant }, props);
	return (
		<div class={`rounded-lg border p-3 shadow-sm ${variantMap[merged.variant]} ${props.class ?? ""}`} role="status">
			<Show when={merged.title}>
				<h4 class="mb-0.5 text-sm font-semibold">{merged.title}</h4>
			</Show>
			<div class="text-sm">{merged.children}</div>
		</div>
	);
}
