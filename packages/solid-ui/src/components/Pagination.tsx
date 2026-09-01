// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface PaginationProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Pagination(props: PaginationProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex items-center gap-1";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<nav class={className} {...rest}>
			{local.children}
		</nav>
	);
}
