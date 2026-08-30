// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ProgressProps extends JSX.ProgressHTMLAttributes<HTMLProgressElement> {}

export function Progress(props: ProgressProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-progress";
	return <progress class={`solidui-progress ${local.class || ""}`.trim()} {...rest} />;
}
