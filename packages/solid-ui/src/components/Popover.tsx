// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface PopoverProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Popover(props: PopoverProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-popover";
	return (
		<div class={`solidui-popover ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
