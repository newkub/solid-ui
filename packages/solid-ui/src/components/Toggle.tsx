// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToggleProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Toggle(props: ToggleProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-toggle";
	return (
		<button class={`solidui-toggle ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</button>
	);
}
