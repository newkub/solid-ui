// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "primary" | "secondary" | "destructive" | "ghost" | "link";
	size?: "sm" | "md" | "lg" | "icon";
}

export function Button(props: ButtonProps) {
	const [local, rest] = splitProps(props, ["class", "children", "variant", "size"]);
	const base =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
	const variantClass =
		local.variant === "secondary"
			? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
			: local.variant === "destructive"
				? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
				: local.variant === "ghost"
					? "hover:bg-accent hover:text-accent-foreground"
					: local.variant === "link"
						? "text-primary underline-offset-4 hover:underline"
						: "bg-primary text-primary-foreground hover:bg-primary/90";
	const sizeClass =
		local.size === "sm"
			? "h-8 px-3 text-xs"
			: local.size === "lg"
				? "h-10 px-8"
				: local.size === "icon"
					? "h-9 w-9"
					: "h-9 px-4 py-2";
	const className = [base, variantClass, sizeClass, local.class || ""].filter(Boolean).join(" ");
	return (
		<button type="button" class={className} {...rest}>
			{local.children}
		</button>
	);
}
