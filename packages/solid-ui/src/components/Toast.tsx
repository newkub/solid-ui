// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToastProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Toast(props: ToastProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "rounded-lg border bg-card text-card-foreground shadow-sm p-4";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
