import { createRootRoute, createRoute, createRouter, Link, Navigate, Outlet } from "@tanstack/solid-router";
import * as SolidUI from "@wrikka/solid-ui";
import { createSignal, For } from "solid-js";
import { CodeBlock } from "./components/CodeBlock";
import { ComponentGallery } from "./components/ComponentGallery";
import { DocsPage } from "./components/DocsPage";
import { ThemePage } from "./components/ThemePage";
import { ThemePicker } from "./components/ThemePicker";
import { GITHUB_REPO_URL, PLACEHOLDER_IMAGE_SRC } from "./lib/config";

function setPageTitle(title: string) {
	if (typeof document !== "undefined") {
		document.title = `${title} · solid-ui`;
	}
}

function Root() {
	const [menuOpen, setMenuOpen] = createSignal(false);
	const menuId = "site-nav";

	const links = [
		{ to: "/", label: "Home" },
		{ to: "/components", label: "Components" },
		{ to: "/theme", label: "Theme" },
		{ to: "/docs/templates", label: "Template" },
		{ to: "/docs/mcp", label: "MCP" },
		{ to: "/docs/intro", label: "Docs" },
	];

	return (
		<div class="min-h-screen flex flex-col bg-background text-foreground font-sans">
			<a
				class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
				href="#main-content"
			>
				Skip to main content
			</a>
			<header class="sticky top-0 z-sticky border-b border-border bg-surface/95 backdrop-blur supports-[not(backdrop-filter:blur(0))]:bg-surface">
				<div class="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
					<h1 class="text-xl font-bold tracking-tight">
						<Link to="/" class="text-foreground hover:text-primary transition-colors">
							solid-ui
						</Link>
					</h1>
					<nav
						id={menuId}
						class={`absolute left-0 right-0 top-full flex-col border-b border-border bg-surface p-4 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
							menuOpen() ? "flex" : "hidden"
						}`}
						aria-label="Main navigation"
					>
						<For each={links}>
							{(link) => (
								<Link
									to={link.to}
									class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									activeProps={() => ({
										class: "rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground",
									})}
									activeOptions={{ exact: link.to === "/" }}
									onClick={() => setMenuOpen(false)}
								>
									{link.label}
								</Link>
							)}
						</For>
					</nav>
					<div class="ml-auto flex items-center gap-2">
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
			<main id="main-content" class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-7xl">
					<Outlet />
				</div>
			</main>
			<footer class="border-t border-border bg-surface py-6 text-center text-sm text-muted-foreground">
				<div class="mx-auto max-w-7xl px-4">
					<p>
						Built with Solid + TanStack Router, deployed on Cloudflare Workers. Source on{" "}
						<a
							href={GITHUB_REPO_URL}
							target="_blank"
							rel="noreferrer"
							class="text-foreground underline underline-offset-4 hover:text-primary"
						>
							GitHub
						</a>
						.
					</p>
				</div>
			</footer>
		</div>
	);
}

function Home() {
	return <ComponentGallery withHero />;
}

function ComponentsPage() {
	return <ComponentGallery withHero={false} />;
}

function FormDemo() {
	setPageTitle("Form demo");
	const field = SolidUI.createTextField("email", "Email", {
		placeholder: "Enter your email",
	});
	const payload = JSON.stringify(field, null, 2);
	return (
		<section class="page">
			<h2 class="text-2xl font-bold tracking-tight mb-4">Form field factory</h2>
			<div class="rounded-xl border border-border bg-surface p-6 mb-4">
				<SolidUI.FormField label={field.label}>
					<SolidUI.Input type="email" placeholder={field.placeholder} aria-label="Email" />
				</SolidUI.FormField>
			</div>
			<CodeBlock code={payload} language="json" />
		</section>
	);
}

function TableDemo() {
	setPageTitle("Table demo");
	const column = SolidUI.textColumn("email", "Email");
	const columns = [column, SolidUI.textColumn("name", "Name"), SolidUI.textColumn("role", "Role")];
	const rows = [
		{ email: "a@example.com", name: "Alice", role: "Admin" },
		{ email: "b@example.com", name: "Bob", role: "Editor" },
		{ email: "c@example.com", name: "Carol", role: "Viewer" },
	];
	const payload = JSON.stringify(columns, null, 2);
	return (
		<section class="page">
			<h2 class="text-2xl font-bold tracking-tight mb-4">Table column builder</h2>
			<SolidUI.Table class="w-full text-sm">
				<thead>
					<tr>
						<For each={columns}>{(col) => <th class="border-b px-4 py-3 text-left font-medium">{col.header}</th>}</For>
					</tr>
				</thead>
				<tbody>
					<For each={rows}>
						{(row) => (
							<tr class="border-b">
								<For each={columns}>
									{(col) => <td class="px-4 py-3">{(row as Record<string, string>)[col.key]}</td>}
								</For>
							</tr>
						)}
					</For>
				</tbody>
			</SolidUI.Table>
			<CodeBlock code={payload} language="json" />
		</section>
	);
}

function ImageDemo() {
	setPageTitle("Image demo");
	const transform = SolidUI.buildTransformString({
		width: 400,
		format: "webp",
		quality: 80,
	});
	const url = SolidUI.buildIpxUrl(PLACEHOLDER_IMAGE_SRC, transform);
	return (
		<section class="page">
			<h2 class="text-2xl font-bold tracking-tight mb-4">Image URL builder</h2>
			<SolidUI.Image
				src={url}
				alt="Demo"
				class="rounded-lg border border-border max-w-full"
				width={400}
				height={300}
				loading="lazy"
			/>
			<CodeBlock code={url} language="text" />
		</section>
	);
}

function TransitionsDemo() {
	setPageTitle("Transitions demo");
	const css = SolidUI.buildCssTransition(SolidUI.mergeTransitionOptions({ duration: 300, easing: "ease-in-out" }));
	return (
		<section class="page">
			<h2 class="text-2xl font-bold tracking-tight mb-4">Transition CSS</h2>
			<SolidUI.Transition class="rounded-xl border border-border bg-surface p-6" style={css}>
				<SolidUI.Card>Fades with CSS transition</SolidUI.Card>
			</SolidUI.Transition>
			<CodeBlock code={css} language="css" />
		</section>
	);
}

function DocsIntroRedirect() {
	return <Navigate to="/docs/intro" />;
}

const rootRoute = createRootRoute({
	component: Root,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

const componentsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/components",
	component: ComponentsPage,
});

const themeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/theme",
	component: ThemePage,
});

const formRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/form",
	component: FormDemo,
});

const tableRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/table",
	component: TableDemo,
});

const imageRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/image",
	component: ImageDemo,
});

const transitionsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/transitions",
	component: TransitionsDemo,
});

const docsIndexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/docs",
	component: DocsIntroRedirect,
});

const docsGroupRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/docs/$group",
	component: DocsPage,
});

const docsComponentRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/docs/$group/$name",
	component: DocsPage,
});

export const routeTree = rootRoute.addChildren([
	homeRoute,
	componentsRoute,
	themeRoute,
	formRoute,
	tableRoute,
	imageRoute,
	transitionsRoute,
	docsIndexRoute,
	docsGroupRoute,
	docsComponentRoute,
]);

export const router = createRouter({ routeTree });
