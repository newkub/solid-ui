import { createSignal, For, type JSX, mergeProps, Show, splitProps } from "solid-js";

export interface MultiSelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface MultiSelectProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
	options?: MultiSelectOption[];
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	triggerClass?: string;
	listClass?: string;
}

let multiSelectId = 0;

export function MultiSelect(props: MultiSelectProps) {
	const merged = mergeProps(
		{ options: [] as MultiSelectOption[], defaultValue: [] as string[], placeholder: "Select options…" },
		props,
	);
	const [local, rest] = splitProps(merged, [
		"class",
		"options",
		"value",
		"defaultValue",
		"onChange",
		"placeholder",
		"triggerClass",
		"listClass",
	]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const [open, setOpen] = createSignal(false);
	const [active, setActive] = createSignal(0);
	const id = `multiselect-${++multiSelectId}`;
	const listboxId = `${id}-listbox`;

	const selected = () => (local.value !== undefined ? local.value : internal());

	const selectedOptions = () => local.options.filter((o) => selected().includes(o.value));

	const toggle = (v: string) => {
		const current = selected();
		const next = current.includes(v) ? current.filter((i) => i !== v) : [...current, v];
		if (local.value === undefined) setInternal(next);
		local.onChange?.(next);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => Math.min(i + 1, local.options.length - 1));
			if (!open()) setOpen(true);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
			if (!open()) setOpen(true);
		} else if (e.key === "Enter") {
			e.preventDefault();
			const option = local.options[active()];
			if (option && !option.disabled) toggle(option.value);
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	};

	const onOptionMouseDown = (e: MouseEvent) => {
		e.preventDefault();
	};

	const onOptionKeyDown = (e: KeyboardEvent, option: MultiSelectOption) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (!option.disabled) toggle(option.value);
		}
	};

	const className = () => ["relative w-full", local.class ?? ""].filter(Boolean).join(" ");
	const triggerClassName = () =>
		[
			"flex w-full items-center justify-between whitespace-normal rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			local.triggerClass ?? "",
		]
			.filter(Boolean)
			.join(" ");
	const listClassName = () =>
		[
			"absolute z-popover mt-1 max-h-64 w-full overflow-auto rounded-xl border border-border bg-surface p-1 shadow-md",
			local.listClass ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<div class={className()} {...rest}>
			<div class="mb-1.5 flex flex-wrap items-center gap-1.5">
				<For each={selectedOptions()}>
					{(option) => (
						<span class="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
							{option.label}
							<button
								type="button"
								aria-label={`Remove ${option.label}`}
								class="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-primary-foreground hover:bg-primary-foreground/20"
								onClick={() => toggle(option.value)}
							>
								×
							</button>
						</span>
					)}
				</For>
			</div>
			<button
				type="button"
				class={triggerClassName()}
				onClick={() => setOpen(!open())}
				onKeyDown={onKeyDown}
				aria-haspopup="listbox"
				aria-expanded={open()}
				aria-controls={listboxId}
				aria-label="Multi-select"
			>
				{selected().length === 0 ? local.placeholder : `${selected().length} selected`}
				<span aria-hidden="true">▾</span>
			</button>
			<Show when={open()}>
				<div class={listClassName()} id={listboxId} role="listbox" aria-multiselectable="true" aria-label="Options">
					<For each={local.options}>
						{(option, index) => (
							<div
								id={`${id}-option-${index()}`}
								role="option"
								aria-selected={selected().includes(option.value)}
								aria-disabled={option.disabled}
								tabIndex={-1}
								class={[
									"cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									index() === active() ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
									option.disabled ? "cursor-not-allowed opacity-50" : "",
								].join(" ")}
								onMouseDown={onOptionMouseDown}
								onClick={() => !option.disabled && toggle(option.value)}
								onKeyDown={(e) => onOptionKeyDown(e, option)}
							>
								<span>{selected().includes(option.value) ? "✓ " : ""}</span>
								{option.label}
							</div>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
}
