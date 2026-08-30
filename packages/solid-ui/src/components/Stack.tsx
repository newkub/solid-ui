// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Stack(props: StackProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-stack";
	return (
		<div class={`solidui-stack ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
