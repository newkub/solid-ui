import { type JSX, splitProps } from "solid-js";

export interface TableProps extends JSX.HTMLAttributes<HTMLTableElement> {}

export function Table(props: TableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["w-full caption-bottom text-sm", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<table class={className()} {...rest}>
			{local.children}
		</table>
	);
}
