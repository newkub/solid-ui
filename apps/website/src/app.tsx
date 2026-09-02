import "@shikijs/twoslash/style-rich.css";
import { createRootRoute, createRoute, createRouter, Navigate, Outlet } from "@tanstack/solid-router";
import * as SolidUI from "@wrikka/solid-ui";
import { ErrorBoundary, For } from "solid-js";
import { CliPage } from "./components/CliPage";
import { CodeBlock } from "./components/CodeBlock";
import { ComponentGallery } from "./components/ComponentGallery";
import { DocsPage } from "./components/DocsPage";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { HooksPage } from "./components/HooksPage";
import { LayoutsPage } from "./components/LayoutsPage";
import { LlmTxtPage } from "./components/LlmTxtPage";
import { McpDocsPage } from "./components/McpDocsPage";
import { NavLayout } from "./components/Nav";
import { PageLayout } from "./components/PageLayout";
import { PluginsPage } from "./components/PluginsPage";
import { Seo } from "./components/Seo";
import { SettingsPage } from "./components/SettingsPage";
import { SkillDetailPage } from "./components/SkillDetailPage";
import { SkillsPage } from "./components/SkillsPage";
import { TemplatesPage } from "./components/TemplatesPage";
import { ThemePage } from "./components/ThemePage";
import { PLACEHOLDER_IMAGE_SRC } from "./lib/config";

const HOME_DESCRIPTION =
	"solid-ui is an accessible, batteries-included SolidJS component library with 60+ components, form/table/image utilities, and an MCP server.";
const COMPONENTS_DESCRIPTION = "Browse the full solid-ui component gallery with live previews and usage snippets.";
const SKILLS_DESCRIPTION = "Explore solid-ui skills, primitives, and integrations.";

function SkipLink() {
	return (
		<a
			class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
			href="#main-content"
		>
			Skip to main content
		</a>
	);
}

function FallbackError(props: { error: Error; reset: () => void }) {
	return (
		<div class="p-6">
			<div class="rounded-xl border border-destructive bg-destructive/10 p-6 text-destructive-foreground">
				<h2 class="mb-2 text-lg font-semibold">Something went wrong</h2>
				<p class="mb-4 text-sm opacity-90">{String(props.error)}</p>
				<pre class="max-h-64 overflow-auto rounded-lg bg-background p-4 text-xs text-foreground">
					{props.error.stack}
				</pre>
				<button
					type="button"
					class="mt-4 inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
					onClick={props.reset}
				>
					Try again
				</button>
			</div>
		</div>
	);
}

function Root() {
	return (
		<div class="min-h-screen flex flex-col bg-background text-foreground font-sans">
			<ErrorBoundary fallback={(err, reset) => <FallbackError error={err as Error} reset={reset} />}>
				<SkipLink />
				<NavLayout>
					<main id="main-content" class="flex-1 px-4 py-6 sm:px-6 lg:px-8">
						<div class="mx-auto max-w-7xl">
							<Outlet />
						</div>
					</main>
				</NavLayout>
				<Footer />
			</ErrorBoundary>
		</div>
	);
}

function Home() {
	return (
		<PageLayout>
			<Seo title="solid-ui — SolidJS component library" description={HOME_DESCRIPTION} path="/" />
			<HomePage />
		</PageLayout>
	);
}

function ComponentsPage() {
	return (
		<PageLayout>
			<Seo title="Components — solid-ui" description={COMPONENTS_DESCRIPTION} path="/components" />
			<ComponentGallery withHero={false} />
		</PageLayout>
	);
}

function SkillsPageWrapper() {
	return (
		<>
			<Seo title="Skills — solid-ui" description={SKILLS_DESCRIPTION} path="/skills" />
			<SkillsPage />
		</>
	);
}

function FormDemo() {
	const field = SolidUI.createTextField("email", "Email", {
		placeholder: "Enter your email",
	});
	const payload = JSON.stringify(field, null, 2);
	return (
		<section class="page">
			<Seo
				title="Form demo — solid-ui"
				description="Generate accessible form fields with the solid-ui form field factory."
				path="/form"
			/>
			<h2 class="text-2xl font-bold tracking-tight mb-4">Form field factory</h2>
			<div class="rounded-xl border border-border bg-surface p-6 mb-4">
				<SolidUI.FormField label={field.label} htmlFor="email">
					<SolidUI.Input id="email" type="email" placeholder={field.placeholder} />
				</SolidUI.FormField>
			</div>
			<CodeBlock code={payload} language="json" />
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
	const payload = JSON.stringify(columns, null, 2);
	return (
		<section class="page">
			<Seo
				title="Table demo — solid-ui"
				description="Build typed table columns with the solid-ui table column helper."
				path="/table"
			/>
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
	const transform = SolidUI.buildTransformString({
		width: 400,
		format: "webp",
		quality: 80,
	});
	const url = SolidUI.buildIpxUrl(PLACEHOLDER_IMAGE_SRC, transform);
	return (
		<section class="page">
			<Seo
				title="Image demo — solid-ui"
				description="Build ipx transform URLs with the solid-ui image utility."
				path="/image"
			/>
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
	const css = SolidUI.buildCssTransition(SolidUI.mergeTransitionOptions({ duration: 300, easing: "ease-in-out" }));
	return (
		<section class="page">
			<Seo
				title="Transitions demo — solid-ui"
				description="Generate CSS transition strings with the solid-ui transition helper."
				path="/transitions"
			/>
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

const settingsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/settings",
	component: SettingsPage,
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

const llmTxtRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/llm",
	component: LlmTxtPage,
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

const skillsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/skills",
	component: SkillsPageWrapper,
});

const skillDetailRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/skills/$name",
	component: SkillDetailPage,
});

const mcpRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/mcp",
	component: () => <Navigate to="/docs/integrations/mcp" />,
});

const docsMcpRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/docs/integrations/mcp",
	component: McpDocsPage,
});

const templatesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/templates",
	component: TemplatesPage,
});

const layoutsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/layouts",
	component: LayoutsPage,
});

const hooksRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/hooks",
	component: HooksPage,
});

const cliRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/cli",
	component: CliPage,
});

const pluginsRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/plugins",
	component: PluginsPage,
});

export const routeTree = rootRoute.addChildren([
	homeRoute,
	componentsRoute,
	themeRoute,
	settingsRoute,
	formRoute,
	tableRoute,
	imageRoute,
	transitionsRoute,
	llmTxtRoute,
	skillsRoute,
	skillDetailRoute,
	mcpRoute,
	docsMcpRoute,
	templatesRoute,
	layoutsRoute,
	hooksRoute,
	cliRoute,
	pluginsRoute,
	docsIndexRoute,
	docsGroupRoute,
	docsComponentRoute,
]);

export const router = createRouter({ routeTree });
