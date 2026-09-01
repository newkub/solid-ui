import { createEffect, createSignal, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { Command, type CommandItem } from "./Command";

export interface CommandPaletteProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	items?: CommandItem[];
	placeholder?: string;
	emptyText?: string;
	onSelect?: (item: CommandItem) => void;
	class?: string;
}

export function CommandPalette(props: CommandPaletteProps) {
	const merged = mergeProps(
		{
			open: false,
			items: [] as CommandItem[],
			placeholder: "Type a command or search…",
			emptyText: "No commands found.",
		},
		props,
	);
	const [internalOpen, setInternalOpen] = createSignal(merged.open);

	createEffect(() => setInternalOpen(merged.open));

	function setOpen(value: boolean) {
		setInternalOpen(value);
		props.onOpenChange?.(value);
	}

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setOpen(!internalOpen());
			}
			if (e.key === "Escape" && internalOpen()) {
				setOpen(false);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => document.removeEventListener("keydown", onKeyDown));
	});

	return (
		<Show when={internalOpen()}>
			<div
				class="fixed inset-0 z-modal bg-overlay/60 p-4 backdrop-blur-sm"
				onClick={() => setOpen(false)}
				onKeyDown={(e) => {
					if (e.key === "Escape") setOpen(false);
				}}
				role="dialog"
				aria-modal="true"
				tabIndex={-1}
			>
				<div
					class={`mx-auto mt-16 w-full max-w-lg rounded-xl border border-border bg-surface p-2 shadow-xl ${props.class ?? ""}`}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					role="document"
					tabIndex={-1}
				>
					<Command
						items={merged.items}
						placeholder={merged.placeholder}
						emptyText={merged.emptyText}
						onSelect={(item) => {
							item.onSelect?.();
							props.onSelect?.(item);
							setOpen(false);
						}}
					/>
				</div>
			</div>
		</Show>
	);
}
