import { createSignal, For, type JSX, mergeProps, Show, splitProps } from "solid-js";

export interface RadioGroupOption {
	value: string;
	label?: string;
	disabled?: boolean;
}

export interface RadioGroupProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	name?: string;
	options?: RadioGroupOption[];
	orientation?: "horizontal" | "vertical";
}

let radioGroupId = 0;

export function RadioGroup(props: RadioGroupProps) {
	const merged = mergeProps({ defaultValue: "", options: [] as RadioGroupOption[], orientation: "vertical" }, props);
	const [local, rest] = splitProps(merged, [
		"class",
		"value",
		"defaultValue",
		"onChange",
		"name",
		"options",
		"orientation",
	]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const baseId = `radiogroup-${++radioGroupId}`;

	const value = () => (local.value !== undefined ? local.value : internal());

	const setValue = (next: string) => {
		if (local.value === undefined) setInternal(next);
		local.onChange?.(next);
	};

	const orientationClass = () => (local.orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2");

	const className = () => [orientationClass(), local.class ?? ""].filter(Boolean).join(" ");

	return (
		<div
			class={className()}
			role="radiogroup"
			aria-orientation={local.orientation as "horizontal" | "vertical" | undefined}
			aria-label={local.name ?? "Radio group"}
			{...rest}
		>
			<For each={local.options}>
				{(option) => {
					const id = `${baseId}-${option.value}`;
					return (
						<label for={id} class="inline-flex cursor-pointer items-center gap-2">
							<input
								id={id}
								type="radio"
								name={local.name ?? baseId}
								value={option.value}
								checked={value() === option.value}
								disabled={option.disabled}
								onChange={() => setValue(option.value)}
								class="h-4 w-4 cursor-pointer rounded-full border border-primary text-primary accent-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							/>
							<Show when={option.label}>
								<span class="text-sm font-medium leading-none text-foreground">{option.label}</span>
							</Show>
						</label>
					);
				}}
			</For>
		</div>
	);
}
