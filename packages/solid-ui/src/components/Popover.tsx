import { type JSX, mergeProps, Show } from "solid-js";

export interface PopoverProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	children?: JSX.Element;
	content?: JSX.Element;
	class?: string;
}

export function Popover(props: PopoverProps) {
	const merged = mergeProps({ open: false }, props);
	return (
		<div class={`relative inline-block ${merged.class ?? ""}`}>
			{merged.children}
			<Show when={merged.open}>
				<div class="absolute left-0 top-full z-popover mt-2 w-56 rounded-xl border border-border bg-surface p-4 shadow-md">
					{merged.content}
				</div>
			</Show>
		</div>
	);
}
