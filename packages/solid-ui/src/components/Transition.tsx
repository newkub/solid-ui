// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TransitionProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Transition(props: TransitionProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "transition-all duration-300";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
