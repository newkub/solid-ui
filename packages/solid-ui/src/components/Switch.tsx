// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SwitchProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	checked?: boolean;
}

export function Switch(props: SwitchProps) {
	const [local, rest] = splitProps(props, ["class", "children", "checked"]);
	const base =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
	const stateClass = local.checked ? "bg-primary text-primary-foreground" : "";
	const className = [base, stateClass, local.class || ""].filter(Boolean).join(" ");
	return (
		<button type="button" role="switch" aria-checked={local.checked} class={className} {...rest}>
			{local.children}
		</button>
	);
}
