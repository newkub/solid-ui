import { type JSX, splitProps } from "solid-js";

export interface SliderProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value" | "onInput"> {
	min?: number;
	max?: number;
	step?: number;
	value?: number;
	onChange?: (value: number) => void;
	onInput?: JSX.InputHTMLAttributes<HTMLInputElement>["onInput"];
}

export function Slider(props: SliderProps) {
	const [local, rest] = splitProps(props, ["class", "min", "max", "step", "value", "onChange", "onInput", "disabled"]);

	const min = () => local.min ?? 0;
	const max = () => local.max ?? 100;
	const step = () => local.step ?? 1;
	const value = () => local.value ?? min();

	const handleInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (e) => {
		const num = Number.parseFloat(e.currentTarget.value);
		local.onChange?.(Number.isNaN(num) ? min() : num);
		if (typeof local.onInput === "function") {
			local.onInput(e);
		}
	};

	const base = "w-full accent-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	return (
		<input
			type="range"
			class={className()}
			min={min()}
			max={max()}
			step={step()}
			value={value()}
			disabled={local.disabled}
			onInput={handleInput}
			{...rest}
		/>
	);
}
