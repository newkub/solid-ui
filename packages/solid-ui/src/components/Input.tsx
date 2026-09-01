import { type JSX, splitProps } from "solid-js";

export interface InputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "onChange" | "onInput" | "value"> {
	value?: string;
	onChange?: (value: string) => void;
	onInput?: JSX.InputEventHandler<HTMLInputElement, InputEvent>;
}

export function Input(props: InputProps) {
	const [local, rest] = splitProps(props, ["class", "value", "onChange", "onInput"]);

	const handleInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (e) => {
		local.onChange?.(e.currentTarget.value);
		if (typeof local.onInput === "function") {
			local.onInput(e);
		}
	};

	const base =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
	const className = () => [base, local.class ?? ""].filter(Boolean).join(" ");

	return <input class={className()} type="text" value={local.value} onInput={handleInput} {...rest} />;
}
