// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface StepsProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Steps(props: StepsProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex items-center gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
