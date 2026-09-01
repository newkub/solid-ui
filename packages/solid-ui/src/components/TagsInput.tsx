import { createSignal, For, type JSX, mergeProps, splitProps } from "solid-js";
import { Input } from "./Input";

export interface TagsInputProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange"> {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	inputClass?: string;
}

export function TagsInput(props: TagsInputProps) {
	const merged = mergeProps({ defaultValue: [] as string[], placeholder: "Add tag…" }, props);
	const [local, rest] = splitProps(merged, ["class", "value", "defaultValue", "onChange", "placeholder", "inputClass"]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const [input, setInput] = createSignal("");

	const tags = () => (local.value !== undefined ? local.value : internal());

	const setTags = (next: string[]) => {
		if (local.value === undefined) setInternal(next);
		local.onChange?.(next);
	};

	const addTag = (tag: string) => {
		const trimmed = tag.trim();
		if (!trimmed || tags().includes(trimmed)) return;
		setTags([...tags(), trimmed]);
		setInput("");
	};

	const removeTag = (tag: string) => {
		setTags(tags().filter((t) => t !== tag));
	};

	const removeLastTag = () => {
		const list = tags();
		if (list.length === 0) return;
		setTags(list.slice(0, -1));
	};

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addTag(input());
		} else if (e.key === "Backspace" && input() === "") {
			e.preventDefault();
			removeLastTag();
		}
	};

	const className = () =>
		[
			"flex w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<div class={className()} {...rest}>
			<ul class="m-0 flex list-none flex-wrap items-center gap-1.5 p-0" aria-label="Tags">
				<For each={tags()}>
					{(tag) => (
						<li class="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
							{tag}
							<button
								type="button"
								aria-label={`Remove ${tag}`}
								class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-secondary-foreground hover:bg-secondary-foreground/20"
								onClick={() => removeTag(tag)}
							>
								×
							</button>
						</li>
					)}
				</For>
			</ul>
			<Input
				value={input()}
				onChange={setInput}
				onKeyDown={onKeyDown}
				placeholder={local.placeholder}
				class={`min-w-[80px] flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 ${local.inputClass ?? ""}`}
				aria-label="Add a tag"
			/>
		</div>
	);
}
