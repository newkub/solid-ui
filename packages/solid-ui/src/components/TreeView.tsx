// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TreeViewProps extends JSX.HTMLAttributes<HTMLUListElement> {}

export function TreeView(props: TreeViewProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "list-none p-0 m-0 space-y-1";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<ul class={className} {...rest}>
			{local.children}
		</ul>
	);
}
