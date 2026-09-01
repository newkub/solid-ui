// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface StackProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Stack(props: StackProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex flex-col gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
