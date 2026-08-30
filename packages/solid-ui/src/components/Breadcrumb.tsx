// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Breadcrumb(props: BreadcrumbProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-breadcrumb";
	return (
		<nav class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</nav>
	);
}
