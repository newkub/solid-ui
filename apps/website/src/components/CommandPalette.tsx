import { useLocation, useNavigate } from "@tanstack/solid-router";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { buildCommands, type Command } from "../lib/commands";
import { ComponentPreview } from "./ComponentPreview";

interface CommandPaletteProps {
	open: boolean;
	onClose: () => void;
	onToggleTheme: () => void;
}

function matches(command: Command, query: string): boolean {
	const q = query.toLowerCase();
	const text = `${command.label} ${command.group} ${command.keywords ?? ""}`.toLowerCase();
	return text.includes(q);
}

function groupBy<T>(items: T[], key: (item: T) => string): Record<string, T[]> {
	const out: Record<string, T[]> = {};
	for (const item of items) {
		const k = key(item);
		out[k] = out[k] ?? [];
		out[k].push(item);
	}
	return out;
}

function isCurrentCommand(command: Command | undefined, pathname: string) {
	return command?.action.type === "navigate" && command.action.to === pathname;
}

export function CommandPalette(props: CommandPaletteProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const allCommands = buildCommands();
	const [query, setQuery] = createSignal("");
	const [activeId, setActiveId] = createSignal<string | null>(null);
	let inputRef: HTMLInputElement | undefined;

	const extraActions: Command[] = [
		{
			id: "action-theme",
			label: "Toggle theme",
			group: "Actions",
			description: "Toggle light/dark mode",
			action: { type: "exec", handler: props.onToggleTheme },
		},
		{
			id: "action-copy",
			label: "Copy current URL",
			group: "Actions",
			description: "Copy the current page URL to clipboard",
			action: { type: "exec", handler: () => navigator.clipboard.writeText(window.location.href).catch(() => {}) },
		},
		{
			id: "action-reload",
			label: "Reload page",
			group: "Actions",
			description: "Reload the current page",
			action: { type: "exec", handler: () => window.location.reload() },
		},
		{
			id: "action-github",
			label: "View on GitHub",
			group: "Actions",
			description: "Open the solid-ui repository on GitHub",
			action: {
				type: "exec",
				handler: () => window.open("https://github.com/newkub/solid-ui", "_blank", "noopener,noreferrer"),
			},
		},
	];

	const filtered = createMemo(() => {
		const q = query().trim();
		if (!q) return [...allCommands, ...extraActions];
		return [...allCommands, ...extraActions].filter((c) => matches(c, q));
	});

	const grouped = createMemo(() => groupBy(filtered(), (c) => c.group));

	const flatIds = createMemo(() => filtered().map((c) => c.id));

	const activeCommand = createMemo(() => {
		const id = activeId();
		if (id) return filtered().find((c) => c.id === id) ?? filtered()[0];
		return filtered()[0];
	});

	createEffect(() => {
		if (props.open) {
			setTimeout(() => {
				inputRef?.focus();
				inputRef?.select();
			}, 0);
		} else {
			setQuery("");
			setActiveId(null);
		}
	});

	function runCommand(command: Command) {
		if (command.action.type === "navigate") {
			navigate({ to: command.action.to, search: command.action.search });
		} else {
			command.action.handler();
		}
		props.onClose();
		setQuery("");
		setActiveId(null);
	}

	function moveActive(step: number) {
		const ids = flatIds();
		if (ids.length === 0) return;
		const current = activeId();
		let idx = current ? ids.indexOf(current) : -1;
		if (idx === -1) {
			idx = step > 0 ? 0 : ids.length - 1;
		} else {
			idx = (idx + step + ids.length) % ids.length;
		}
		const next = ids[idx];
		setActiveId(next);
		document.getElementById(`cmd-item-${next}`)?.scrollIntoView({ block: "nearest" });
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			e.preventDefault();
			props.onClose();
			return;
		}
		if (e.key === "ArrowDown") {
			e.preventDefault();
			moveActive(1);
			return;
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			moveActive(-1);
			return;
		}
		if (e.key === "Enter") {
			e.preventDefault();
			const command = activeCommand();
			if (command) runCommand(command);
			return;
		}
		if (e.key === "Home") {
			e.preventDefault();
			const ids = flatIds();
			if (ids.length) {
				setActiveId(ids[0]);
				document.getElementById(`cmd-item-${ids[0]}`)?.scrollIntoView({ block: "nearest" });
			}
			return;
		}
		if (e.key === "End") {
			e.preventDefault();
			const ids = flatIds();
			if (ids.length) {
				setActiveId(ids[ids.length - 1]);
				document.getElementById(`cmd-item-${ids[ids.length - 1]}`)?.scrollIntoView({ block: "nearest" });
			}
		}
	}

	function SearchIcon() {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
				class="h-5 w-5 text-muted-foreground"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</svg>
		);
	}

	return (
		<Show when={props.open}>
			<div
				class="fixed inset-0 z-modal flex items-start justify-center bg-overlay/60 p-4 pt-20 backdrop-blur-sm sm:pt-24"
				role="dialog"
				aria-modal="true"
				aria-label="Command palette"
				onClick={(e) => {
					if (e.target === e.currentTarget) props.onClose();
				}}
				onKeyDown={onKeyDown}
			>
				<div class="w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
					<div class="flex items-center gap-3 border-b border-border px-4 py-3">
						<SearchIcon />
						<input
							ref={inputRef}
							type="search"
							value={query()}
							onInput={(e) => {
								setQuery(e.currentTarget.value);
								setActiveId(null);
							}}
							placeholder="Search pages, components, docs, skills, actions…"
							class="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none"
							autocomplete="off"
							autofocus
							role="combobox"
							aria-autocomplete="list"
							aria-expanded={filtered().length > 0}
							aria-controls="cmd-list"
							aria-activedescendant={activeId() ? `cmd-item-${activeId()}` : undefined}
							aria-label="Search commands"
						/>
						<kbd class="hidden rounded-md border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground sm:inline-block">
							ESC
						</kbd>
					</div>

					<div class="grid max-h-[70vh] grid-cols-1 divide-y divide-border sm:grid-cols-[1fr,280px] sm:divide-x sm:divide-y-0">
						<div class="h-[70vh] overflow-y-auto p-2">
							<Show
								when={filtered().length > 0}
								fallback={
									<div class="py-8 text-center text-sm text-muted-foreground">
										No commands match "<span class="font-medium text-foreground">{query()}</span>".
									</div>
								}
							>
								<For each={Object.entries(grouped())}>
									{([group, items]) => (
										<div class="mb-2">
											<p class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
												{group}
											</p>
											<div class="space-y-0.5" id="cmd-list" role="listbox" aria-label={group}>
												<For each={items}>
													{(command) => {
														const active = activeId() === command.id;
														const current = () => isCurrentCommand(command, location().pathname);
														return (
															<div
																id={`cmd-item-${command.id}`}
																role="option"
																aria-selected={active}
																tabIndex={-1}
																class={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
																	active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
																}`}
																onMouseEnter={() => setActiveId(command.id)}
																onClick={() => runCommand(command)}
																onKeyDown={(e) => {
																	if (e.key === "Enter" || e.key === " ") {
																		e.preventDefault();
																		runCommand(command);
																	}
																}}
															>
																<span class="font-medium">{command.label}</span>
																<Show when={current()}>
																	<span class="text-xs opacity-70">Current</span>
																</Show>
															</div>
														);
													}}
												</For>
											</div>
										</div>
									)}
								</For>
							</Show>
						</div>

						<div class="hidden h-[70vh] flex-col overflow-y-auto p-4 sm:flex">
							<Show
								when={activeCommand()}
								fallback={
									<div class="flex h-full items-center justify-center text-sm text-muted-foreground">
										Select a command to preview
									</div>
								}
							>
								{(command) => {
									const current = () => isCurrentCommand(command(), location().pathname);
									return (
										<div class="space-y-4">
											<div>
												<div class="flex items-center justify-between gap-2">
													<h3 class="text-lg font-semibold text-foreground">{command().label}</h3>
													<Show when={current()}>
														<span class="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
															Current
														</span>
													</Show>
												</div>
												<p class="text-xs text-muted-foreground">{command().group}</p>
											</div>
											<Show when={command().description}>
												<p class="text-sm text-muted-foreground">{command().description}</p>
											</Show>
											<Show when={command().action.type === "navigate"}>
												<div>
													<div class="mb-1 text-xs font-semibold text-muted-foreground">Path</div>
													<code class="block rounded-md bg-muted px-2 py-1.5 text-xs text-foreground">
														{(command().action as { to: string }).to}
													</code>
												</div>
											</Show>
											<Show when={command().component}>
												<div>
													<div class="mb-2 text-xs font-semibold text-muted-foreground">Preview</div>
													<ComponentPreview
														name={command().component?.name ?? ""}
														tag={command().component?.tag ?? ""}
													/>
												</div>
											</Show>
										</div>
									);
								}}
							</Show>
						</div>
					</div>

					<div class="border-t border-border bg-muted/50 px-4 py-2 text-xs text-muted-foreground flex items-center justify-between">
						<div class="flex items-center gap-3">
							<span>
								<kbd class="font-semibold">↑</kbd> <kbd class="font-semibold">↓</kbd> to navigate
							</span>
							<span>
								<kbd class="font-semibold">↵</kbd> to select
							</span>
							<span>
								<kbd class="font-semibold">esc</kbd> to close
							</span>
						</div>
						<span>{filtered().length} commands</span>
					</div>
				</div>
			</div>
		</Show>
	);
}
