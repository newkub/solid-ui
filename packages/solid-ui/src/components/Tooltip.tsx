// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TooltipProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Tooltip(props: TooltipProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-tooltip";
	return (
		<div class={`solidui-tooltip ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
