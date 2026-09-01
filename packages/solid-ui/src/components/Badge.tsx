// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base =
		"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<span class={className} {...rest}>
			{local.children}
		</span>
	);
}
