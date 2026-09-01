// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToggleGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ToggleGroup(props: ToggleGroupProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex items-center gap-1 rounded-lg border bg-card p-1";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
