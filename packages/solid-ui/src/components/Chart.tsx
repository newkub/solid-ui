// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ChartProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Chart(props: ChartProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-chart";
	return (
		<div class={`solidui-chart ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
