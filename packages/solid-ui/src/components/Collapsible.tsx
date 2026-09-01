import { createContext, createSignal, type JSX, Show, splitProps, useContext } from "solid-js";

interface CollapsibleContextValue {
	open: () => boolean;
	toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue>();

export interface CollapsibleProps extends JSX.HTMLAttributes<HTMLDivElement> {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function Collapsible(props: CollapsibleProps) {
	const [local, rest] = splitProps(props, ["class", "open", "defaultOpen", "onOpenChange", "children"]);
	const [internal, setInternal] = createSignal(local.defaultOpen ?? false);

	const open = () => (local.open !== undefined ? local.open : internal());
	const toggle = () => {
		const next = !open();
		setInternal(next);
		local.onOpenChange?.(next);
	};

	const className = () => ["w-full", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<CollapsibleContext.Provider value={{ open, toggle }}>
			<div class={className()} {...rest}>
				{local.children}
			</div>
		</CollapsibleContext.Provider>
	);
}

export interface CollapsibleTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
	const ctx = useContext(CollapsibleContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick"]);

	if (!ctx) {
		throw new Error("Collapsible.Trigger must be used inside a Collapsible.");
	}

	const className = () =>
		[
			"inline-flex w-full items-center justify-between rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		ctx.toggle();
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<button type="button" class={className()} onClick={onClick} aria-expanded={ctx.open()} {...rest}>
			{local.children}
			<svg
				class={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${ctx.open() ? "rotate-180" : ""}`}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</button>
	);
}

export interface CollapsibleContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CollapsibleContent(props: CollapsibleContentProps) {
	const ctx = useContext(CollapsibleContext);
	const [local, rest] = splitProps(props, ["class", "children"]);

	if (!ctx) {
		throw new Error("Collapsible.Content must be used inside a Collapsible.");
	}

	const className = () =>
		["overflow-hidden text-sm text-muted-foreground", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<Show when={ctx.open()}>
			<div class={className()} {...rest}>
				{local.children}
			</div>
		</Show>
	);
}
