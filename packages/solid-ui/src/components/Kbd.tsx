import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface KbdProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Kbd(props: KbdProps) {
	const { className, rest } = useClassName(
		props,
		"inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-foreground shadow-sm",
	);
	return (
		<kbd class={className()} {...rest}>
			{props.children}
		</kbd>
	);
}
