// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-badge";
	return (
		<span class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</span>
	);
}
