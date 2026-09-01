import { type JSX, splitProps } from "solid-js";

export interface SwitchProps
	extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "aria-checked"> {
	checked?: boolean;
	onChange?: (checked: boolean) => void;
}

export function Switch(props: SwitchProps) {
	const [local, rest] = splitProps(props, ["class", "children", "checked", "onChange", "disabled", "onClick"]);

	const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
		if (local.disabled) return;
		const next = !local.checked;
		local.onChange?.(next);
		if (typeof local.onClick === "function") {
			local.onClick(e);
		}
	};

	const trackClass = () =>
		[
			"relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
			local.checked ? "bg-primary" : "bg-input",
		].join(" ");

	const thumbClass = () =>
		[
			"pointer-events-none block h-4 w-4 rounded-full shadow-sm ring-0 transition-transform",
			local.checked ? "translate-x-4 bg-primary-foreground" : "translate-x-0 bg-foreground",
		].join(" ");

	const className = () =>
		[
			"inline-flex items-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
			local.class || "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<button
			type="button"
			role="switch"
			aria-checked={local.checked}
			disabled={local.disabled}
			onClick={handleClick}
			class={className()}
			{...rest}
		>
			<span class={trackClass()}>
				<span class={thumbClass()} />
			</span>
			{local.children}
		</button>
	);
}
