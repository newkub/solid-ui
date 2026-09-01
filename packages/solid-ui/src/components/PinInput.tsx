import { createSignal, For, type JSX, mergeProps, splitProps } from "solid-js";

export interface PinInputProps extends Omit<JSX.HTMLAttributes<HTMLFieldSetElement>, "onChange"> {
	length?: number;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	onComplete?: (value: string) => void;
	inputClass?: string;
}

let pinInputId = 0;

export function PinInput(props: PinInputProps) {
	const merged = mergeProps({ length: 4, defaultValue: "" }, props);
	const [local, rest] = splitProps(merged, [
		"class",
		"length",
		"value",
		"defaultValue",
		"onChange",
		"onComplete",
		"inputClass",
	]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const baseId = `pininput-${++pinInputId}`;

	const value = () => (local.value !== undefined ? local.value : internal());

	const chars = () => {
		const list = value().split("").slice(0, local.length);
		while (list.length < local.length) list.push("");
		return list;
	};

	const inputRefs: HTMLInputElement[] = [];

	const isComplete = (next: string) => next.length === local.length && [...next].every((c) => c !== "");

	const update = (next: string) => {
		const clamped = next.slice(0, local.length);
		if (local.value === undefined) setInternal(clamped);
		local.onChange?.(clamped);
		if (isComplete(clamped)) {
			local.onComplete?.(clamped);
		}
	};

	const setChar = (index: number, char: string) => {
		const list = chars();
		list[index] = char.slice(-1);
		update(list.join(""));
	};

	const focusNext = (index: number) => {
		if (index < local.length - 1) {
			inputRefs[index + 1]?.focus();
			inputRefs[index + 1]?.select();
		}
	};

	const focusPrev = (index: number) => {
		if (index > 0) {
			inputRefs[index - 1]?.focus();
			inputRefs[index - 1]?.select();
		}
	};

	const clear = (index: number) => {
		const list = chars();
		list[index] = "";
		update(list.join(""));
	};

	const onInput = (index: number, e: InputEvent & { currentTarget: HTMLInputElement }) => {
		const newValue = e.currentTarget.value;
		if (!newValue) return;
		setChar(index, newValue);
		focusNext(index);
	};

	const onKeyDown = (index: number, e: KeyboardEvent) => {
		if (e.key === "Backspace") {
			e.preventDefault();
			if (chars()[index]) {
				clear(index);
			} else {
				focusPrev(index);
			}
		} else if (e.key === "ArrowLeft") {
			e.preventDefault();
			focusPrev(index);
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			focusNext(index);
		}
	};

	const onPaste = (e: ClipboardEvent & { currentTarget: HTMLInputElement }) => {
		e.preventDefault();
		const text = e.clipboardData?.getData("text");
		if (!text) return;
		const clean = text.replace(/\s/g, "").slice(0, local.length);
		const list = chars();
		for (let i = 0; i < clean.length; i++) {
			if (i < local.length) list[i] = clean[i];
		}
		update(list.join(""));
		const lastIndex = Math.min(clean.length, local.length) - 1;
		if (lastIndex >= 0) {
			inputRefs[lastIndex]?.focus();
			inputRefs[lastIndex]?.select();
		}
	};

	const className = () => ["flex items-center gap-2", local.class ?? ""].filter(Boolean).join(" ");
	const inputClassName = () =>
		[
			"h-10 w-10 rounded-md border border-input bg-background text-center text-lg font-semibold text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			local.inputClass ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<fieldset class={className()} aria-label="Pin input" {...rest}>
			<For each={chars()}>
				{(char, index) => {
					const i = index();
					return (
						<input
							id={`${baseId}-${i}`}
							ref={(el) => (inputRefs[i] = el)}
							type="text"
							inputMode="numeric"
							maxLength={1}
							value={char}
							onInput={(e) => onInput(i, e as InputEvent & { currentTarget: HTMLInputElement })}
							onKeyDown={(e) => onKeyDown(i, e)}
							onPaste={(e) => onPaste(e as ClipboardEvent & { currentTarget: HTMLInputElement })}
							class={inputClassName()}
							aria-label={`Pin digit ${i + 1} of ${local.length}`}
						/>
					);
				}}
			</For>
		</fieldset>
	);
}
