// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ProgressProps extends JSX.ProgressHTMLAttributes<HTMLProgressElement> {}

export function Progress(props: ProgressProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "w-full h-2 rounded-full bg-muted accent-primary";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <progress class={className} {...rest} />;
}
