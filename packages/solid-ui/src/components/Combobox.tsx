import { createSignal, For, type JSX, mergeProps, Show, splitProps } from "solid-js";
import { Input } from "./Input";

export interface ComboboxOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface ComboboxProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
	options?: ComboboxOption[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	emptyText?: string;
	disabled?: boolean;
	inputClass?: string;
	listClass?: string;
}

let comboboxId = 0;

export function Combobox(props: ComboboxProps) {
	const merged = mergeProps(
		{ options: [] as ComboboxOption[], placeholder: "Select an option…", emptyText: "No results found." },
		props,
	);
	const [local, rest] = splitProps(merged, [
		"class",
		"options",
		"value",
		"defaultValue",
		"onChange",
		"placeholder",
		"emptyText",
		"inputClass",
		"listClass",
		"disabled",
	]);
	const [internal, setInternal] = createSignal(merged.defaultValue ?? "");
	const [open, setOpen] = createSignal(false);
	const [query, setQuery] = createSignal("");
	const [active, setActive] = createSignal(0);
	const id = `combobox-${++comboboxId}`;
	const listboxId = `${id}-listbox`;

	const selected = () => (local.value !== undefined ? local.value : internal());

	const selectedLabel = () => local.options.find((o) => o.value === selected())?.label ?? "";

	const filtered = () => local.options.filter((o) => o.label.toLowerCase().includes(query().toLowerCase()));

	const setSelected = (next: string) => {
		if (local.value === undefined) setInternal(next);
		local.onChange?.(next);
		const label = local.options.find((o) => o.value === next)?.label ?? "";
		setQuery(label);
		setOpen(false);
	};

	const onInput = (value: string) => {
		setQuery(value);
		setOpen(true);
		setActive(0);
	};

	const onKeyDown = (e: KeyboardEvent) => {
		const list = filtered();
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => Math.min(i + 1, list.length - 1));
			if (!open()) setOpen(true);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
			if (!open()) setOpen(true);
		} else if (e.key === "Enter") {
			e.preventDefault();
			const item = list[active()];
			if (item) setSelected(item.value);
		} else if (e.key === "Escape") {
			setOpen(false);
		}
	};

	const onOptionMouseDown = (e: MouseEvent) => {
		e.preventDefault();
	};

	const onOptionClick = (item: ComboboxOption) => {
		if (item.disabled) return;
		setSelected(item.value);
	};

	const onOptionKeyDown = (e: KeyboardEvent, item: ComboboxOption) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onOptionClick(item);
		}
	};

	const displayValue = () => (open() ? query() : selectedLabel());

	const className = () => ["relative w-full", local.class ?? ""].filter(Boolean).join(" ");
	const listClassName = () =>
		[
			"absolute z-popover mt-1 max-h-64 w-full overflow-auto rounded-xl border border-border bg-surface p-1 shadow-md",
			local.listClass ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<div class={className()} {...rest}>
			<Input
				value={displayValue()}
				onChange={onInput}
				onKeyDown={onKeyDown}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				placeholder={local.placeholder}
				disabled={local.disabled}
				class={local.inputClass}
				role="combobox"
				aria-expanded={open()}
				aria-controls={listboxId}
				aria-autocomplete="list"
				aria-activedescendant={open() && filtered()[active()] ? `${id}-option-${active()}` : undefined}
			/>
			<Show when={open()}>
				<div class={listClassName()} id={listboxId} role="listbox" aria-label="Options">
					<Show
						when={filtered().length > 0}
						fallback={<div class="px-2 py-3 text-xs text-muted-foreground">{local.emptyText}</div>}
					>
						<For each={filtered()}>
							{(option, index) => (
								<div
									id={`${id}-option-${index()}`}
									role="option"
									aria-selected={selected() === option.value}
									aria-disabled={option.disabled}
									tabIndex={-1}
									class={[
										"cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										index() === active() ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted",
										option.disabled ? "cursor-not-allowed opacity-50" : "",
									].join(" ")}
									onMouseDown={onOptionMouseDown}
									onClick={() => onOptionClick(option)}
									onKeyDown={(e) => onOptionKeyDown(e, option)}
								>
									{option.label}
								</div>
							)}
						</For>
					</Show>
				</div>
			</Show>
		</div>
	);
}
