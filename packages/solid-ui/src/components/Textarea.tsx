import { type JSX, splitProps } from "solid-js";

export interface TextareaProps
	extends Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "onInput"> {
	value?: string;
	onChange?: (value: string) => void;
	onInput?: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>["onInput"];
}

export function Textarea(props: TextareaProps) {
	const [local, rest] = splitProps(props, ["class", "children", "value", "onChange", "onInput"]);

	const handleInput: JSX.InputEventHandler<HTMLTextAreaElement, InputEvent> = (e) => {
		local.onChange?.(e.currentTarget.value);
		if (typeof local.onInput === "function") {
			local.onInput(e);
		}
	};

	const base =
		"flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	return (
		<textarea class={className()} value={local.value} onInput={handleInput} {...rest}>
			{local.children}
		</textarea>
	);
}
