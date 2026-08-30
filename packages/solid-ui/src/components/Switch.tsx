// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SwitchProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	checked?: boolean;
}

export function Switch(props: SwitchProps) {
	const [local, rest] = splitProps(props, ["class", "children", "checked"]);
	const base = "solidui-switch";
	return (
		<button
			type="button"
			role="switch"
			aria-checked={local.checked}
			class={`${base} ${local.class || ""}`.trim()}
			{...rest}
		>
			{local.children}
		</button>
	);
}
