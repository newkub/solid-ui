import { createSignal, type JSX, mergeProps, onCleanup, Show, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

export interface HoverCardProps {
	children?: JSX.Element;
	content?: JSX.Element;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	class?: string;
}

export function HoverCard(props: HoverCardProps) {
	const merged = mergeProps({ defaultOpen: false }, props);
	const [local, rest] = splitProps(merged, ["class", "children", "content", "open", "defaultOpen", "onOpenChange"]);
	const [internal, setInternal] = createSignal(merged.defaultOpen);
	const [pos, setPos] = createSignal({ top: 0, left: 0 });
	let triggerRef: HTMLButtonElement | undefined;
	let closeTimer: number | undefined;
	const contentId = "hover-card-content";

	const open = () => (local.open !== undefined ? local.open : internal());

	const setOpen = (value: boolean) => {
		setInternal(value);
		local.onOpenChange?.(value);
	};

	const setTrigger = (el: HTMLButtonElement) => {
		triggerRef = el;
	};

	const updatePosition = () => {
		if (triggerRef) {
			const rect = triggerRef.getBoundingClientRect();
			setPos({ top: rect.bottom + 8, left: rect.left });
		}
	};

	const onEnter = () => {
		if (closeTimer) {
			window.clearTimeout(closeTimer);
			closeTimer = undefined;
		}
		updatePosition();
		setOpen(true);
	};

	const onLeave = () => {
		closeTimer = window.setTimeout(() => setOpen(false), 120);
	};

	onCleanup(() => {
		if (closeTimer) window.clearTimeout(closeTimer);
	});

	const className = () => ["relative inline-block", local.class ?? ""].filter(Boolean).join(" ");

	const onContentKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") setOpen(false);
	};

	return (
		<div class={className()} {...rest}>
			<button
				type="button"
				ref={setTrigger}
				onMouseEnter={onEnter}
				onMouseLeave={onLeave}
				onFocus={onEnter}
				onBlur={onLeave}
				aria-haspopup="dialog"
				aria-expanded={open()}
				aria-controls={contentId}
			>
				{local.children}
			</button>
			<Show when={open()}>
				<Portal>
					<div
						id={contentId}
						class="fixed z-popover min-w-[12rem] max-w-xs rounded-xl border border-border bg-surface p-4 shadow-md"
						style={{ top: `${pos().top}px`, left: `${pos().left}px` }}
						onMouseEnter={onEnter}
						onMouseLeave={onLeave}
						onFocus={onEnter}
						onBlur={onLeave}
						onKeyDown={onContentKeyDown}
						role="dialog"
						aria-label="Hover card"
					>
						{local.content}
					</div>
				</Portal>
			</Show>
		</div>
	);
}
