import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface SpinnerProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Spinner(props: SpinnerProps) {
	const { className, rest } = useClassName(
		props,
		"h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent",
	);
	return (
		<div class={className()} role="status" aria-label="Loading" {...rest}>
			<span class="sr-only">Loading</span>
		</div>
	);
}
