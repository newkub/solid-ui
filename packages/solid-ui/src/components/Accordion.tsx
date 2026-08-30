// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface AccordionProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Accordion(props: AccordionProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-accordion";
	return (
		<div class={`solidui-accordion ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
