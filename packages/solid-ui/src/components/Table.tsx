// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TableProps extends JSX.HTMLAttributes<HTMLTableElement> {}

export function Table(props: TableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-table";
	return (
		<table class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</table>
	);
}
