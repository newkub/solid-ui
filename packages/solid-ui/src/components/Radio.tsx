// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface RadioProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Radio(props: RadioProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-radio";
	return <input class={`solidui-radio ${local.class || ""}`.trim()} {...rest} />;
}
