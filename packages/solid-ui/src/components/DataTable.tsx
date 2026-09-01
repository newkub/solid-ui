// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface DataTableProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function DataTable(props: DataTableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "w-full rounded-lg border bg-card text-card-foreground shadow-sm";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
