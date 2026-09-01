import { type Accessor, createContext, createSignal, type JSX, mergeProps, splitProps, useContext } from "solid-js";

export type ToggleGroupType = "single" | "multiple";

interface ToggleGroupSingleProps extends JSX.HTMLAttributes<HTMLDivElement> {
	type?: "single";
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
}

interface ToggleGroupMultipleProps extends JSX.HTMLAttributes<HTMLDivElement> {
	type: "multiple";
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;

interface ToggleGroupContextValue {
	value: Accessor<string | string[]>;
	isPressed: (value: string) => boolean;
	onToggle: (value: string) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>();

export interface ToggleGroupItemProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
}

export function ToggleGroup(props: ToggleGroupProps) {
	const defaultValue = () => (props.type === "multiple" ? ([] as string[]) : "");
	const merged = mergeProps({ defaultValue: defaultValue() }, props);
	const [local, rest] = splitProps(props as Record<string, unknown>, [
		"type",
		"value",
		"defaultValue",
		"onValueChange",
		"class",
		"children",
	]);
	const [internal, setInternal] = createSignal<string | string[]>(merged.defaultValue as string | string[]);

	const value = () => (local.value !== undefined ? (local.value as string | string[]) : internal());
	const isSingle = () => local.type !== "multiple";
	const isPressed = (val: string) => {
		if (isSingle()) return value() === val;
		return (value() as string[]).includes(val);
	};
	const onToggle = (val: string) => {
		if (isSingle()) {
			const current = value() as string;
			const next = current === val ? "" : val;
			if (local.value === undefined) setInternal(next);
			(props as ToggleGroupSingleProps).onValueChange?.(next);
		} else {
			const current = value() as string[];
			const next = current.includes(val) ? current.filter((i) => i !== val) : [...current, val];
			if (local.value === undefined) setInternal(next);
			(props as ToggleGroupMultipleProps).onValueChange?.(next);
		}
	};

	const className = () =>
		["inline-flex gap-1 rounded-lg border border-border bg-surface p-1", (local.class as string) ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<ToggleGroupContext.Provider value={{ value, isPressed, onToggle }}>
			{/* biome-ignore lint/a11y/useSemanticElements: generic button group, not a form fieldset */}
			<div class={className()} role="group" {...(rest as JSX.HTMLAttributes<HTMLDivElement>)}>
				{(local.children as JSX.Element) ?? undefined}
			</div>
		</ToggleGroupContext.Provider>
	);
}

export function ToggleGroupItem(props: ToggleGroupItemProps) {
	const ctx = useContext(ToggleGroupContext);
	const [local, rest] = splitProps(props, ["class", "value", "children", "onClick"]);

	if (!ctx) {
		throw new Error("ToggleGroupItem must be used inside a ToggleGroup.");
	}

	const pressed = () => ctx.isPressed(local.value);
	const className = () => {
		const base =
			"inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
		return [
			base,
			pressed()
				? "bg-primary text-primary-foreground hover:bg-primary/90"
				: "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");
	};

	const onClick = (e: MouseEvent) => {
		ctx.onToggle(local.value);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<button type="button" aria-pressed={pressed()} class={className()} onClick={onClick} {...rest}>
			{local.children}
		</button>
	);
}
