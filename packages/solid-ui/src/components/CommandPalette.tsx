import { createEffect, createSignal, mergeProps, onCleanup, onMount, Show } from "solid-js";
import { createFocusTrap } from "../hooks/useFocusTrap";
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

	function CommandPaletteContent(localProps: {
		setOpen: (value: boolean) => void;
		class?: string;
		items?: CommandItem[];
		placeholder?: string;
		emptyText?: string;
		onSelect?: (item: CommandItem) => void;
	}) {
		let contentRef: HTMLDivElement | undefined;

		onMount(() => {
			const trap = contentRef ? createFocusTrap(contentRef) : null;
			trap?.activate();
			onCleanup(() => trap?.deactivate());
		});

		return (
			<div
				ref={(el) => (contentRef = el)}
				class="fixed inset-0 z-modal bg-overlay/60 p-4 backdrop-blur-sm"
				onClick={() => localProps.setOpen(false)}
				onKeyDown={(e) => {
					if (e.key === "Escape") localProps.setOpen(false);
				}}
				role="dialog"
				aria-modal="true"
				aria-label="Command palette"
				tabIndex={-1}
			>
				<div
					class={`mx-auto mt-16 w-full max-w-lg rounded-xl border border-border bg-surface p-2 shadow-xl ${localProps.class ?? ""}`}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					role="document"
					tabIndex={-1}
				>
					<Command
						items={localProps.items}
						placeholder={localProps.placeholder}
						emptyText={localProps.emptyText}
						onSelect={(item) => {
							item.onSelect?.();
							localProps.onSelect?.(item);
							localProps.setOpen(false);
						}}
					/>
				</div>
			</div>
		);
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
			<CommandPaletteContent
				setOpen={setOpen}
				class={props.class}
				items={merged.items}
				placeholder={merged.placeholder}
				emptyText={merged.emptyText}
				onSelect={props.onSelect}
			/>
		</Show>
	);
}
