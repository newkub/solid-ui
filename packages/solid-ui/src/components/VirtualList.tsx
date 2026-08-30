// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface VirtualListProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function VirtualList(props: VirtualListProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-virtual-list";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
