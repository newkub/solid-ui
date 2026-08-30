// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLHRElement> {}

export function Separator(props: SeparatorProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-separator";
	return <hr class={`${base} ${local.class || ""}`.trim()} {...rest} />;
}
