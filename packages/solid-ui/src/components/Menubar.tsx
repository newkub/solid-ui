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

interface MenubarContextValue {
	value: Accessor<string>;
	setValue: (value: string) => void;
	baseId: string;
}

interface MenubarMenuContextValue {
	value: string;
}

const MenubarContext = createContext<MenubarContextValue>();
const MenubarMenuContext = createContext<MenubarMenuContextValue>();

let menubarId = 0;

export interface MenubarProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
}

export function Menubar(props: MenubarProps) {
	const merged = mergeProps({ defaultValue: "" }, props);
	const [local, rest] = splitProps(merged, ["class", "value", "defaultValue", "onValueChange", "children"]);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const value = () => (local.value !== undefined ? local.value : internal());
	const setValue = (next: string) => {
		setInternal(next);
		local.onValueChange?.(next);
	};
	const baseId = `menubar-${++menubarId}`;

	const className = () =>
		["flex items-center gap-1 rounded-lg border border-border bg-surface p-1", local.class ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<MenubarContext.Provider value={{ value, setValue, baseId }}>
			<div class={className()} role="menubar" {...rest}>
				{local.children}
			</div>
		</MenubarContext.Provider>
	);
}

export interface MenubarMenuProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value: string;
}

export function MenubarMenu(props: MenubarMenuProps) {
	const [local, rest] = splitProps(props, ["class", "value", "children"]);
	return (
		<MenubarMenuContext.Provider value={{ value: local.value }}>
			<div class={["relative", local.class ?? ""].filter(Boolean).join(" ")} {...rest}>
				{local.children}
			</div>
		</MenubarMenuContext.Provider>
	);
}

export interface MenubarTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function MenubarTrigger(props: MenubarTriggerProps) {
	const ctx = useContext(MenubarContext);
	const menu = useContext(MenubarMenuContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick"]);

	if (!ctx || !menu) {
		throw new Error("Menubar.Trigger must be used inside a Menubar and Menubar.Menu.");
	}

	const active = () => ctx.value() === menu.value;
	const className = () =>
		[
			"inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
			active() ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted hover:text-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		ctx.setValue(active() ? "" : menu.value);
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

export interface MenubarContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function MenubarContent(props: MenubarContentProps) {
	const ctx = useContext(MenubarContext);
	const menu = useContext(MenubarMenuContext);
	const [local, rest] = splitProps(props, ["class", "children"]);

	if (!ctx || !menu) {
		throw new Error("Menubar.Content must be used inside a Menubar and Menubar.Menu.");
	}

	const active = () => ctx.value() === menu.value;
	const className = () =>
		[
			"absolute left-0 top-full z-popover mt-2 w-48 rounded-xl border border-border bg-surface p-2 shadow-md",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<Show when={active()}>
			<div class={className()} role="menu" {...rest}>
				{local.children}
			</div>
		</Show>
	);
}

export interface MenubarItemProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function MenubarItem(props: MenubarItemProps) {
	const ctx = useContext(MenubarContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick"]);

	const className = () =>
		[
			"w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-primary hover:text-primary-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		ctx?.setValue("");
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
