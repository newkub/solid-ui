// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToggleProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	pressed?: boolean;
}

export function Toggle(props: ToggleProps) {
	const [local, rest] = splitProps(props, ["class", "children", "pressed"]);
	const base =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
	const stateClass = local.pressed ? "bg-primary text-primary-foreground" : "";
	const className = [base, stateClass, local.class || ""].filter(Boolean).join(" ");
	return (
		<button type="button" aria-pressed={local.pressed} class={className} {...rest}>
			{local.children}
		</button>
	);
}
