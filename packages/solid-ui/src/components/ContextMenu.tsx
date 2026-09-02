import { createSignal, For, type JSX, mergeProps, onCleanup, onMount, Show, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

export interface ContextMenuItem {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
}

export interface ContextMenuProps extends JSX.HTMLAttributes<HTMLButtonElement> {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	items?: ContextMenuItem[];
	children?: JSX.Element;
}

export function ContextMenu(props: ContextMenuProps) {
	const merged = mergeProps({ defaultOpen: false, items: [] as ContextMenuItem[] }, props);
	const [local, rest] = splitProps(merged, [
		"class",
		"open",
		"defaultOpen",
		"onOpenChange",
		"items",
		"children",
		"onContextMenu",
	]);
	const [internal, setInternal] = createSignal(merged.defaultOpen);
	const [pos, setPos] = createSignal({ x: 0, y: 0 });
	let areaRef: HTMLButtonElement | undefined;
	let contentRef: HTMLDivElement | undefined;

	const open = () => (local.open !== undefined ? local.open : internal());
	const setOpen = (value: boolean) => {
		setInternal(value);
		local.onOpenChange?.(value);
	};

	onMount(() => {
		function onMouseDown(e: MouseEvent) {
			const target = e.target as Node;
			if (areaRef?.contains(target) || contentRef?.contains(target)) return;
			setOpen(false);
		}
		function onKeyDown(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("mousedown", onMouseDown);
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => {
			document.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("keydown", onKeyDown);
		});
	});

	const onContextMenu: JSX.EventHandler<HTMLButtonElement, PointerEvent> = (e) => {
		if (typeof local.onContextMenu === "function") {
			local.onContextMenu(e);
		}
		e.preventDefault();
		setPos({ x: e.clientX, y: e.clientY });
		setOpen(true);
	};

	const onItemClick = (item: ContextMenuItem) => {
		if (item.disabled) return;
		item.onClick?.();
		setOpen(false);
	};

	const className = () => ["inline-block", local.class ?? ""].filter(Boolean).join(" ");

	const updatePositionFromTrigger = () => {
		const rect = areaRef?.getBoundingClientRect();
		if (rect) {
			setPos({ x: rect.left, y: rect.bottom });
		}
	};

	const onTriggerKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			updatePositionFromTrigger();
			setOpen(true);
		}
	};

	return (
		<>
			<button
				type="button"
				class={className()}
				ref={areaRef}
				onContextMenu={onContextMenu}
				onKeyDown={onTriggerKeyDown}
				aria-haspopup="menu"
				aria-expanded={open()}
				{...rest}
			>
				{local.children}
			</button>
			<Show when={open()}>
				<Portal>
					<div
						class="fixed z-popover w-48 rounded-xl border border-border bg-surface p-1 shadow-md"
						style={{ top: `${pos().y}px`, left: `${pos().x}px` }}
						ref={contentRef}
						role="menu"
						aria-label="Context menu"
						aria-orientation="vertical"
					>
						<For each={local.items}>
							{(item) => (
								<button
									type="button"
									role="menuitem"
									disabled={item.disabled}
									class={[
										"w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
										item.disabled
											? "cursor-not-allowed text-muted-foreground opacity-50"
											: "text-foreground hover:bg-primary hover:text-primary-foreground",
									].join(" ")}
									onClick={() => onItemClick(item)}
								>
									{item.label}
								</button>
							)}
						</For>
					</div>
				</Portal>
			</Show>
		</>
	);
}
