import { type JSX, splitProps } from "solid-js";

export interface ToggleProps extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> {
	pressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	value?: string;
}

export function Toggle(props: ToggleProps) {
	const [local, rest] = splitProps(props, [
		"class",
		"children",
		"pressed",
		"onPressedChange",
		"onClick",
		"disabled",
		"value",
	]);

	const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
		if (local.disabled) return;
		const next = !local.pressed;
		local.onPressedChange?.(next);
		if (typeof local.onClick === "function") {
			local.onClick(e);
		}
	};

	const base =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
	const stateClass = () => (local.pressed ? "bg-primary text-primary-foreground" : "");
	const className = () => [base, stateClass(), local.class || ""].filter(Boolean).join(" ");

	return (
		<button
			type="button"
			aria-pressed={local.pressed}
			disabled={local.disabled}
			onClick={handleClick}
			class={className()}
			{...rest}
		>
			{local.children ?? local.value}
		</button>
	);
}
