import {
	type Accessor,
	createContext,
	createSignal,
	type JSX,
	mergeProps,
	Show,
	splitProps,
	useContext,
} from "solid-js";

interface NavigationMenuContextValue {
	value: Accessor<string>;
	setValue: (value: string) => void;
	baseId: string;
}

interface NavigationMenuItemContextValue {
	value: string;
}

const NavigationMenuContext = createContext<NavigationMenuContextValue>();
const NavigationMenuItemContext = createContext<NavigationMenuItemContextValue>();

let navigationMenuId = 0;

export interface NavigationMenuProps extends JSX.HTMLAttributes<HTMLElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
}

export function NavigationMenu(props: NavigationMenuProps) {
	const merged = mergeProps({ defaultValue: "" }, props);
	const [local, rest] = splitProps(merged, ["class", "value", "defaultValue", "onValueChange", "children"]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const value = () => (local.value !== undefined ? local.value : internal());
	const setValue = (next: string) => {
		setInternal(next);
		local.onValueChange?.(next);
	};
	const baseId = `navigation-menu-${++navigationMenuId}`;

	const className = () =>
		["relative flex w-full items-center gap-1 rounded-lg border border-border bg-surface p-1", local.class ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<NavigationMenuContext.Provider value={{ value, setValue, baseId }}>
			<nav class={className()} aria-label="Main" {...rest}>
				{local.children}
			</nav>
		</NavigationMenuContext.Provider>
	);
}

export interface NavigationMenuItemProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value: string;
}

export function NavigationMenuItem(props: NavigationMenuItemProps) {
	const [local, rest] = splitProps(props, ["class", "value", "children"]);
	return (
		<NavigationMenuItemContext.Provider value={{ value: local.value }}>
			<div class={["relative", local.class ?? ""].filter(Boolean).join(" ")} {...rest}>
				{local.children}
			</div>
		</NavigationMenuItemContext.Provider>
	);
}

export interface NavigationMenuTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function NavigationMenuTrigger(props: NavigationMenuTriggerProps) {
	const ctx = useContext(NavigationMenuContext);
	const item = useContext(NavigationMenuItemContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick"]);

	if (!ctx || !item) {
		throw new Error("NavigationMenu.Trigger must be used inside a NavigationMenu and NavigationMenu.Item.");
	}

	const active = () => ctx.value() === item.value;
	const className = () =>
		[
			"inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			active() ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted hover:text-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		ctx.setValue(active() ? "" : item.value);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<button type="button" class={className()} onClick={onClick} aria-haspopup="true" aria-expanded={active()} {...rest}>
			{local.children}
		</button>
	);
}

export interface NavigationMenuContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function NavigationMenuContent(props: NavigationMenuContentProps) {
	const ctx = useContext(NavigationMenuContext);
	const item = useContext(NavigationMenuItemContext);
	const [local, rest] = splitProps(props, ["class", "children"]);

	if (!ctx || !item) {
		throw new Error("NavigationMenu.Content must be used inside a NavigationMenu and NavigationMenu.Item.");
	}

	const active = () => ctx.value() === item.value;
	const className = () =>
		[
			"absolute left-0 top-full z-popover mt-2 w-56 rounded-xl border border-border bg-surface p-3 shadow-md",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<Show when={active()}>
			<div class={className()} {...rest}>
				{local.children}
			</div>
		</Show>
	);
}
