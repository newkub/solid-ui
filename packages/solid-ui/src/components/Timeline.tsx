// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TimelineProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Timeline(props: TimelineProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "relative pl-4 border-l border-border";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
