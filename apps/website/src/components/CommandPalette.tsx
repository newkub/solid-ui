import { useLocation, useNavigate } from "@tanstack/solid-router";
import { createEffect, createMemo, createSignal, For, type JSX, lazy, Show, Suspense } from "solid-js";
import { buildCommands, type Command } from "../lib/commands";
import { GITHUB_REPO_URL } from "../lib/config";

const ComponentPreview = lazy(async () => {
	const mod = await import("./ComponentPreview");
	return { default: mod.ComponentPreview };
});

interface CommandPaletteProps {
	open: boolean;
	onClose: () => void;
	onToggleTheme: () => void;
}

function matches(command: Command, query: string): boolean {
	const q = query.toLowerCase();
	const text = `${command.label} ${command.group} ${command.keywords ?? ""} ${command.description ?? ""}`.toLowerCase();
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

type CommandKind = "component" | "page" | "doc" | "skill" | "action";

function commandKind(command: Command): CommandKind {
	if (command.component) return "component";
	if (command.group.startsWith("Components")) return "component";
	if (command.group === "Docs") return "doc";
	if (command.group === "Skills") return "skill";
	if (command.group === "Actions") return "action";
	if (command.action.type === "exec") return "action";
	return "page";
}

function escapeRegExp(str: string) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitQuery(query: string): string[] {
	return query
		.toLowerCase()
		.split(/\s+/)
		.filter((w) => w.length > 0);
}

function highlightText(text: string, query: string, active: boolean) {
	if (!query) return <span class="truncate">{text}</span>;
	const parts = splitQuery(query);
	if (!parts.length) return <span class="truncate">{text}</span>;
	const pattern = new RegExp(`(${parts.map(escapeRegExp).join("|")})`, "gi");
	const tokens = text.split(pattern);
	return (
		<span class="truncate">
			<For each={tokens}>
				{(token) => {
					const isMatch = parts.some((p) => token.toLowerCase() === p);
					if (!isMatch) return <span>{token}</span>;
					if (active) {
						return (
							<mark class="bg-transparent font-bold text-inherit underline underline-offset-2 decoration-primary-foreground/70">
								{token}
							</mark>
						);
					}
					return <mark class="rounded bg-primary/10 px-0.5 font-semibold text-primary">{token}</mark>;
				}}
			</For>
		</span>
	);
}

function KindIcon(props: { kind: CommandKind; class?: string; title?: string }) {
	const cls = `h-5 w-5 ${props.class ?? ""}`;
	const title = props.title ?? `${props.kind} icon`;
	const icon = (children: JSX.Element) => (
		<svg
			class={cls}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			role="img"
			aria-label={title}
		>
			<title>{title}</title>
			{children}
		</svg>
	);
	switch (props.kind) {
		case "component":
			return icon(
				<>
					<rect x="3" y="3" width="7" height="7" rx="1" />
					<rect x="14" y="3" width="7" height="7" rx="1" />
					<rect x="14" y="14" width="7" height="7" rx="1" />
					<rect x="3" y="14" width="7" height="7" rx="1" />
				</>,
			);
		case "page":
			return icon(
				<>
					<path d="M3 7.5h18M3 12h18M3 16.5h10" />
					<rect x="3" y="3" width="18" height="18" rx="2" />
				</>,
			);
		case "doc":
			return icon(
				<>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
				</>,
			);
		case "skill":
			return icon(<path d="m12 3 2.4 5 5.4.7-3.9 4.1.9 5.7-4.8-2.6-4.8 2.6.9-5.7-3.9-4.1 5.4-.7Z" />);
		case "action":
			return icon(<path d="M13 2 7 11h6l-7 10 11-12h-6z" />);
	}
}

function CommandPreviewCard(props: {
	command: Command | undefined;
	current: boolean;
	onRun: (command: Command) => void;
	compact?: boolean;
}) {
	return (
		<Show
			when={props.command}
			fallback={
				<div class="flex h-full flex-col items-center justify-center gap-3 px-2 text-center text-sm text-muted-foreground">
					<svg
						class="h-10 w-10 opacity-50"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						role="img"
						aria-label="Search icon"
					>
						<title>Search icon</title>
						<circle cx="11" cy="11" r="8" />
						<path d="m21 21-4.3-4.3" />
					</svg>
					<p>Select a command to preview</p>
				</div>
			}
		>
			{(cmd) => {
				const c = cmd();
				if (!c) return null;
				const command = () => c as Command;
				const kind = () => commandKind(command());
				const navigateTo = () =>
					command().action.type === "navigate" ? (command().action as { to: string }).to : undefined;
				const keywordList = () => {
					const keywords = command().keywords;
					return keywords
						? keywords
								.split(/\s+/)
								.filter((k) => k.length > 0)
								.slice(0, 12)
						: [];
				};
				const isNavigate = () => command().action.type === "navigate";
				const isExec = () => command().action.type === "exec";

				return (
					<div class={`flex flex-col gap-4 ${props.compact ? "" : "h-full"}`}>
						<div class="flex items-start gap-3">
							<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
								<KindIcon kind={kind()} />
							</div>
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
									<h3 class="text-lg font-semibold text-foreground">{command().label}</h3>
									<Show when={props.current}>
										<span class="rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
											Current
										</span>
									</Show>
								</div>
								<div class="mt-1 flex flex-wrap items-center gap-2">
									<span class="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
										{command().group}
									</span>
									<span
										class={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
											isExec() ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
										}`}
									>
										{command().action.type}
									</span>
								</div>
							</div>
						</div>

						<Show when={command().description}>
							<p class="text-sm leading-relaxed text-muted-foreground">{command().description}</p>
						</Show>

						<Show when={command().component}>
							{(component) => (
								<div
									class={`overflow-hidden rounded-lg border border-border bg-background ${
										props.compact ? "p-2" : "p-3"
									}`}
								>
									<div class="mb-2 text-xs font-semibold text-muted-foreground">Component preview</div>
									<Suspense fallback={<div class="text-sm text-muted-foreground">Loading preview…</div>}>
										<ComponentPreview name={component().name} tag={component().tag} />
									</Suspense>
								</div>
							)}
						</Show>

						<Show when={!command().component && isNavigate()}>
							<div class="overflow-hidden rounded-lg border border-border bg-muted/40 p-4">
								<div class="mb-3 flex items-center gap-2 text-muted-foreground">
									<KindIcon kind={kind()} class="h-4 w-4" />
									<span class="text-xs font-semibold uppercase tracking-wide">{kind()}</span>
								</div>
								<div class="flex items-center gap-3">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
										<KindIcon kind={kind()} class="h-5 w-5" />
									</div>
									<div class="min-w-0 flex-1">
										<p class="truncate text-sm font-medium text-foreground">{command().label}</p>
										<Show when={navigateTo()}>
											<code class="block truncate text-[10px] text-muted-foreground">{navigateTo()}</code>
										</Show>
									</div>
								</div>
							</div>
						</Show>

						<Show when={isExec()}>
							<div class="overflow-hidden rounded-lg border border-border bg-muted/40 p-4">
								<div class="mb-2 flex items-center gap-2 text-muted-foreground">
									<KindIcon kind="action" class="h-4 w-4" />
									<span class="text-xs font-semibold uppercase tracking-wide">Action</span>
								</div>
								<p class="text-sm text-foreground">This action will run immediately.</p>
							</div>
						</Show>

						<Show when={keywordList().length > 0}>
							<div>
								<div class="mb-1.5 text-xs font-semibold text-muted-foreground">Keywords</div>
								<div class="flex flex-wrap gap-1.5">
									<For each={keywordList()}>
										{(kw) => (
											<span class="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
												{kw}
											</span>
										)}
									</For>
								</div>
							</div>
						</Show>

						<div class={`${props.compact ? "" : "mt-auto"} pt-2`}>
							<button
								type="button"
								onClick={() => props.onRun(command())}
								class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								{isNavigate() ? "Open" : "Run"}
							</button>
						</div>
					</div>
				);
			}}
		</Show>
	);
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
			action: {
				type: "exec",
				handler: () => navigator.clipboard.writeText(window.location.href).catch(() => {}),
			},
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
				handler: () => window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer"),
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
				<div class="w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
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

					<div class="grid max-h-[70vh] grid-cols-1 grid-rows-[1fr,auto] divide-y divide-border sm:grid-cols-[1fr,320px] sm:grid-rows-1 lg:grid-cols-[1fr,380px] sm:divide-x sm:divide-y-0">
						<div class="min-h-0 overflow-y-auto p-2">
							<Show
								when={filtered().length > 0}
								fallback={
									<div class="py-8 text-center text-sm text-muted-foreground">
										No commands match "<span class="font-medium text-foreground">{query()}</span>".
									</div>
								}
							>
								<div id="cmd-list" role="listbox" aria-label="Commands">
									<For each={Object.entries(grouped())}>
										{([group, items]) => (
											<fieldset class="mb-2 border-0 p-0" aria-label={group}>
												<p class="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
													{group}
												</p>
												<div class="space-y-0.5">
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
																	class={`group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
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
																	<div class="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
																		<Show when={active}>
																			<span
																				class="h-4 w-1 shrink-0 rounded-full bg-primary-foreground/70"
																				aria-hidden="true"
																			/>
																		</Show>
																		<KindIcon
																			kind={commandKind(command)}
																			class={`h-4 w-4 shrink-0 ${active ? "text-primary-foreground/80" : "text-muted-foreground"}`}
																		/>
																		{highlightText(command.label, query(), active)}
																	</div>
																	<Show when={current()}>
																		<span
																			class={`ml-2 shrink-0 text-xs ${
																				active ? "text-primary-foreground/70" : "text-muted-foreground"
																			}`}
																		>
																			Current
																		</span>
																	</Show>
																</div>
															);
														}}
													</For>
												</div>
											</fieldset>
										)}
									</For>
								</div>
							</Show>
						</div>

						<div class="hidden h-full min-h-0 flex-col overflow-y-auto border-l border-border bg-surface p-4 sm:flex">
							<CommandPreviewCard
								command={activeCommand()}
								current={isCurrentCommand(activeCommand(), location().pathname)}
								onRun={runCommand}
							/>
						</div>

						<Show when={activeCommand()}>
							{(cmd) => (
								<div class="block h-auto max-h-[35vh] min-h-0 overflow-y-auto border-t border-border bg-surface p-4 sm:hidden">
									<CommandPreviewCard
										command={cmd()}
										current={isCurrentCommand(cmd(), location().pathname)}
										onRun={runCommand}
										compact
									/>
								</div>
							)}
						</Show>
					</div>

					<div
						class="border-t border-border bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground flex items-center justify-between"
						aria-live="polite"
					>
						<div class="flex items-center gap-3">
							<span>
								<kbd class="font-semibold">↑</kbd> <kbd class="font-semibold">↓</kbd> to navigate
							</span>
							<span>
								<kbd class="font-semibold">↵</kbd> to select
							</span>
							<span class="hidden sm:inline">
								<kbd class="font-semibold">esc</kbd> to close
							</span>
						</div>
						<span>
							{filtered().length} command{filtered().length === 1 ? "" : "s"}
						</span>
					</div>
				</div>
			</div>
		</Show>
	);
}
