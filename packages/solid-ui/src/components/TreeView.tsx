// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TreeViewProps extends JSX.HTMLAttributes<HTMLUListElement> {}

export function TreeView(props: TreeViewProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-tree-view";
	return (
		<ul class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</ul>
	);
}
