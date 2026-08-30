// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToggleProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	pressed?: boolean;
}

export function Toggle(props: ToggleProps) {
	const [local, rest] = splitProps(props, ["class", "children", "pressed"]);
	const base = "solidui-toggle";
	return (
		<button type="button" aria-pressed={local.pressed} class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</button>
	);
}
