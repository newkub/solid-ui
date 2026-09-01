import { type JSX, splitProps } from "solid-js";

export interface DatePickerProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> {
	value?: string;
	onChange?: (value: string) => void;
}

export function DatePicker(props: DatePickerProps) {
	const [local, rest] = splitProps(props, ["class", "value", "onChange", "disabled"]);

	const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
		local.onChange?.(e.currentTarget.value);
	};

	const base =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	return (
		<input
			type="date"
			class={className()}
			value={local.value}
			disabled={local.disabled}
			onChange={handleChange}
			{...rest}
		/>
	);
}
