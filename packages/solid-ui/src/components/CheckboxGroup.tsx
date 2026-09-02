import { createSignal, For, type JSX, mergeProps, Show, splitProps } from "solid-js";

export interface CheckboxGroupOption {
	value: string;
	label?: string;
	disabled?: boolean;
}

export interface CheckboxGroupProps extends Omit<JSX.HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	options?: CheckboxGroupOption[];
	orientation?: "horizontal" | "vertical";
}

let checkboxGroupId = 0;

export function CheckboxGroup(props: CheckboxGroupProps) {
	const merged = mergeProps(
		{ defaultValue: [] as string[], options: [] as CheckboxGroupOption[], orientation: "vertical" },
		props,
	);
	const [local, rest] = splitProps(merged, ["class", "value", "defaultValue", "onChange", "options", "orientation"]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const baseId = `checkboxgroup-${++checkboxGroupId}`;

	const value = () => (local.value !== undefined ? local.value : internal());

	const isSelected = (v: string) => value().includes(v);

	const toggle = (v: string) => {
		const current = value();
		const next = current.includes(v) ? current.filter((i) => i !== v) : [...current, v];
		if (local.value === undefined) setInternal(next);
		local.onChange?.(next);
	};

	const orientationClass = () => (local.orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2");

	const className = () => [orientationClass(), local.class ?? ""].filter(Boolean).join(" ");

	return (
		<fieldset class={className()} aria-label="Checkbox group" {...rest}>
			<For each={local.options}>
				{(option) => {
					const id = `${baseId}-${option.value}`;
					return (
						<label for={id} class="inline-flex cursor-pointer items-center gap-2">
							<input
								id={id}
								type="checkbox"
								value={option.value}
								checked={isSelected(option.value)}
								disabled={option.disabled}
								onChange={() => toggle(option.value)}
								class="h-4 w-4 cursor-pointer rounded border border-primary text-primary accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<Show when={option.label}>
								<span class="text-sm font-medium leading-none text-foreground">{option.label}</span>
							</Show>
						</label>
					);
				}}
			</For>
		</fieldset>
	);
}
