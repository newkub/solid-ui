import { Link, useNavigate } from "@tanstack/solid-router";
import { createSignal, For, type JSX, onCleanup, onMount } from "solid-js";
import { toggleThemeMode } from "../lib/theme";
import { CommandPalette } from "./CommandPalette";
import { ContextMenu } from "./ContextMenu";
import { Logo } from "./Logo";
import { ThemePicker } from "./ThemePicker";

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
			class="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
			activeProps={() => ({
				class: "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
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

export function Nav() {
	const [menuOpen, setMenuOpen] = createSignal(false);
	const [commandOpen, setCommandOpen] = createSignal(false);
	const menuId = "site-nav";

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

	return (
		<header class="sticky top-0 z-sticky border-b border-border bg-surface/95 font-sans backdrop-blur supports-[not(backdrop-filter:blur(0))]:bg-surface">
			<div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
				<h1 class="text-xl font-bold tracking-tight">
					<LogoContextMenu>
						<Link
							to="/"
							class="flex items-center gap-2 text-foreground no-underline hover:text-primary transition-colors"
							onContextMenu={(e) => e.preventDefault()}
						>
							<Logo class="text-primary" />
							<span class="font-sans">solid-ui</span>
						</Link>
					</LogoContextMenu>
				</h1>

				<nav
					id={menuId}
					class={`absolute left-0 right-0 top-full flex-col border-b border-border bg-surface p-4 shadow-lg md:static md:flex-1 md:flex md:flex-row md:items-center md:justify-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
						menuOpen() ? "flex" : "hidden"
					}`}
					aria-label="Main navigation"
				>
					<div class="flex flex-col gap-1 md:flex-row md:items-center">
						<For each={simpleLinks}>
							{(link) => (
								<SimpleLink to={link.to} label={link.label} icon={link.icon} onClick={() => setMenuOpen(false)} />
							)}
						</For>
					</div>
				</nav>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setCommandOpen(true)}
						class="hidden md:inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-all hover:border-border-hover hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
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
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
						<span>Search…</span>
						<kbd class="ml-1 hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground lg:inline">
							⌘K
						</kbd>
					</button>
					<Link
						to="/docs/intro"
						class="hidden md:inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline shadow-sm transition-all hover:bg-primary-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					>
						Get Started
					</Link>
					<ThemePicker />
					<button
						type="button"
						class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						aria-label={menuOpen() ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen()}
						aria-controls={menuId}
						onClick={() => setMenuOpen((v) => !v)}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<line x1="4" y1="6" x2="20" y2="6" />
							<line x1="4" y1="12" x2="20" y2="12" />
							<line x1="4" y1="18" x2="20" y2="18" />
						</svg>
					</button>
				</div>
			</div>
			<CommandPalette open={commandOpen()} onClose={() => setCommandOpen(false)} onToggleTheme={toggleThemeMode} />
		</header>
	);
}
