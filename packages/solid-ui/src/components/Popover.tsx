// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface PopoverProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Popover(props: PopoverProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "rounded-lg border bg-card text-card-foreground shadow-sm p-4";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
