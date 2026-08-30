// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface AlertProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Alert(props: AlertProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-alert";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
