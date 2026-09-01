import { createEffect, createSignal, For, Show } from "solid-js";
import { useSearch } from "../hooks/useSearch";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";
import { SearchInput } from "./SearchInput";
import { Seo } from "./Seo";

export interface HookItem {
	name: string;
	description: string;
	example: string;
}

export const hooks: HookItem[] = [
	{
		name: "useDebounce",
		description: "Delay updating a value until the user stops changing it.",
		example: "const debounced = useDebounce(() => query, 300);",
	},
	{
		name: "useSearch",
		description: "Filter an array by a debounced query string.",
		example: "const { query, setQuery, filtered } = useSearch(() => items, (item, q) => ...);",
	},
	{
		name: "useMediaQuery",
		description: "Reactively track a CSS media query (e.g., prefers-color-scheme, min-width).",
		example: "const isDesktop = useMediaQuery('(min-width: 1024px)');",
	},
	{
		name: "useLocalStorage",
		description: "Persist and sync state with localStorage.",
		example: "const [value, setValue] = useLocalStorage('key', initial);",
	},
	{
		name: "useClassName",
		description: "Merge base, variant and custom class strings into a single className.",
		example: "const { className, rest } = useClassName(props, base);",
	},
	{
		name: "useButton",
		description: "Resolve button variant and size classes.",
		example: "const { className, rest } = useButton(props);",
	},
	{
		name: "createSignal",
		description: "Reactive primitive for a single mutable value.",
		example: "const [count, setCount] = createSignal(0);",
	},
	{
		name: "createEffect",
		description: "Run side effects when signals used inside change.",
		example: "createEffect(() => { track(count()); });",
	},
	{
		name: "createMemo",
		description: "Derived signal that caches its value and only re-runs when dependencies change.",
		example: "const double = createMemo(() => count() * 2);",
	},
	{
		name: "createResource",
		description: "Async signal with loading, error, and refetch support.",
		example: "const [data] = createResource(fetcher);",
	},
	{
		name: "createStore",
		description: "Nested reactivity for objects and arrays.",
		example: "const [state, setState] = createStore({ list: [] });",
	},
	{
		name: "useContext",
		description: "Read a value from Solid context.",
		example: "const theme = useContext(ThemeContext);",
	},
	{
		name: "onMount",
		description: "Run code once when the component mounts.",
		example: "onMount(() => { /* init */ });",
	},
	{
		name: "onCleanup",
		description: "Register cleanup to run when the component unmounts or scope disposes.",
		example: "onCleanup(() => clearInterval(id));",
	},
];

function matchesQuery(hook: HookItem, query: string): boolean {
	const haystack = `${hook.name} ${hook.description}`.toLowerCase();
	return haystack.includes(query.toLowerCase());
}

function hookId(name: string) {
	return `hook-${name}`;
}

function HookSidebar(props: {
	hooks: HookItem[];
	active: string;
	onSelect: (name: string) => void;
	query: string;
	onQueryChange: (value: string) => void;
}) {
	return (
		<div class="space-y-4">
			<SearchInput
				id="hooks-search"
				placeholder="Search hooks…"
				value={props.query}
				onInput={props.onQueryChange}
				label="Search hooks"
			/>
			<nav aria-label="Hooks" class="max-h-[60vh] overflow-y-auto rounded-xl border border-border bg-surface p-2">
				<ul class="space-y-0.5">
					<For each={props.hooks}>
						{(hook) => {
							const active = () => hook.name === props.active;
							return (
								<li>
									<button
										type="button"
										onClick={() => props.onSelect(hook.name)}
										class={`block w-full rounded-md border-l-2 px-3 py-1.5 text-left text-sm transition-colors ${
											active()
												? "border-primary bg-muted font-medium text-primary"
												: "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
										}`}
										aria-current={active() ? "true" : undefined}
									>
										{hook.name}
									</button>
								</li>
							);
						}}
					</For>
				</ul>
			</nav>
		</div>
	);
}

function HookDetail(props: { hook: HookItem }) {
	const [copied, setCopied] = createSignal(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(props.hook.example);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	}

	return (
		<article
			id={hookId(props.hook.name)}
			class="scroll-mt-24 space-y-4 rounded-xl border border-border bg-surface p-5 shadow-sm"
		>
			<header>
				<h3 class="text-lg font-semibold text-foreground">{props.hook.name}</h3>
				<p class="text-sm text-muted-foreground">{props.hook.description}</p>
			</header>
			<div class="relative rounded-lg border border-border bg-background p-3">
				<pre class="overflow-x-auto font-mono text-xs leading-relaxed text-foreground">
					<code>{props.hook.example}</code>
				</pre>
				<button
					type="button"
					onClick={copy}
					class="absolute right-2 top-2 inline-flex h-7 items-center rounded-md bg-secondary px-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
				>
					{copied() ? "Copied" : "Copy"}
				</button>
			</div>
		</article>
	);
}

export function HooksBrowser() {
	const { query, setQuery, debouncedQuery, filtered } = useSearch(
		() => hooks,
		(hook, q) => matchesQuery(hook, q),
	);
	const [active, setActive] = createSignal(hooks[0]?.name ?? "");

	createEffect(() => {
		const first = filtered()[0];
		if (first && !filtered().some((h) => h.name === active())) {
			setActive(first.name);
		}
	});

	const onSelect = (name: string) => {
		setActive(name);
		const el = document.getElementById(hookId(name));
		if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section class="page">
			<Seo
				title="Hooks — solid-ui"
				description="SolidJS hooks and reactivity patterns used across solid-ui."
				path="/hooks"
			/>
			<PageHeader
				title="Hooks"
				description="Reactive primitives and patterns that power solid-ui. Select a hook to see its usage example."
				count={filtered().length}
			/>
			<Show when={filtered().length > 0} fallback={<EmptyState query={debouncedQuery()} label="hooks" />}>
				<div class="flex flex-col gap-6 lg:flex-row lg:items-stretch">
					<div class="shrink-0 lg:sticky lg:top-0 lg:h-screen lg:w-64">
						<HookSidebar
							hooks={filtered()}
							active={active()}
							onSelect={onSelect}
							query={query()}
							onQueryChange={setQuery}
						/>
					</div>
					<main class="min-w-0 flex-1 py-4">
						<div class="space-y-6">
							<For each={filtered()}>{(hook) => <HookDetail hook={hook} />}</For>
						</div>
					</main>
				</div>
			</Show>
		</section>
	);
}
