import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface BoxProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Box(props: BoxProps) {
	const { className, rest } = useClassName(props, "");
	return (
		<div class={className()} {...rest}>
			{props.children}
		</div>
	);
}
