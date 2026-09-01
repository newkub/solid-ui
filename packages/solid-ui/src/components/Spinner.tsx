// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SpinnerProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Spinner(props: SpinnerProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
