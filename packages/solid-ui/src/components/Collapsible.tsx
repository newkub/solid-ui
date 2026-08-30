// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CollapsibleProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Collapsible(props: CollapsibleProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-collapsible";
	return (
		<div class={`solidui-collapsible ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
