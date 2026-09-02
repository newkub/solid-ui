import { Link, useLocation } from "@tanstack/solid-router";
import { createSignal, For, type JSX, onCleanup, onMount, Show } from "solid-js";
import type { NavItem } from "../data/navigation";
import { topNavItems } from "../data/navigation";
import { GITHUB_REPO_URL } from "../lib/config";
import { Logo } from "./Logo";
import { ThemePicker } from "./ThemePicker";

function MenuIcon(props: { open: boolean }) {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<Show
				when={props.open}
				fallback={
					<>
						<line x1="4" y1="6" x2="20" y2="6" />
						<line x1="4" y1="12" x2="20" y2="12" />
						<line x1="4" y1="18" x2="20" y2="18" />
					</>
				}
			>
				<path d="M18 6 6 18M6 6l12 12" />
			</Show>
		</svg>
	);
}

function GitHubIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22" />
		</svg>
	);
}

function SearchIcon() {
	return (
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
	);
}

function GearIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="3" />
			<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
		</svg>
	);
}

function isApplePlatform() {
	if (typeof navigator === "undefined") return false;
	return /(Mac|iPhone|iPad|iPod)/.test(navigator.platform ?? navigator.userAgent);
}

function NavDropdown(props: { label: string; active: boolean; children: JSX.Element }) {
	const [open, setOpen] = createSignal(false);
	let ref: HTMLFieldSetElement | undefined;

	onMount(() => {
		function onClick(event: MouseEvent) {
			if (ref && !ref.contains(event.target as Node) && open()) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", onClick);
		onCleanup(() => document.removeEventListener("mousedown", onClick));
	});

	return (
		<fieldset ref={ref} class="relative" aria-label={`${props.label} menu`}>
			<button
				type="button"
				class={`inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors ${
					props.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
				}`}
				aria-expanded={open()}
				aria-haspopup="true"
				onClick={() => setOpen((v) => !v)}
			>
				{props.label}
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>
			<Show when={open()}>
				<div class="absolute left-0 top-full z-dropdown min-w-44 rounded-xl border border-border bg-surface p-1.5 shadow-xl">
					{props.children}
				</div>
			</Show>
		</fieldset>
	);
}

function NavLink(props: { item: NavItem; active: boolean }) {
	if (props.item.children) {
		return (
			<NavDropdown label={props.item.label} active={props.active}>
				<For each={props.item.children}>
					{(child) => (
						<Link
							to={child.to as string}
							class="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							activeProps={() => ({
								class: "block rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary",
							})}
							activeOptions={{ exact: false }}
						>
							{child.label}
						</Link>
					)}
				</For>
			</NavDropdown>
		);
	}
	return (
		<Link
			to={props.item.to as string}
			class={`h-9 rounded-md px-2.5 text-sm font-medium transition-colors ${
				props.active ? "text-primary" : "text-muted-foreground hover:text-foreground"
			}`}
			activeProps={() => ({ class: "h-9 rounded-md px-2.5 text-sm font-medium text-primary" })}
			activeOptions={{ exact: true }}
		>
			{props.item.label}
		</Link>
	);
}

export function TopNav(props: { onSearch: () => void; onDevTools: () => void }) {
	const location = useLocation();
	const [menuOpen, setMenuOpen] = createSignal(false);

	const pathname = () => location().pathname;

	function isActive(item: NavItem) {
		if (item.to) return pathname() === item.to;
		if (item.children) return item.children.some((c) => pathname().startsWith(c.to ?? ""));
		return false;
	}

	function closeMenu() {
		setMenuOpen(false);
	}

	function openGitHub() {
		window.open(GITHUB_REPO_URL, "_blank", "noopener,noreferrer");
	}

	return (
		<>
			<header class="sticky top-0 z-sticky flex h-14 items-center justify-between border-b border-border bg-surface/95 px-4 backdrop-blur lg:px-6">
				<div class="flex items-center gap-4">
					<Link
						to="/"
						class="flex items-center gap-2 text-foreground no-underline hover:text-primary transition-colors"
					>
						<Logo class="text-primary" />
						<span class="font-sans font-semibold">solid-ui</span>
					</Link>
					<nav class="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
						<For each={topNavItems}>{(item) => <NavLink item={item} active={isActive(item)} />}</For>
					</nav>
				</div>

				<div class="flex items-center gap-2">
					<button
						type="button"
						onClick={props.onSearch}
						class="hidden h-9 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted sm:inline-flex"
						aria-label="Search"
					>
						<SearchIcon />
						<span class="hidden md:inline">Search…</span>
						<kbd class="hidden rounded bg-muted px-1.5 py-0.5 text-2xs font-semibold text-muted-foreground lg:inline">
							{isApplePlatform() ? "⌘K" : "Ctrl+K"}
						</kbd>
					</button>
					<button
						type="button"
						onClick={openGitHub}
						class="hidden h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted sm:inline-flex"
						aria-label="View on GitHub"
						title="View on GitHub"
					>
						<GitHubIcon />
					</button>
					<button
						type="button"
						onClick={props.onDevTools}
						class="hidden h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted sm:inline-flex"
						aria-label="Developer tools"
						title="Developer tools"
					>
						<GearIcon class="h-4 w-4" />
					</button>
					<ThemePicker />
					<button
						type="button"
						onClick={() => setMenuOpen((v) => !v)}
						class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
						aria-label={menuOpen() ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen()}
					>
						<MenuIcon open={menuOpen()} />
					</button>
				</div>
			</header>

			<Show when={menuOpen()}>
				<div
					class="fixed inset-0 z-modal-backdrop bg-overlay/60 backdrop-blur-sm lg:hidden"
					aria-hidden="true"
					onClick={closeMenu}
				/>
				<div class="fixed inset-x-0 top-14 z-modal border-b border-border bg-surface p-4 shadow-xl lg:hidden">
					<nav class="space-y-1" aria-label="Mobile navigation">
						<For each={topNavItems}>
							{(item) => (
								<Show
									when={item.children}
									fallback={
										<Link
											to={item.to as string}
											class="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
											activeProps={() => ({
												class: "block rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary",
											})}
											activeOptions={{ exact: true }}
											onClick={closeMenu}
										>
											{item.label}
										</Link>
									}
								>
									{(children) => (
										<div>
											<div class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
												{item.label}
											</div>
											<div class="space-y-0.5 pl-2">
												<For each={children()}>
													{(child) => (
														<Link
															to={child.to as string}
															class="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
															activeProps={() => ({
																class: "block rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary",
															})}
															activeOptions={{ exact: true }}
															onClick={closeMenu}
														>
															{child.label}
														</Link>
													)}
												</For>
											</div>
										</div>
									)}
								</Show>
							)}
						</For>
					</nav>
				</div>
			</Show>
		</>
	);
}
