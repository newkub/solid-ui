import { createRootRoute, createRoute, createRouter, Link, Outlet, useParams } from "@tanstack/solid-router";
import * as SolidUI from "@wrikka/solid-ui";
import { registry } from "@wrikka/solid-ui";
import { createEffect, createSignal, For, type JSX, Show } from "solid-js";
import { CodeBlock } from "./components/CodeBlock";

type AnyComponent = (props: Record<string, unknown>) => JSX.Element;

function setPageTitle(title: string) {
	if (typeof document !== "undefined") {
		document.title = `${title} · solid-ui`;
	}
}

function ThemeToggle() {
	const stored = typeof localStorage !== "undefined" ? localStorage.getItem("solid-ui-theme") : null;
	const [theme, setTheme] = createSignal<"light" | "dark">(stored === "dark" ? "dark" : "light");

	createEffect(() => {
		document.documentElement.setAttribute("data-theme", theme());
		localStorage.setItem("solid-ui-theme", theme());
	});

	const label = () => (theme() === "light" ? "Switch to dark theme" : "Switch to light theme");
	const icon = () => (theme() === "light" ? "🌙" : "☀️");

	return (
		<button
			type="button"
			class="theme-toggle"
			aria-label={label()}
			onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
		>
			<span aria-hidden="true">{icon()}</span>
		</button>
	);
}

function Root() {
	const [menuOpen, setMenuOpen] = createSignal(false);
	const menuId = "site-nav";

	const links = [
		{ to: "/", label: "Home" },
		{ to: "/components", label: "Components" },
		{ to: "/form", label: "Form" },
		{ to: "/table", label: "Table" },
		{ to: "/image", label: "Image" },
		{ to: "/transitions", label: "Transitions" },
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
							<Link to={link.to} class="site-link" onClick={() => setMenuOpen(false)}>
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
				<p>Built with Solid + TanStack Router, deployed on Cloudflare Workers</p>
			</footer>
		</div>
	);
}

function Home() {
	setPageTitle("Home");
	return (
		<section class="page">
			<h2 class="page-title">A comprehensive SolidJS UI library</h2>
			<p class="page-lead">
				solid-ui ships with 60+ components, real form/table/image/transition packages, and a docs website you are
				viewing now.
			</p>
			<div class="hero-actions">
				<Link to="/components" class="solidui-button solidui-button--primary">
					Browse components
				</Link>
				<Link to="/form" class="solidui-button solidui-button--secondary">
					Try form builder
				</Link>
			</div>
		</section>
	);
}

function ComponentPreview(props: { name: string; tag: string }) {
	const C = (SolidUI as unknown as Record<string, AnyComponent>)[props.name];
	if (!C) return <div class="solidui-card">Component preview not available.</div>;

	return (
		<C class="preview-element" inert={true}>
			<SolidUI.Badge>{props.tag}</SolidUI.Badge>
			{props.name}
		</C>
	);
}

const categories = [
	["Layout", ["Box", "Flex", "Grid", "Stack", "Card", "Separator", "AspectRatio"]],
	[
		"Form",
		[
			"Button",
			"Input",
			"Textarea",
			"Select",
			"Checkbox",
			"Radio",
			"Switch",
			"Label",
			"Form",
			"FormField",
			"FileInput",
			"Slider",
			"DatePicker",
		],
	],
	[
		"Data",
		["Table", "DataTable", "VirtualList", "ScrollArea", "TreeView", "Pagination", "Breadcrumb", "Steps", "Timeline"],
	],
	[
		"Overlay",
		[
			"Dialog",
			"Modal",
			"Sheet",
			"Drawer",
			"Tooltip",
			"Popover",
			"Toast",
			"Toaster",
			"Alert",
			"Command",
			"CommandPalette",
			"Notification",
		],
	],
	["Navigation", ["Tabs", "Menubar", "NavigationMenu", "DropdownMenu", "Toggle", "ToggleGroup"]],
	["Feedback", ["Badge", "Avatar", "Progress", "Skeleton", "Spinner", "Loading"]],
	["Media", ["Image", "Chart", "Calendar", "Transition", "Collapsible", "Accordion", "Resizable"]],
];

function Gallery() {
	setPageTitle("Components");
	const [query, setQuery] = createSignal("");

	const filtered = () => {
		const q = query().trim().toLowerCase();
		if (!q) return registry;
		return registry.filter((r) => r.name.toLowerCase().includes(q) || r.tag.toLowerCase().includes(q));
	};

	return (
		<section class="page">
			<div class="page-header">
				<h2 class="page-title">Components ({filtered().length})</h2>
			</div>
			<p class="page-lead">
				Each component is importable from <code>@wrikka/solid-ui</code>.
			</p>
			<div class="search-bar">
				<SolidUI.Input
					type="search"
					role="searchbox"
					placeholder="Search components…"
					value={query()}
					onInput={(e) => setQuery(e.currentTarget.value)}
					aria-label="Search components"
					autocomplete="off"
					class="search-input"
				/>
			</div>
			<For each={categories}>
				{([category, names]) => {
					const items = filtered().filter((r) => (names as string[]).includes(r.name));
					return (
						<Show when={items.length > 0}>
							<div class="category">
								<h3 class="category-title">{category as string}</h3>
								<div class="gallery-grid">
									<For each={items}>
										{(item) => (
											<div class="gallery-card solidui-card">
												<h4 class="gallery-name">{item.name}</h4>
												<div class="gallery-preview" aria-hidden="true">
													<ComponentPreview name={item.name} tag={item.tag} />
												</div>
												<Link
													to={`/components/$${item.name}`}
													class="solidui-button solidui-button--ghost gallery-view"
												>
													View details
												</Link>
											</div>
										)}
									</For>
								</div>
							</div>
						</Show>
					);
				}}
			</For>
		</section>
	);
}

function ComponentDetail() {
	const params = useParams({ from: "/components/$name" });
	const name = () => params().name;
	const item = () => registry.find((r) => r.name === name());

	return (
		<Show when={item()} fallback={<div class="page">Component not found</div>}>
			{(item) => {
				setPageTitle(item().name);
				return (
					<section class="page">
						<div class="page-header">
							<h2 class="page-title">{item().name}</h2>
							<Link to="/components" class="solidui-button solidui-button--ghost">
								← Back
							</Link>
						</div>
						<p class="page-lead">
							Renders a <code>&lt;{item().tag}&gt;</code> element.
						</p>
						<h3 class="section-title">Preview</h3>
						<div class="demo-stage">
							<ComponentPreview name={item().name} tag={item().tag} />
						</div>
						<h3 class="section-title">Usage</h3>
						<CodeBlock code={`import { ${item().name} } from "@wrikka/solid-ui"`} language="tsx" />
					</section>
				);
			}}
		</Show>
	);
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

const rootRoute = createRootRoute({
	component: Root,
});

const homeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Home,
});

const galleryRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/components",
	component: Gallery,
});

const componentRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/components/$name",
	component: ComponentDetail,
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

export const routeTree = rootRoute.addChildren([
	homeRoute,
	galleryRoute,
	componentRoute,
	formRoute,
	tableRoute,
	imageRoute,
	transitionsRoute,
]);

export const router = createRouter({ routeTree });
