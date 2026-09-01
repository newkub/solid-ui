// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ChartProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Chart(props: ChartProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "w-full h-64 rounded-lg border bg-card text-card-foreground shadow-sm p-4";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
