// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SwitchProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Switch(props: SwitchProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-switch";
	return (
		<button class={`solidui-switch ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</button>
	);
}
