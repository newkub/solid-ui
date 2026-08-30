import { createRootRoute, createRoute, createRouter, Link, Outlet, useParams } from "@tanstack/solid-router";
import * as SolidUI from "@wrikka/solid-ui";
import { registry } from "@wrikka/solid-ui";
import { createSignal, For, type JSX, Show } from "solid-js";

type AnyComponent = (props: Record<string, unknown>) => JSX.Element;

function Root() {
	const [menuOpen, setMenuOpen] = createSignal(false);
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
			<header class="site-header">
				<h1 class="site-title">
					<Link to="/">solid-ui</Link>
				</h1>
				<nav class={menuOpen() ? "site-nav open" : "site-nav"}>
					<For each={links}>
						{(link) => (
							<Link to={link.to} class="site-link">
								{link.label}
							</Link>
						)}
					</For>
				</nav>
				<button type="button" class="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((v) => !v)}>
					☰
				</button>
			</header>
			<main class="site-main">
				<Outlet />
			</main>
			<footer class="site-footer">
				<p>Built with Solid + TanStack Router, deployed on Cloudflare Workers</p>
			</footer>
		</div>
	);
}

function Home() {
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

function isSelfClosing(tag: string) {
	return ["input", "img", "hr", "br", "progress", "meta", "link"].includes(tag);
}

function ComponentPreview(props: { name: string; tag: string }) {
	const C = (SolidUI as unknown as Record<string, AnyComponent>)[props.name];
	if (!C) return <div class="solidui-card">missing: {props.name}</div>;

	if (isSelfClosing(props.tag)) {
		return (
			<C
				class="preview-element"
				placeholder={`${props.name} placeholder`}
				alt={`${props.name} demo`}
				value={50}
				max={100}
			/>
		);
	}

	return (
		<C class="preview-element">
			<SolidUI.Badge>{props.tag}</SolidUI.Badge>
			{props.name}
		</C>
	);
}

function Gallery() {
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

	return (
		<section class="page">
			<h2 class="page-title">Components ({registry.length})</h2>
			<p class="page-lead">
				Each component is importable from <code>@wrikka/solid-ui</code>.
			</p>
			<For each={categories}>
				{([category, names]) => {
					const items = registry.filter((r) => (names as string[]).includes(r.name));
					return (
						<div class="category">
							<h3 class="category-title">{category as string}</h3>
							<div class="gallery-grid">
								<For each={items}>
									{(item) => (
										<Link to={`/components/$${item.name}`} class="gallery-card solidui-card">
											<h4 class="gallery-name">{item.name}</h4>
											<div class="gallery-preview">
												<ComponentPreview name={item.name} tag={item.tag} />
											</div>
										</Link>
									)}
								</For>
							</div>
						</div>
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
		<Show when={item()} fallback={<div>Component not found</div>}>
			{(item) => (
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
					<div class="demo-stage">
						<ComponentPreview name={item().name} tag={item().tag} />
					</div>
				</section>
			)}
		</Show>
	);
}

function FormDemo() {
	const field = SolidUI.createTextField("email", "Email", {
		placeholder: "Enter your email",
	});
	return (
		<section class="page">
			<h2 class="page-title">Form field factory</h2>
			<div class="demo-stage">
				<SolidUI.FormField label={field.label}>
					<SolidUI.Input type="email" placeholder={field.placeholder} />
				</SolidUI.FormField>
			</div>
			<pre>{JSON.stringify(field, null, 2)}</pre>
		</section>
	);
}

function TableDemo() {
	const column = SolidUI.textColumn("email", "Email");
	const columns = [column, SolidUI.textColumn("name", "Name"), SolidUI.textColumn("role", "Role")];
	const rows = [
		{ email: "a@example.com", name: "Alice", role: "Admin" },
		{ email: "b@example.com", name: "Bob", role: "Editor" },
		{ email: "c@example.com", name: "Carol", role: "Viewer" },
	];
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
			<pre>{JSON.stringify(columns, null, 2)}</pre>
		</section>
	);
}

function ImageDemo() {
	const transform = SolidUI.buildTransformString({
		width: 400,
		format: "webp",
		quality: 80,
	});
	const url = SolidUI.buildIpxUrl("https://picsum.photos/800/600", transform);
	return (
		<section class="page">
			<h2 class="page-title">Image URL builder</h2>
			<SolidUI.Image src={url} alt="Demo" class="demo-image" />
			<pre>{url}</pre>
		</section>
	);
}

function TransitionsDemo() {
	const css = SolidUI.buildCssTransition(SolidUI.mergeTransitionOptions({ duration: 300, easing: "ease-in-out" }));
	return (
		<section class="page">
			<h2 class="page-title">Transition CSS</h2>
			<SolidUI.Transition class="demo-transition" style={css}>
				<SolidUI.Card>Fades with CSS transition</SolidUI.Card>
			</SolidUI.Transition>
			<pre>{css}</pre>
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
