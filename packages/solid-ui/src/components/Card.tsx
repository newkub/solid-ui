import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Card(props: CardProps) {
	const { className, rest } = useClassName(props, "rounded-lg border bg-card text-card-foreground shadow-sm");
	return (
		<div class={className()} {...rest}>
			{props.children}
		</div>
	);
}
