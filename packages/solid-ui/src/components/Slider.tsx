// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SliderProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Slider(props: SliderProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-slider";
	return <input type="range" class={`${base} ${local.class || ""}`.trim()} {...rest} />;
}
