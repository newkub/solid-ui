import { createSignal, For, type JSX, onCleanup, onMount, Show } from "solid-js";

interface MenuItem {
	label: string;
	icon?: JSX.Element;
	onClick: () => void;
	disabled?: boolean;
}

interface ContextMenuProps {
	items: MenuItem[];
	children: JSX.Element;
	class?: string;
}

export function ContextMenu(props: ContextMenuProps) {
	const [open, setOpen] = createSignal(false);
	const [pos, setPos] = createSignal({ x: 0, y: 0 });
	let rootRef: HTMLDivElement | undefined;

	function onContextMenu(e: MouseEvent) {
		e.preventDefault();
		setPos({ x: e.clientX, y: e.clientY });
		setOpen(true);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") setOpen(false);
	}

	function onClickOutside(e: MouseEvent) {
		if (rootRef && !rootRef.contains(e.target as Node)) setOpen(false);
	}

	onMount(() => {
		document.addEventListener("click", onClickOutside);
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => {
			document.removeEventListener("click", onClickOutside);
			document.removeEventListener("keydown", onKeyDown);
		});
	});

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: wrapper that triggers context menu on right click
		<div ref={rootRef} class={props.class} onContextMenu={onContextMenu}>
			{props.children}
			<Show when={open()}>
				<ul
					class="fixed z-popover min-w-[10rem] rounded-lg border border-border bg-surface p-1 shadow-lg"
					style={{
						left: `${pos().x}px`,
						top: `${pos().y}px`,
					}}
				>
					<For each={props.items}>
						{(item) => (
							<li>
								<button
									type="button"
									role="menuitem"
									disabled={item.disabled}
									class="flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-50"
									onClick={() => {
										item.onClick();
										setOpen(false);
									}}
								>
									{item.icon && <span class="shrink-0">{item.icon}</span>}
									{item.label}
								</button>
							</li>
						)}
					</For>
				</ul>
			</Show>
		</div>
	);
}
