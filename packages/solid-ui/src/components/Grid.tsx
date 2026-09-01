// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface GridProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Grid(props: GridProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "grid gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
