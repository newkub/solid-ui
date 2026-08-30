// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface BoxProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Box(props: BoxProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-box";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
