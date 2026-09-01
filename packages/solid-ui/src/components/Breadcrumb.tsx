// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Breadcrumb(props: BreadcrumbProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex items-center gap-1 text-sm text-muted-foreground";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<nav class={className} {...rest}>
			{local.children}
		</nav>
	);
}
