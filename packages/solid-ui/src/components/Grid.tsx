// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface GridProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Grid(props: GridProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-grid";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
