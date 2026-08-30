// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface PaginationProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Pagination(props: PaginationProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-pagination";
	return (
		<nav class={`solidui-pagination ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</nav>
	);
}
