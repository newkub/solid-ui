// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-input";
	return <input class={`${base} ${local.class || ""}`.trim()} {...rest} />;
}
