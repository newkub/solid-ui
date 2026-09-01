// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SliderProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Slider(props: SliderProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "w-full accent-primary cursor-pointer";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <input type="range" class={className} {...rest} />;
}
