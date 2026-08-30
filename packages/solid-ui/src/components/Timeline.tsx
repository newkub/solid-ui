// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TimelineProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Timeline(props: TimelineProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-timeline";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
