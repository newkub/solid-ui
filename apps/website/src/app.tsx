import { createRootRoute, createRoute, createRouter, Link, Outlet, useNavigate } from "@tanstack/solid-router";
import * as SolidUI from "@wrikka/solid-ui";
import { registry } from "@wrikka/solid-ui";
import { createEffect, createSignal, For, Show } from "solid-js";
import { categories } from "./categories";
import { CodeBlock } from "./components/CodeBlock";
import { ComponentCard } from "./components/ComponentCard";
import { DocsPage } from "./components/DocsPage";
import { ThemeToggle } from "./components/ThemeToggle";

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
		{ to: "/docs/theme", label: "Theme" },
		{ to: "/docs/templates", label: "Template" },
		{ to: "/docs/mcp", label: "MCP" },
		{ to: "/docs/intro", label: "Docs" },
	];

	return (
		<div class="app">
			<a class="skip-link" href="#main-content">
				Skip to main content
			</a>
			<header class="site-header">
				<h1 class="site-title">
					<Link to="/">solid-ui</Link>
				</h1>
				<nav id={menuId} class={menuOpen() ? "site-nav open" : "site-nav"} aria-label="Main navigation">
					<For each={links}>
						{(link) => (
							<Link
								to={link.to}
								class="site-link"
								activeProps={() => ({ class: "site-link--active" })}
								activeOptions={{ exact: link.to === "/" }}
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</Link>
						)}
					</For>
				</nav>
				<div class="header-actions">
					<ThemeToggle />
					<button
						type="button"
						class="menu-toggle"
						aria-label={menuOpen() ? "Close menu" : "Open menu"}
						aria-expanded={menuOpen()}
						aria-controls={menuId}
						onClick={() => setMenuOpen((v) => !v)}
					>
						<span aria-hidden="true">☰</span>
					</button>
				</div>
			</header>
			<main id="main-content" class="site-main">
				<Outlet />
			</main>
			<footer class="site-footer">
				<p>
					Built with Solid + TanStack Router, deployed on Cloudflare Workers. Source on{" "}
					<a href="https://github.com/newkub/solid-ui" target="_blank" rel="noreferrer">
						GitHub
					</a>
					.
				</p>
			</footer>
		</div>
	);
}

function Hero() {
	return (
		<section class="hero">
			<h2 class="hero__title">A comprehensive SolidJS UI library</h2>
			<p class="hero__lead">
				solid-ui ships with 60+ components, real form/table/image/transition packages, and the docs website you are
				viewing now.
			</p>
			<div class="hero__actions">
				<Link to="/components" class="solidui-button solidui-button--primary">
					Browse components
				</Link>
				<Link to="/docs/intro" class="solidui-button solidui-button--secondary">
					Read docs
				</Link>
			</div>
		</section>
	);
}

function Gallery(props: { withHero?: boolean }) {
	setPageTitle(props.withHero ? "Home" : "Components");
	const [query, setQuery] = createSignal("");
	const [group, setGroup] = createSignal("all");

	const filtered = () => {
		const q = query().trim().toLowerCase();
		return registry.filter((r) => {
			const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q);
			const matchesGroup = group() === "all" || categories.some((c) => c.id === group() && c.items.includes(r.name));
			return matchesQuery && matchesGroup;
		});
	};

	const groupOptions = () => [
		{ value: "all", label: "All groups" },
		...categories.map((c) => ({ value: c.id, label: c.label })),
	];

	return (
		<section class="page">
			<Show when={props.withHero}>
				<Hero />
			</Show>
			<div class="page-header">
				<h2 class="page-title">Components ({filtered().length})</h2>
			</div>
			<p class="page-lead">
				Each component is importable from <code>@wrikka/solid-ui</code>.
			</p>

			<div class="gallery-toolbar">
				<input
					type="search"
					class="solidui-input search-input"
					placeholder="Search components…"
					value={query()}
					onInput={(e) => setQuery(e.currentTarget.value)}
					aria-label="Search components"
					autocomplete="off"
				/>
				<select
					class="solidui-select group-select"
					value={group()}
					onChange={(e) => setGroup(e.currentTarget.value)}
					aria-label="Filter by group"
				>
					<For each={groupOptions()}>{(opt) => <option value={opt.value}>{opt.label}</option>}</For>
				</select>
			</div>

			<div class="gallery-grid gallery-grid--all">
				<For each={filtered()}>{(item) => <ComponentCard name={item.name} />}</For>
			</div>
		</section>
	);
}

function Home() {
	return <Gallery withHero />;
}

function ComponentsPage() {
	return <Gallery withHero={false} />;
}

function FormDemo() {
	setPageTitle("Form demo");
	const field = SolidUI.createTextField("email", "Email", {
		placeholder: "Enter your email",
	});
	const payload = JSON.stringify(field, null, 2);
	return (
		<section class="page">
			<h2 class="page-title">Form field factory</h2>
			<div class="demo-stage">
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
			<h2 class="page-title">Table column builder</h2>
			<SolidUI.Table class="demo-table">
				<thead>
					<tr>
						<For each={columns}>{(col) => <th>{col.header}</th>}</For>
					</tr>
				</thead>
				<tbody>
					<For each={rows}>
						{(row) => (
							<tr>
								<For each={columns}>{(col) => <td>{(row as Record<string, string>)[col.key]}</td>}</For>
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
	const url = SolidUI.buildIpxUrl("https://picsum.photos/800/600", transform);
	return (
		<section class="page">
			<h2 class="page-title">Image URL builder</h2>
			<SolidUI.Image src={url} alt="Demo" class="demo-image" width={400} height={300} loading="lazy" />
			<CodeBlock code={url} language="text" />
		</section>
	);
}

function TransitionsDemo() {
	setPageTitle("Transitions demo");
	const css = SolidUI.buildCssTransition(SolidUI.mergeTransitionOptions({ duration: 300, easing: "ease-in-out" }));
	return (
		<section class="page">
			<h2 class="page-title">Transition CSS</h2>
			<SolidUI.Transition class="demo-transition" style={css}>
				<SolidUI.Card>Fades with CSS transition</SolidUI.Card>
			</SolidUI.Transition>
			<CodeBlock code={css} language="css" />
		</section>
	);
}

function DocsIntroRedirect() {
	const navigate = useNavigate();
	createEffect(() => {
		void navigate({ to: "/docs/intro" });
	});
	return <div class="page">Redirecting…</div>;
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
	formRoute,
	tableRoute,
	imageRoute,
	transitionsRoute,
	docsIndexRoute,
	docsGroupRoute,
	docsComponentRoute,
]);

export const router = createRouter({ routeTree });
