import { createSignal, For, Show } from "solid-js";
import { useSearch } from "../hooks/useSearch";
import { Seo } from "./Seo";

interface HookItem {
	name: string;
	description: string;
	example: string;
}

const hooks: HookItem[] = [
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
		example: "createEffect(() => console.log(count()));",
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

function HookCard(props: { hook: HookItem }) {
	const [copied, setCopied] = createSignal(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(props.hook.example);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	}

	return (
		<article class="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm">
			<h3 class="text-lg font-semibold text-foreground">{props.hook.name}</h3>
			<p class="text-sm text-muted-foreground">{props.hook.description}</p>
			<div class="relative rounded-lg bg-background p-3">
				<code class="block break-all text-xs text-foreground">{props.hook.example}</code>
				<button
					type="button"
					onClick={copy}
					class="absolute right-2 top-2 inline-flex h-6 items-center rounded-md bg-secondary px-2 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
				>
					{copied() ? "Copied" : "Copy"}
				</button>
			</div>
		</article>
	);
}

export function HooksPage() {
	const { query, setQuery, debouncedQuery, filtered } = useSearch(
		() => hooks,
		(hook, q) => matchesQuery(hook, q),
	);

	return (
		<section class="page mx-auto max-w-4xl">
			<Seo
				title="Hooks — solid-ui"
				description="SolidJS hooks and reactivity patterns used across solid-ui."
				path="/hooks"
			/>
			<header class="mb-8">
				<h2 class="text-2xl font-bold tracking-tight">Hooks</h2>
				<p class="mt-2 text-sm text-muted-foreground">Reactive primitives and patterns that power solid-ui.</p>
			</header>

			<div class="mb-6">
				<label for="hooks-search" class="sr-only">
					Search hooks
				</label>
				<input
					id="hooks-search"
					type="search"
					placeholder="Search hooks…"
					value={query()}
					onInput={(e) => setQuery(e.currentTarget.value)}
					class="h-9 w-full max-w-sm rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
				/>
			</div>

			<Show
				when={filtered().length > 0}
				fallback={<p class="text-sm text-muted-foreground">No hooks match "{debouncedQuery()}".</p>}
			>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<For each={filtered()}>{(hook) => <HookCard hook={hook} />}</For>
				</div>
			</Show>
		</section>
	);
}
