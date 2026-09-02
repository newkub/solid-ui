import { createMemo, createSignal, ErrorBoundary, For, type JSX, Show } from "solid-js";
import { buildExamples, type ExampleItem } from "../data/examples";
import { CodeBlock } from "./CodeBlock";
import { ComponentPreview, PreviewFallback } from "./ComponentPreview";
import { SearchInput } from "./SearchInput";

function FileTree(props: { file: string }) {
	return (
		<div class="rounded-lg border border-border bg-background p-2">
			<div class="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-1.5 text-sm font-medium text-primary">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
					<polyline points="14 2 14 8 20 8" />
				</svg>
				{props.file}
			</div>
		</div>
	);
}

function PreviewPane(props: { item: ExampleItem }) {
	const name = () => props.item.componentName;
	return (
		<div class="flex h-full min-h-[200px] flex-col gap-3 rounded-xl border border-border bg-surface p-4">
			<div class="flex items-center justify-between">
				<h3 class="text-sm font-semibold text-foreground">Preview</h3>
				<span class="text-2xs text-muted-foreground">{name() ? "Live component" : "No live preview"}</span>
			</div>
			<Show
				when={name()}
				fallback={
					<div class="flex flex-1 flex-col items-center justify-center gap-2 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
						<p>No visual preview for this example.</p>
						<p class="text-2xs">A WASM/edge runtime can be plugged in here to render custom code.</p>
					</div>
				}
			>
				{(componentName) => (
					<div class="flex flex-1 items-center justify-center rounded-lg bg-muted/50 p-4">
						<ErrorBoundary fallback={() => <PreviewFallback name={componentName()} tag={componentName()} />}>
							<ComponentPreview name={componentName()} tag={componentName()} />
						</ErrorBoundary>
					</div>
				)}
			</Show>
		</div>
	);
}

function CodeEditor(props: { code: string; onChange: (value: string) => void }) {
	return (
		<div class="flex h-full min-h-[240px] flex-col gap-3 rounded-xl border border-border bg-surface p-4">
			<div class="flex items-center justify-between">
				<h3 class="text-sm font-semibold text-foreground">Code editor</h3>
				<span class="text-2xs text-muted-foreground">
					Edit to explore; runtime execution is a future WASM/edge module.
				</span>
			</div>
			<textarea
				class="flex-1 rounded-lg border border-input bg-background p-3 font-mono text-xs leading-relaxed text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				value={props.code}
				onInput={(e) => props.onChange(e.currentTarget.value)}
				aria-label="Example code editor"
			/>
			<CodeBlock code={props.code} language="tsx" />
		</div>
	);
}

export function ExampleWorkbench(props: { onClose: () => void }): JSX.Element {
	const examples = buildExamples();
	const [selectedId, setSelectedId] = createSignal(examples[0]?.id ?? "");
	const [query, setQuery] = createSignal("");

	const selected = createMemo(() => examples.find((e) => e.id === selectedId()) ?? examples[0]);
	const [editedCode, setEditedCode] = createSignal(selected()?.snippet ?? "");

	const filtered = createMemo(() => {
		const q = query().toLowerCase();
		if (!q) return examples;
		return examples.filter((e) => `${e.title} ${e.source} ${e.snippet}`.toLowerCase().includes(q));
	});

	const grouped = createMemo(() => {
		const map = new Map<string, ExampleItem[]>();
		for (const item of filtered()) {
			const list = map.get(item.source) ?? [];
			list.push(item);
			map.set(item.source, list);
		}
		return map;
	});

	function select(item: ExampleItem) {
		setSelectedId(item.id);
		setEditedCode(item.snippet);
	}

	return (
		<div class="flex h-[calc(100vh-8rem)] min-h-[600px] flex-col gap-4 lg:flex-row">
			<aside class="flex w-full shrink-0 flex-col gap-3 rounded-xl border border-border bg-surface p-4 lg:w-64">
				<div class="flex items-center justify-between">
					<h2 class="text-sm font-semibold text-foreground">Examples</h2>
					<button type="button" class="text-xs text-muted-foreground hover:text-foreground" onClick={props.onClose}>
						Back
					</button>
				</div>
				<SearchInput
					id="examples-search"
					placeholder="Search examples…"
					value={query()}
					onInput={setQuery}
					label="Search examples"
					class="w-full"
				/>
				<div class="flex-1 space-y-4 overflow-y-auto">
					<For each={Array.from(grouped().entries())}>
						{([source, items]) => (
							<div>
								<h3 class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{source}</h3>
								<div class="space-y-1">
									<For each={items}>
										{(item) => (
											<button
												type="button"
												class={`w-full rounded-md px-2.5 py-1.5 text-left text-sm transition-colors ${
													selectedId() === item.id
														? "bg-primary text-primary-foreground"
														: "text-muted-foreground hover:bg-muted hover:text-foreground"
												}`}
												onClick={() => select(item)}
											>
												{item.title}
											</button>
										)}
									</For>
								</div>
							</div>
						)}
					</For>
				</div>
			</aside>

			<main class="flex min-w-0 flex-1 flex-col gap-4">
				<Show when={selected()}>
					{(item) => (
						<div class="grid h-full grid-cols-1 gap-4 lg:grid-cols-[240px,1fr]">
							<div class="order-2 lg:order-1">
								<FileTree file={item().file} />
							</div>
							<div class="order-1 flex h-full flex-col gap-4 lg:order-2">
								<div class="flex-1">
									<PreviewPane item={item()} />
								</div>
								<div class="flex-1">
									<CodeEditor code={editedCode()} onChange={setEditedCode} />
								</div>
							</div>
						</div>
					)}
				</Show>
			</main>
		</div>
	);
}
