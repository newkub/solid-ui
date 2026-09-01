import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface BoxProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Box(props: BoxProps) {
	const { className, rest } = useClassName(props, "rounded-lg border bg-card text-card-foreground shadow-sm p-4");
	return (
		<div class={className()} {...rest}>
			{props.children}
		</div>
	);
}
