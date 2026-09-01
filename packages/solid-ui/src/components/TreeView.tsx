import { type Accessor, createContext, createSignal, type JSX, Show, splitProps, useContext } from "solid-js";

interface TreeViewContextValue {
	depth: Accessor<number>;
}

const TreeViewContext = createContext<TreeViewContextValue>();

export interface TreeViewProps extends JSX.HTMLAttributes<HTMLUListElement> {}

export function TreeView(props: TreeViewProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const parent = useContext(TreeViewContext);
	const depth = () => (parent ? parent.depth() + 1 : 0);

	const className = () => ["list-none p-0 m-0 space-y-1", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<TreeViewContext.Provider value={{ depth }}>
			<ul class={className()} {...rest}>
				{local.children}
			</ul>
		</TreeViewContext.Provider>
	);
}

export interface TreeItemProps extends JSX.HTMLAttributes<HTMLLIElement> {
	label: JSX.Element;
	defaultExpanded?: boolean;
}

export function TreeItem(props: TreeItemProps) {
	const [local, rest] = splitProps(props, ["class", "label", "defaultExpanded", "children"]);
	const [expanded, setExpanded] = createSignal(local.defaultExpanded ?? false);
	const ctx = useContext(TreeViewContext);
	const hasChildren = () => !!local.children;
	const indent = () => (ctx ? ctx.depth() * 0.75 : 0);

	const onToggle = () => setExpanded(!expanded());

	const className = () => ["space-y-1", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<li class={className()} {...rest}>
			<button
				type="button"
				class="inline-flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				onClick={onToggle}
				style={{ "padding-left": `${1 + indent()}rem` }}
			>
				<Show when={hasChildren()}>
					<svg
						class={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${expanded() ? "rotate-90" : ""}`}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="m9 18 6-6-6-6" />
					</svg>
				</Show>
				<span class="text-foreground">{local.label}</span>
			</button>
			<Show when={expanded()}>{local.children}</Show>
		</li>
	);
}
