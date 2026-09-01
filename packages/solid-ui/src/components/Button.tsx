import type { JSX } from "solid-js";
import { useButton } from "../hooks/useButton";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "primary" | "secondary" | "destructive" | "ghost" | "link";
	size?: "sm" | "md" | "lg" | "icon";
}

export function Button(props: ButtonProps) {
	const { className, rest } = useButton(props);
	return (
		<button type="button" class={className()} {...rest}>
			{props.children}
		</button>
	);
}
