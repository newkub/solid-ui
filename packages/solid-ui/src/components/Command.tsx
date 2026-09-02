import { createSignal, For, mergeProps, Show } from "solid-js";
import { Input } from "./Input";

export interface CommandItem {
	value: string;
	label: string;
	shortcut?: string;
	onSelect?: () => void;
}

export interface CommandProps {
	items?: CommandItem[];
	placeholder?: string;
	emptyText?: string;
	onSelect?: (item: CommandItem) => void;
	class?: string;
}

export function Command(props: CommandProps) {
	const merged = mergeProps(
		{ items: [] as CommandItem[], placeholder: "Search…", emptyText: "No results found." },
		props,
	);
	const [query, setQuery] = createSignal("");
	const [active, setActive] = createSignal(0);

	const filtered = () => merged.items.filter((item) => item.label.toLowerCase().includes(query().toLowerCase()));

	function select(item: CommandItem, index: number) {
		setActive(index);
		item.onSelect?.();
		props.onSelect?.(item);
	}

	function onKeyDown(e: KeyboardEvent) {
		const list = filtered();
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => Math.min(i + 1, list.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter" && list[active()]) {
			e.preventDefault();
			select(list[active()], active());
		}
	}

	const activeId = () => (filtered()[active()] ? `command-option-${active()}` : undefined);

	return (
		<div class={`w-full rounded-xl border border-border bg-surface p-2 shadow-sm ${props.class ?? ""}`}>
			<Input
				type="text"
				value={query()}
				onInput={(e) => {
					setQuery(e.currentTarget.value);
					setActive(0);
				}}
				onKeyDown={onKeyDown}
				placeholder={merged.placeholder}
				class="h-9 border-0 bg-transparent px-2 focus-visible:ring-0"
				role="combobox"
				aria-autocomplete="list"
				aria-label="Command search"
				aria-expanded={filtered().length > 0}
				aria-controls="command-listbox"
				aria-activedescendant={activeId()}
			/>
			<div id="command-listbox" class="mt-1 max-h-64 overflow-y-auto" role="listbox">
				<Show
					when={filtered().length > 0}
					fallback={<p class="px-2 py-3 text-xs text-muted-foreground">{merged.emptyText}</p>}
				>
					<For each={filtered()}>
						{(item, index) => (
							<button
								type="button"
								id={`command-option-${index()}`}
								role="option"
								aria-selected={index() === active()}
								onClick={() => select(item, index())}
								class={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
									index() === active() ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
								}`}
							>
								<span>{item.label}</span>
								<Show when={item.shortcut}>
									<kbd class="rounded border border-border px-1.5 py-0.5 text-xs opacity-80">{item.shortcut}</kbd>
								</Show>
							</button>
						)}
					</For>
				</Show>
			</div>
		</div>
	);
}
