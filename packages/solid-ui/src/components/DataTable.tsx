// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface DataTableProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function DataTable(props: DataTableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-data-table";
	return (
		<div class={`solidui-data-table ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
