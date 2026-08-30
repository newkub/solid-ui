// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label(props: LabelProps) {
	const [local, rest] = splitProps(props, ["class", "children", "for"]);
	const base = "solidui-label";
	return (
		<label class={`${base} ${local.class || ""}`.trim()} for={local.for} {...rest}>
			{local.children}
		</label>
	);
}
