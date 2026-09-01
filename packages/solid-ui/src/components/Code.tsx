import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface CodeProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Code(props: CodeProps) {
	const { className, rest } = useClassName(props, "rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground");
	return (
		<code class={className()} {...rest}>
			{props.children}
		</code>
	);
}
