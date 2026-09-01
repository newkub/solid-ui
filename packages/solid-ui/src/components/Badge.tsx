import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface BadgeProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProps) {
	const { className, rest } = useClassName(
		props,
		"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	);
	return (
		<span class={className()} {...rest}>
			{props.children}
		</span>
	);
}
