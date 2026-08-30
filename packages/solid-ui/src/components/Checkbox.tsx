// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox(props: CheckboxProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-checkbox";
	return <input type="checkbox" class={`${base} ${local.class || ""}`.trim()} {...rest} />;
}
