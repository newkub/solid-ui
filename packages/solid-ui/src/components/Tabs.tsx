// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TabsProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Tabs(props: TabsProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "w-full";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
