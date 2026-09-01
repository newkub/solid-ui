// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FlexProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Flex(props: FlexProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex flex-wrap items-center gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
