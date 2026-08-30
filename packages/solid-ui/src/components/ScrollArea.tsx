// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ScrollAreaProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea(props: ScrollAreaProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-scroll-area";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
