// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TooltipProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Tooltip(props: TooltipProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "rounded-md border bg-surface px-3 py-1.5 text-sm text-foreground shadow-md";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
