import { Link, useLocation, useNavigate } from "@tanstack/solid-router";
import { createEffect, createMemo, createSignal, For, type JSX, onCleanup, onMount, Show } from "solid-js";
import { GITHUB_REPO_URL } from "../lib/config";
import { toggleThemeMode } from "../lib/theme";
import { CommandPalette } from "./CommandPalette";
import { ComponentSidebar } from "./ComponentSidebar";
import { ContextMenu } from "./ContextMenu";
import { DevTools, GearIcon } from "./DevTools";
import { Logo } from "./Logo";
import { ThemePicker } from "./ThemePicker";

function isApplePlatform() {
	if (typeof navigator === "undefined") return false;
	return /(Mac|iPhone|iPad|iPod)/.test(navigator.platform ?? navigator.userAgent);
}

type IconName =
	| "components"
	| "theme"
	| "template"
	| "mcp"
	| "docs"
	| "skills"
	| "layouts"
	| "hooks"
	| "cli"
	| "plugins"
	| "settings"
	| "home";

const iconPaths: Record<IconName, () => JSX.Element> = {
	components: () => (
		<>
			<rect x="2" y="2" width="5" height="5" rx="1" />
			<rect x="9" y="2" width="5" height="5" rx="1" />
			<rect x="2" y="9" width="5" height="5" rx="1" />
			<rect x="9" y="9" width="5" height="5" rx="1" />
		</>
	),
	theme: () => (
		<path d="M8 1.5a6.5 6.5 0 1 0 0 13c.7 0 1.2-.6 1.2-1.2 0-.3-.1-.6-.3-.8-.2-.2-.3-.5-.3-.8 0-.6.5-1.2 1.2-1.2H11a3 3 0 0 0 3-3c0-3.3-2.7-6-6-6Z" />
	),
	template: () => (
		<>
			<rect x="2" y="2" width="12" height="12" rx="1.5" />
			<line x1="2" y1="6" x2="14" y2="6" />
			<line x1="6" y1="6" x2="6" y2="14" />
		</>
	),
	mcp: () => (
		<>
			<rect x="2" y="3" width="12" height="4" rx="1" />
			<rect x="2" y="9" width="12" height="4" rx="1" />
			<circle cx="4.5" cy="5" r="0.5" fill="currentColor" />
			<circle cx="4.5" cy="11" r="0.5" fill="currentColor" />
		</>
	),
	docs: () => (
		<>
			<path d="M3 2.5h6.5L13 6v7.5a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1Z" />
			<line x1="4.5" y1="8" x2="10.5" y2="8" />
			<line x1="4.5" y1="10.5" x2="10.5" y2="10.5" />
		</>
	),
	skills: () => <path d="M8 1.5 9.4 5l3.6.5-2.6 2.5.6 3.6L8 9.9l-3 1.7.6-3.6L3 5.5 6.6 5 8 1.5Z" />,
	layouts: () => (
		<>
			<rect x="2" y="3" width="20" height="18" rx="2" />
			<path d="M2 9h20M9 9v12" />
		</>
	),
	hooks: () => <path d="M10 3a4 4 0 0 1 4 4v4a2 2 0 1 1-4 0V7a2 2 0 1 0-2 2" />,
	cli: () => (
		<>
			<rect x="2" y="4" width="20" height="14" rx="2" />
			<path d="m6 9 3 3-3 3M12 15h6" />
		</>
	),
	plugins: () => (
		<>
			<rect x="2" y="2" width="9" height="9" rx="1.5" />
			<rect x="13" y="2" width="9" height="9" rx="1.5" />
			<rect x="2" y="13" width="9" height="9" rx="1.5" />
			<rect x="13" y="13" width="9" height="9" rx="1.5" />
		</>
	),
	home: () => (
		<>
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</>
	),
	settings: () => (
		<>
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
		</>
	),
};

function NavIcon(props: { name: IconName }) {
	const Path = iconPaths[props.name];
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.4"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class="shrink-0"
		>
			<Path />
		</svg>
	);
}

interface NavLink {
	to: string;
	label: string;
	icon: IconName;
}

interface NavGroup {
	id: string;
	label: string;
	links: NavLink[];
}

const navGroups: NavGroup[] = [
	{
		id: "core",
		label: "Core",
		links: [
			{ to: "/", label: "Home", icon: "home" },
			{ to: "/docs/intro", label: "Get started", icon: "docs" },
			{ to: "/theme", label: "Theme", icon: "theme" },
		],
	},
	{
		id: "apis",
		label: "APIs",
		links: [
			{ to: "/components", label: "Components", icon: "components" },
			{ to: "/templates", label: "Templates", icon: "template" },
			{ to: "/layouts", label: "Layouts", icon: "layouts" },
			{ to: "/hooks", label: "Hooks", icon: "hooks" },
		],
	},
	{
		id: "development",
		label: "Development",
		links: [
			{ to: "/cli", label: "CLI", icon: "cli" },
			{ to: "/skills", label: "Skills", icon: "skills" },
			{ to: "/plugins", label: "Plugins", icon: "plugins" },
			{ to: "/docs/integrations/mcp", label: "MCP", icon: "mcp" },
		],
	},
	{
		id: "system",
		label: "System",
		links: [{ to: "/settings", label: "Settings", icon: "settings" }],
	},
];

function SimpleLink(props: { to: string; label: string; icon: IconName; onClick?: () => void; collapsed?: boolean }) {
	const collapsed = () => !!props.collapsed;
	const baseClass = () =>
		`rounded-md text-sm font-medium transition-colors ${
			collapsed()
				? "flex h-9 w-9 items-center justify-center p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
				: "flex items-center gap-2 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
		}`;
	const activeClass = () =>
		`rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/10 ${
			collapsed() ? "flex h-9 w-9 items-center justify-center p-0" : "flex items-center gap-2 px-3 py-2"
		}`;

	return (
		<Link
			to={props.to}
			class={baseClass()}
			activeProps={() => ({ class: activeClass() })}
			activeOptions={{ exact: true }}
			onClick={props.onClick}
			title={props.label}
		>
			<NavIcon name={props.icon} />
			<span class={collapsed() ? "sr-only" : ""}>{props.label}</span>
		</Link>
	);
}

function LogoContextMenu(props: { children: JSX.Element }) {
	const navigate = useNavigate();
	async function copyHomeLink() {
		try {
			await navigator.clipboard.writeText(window.location.origin);
		} catch {}
	}
	const items = [
		{
			label: "Home",
			icon: (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
			),
			onClick: () => navigate({ to: "/" }),
		},
		{
			label: "Copy home link",
			icon: (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
				</svg>
			),
			onClick: copyHomeLink,
		},
		{
			label: "Reload",
			icon: (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<polyline points="23 4 23 10 17 10" />
					<polyline points="1 20 1 14 7 14" />
					<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
				</svg>
			),
			onClick: () => window.location.reload(),
		},
		{
			label: "View on GitHub",
			icon: (
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22" />
				</svg>
			),
			onClick: () => window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer"),
		},
	];
	return <ContextMenu items={items}>{props.children}</ContextMenu>;
}

function SearchButton(props: { onClick: () => void; class?: string; collapsed?: boolean }) {
	return (
		<button
			type="button"
			onClick={props.onClick}
			class={`inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background text-sm font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
				props.collapsed ? "w-9 justify-center p-0" : "px-3"
			} ${props.class ?? ""}`}
			aria-label="Search"
			title="Search"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="m21 21-4.3-4.3" />
			</svg>
			<Show when={!props.collapsed}>
				<span class="hidden sm:inline">Search…</span>
				<kbd class="hidden rounded bg-muted px-1.5 py-0.5 text-2xs font-semibold text-muted-foreground lg:inline">
					{isApplePlatform() ? "⌘K" : "Ctrl+K"}
				</kbd>
			</Show>
		</button>
	);
}

function MenuButton(props: { open: boolean; onClick: () => void }) {
	return (
		<button
			type="button"
			class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			aria-label={props.open ? "Close menu" : "Open menu"}
			aria-expanded={props.open}
			onClick={props.onClick}
		>
			<Show
				when={props.open}
				fallback={
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						aria-hidden="true"
					>
						<line x1="4" y1="6" x2="20" y2="6" />
						<line x1="4" y1="12" x2="20" y2="12" />
						<line x1="4" y1="18" x2="20" y2="18" />
					</svg>
				}
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M18 6 6 18M6 6l12 12" />
				</svg>
			</Show>
		</button>
	);
}

function DevToolsButton(props: { open: boolean; onToggle: () => void }) {
	return (
		<button
			type="button"
			onClick={props.onToggle}
			class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			aria-label="Toggle developer tools"
			aria-pressed={props.open}
			title="Developer tools"
		>
			<GearIcon class="h-4 w-4" />
		</button>
	);
}

function ChevronIcon(props: { direction: "left" | "right" | "down"; class?: string }) {
	const path = () => {
		switch (props.direction) {
			case "left":
				return "M15 18l-6-6 6-6";
			case "right":
				return "M9 18l6-6-6-6";
			case "down":
				return "M6 9l6 6 6-6";
		}
	};
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class={props.class}
		>
			<path d={path()} />
		</svg>
	);
}

function CollapseToggle(props: { collapsed: boolean; onClick: () => void }) {
	return (
		<button
			type="button"
			onClick={props.onClick}
			class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			aria-label={props.collapsed ? "Expand sidebar" : "Collapse sidebar"}
			title={props.collapsed ? "Expand sidebar" : "Collapse sidebar"}
		>
			<ChevronIcon direction={props.collapsed ? "right" : "left"} />
		</button>
	);
}

function Brand(props: { collapsed?: boolean }) {
	const collapsed = () => !!props.collapsed;
	return (
		<LogoContextMenu>
			<Link
				to="/"
				class={`flex items-center text-foreground no-underline hover:text-primary transition-colors ${
					collapsed() ? "justify-center" : "gap-2"
				}`}
				onContextMenu={(e) => e.preventDefault()}
				title="Home"
			>
				<Logo class="text-primary" />
				<span class={collapsed() ? "sr-only" : "font-sans font-semibold"}>solid-ui</span>
			</Link>
		</LogoContextMenu>
	);
}

function NavGroup(props: { group: NavGroup; onClick?: () => void; collapsed?: boolean }) {
	const collapsed = () => !!props.collapsed;
	return (
		<div class="space-y-1">
			<p
				class={
					collapsed() ? "sr-only" : "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
				}
			>
				{props.group.label}
			</p>
			<div class="space-y-0.5">
				<For each={props.group.links}>
					{(link) =>
						link.to === "/components" ? (
							<ComponentsAccordion
								icon={link.icon}
								label={link.label}
								collapsed={props.collapsed}
								onClick={props.onClick}
							/>
						) : (
							<SimpleLink
								to={link.to}
								label={link.label}
								icon={link.icon}
								onClick={props.onClick}
								collapsed={props.collapsed}
							/>
						)
					}
				</For>
			</div>
		</div>
	);
}

function ComponentsAccordion(props: { icon: IconName; label: string; collapsed?: boolean; onClick?: () => void }) {
	const location = useLocation();
	const path = createMemo(() => location().pathname);
	const isComponentsRoute = createMemo(
		() => path() === "/components" || path() === "/docs/components" || path().startsWith("/docs/components/"),
	);
	const [open, setOpen] = createSignal(isComponentsRoute());
	const collapsed = () => !!props.collapsed;

	createEffect(() => {
		setOpen(isComponentsRoute());
	});

	const baseClass = () =>
		`rounded-md text-sm font-medium transition-colors ${
			collapsed()
				? "flex h-9 w-9 items-center justify-center p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
				: "flex flex-1 items-center gap-2 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
		}`;
	const activeClass = () =>
		`rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/10 ${
			collapsed() ? "flex h-9 w-9 items-center justify-center p-0" : "flex flex-1 items-center gap-2 px-3 py-2"
		}`;

	return (
		<div class="space-y-1">
			<div class={collapsed() ? "" : "flex items-center gap-1"}>
				<Link
					to="/components"
					class={baseClass()}
					activeProps={() => ({ class: activeClass() })}
					activeOptions={{ exact: true }}
					onClick={props.onClick}
					title={props.label}
				>
					<NavIcon name={props.icon} />
					<span class={collapsed() ? "sr-only" : ""}>{props.label}</span>
				</Link>
				<Show when={isComponentsRoute() && !collapsed()}>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						aria-expanded={open()}
						aria-controls="component-accordion-panel"
						aria-label={`${open() ? "Collapse" : "Expand"} component categories`}
						title={`${open() ? "Collapse" : "Expand"} component categories`}
						class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						<ChevronIcon direction="down" class={`transition-transform ${open() ? "rotate-180" : ""}`} />
					</button>
				</Show>
			</div>
			<Show when={open() && isComponentsRoute() && !collapsed()}>
				<div id="component-accordion-panel" class="border-l border-border pl-3">
					<ComponentSidebar as="module" onClick={props.onClick} />
				</div>
			</Show>
		</div>
	);
}

export function NavLayout(props: { children: JSX.Element }) {
	const [menuOpen, setMenuOpen] = createSignal(false);
	const [commandOpen, setCommandOpen] = createSignal(false);
	const [devToolsOpen, setDevToolsOpen] = createSignal(false);
	const [collapsed, setCollapsed] = createSignal(false);

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setCommandOpen((v) => !v);
			}
			if (menuOpen() && e.key === "Escape") {
				e.preventDefault();
				setMenuOpen(false);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => document.removeEventListener("keydown", onKeyDown));
	});

	function closeMenu() {
		setMenuOpen(false);
	}

	const isCollapsed = () => collapsed() && !menuOpen();

	return (
		<>
			<header class="sticky top-0 z-sticky flex h-14 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur lg:hidden">
				<div class="flex items-center gap-3">
					<MenuButton open={menuOpen()} onClick={() => setMenuOpen((v) => !v)} />
					<Brand />
				</div>
				<div class="flex items-center gap-2">
					<SearchButton
						onClick={() => setCommandOpen(true)}
						class="hidden h-9 w-9 justify-center p-0 sm:inline-flex sm:h-9 sm:w-auto sm:px-3"
					/>
					<DevToolsButton open={devToolsOpen()} onToggle={() => setDevToolsOpen((v) => !v)} />
					<ThemePicker />
				</div>
			</header>

			<div class="flex min-h-screen">
				<Show when={menuOpen()}>
					<div
						class="fixed inset-0 z-modal-backdrop bg-overlay/60 backdrop-blur-sm lg:hidden"
						aria-hidden="true"
						onClick={closeMenu}
					/>
				</Show>
				<aside
					class={`fixed inset-y-0 left-0 z-modal transform border-r border-border bg-surface transition-all duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:overflow-y-auto ${
						menuOpen() ? "translate-x-0" : "-translate-x-full"
					} w-64 p-4 ${isCollapsed() ? "lg:w-16 lg:p-2" : ""} flex flex-col`}
					aria-label="Main navigation"
				>
					<div
						class={`mb-6 hidden lg:flex ${
							isCollapsed() ? "flex-col items-center gap-2" : "items-center justify-between"
						}`}
					>
						<div class={isCollapsed() ? "flex flex-col items-center gap-1" : "flex items-center gap-2"}>
							<Brand collapsed={isCollapsed()} />
							<CollapseToggle collapsed={isCollapsed()} onClick={() => setCollapsed((v) => !v)} />
						</div>
						<div class={isCollapsed() ? "flex flex-col items-center gap-2" : "flex items-center gap-2"}>
							<DevToolsButton open={devToolsOpen()} onToggle={() => setDevToolsOpen((v) => !v)} />
							<ThemePicker />
						</div>
					</div>

					<div class="mb-4 lg:hidden">
						<div class="mb-3 flex items-center justify-between">
							<span class="font-sans font-semibold">solid-ui</span>
							<button
								type="button"
								onClick={closeMenu}
								class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
								aria-label="Close menu"
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									aria-hidden="true"
								>
									<path d="M18 6 6 18M6 6l12 12" />
								</svg>
							</button>
						</div>
					</div>

					<div class="mb-4">
						<SearchButton
							onClick={() => {
								setCommandOpen(true);
								closeMenu();
							}}
							class={isCollapsed() ? undefined : "w-full justify-start"}
							collapsed={isCollapsed()}
						/>
					</div>

					<nav class={`flex-1 overflow-y-auto ${isCollapsed() ? "space-y-3" : "space-y-5"}`}>
						<For each={navGroups}>
							{(group) => <NavGroup group={group} onClick={closeMenu} collapsed={isCollapsed()} />}
						</For>
					</nav>
				</aside>

				<div class="min-w-0 flex-1">{props.children}</div>
			</div>

			<DevTools open={devToolsOpen} onOpenChange={(open) => setDevToolsOpen(open)} />
			<CommandPalette open={commandOpen()} onClose={() => setCommandOpen(false)} onToggleTheme={toggleThemeMode} />
		</>
	);
}
