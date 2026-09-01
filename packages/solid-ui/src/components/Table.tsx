// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TableProps extends JSX.HTMLAttributes<HTMLTableElement> {}

export function Table(props: TableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "w-full caption-bottom text-sm";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<table class={className} {...rest}>
			{local.children}
		</table>
	);
}
