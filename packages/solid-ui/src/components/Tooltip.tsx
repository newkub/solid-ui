import { type JSX, mergeProps, Show } from "solid-js";

export interface TooltipProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: JSX.Element;
	content?: JSX.Element;
	class?: string;
}

export function Tooltip(props: TooltipProps) {
	const merged = mergeProps({ open: false }, props);
	return (
		<div class={`relative inline-block ${merged.class ?? ""}`}>
			{merged.children}
			<Show when={merged.open}>
				<div class="absolute bottom-full left-1/2 z-tooltip mb-2 -translate-x-1/2">
					<div class="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground shadow-md">
						{merged.content}
					</div>
					<div class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-surface" />
				</div>
			</Show>
		</div>
	);
}
