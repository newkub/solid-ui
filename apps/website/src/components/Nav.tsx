import { Link, useNavigate } from "@tanstack/solid-router";
import { createSignal, For, type JSX, onCleanup, onMount, Show } from "solid-js";
import { toggleThemeMode } from "../lib/theme";
import { CommandPalette } from "./CommandPalette";
import { ContextMenu } from "./ContextMenu";
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
	| "plugins";

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

const simpleLinks: Array<{ to: string; label: string; icon: IconName }> = [
	{ to: "/components", label: "Components", icon: "components" },
	{ to: "/docs/intro", label: "Docs", icon: "docs" },
	{ to: "/theme", label: "Theme", icon: "theme" },
	{ to: "/layouts", label: "Layouts", icon: "layouts" },
	{ to: "/hooks", label: "Hooks", icon: "hooks" },
	{ to: "/cli", label: "CLI", icon: "cli" },
	{ to: "/skills", label: "Skills", icon: "skills" },
	{ to: "/templates", label: "Templates", icon: "template" },
	{ to: "/plugins", label: "Plugins", icon: "plugins" },
	{ to: "/mcp", label: "MCP", icon: "mcp" },
];

function SimpleLink(props: { to: string; label: string; icon: IconName; onClick?: () => void }) {
	return (
		<Link
			to={props.to}
			class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
			activeProps={() => ({
				class:
					"flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/10",
			})}
			activeOptions={{ exact: true }}
			onClick={props.onClick}
		>
			<NavIcon name={props.icon} />
			{props.label}
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
		{ label: "Home", onClick: () => navigate({ to: "/" }) },
		{ label: "Copy home link", onClick: copyHomeLink },
		{ label: "Reload", onClick: () => window.location.reload() },
		{
			label: "View on GitHub",
			onClick: () => window.open("https://github.com/newkub/solid-ui", "_blank", "noopener,noreferrer"),
		},
	];
	return <ContextMenu items={items}>{props.children}</ContextMenu>;
}

function SearchButton(props: { onClick: () => void; class?: string }) {
	return (
		<button
			type="button"
			onClick={props.onClick}
			class={`inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${props.class ?? ""}`}
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
			<span class="hidden sm:inline">Search…</span>
			<kbd class="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground lg:inline">
				{isApplePlatform() ? "⌘K" : "Ctrl+K"}
			</kbd>
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

function Brand() {
	return (
		<LogoContextMenu>
			<Link
				to="/"
				class="flex items-center gap-2 text-foreground no-underline hover:text-primary transition-colors"
				onContextMenu={(e) => e.preventDefault()}
			>
				<Logo class="text-primary" />
				<span class="font-sans font-semibold">solid-ui</span>
			</Link>
		</LogoContextMenu>
	);
}

export function NavLayout(props: { children: JSX.Element }) {
	const [menuOpen, setMenuOpen] = createSignal(false);
	const [commandOpen, setCommandOpen] = createSignal(false);

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setCommandOpen((v) => !v);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => document.removeEventListener("keydown", onKeyDown));
	});

	function closeMenu() {
		setMenuOpen(false);
	}

	return (
		<>
			<header class="sticky top-0 z-sticky flex h-14 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur lg:hidden">
				<div class="flex items-center gap-3">
					<MenuButton open={menuOpen()} onClick={() => setMenuOpen((v) => !v)} />
					<Brand />
				</div>
				<div class="flex items-center gap-2">
					<SearchButton onClick={() => setCommandOpen(true)} class="hidden sm:inline-flex" />
					<SearchButton
						onClick={() => setCommandOpen(true)}
						class="inline-flex h-9 w-9 items-center justify-center p-0 sm:hidden"
					/>
					<ThemePicker />
				</div>
			</header>

			<div class="flex min-h-screen">
				<aside
					class={`fixed inset-y-0 left-0 z-modal w-64 transform border-r border-border bg-surface p-4 transition-transform lg:static lg:translate-x-0 ${
						menuOpen() ? "translate-x-0" : "-translate-x-full"
					} flex h-screen flex-col overflow-y-auto`}
					aria-label="Main navigation"
				>
					<div class="mb-6 hidden items-center justify-between lg:flex">
						<Brand />
						<ThemePicker />
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
						<SearchButton
							onClick={() => {
								setCommandOpen(true);
								closeMenu();
							}}
						/>
					</div>

					<nav class="flex-1 space-y-1">
						<For each={simpleLinks}>
							{(link) => <SimpleLink to={link.to} label={link.label} icon={link.icon} onClick={closeMenu} />}
						</For>
					</nav>

					<div class="mt-4 hidden border-t border-border pt-4 lg:block">
						<SearchButton onClick={() => setCommandOpen(true)} class="w-full justify-start" />
					</div>
				</aside>

				<div class="min-w-0 flex-1">{props.children}</div>
			</div>

			<CommandPalette open={commandOpen()} onClose={() => setCommandOpen(false)} onToggleTheme={toggleThemeMode} />
		</>
	);
}
