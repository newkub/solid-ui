// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FlexProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Flex(props: FlexProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-flex";
	return (
		<div class={`solidui-flex ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
