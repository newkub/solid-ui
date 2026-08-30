// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ResizableProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Resizable(props: ResizableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-resizable";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
