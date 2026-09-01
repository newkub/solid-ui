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

interface TabsContextValue {
	value: Accessor<string>;
	setValue: (value: string) => void;
	baseId: string;
}

const TabsContext = createContext<TabsContextValue>();

let tabsCounter = 0;

export interface TabsProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
}

export function Tabs(props: TabsProps) {
	const merged = mergeProps({ defaultValue: "" }, props);
	const [internal, setInternal] = createSignal(merged.defaultValue);
	const value = () => (props.value !== undefined ? props.value : internal());
	const setValue = (next: string) => {
		setInternal(next);
		props.onValueChange?.(next);
	};
	const baseId = `tabs-${++tabsCounter}`;

	const [local, rest] = splitProps(props, ["class", "value", "defaultValue", "onValueChange", "children"]);
	const className = () => ["w-full", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<TabsContext.Provider value={{ value, setValue, baseId }}>
			<div class={className()} {...rest}>
				{local.children}
			</div>
		</TabsContext.Provider>
	);
}

export interface TabsListProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function TabsList(props: TabsListProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["flex gap-1 rounded-lg bg-muted p-1", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<div class={className()} role="tablist" {...rest}>
			{local.children}
		</div>
	);
}

export interface TabsTriggerProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
}

export function TabsTrigger(props: TabsTriggerProps) {
	const context = useContext(TabsContext);
	const [local, rest] = splitProps(props, ["class", "value", "children", "onClick"]);

	if (!context) {
		throw new Error("Tabs.Trigger must be used inside a Tabs.");
	}

	const active = () => context.value() === local.value;
	const className = () => {
		const base =
			"inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
		return [
			base,
			active()
				? "bg-background text-foreground shadow-sm"
				: "text-muted-foreground hover:bg-muted hover:text-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");
	};

	const onClick = (e: MouseEvent) => {
		context.setValue(local.value);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<button
			type="button"
			role="tab"
			aria-selected={active()}
			aria-controls={`${context.baseId}-content-${local.value}`}
			id={`${context.baseId}-trigger-${local.value}`}
			tabIndex={active() ? 0 : -1}
			class={className()}
			onClick={onClick}
			{...rest}
		>
			{local.children}
		</button>
	);
}

export interface TabsContentProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value: string;
}

export function TabsContent(props: TabsContentProps) {
	const context = useContext(TabsContext);
	const [local, rest] = splitProps(props, ["class", "value", "children"]);

	if (!context) {
		throw new Error("Tabs.Content must be used inside a Tabs.");
	}

	const active = () => context.value() === local.value;
	const className = () =>
		["mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", local.class ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<Show when={active()}>
			<div
				role="tabpanel"
				id={`${context.baseId}-content-${local.value}`}
				aria-labelledby={`${context.baseId}-trigger-${local.value}`}
				class={className()}
				{...rest}
			>
				{local.children}
			</div>
		</Show>
	);
}
