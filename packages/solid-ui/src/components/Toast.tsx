// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToastProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Toast(props: ToastProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-toast";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
