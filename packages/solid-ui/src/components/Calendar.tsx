// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CalendarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Calendar(props: CalendarProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-calendar";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
