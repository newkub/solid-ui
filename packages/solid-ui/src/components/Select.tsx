import { type JSX, splitProps } from "solid-js";

export interface SelectProps extends Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
	value?: string;
	onChange?: (value: string) => void;
}

export function Select(props: SelectProps) {
	const [local, rest] = splitProps(props, ["class", "children", "value", "onChange", "disabled"]);

	const handleChange: JSX.EventHandler<HTMLSelectElement, Event> = (e) => {
		local.onChange?.(e.currentTarget.value);
	};

	const base =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	return (
		<select class={className()} value={local.value} onChange={handleChange} disabled={local.disabled} {...rest}>
			{local.children}
		</select>
	);
}
