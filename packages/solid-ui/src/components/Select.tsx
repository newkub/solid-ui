// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SelectProps extends JSX.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select(props: SelectProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-select";
	return (
		<select class={`solidui-select ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</select>
	);
}
