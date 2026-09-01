import { Link } from "@tanstack/solid-router";
import { createSignal, For, type JSX, Show } from "solid-js";
import { categories } from "../categories";
import { Logo } from "./Logo";
import { ThemePicker } from "./ThemePicker";

type IconName = "home" | "components" | "theme" | "template" | "mcp" | "docs" | "skills" | "layouts" | "hooks" | "cli";

const iconPaths: Record<IconName, () => JSX.Element> = {
	home: () => <path d="M2 8.5 8 3l6 5.5M4 7v6.5a.5.5 0 0 0 .5.5H6.5v-4h3v4H11.5a.5.5 0 0 0 .5-.5V7" />,
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

function Chevron(props: { open: boolean }) {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class={`shrink-0 transition-transform ${props.open ? "rotate-180" : ""}`}
			aria-hidden="true"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

const simpleLinks: Array<{ to: string; label: string; icon: IconName }> = [
	{ to: "/theme", label: "Theme", icon: "theme" },
	{ to: "/docs/intro", label: "Docs", icon: "docs" },
	{ to: "/layouts", label: "Layouts", icon: "layouts" },
	{ to: "/hooks", label: "Hooks", icon: "hooks" },
	{ to: "/cli", label: "CLI", icon: "cli" },
	{ to: "/skills", label: "Skills", icon: "skills" },
	{ to: "/templates", label: "Templates", icon: "template" },
	{ to: "/mcp", label: "MCP", icon: "mcp" },
];

function ComponentsMegaMenu(props: { onClose: () => void }) {
	return (
		<div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
			<For each={categories}>
				{(cat) => (
					<div>
						<h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{cat.label}</h3>
						<ul class="space-y-1">
							<For each={cat.items}>
								{(name) => (
									<li>
										<Link
											to={`/docs/${cat.id}/${name.toLowerCase()}`}
											class="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
											onClick={props.onClose}
										>
											{name}
										</Link>
									</li>
								)}
							</For>
						</ul>
					</div>
				)}
			</For>
		</div>
	);
}

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

export function Nav() {
	const [menuOpen, setMenuOpen] = createSignal(false);
	const [megaOpen, setMegaOpen] = createSignal(false);
	const menuId = "site-nav";

	return (
		<header class="sticky top-0 z-sticky border-b border-border bg-surface/95 backdrop-blur supports-[not(backdrop-filter:blur(0))]:bg-surface">
			<div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
				<h1 class="text-xl font-bold tracking-tight">
					<Link
						to="/"
						class="flex items-center gap-2 text-foreground no-underline hover:text-primary transition-colors"
					>
						<Logo class="text-primary" />
						<span>solid-ui</span>
					</Link>
				</h1>

				<nav
					id={menuId}
					class={`absolute left-0 right-0 top-full flex-col border-b border-border bg-surface p-4 shadow-lg md:static md:flex-1 md:flex md:flex-row md:items-center md:justify-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
						menuOpen() ? "flex" : "hidden"
					}`}
					aria-label="Main navigation"
				>
					<div class="flex flex-col gap-1 md:flex-row md:items-center">
						<Link
							to="/"
							class="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground"
							activeProps={() => ({
								class:
									"flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
							})}
							activeOptions={{ exact: true }}
							onClick={() => setMenuOpen(false)}
						>
							<NavIcon name="home" />
							Home
						</Link>

						<div class="relative">
							<button
								type="button"
								class="flex w-full items-center gap-1.5 rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-muted hover:text-foreground md:w-auto"
								onClick={() => {
									setMegaOpen((v) => !v);
									setMenuOpen(false);
								}}
								aria-expanded={megaOpen()}
							>
								<NavIcon name="components" />
								<span>Components</span>
								<Chevron open={megaOpen()} />
							</button>
							<Show when={megaOpen()}>
								<div class="relative z-dropdown mt-1 rounded-lg border border-border bg-surface p-2 shadow-lg md:absolute md:left-0 md:top-full md:mt-2 md:w-screen md:max-w-2xl">
									<ComponentsMegaMenu onClose={() => setMegaOpen(false)} />
									<div class="border-t border-border p-2">
										<Link
											to="/components"
											class="block rounded-md px-2 py-1.5 text-sm font-medium text-primary hover:bg-muted"
											onClick={() => setMegaOpen(false)}
										>
											Browse all components
										</Link>
									</div>
								</div>
							</Show>
						</div>

						<For each={simpleLinks}>
							{(link) => (
								<SimpleLink to={link.to} label={link.label} icon={link.icon} onClick={() => setMenuOpen(false)} />
							)}
						</For>
					</div>
				</nav>

				<div class="flex items-center gap-2">
					<Link
						to="/docs/intro"
						class="hidden md:inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/90"
					>
						Get Started
					</Link>
					<ThemePicker />
					<button
						type="button"
						class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground md:hidden"
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
		</header>
	);
}
