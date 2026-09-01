import {
	type Accessor,
	createContext,
	createSignal,
	type JSX,
	mergeProps,
	onCleanup,
	onMount,
	Show,
	splitProps,
	useContext,
} from "solid-js";

interface DropdownMenuContextValue {
	open: Accessor<boolean>;
	toggle: () => void;
	setOpen: (open: boolean) => void;
	trigger: Accessor<HTMLElement | undefined>;
	content: Accessor<HTMLElement | undefined>;
	setTrigger: (el: HTMLElement) => void;
	setContent: (el: HTMLElement) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>();

export interface DropdownMenuProps extends JSX.HTMLAttributes<HTMLDivElement> {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu(props: DropdownMenuProps) {
	const merged = mergeProps({ defaultOpen: false }, props);
	const [local, rest] = splitProps(merged, ["class", "open", "defaultOpen", "onOpenChange", "children"]);
	const [internal, setInternal] = createSignal(merged.defaultOpen);
	const [trigger, setTrigger] = createSignal<HTMLElement>();
	const [content, setContent] = createSignal<HTMLElement>();

	const open = () => (local.open !== undefined ? local.open : internal());
	const setOpen = (value: boolean) => {
		setInternal(value);
		local.onOpenChange?.(value);
	};
	const toggle = () => setOpen(!open());

	onMount(() => {
		const onMouseDown = (e: MouseEvent) => {
			const t = trigger();
			const c = content();
			if (!c) return;
			const target = e.target as Node;
			if (c?.contains(target) || t?.contains(target)) return;
			setOpen(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};

		document.addEventListener("mousedown", onMouseDown);
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => {
			document.removeEventListener("mousedown", onMouseDown);
			document.removeEventListener("keydown", onKeyDown);
		});
	});

	const className = () => ["relative inline-block", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<DropdownMenuContext.Provider
			value={{
				open,
				toggle,
				setOpen,
				trigger,
				content,
				setTrigger,
				setContent,
			}}
		>
			<div class={className()} {...rest}>
				{local.children}
			</div>
		</DropdownMenuContext.Provider>
	);
}

export interface DropdownMenuTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DropdownMenuTrigger(props: DropdownMenuTriggerProps) {
	const ctx = useContext(DropdownMenuContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick"]);

	if (!ctx) {
		throw new Error("DropdownMenu.Trigger must be used inside a DropdownMenu.");
	}

	const className = () =>
		[
			"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
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
		<button
			type="button"
			class={className()}
			ref={ctx.setTrigger}
			onClick={onClick}
			aria-haspopup="true"
			aria-expanded={ctx.open()}
			{...rest}
		>
			{local.children}
		</button>
	);
}

export interface DropdownMenuContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function DropdownMenuContent(props: DropdownMenuContentProps) {
	const ctx = useContext(DropdownMenuContext);
	const [local, rest] = splitProps(props, ["class", "children"]);

	if (!ctx) {
		throw new Error("DropdownMenu.Content must be used inside a DropdownMenu.");
	}

	const className = () =>
		[
			"absolute left-0 top-full z-popover mt-2 w-48 rounded-xl border border-border bg-surface p-1 shadow-md",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<Show when={ctx.open()}>
			<div class={className()} ref={ctx.setContent} role="menu" {...rest}>
				{local.children}
			</div>
		</Show>
	);
}

export interface DropdownMenuItemProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DropdownMenuItem(props: DropdownMenuItemProps) {
	const ctx = useContext(DropdownMenuContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick"]);

	if (!ctx) {
		throw new Error("DropdownMenu.Item must be used inside a DropdownMenu.");
	}

	const className = () =>
		[
			"w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary hover:text-primary-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		ctx.setOpen(false);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<button type="button" class={className()} onClick={onClick} role="menuitem" {...rest}>
			{local.children}
		</button>
	);
}

export interface DropdownMenuSeparatorProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const className = () => ["my-1 h-px bg-border", local.class ?? ""].filter(Boolean).join(" ");
	return <div class={className()} {...rest} />;
}
