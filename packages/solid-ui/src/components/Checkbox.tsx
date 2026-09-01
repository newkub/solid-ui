import { createEffect, type JSX, Show, splitProps } from "solid-js";

let checkboxId = 0;

export interface CheckboxProps
	extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked" | "type" | "children"> {
	checked?: boolean;
	indeterminate?: boolean;
	label?: JSX.Element;
	onChange?: (checked: boolean) => void;
}

export function Checkbox(props: CheckboxProps) {
	const [local, rest] = splitProps(props, ["id", "class", "checked", "indeterminate", "label", "onChange"]);
	const id = () => local.id ?? `solidui-checkbox-${checkboxId++}`;

	const base =
		"h-4 w-4 cursor-pointer rounded border border-primary text-primary accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	let inputRef: HTMLInputElement | undefined;

	const setRef = (el: HTMLInputElement) => {
		inputRef = el;
		if (inputRef) inputRef.indeterminate = !!local.indeterminate;
	};

	createEffect(() => {
		if (inputRef) inputRef.indeterminate = !!local.indeterminate;
	});

	const handleChange = (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		local.onChange?.(target.checked);
	};

	const input = (
		<input
			id={id()}
			ref={setRef}
			type="checkbox"
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
