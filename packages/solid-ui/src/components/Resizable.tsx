import {
	type Accessor,
	createContext,
	createMemo,
	createSignal,
	type JSX,
	onCleanup,
	onMount,
	splitProps,
	useContext,
} from "solid-js";

interface ResizableContextValue {
	direction: Accessor<"horizontal" | "vertical">;
	sizes: Accessor<number[]>;
	setSizeAt: (index: number, value: number) => void;
	getPanelIndex: () => number;
	getHandleIndex: () => number;
	onResize?: (sizes: number[]) => void;
	container: () => HTMLDivElement | undefined;
}

const ResizableContext = createContext<ResizableContextValue>();

export interface ResizableProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onResize"> {
	direction?: "horizontal" | "vertical";
	onResize?: (sizes: number[]) => void;
}

export function Resizable(props: ResizableProps) {
	const merged = { direction: "horizontal" as const, ...props };
	const [local, rest] = splitProps(merged, ["class", "direction", "onResize", "children"]);
	const [sizes, setSizes] = createSignal<number[]>([]);
	const [container, setContainer] = createSignal<HTMLDivElement>();
	let panelCounter = 0;
	let handleCounter = 0;

	const setSizeAt = (index: number, value: number) => {
		setSizes((prev) => {
			const next = [...prev];
			while (next.length <= index) next.push(0);
			next[index] = value;
			return next;
		});
	};

	const context: ResizableContextValue = {
		direction: () => local.direction,
		sizes,
		setSizeAt,
		getPanelIndex: () => panelCounter++,
		getHandleIndex: () => handleCounter++,
		onResize: local.onResize,
		container,
	};

	const className = () =>
		["flex h-64 w-full gap-1", local.direction === "vertical" ? "flex-col" : "flex-row", local.class ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<ResizableContext.Provider value={context}>
			<div class={className()} ref={setContainer} {...rest}>
				{local.children}
			</div>
		</ResizableContext.Provider>
	);
}

export interface ResizablePanelProps extends JSX.HTMLAttributes<HTMLDivElement> {
	defaultSize?: number;
}

export function ResizablePanel(props: ResizablePanelProps) {
	const ctx = useContext(ResizableContext);
	if (!ctx) {
		throw new Error("ResizablePanel must be used inside a Resizable.");
	}

	const [local, rest] = splitProps(props, ["class", "defaultSize", "children"]);
	const index = ctx.getPanelIndex();
	const size = createMemo(() => ctx.sizes()[index] ?? 50);

	onMount(() => {
		if (ctx.sizes()[index] === 0) {
			ctx.setSizeAt(index, local.defaultSize ?? 50);
		}
	});

	const style = () => ({
		flex: "none",
		[ctx.direction() === "vertical" ? "height" : "width"]: `${size()}%`,
	});

	const className = () =>
		["min-w-0 overflow-hidden rounded-md border bg-muted p-2", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<div class={className()} style={style()} {...rest}>
			{local.children}
		</div>
	);
}

export interface ResizableHandleProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ResizableHandle(props: ResizableHandleProps) {
	const ctx = useContext(ResizableContext);
	if (!ctx) {
		throw new Error("ResizableHandle must be used inside a Resizable.");
	}

	const [local, rest] = splitProps(props, ["class"]);
	const index = ctx.getHandleIndex();
	const [dragging, setDragging] = createSignal(false);
	let startPos = 0;
	let startSizes: [number, number] = [50, 50];

	const containerSize = () => {
		const el = ctx.container();
		if (!el) return 0;
		return ctx.direction() === "vertical" ? el.getBoundingClientRect().height : el.getBoundingClientRect().width;
	};

	const onPointerMove = (e: PointerEvent) => {
		const pos = ctx.direction() === "vertical" ? e.clientY : e.clientX;
		const delta = pos - startPos;
		const size = containerSize();
		if (!size) return;
		const deltaPercent = (delta / size) * 100;
		const next0 = Math.max(0, Math.min(100, startSizes[0] + deltaPercent));
		const next1 = 100 - next0;
		ctx.setSizeAt(index, next0);
		ctx.setSizeAt(index + 1, next1);
	};

	const onPointerUp = () => {
		setDragging(false);
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerup", onPointerUp);
		ctx.onResize?.(ctx.sizes());
	};

	onCleanup(() => {
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerup", onPointerUp);
	});

	const onPointerDown = (e: PointerEvent) => {
		e.preventDefault();
		setDragging(true);
		startPos = ctx.direction() === "vertical" ? e.clientY : e.clientX;
		startSizes = [ctx.sizes()[index] ?? 50, ctx.sizes()[index + 1] ?? 50];
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
	};

	const className = () => {
		const base =
			ctx.direction() === "vertical"
				? "h-1.5 w-full cursor-row-resize rounded-full bg-border transition-colors hover:bg-primary"
				: "h-full w-1.5 cursor-col-resize rounded-full bg-border transition-colors hover:bg-primary";
		return [base, dragging() ? "bg-primary" : "", local.class ?? ""].filter(Boolean).join(" ");
	};

	return <button type="button" class={className()} onPointerDown={onPointerDown} {...rest} />;
}
