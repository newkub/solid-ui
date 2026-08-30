// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "primary" | "secondary" | "destructive" | "ghost" | "link";
	size?: "sm" | "md" | "lg" | "icon";
}

export function Button(props: ButtonProps) {
	const [local, rest] = splitProps(props, ["class", "children", "variant", "size"]);
	const base = "solidui-button";
	const variant = local.variant ? `solidui-button--${local.variant}` : "";
	const size = local.size ? `solidui-button--${local.size}` : "";
	return (
		<button class={`${base} ${variant} ${size} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</button>
	);
}
