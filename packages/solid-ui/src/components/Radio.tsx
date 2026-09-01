import { type JSX, Show, splitProps } from "solid-js";

let radioId = 0;

export interface RadioProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "type" | "children"> {
	checked?: boolean;
	label?: JSX.Element;
	value?: string;
	onChange?: (value: string) => void;
}

export function Radio(props: RadioProps) {
	const [local, rest] = splitProps(props, ["id", "class", "checked", "label", "value", "onChange"]);
	const id = () => local.id ?? `solidui-radio-${radioId++}`;

	const base =
		"h-4 w-4 cursor-pointer rounded-full border border-primary text-primary accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	const handleChange = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		if (target.checked) local.onChange?.(target.value);
	};

	const input = (
		<input
			id={id()}
			type="radio"
			value={local.value}
			checked={local.checked}
			onChange={handleChange}
			class={className()}
			{...rest}
		/>
	);

	return (
		<Show when={local.label} fallback={input}>
			<label for={id()} class="inline-flex cursor-pointer items-center gap-2">
				{input}
				<span class="text-sm font-medium leading-none text-foreground">{local.label}</span>
			</label>
		</Show>
	);
}
