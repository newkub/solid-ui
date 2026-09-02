import { Link } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { For } from "solid-js";
import { categories } from "../categories";
import { Seo } from "./Seo";
import { SolidJSIcon } from "./SolidJSIcon";

const HOME_DESCRIPTION =
	"solid-ui is an accessible, batteries-included SolidJS component library with 60+ components, form/table/image utilities, and an MCP server.";

const highlights = [
	{
		label: "Components",
		description: "Browse 60+ accessible, composable UI primitives and components.",
		to: "/components",
		icon: () => (
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<rect x="3" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="14" width="7" height="7" rx="1" />
				<rect x="3" y="14" width="7" height="7" rx="1" />
			</svg>
		),
	},
	{
		label: "Templates",
		description: "Copy-paste page shells and layout patterns to start faster.",
		to: "/templates",
		icon: () => (
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<rect x="3" y="3" width="18" height="18" rx="2" />
				<path d="M3 9h18M9 21V9" />
			</svg>
		),
	},
	{
		label: "Docs",
		description: "Read the getting-started guide and full API reference.",
		to: "/docs/intro",
		icon: () => (
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
				<polyline points="14 2 14 8 20 8" />
				<line x1="16" y1="13" x2="8" y2="13" />
				<line x1="16" y1="17" x2="8" y2="17" />
			</svg>
		),
	},
	{
		label: "Theme",
		description: "Customize colors, spacing, radius and preview live.",
		to: "/theme",
		icon: () => (
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
				<circle cx="12" cy="12" r="10" />
				<path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20" />
				<path d="M12 12a4 4 0 0 0 4-4 4 4 0 0 0-4-4" />
			</svg>
		),
	},
];

function StatCard(props: { value: string; label: string }) {
	return (
		<div class="rounded-xl border border-border bg-surface p-4 text-center shadow-sm">
			<div class="text-2xl font-bold text-foreground">{props.value}</div>
			<div class="text-xs font-medium uppercase tracking-wide text-muted-foreground">{props.label}</div>
		</div>
	);
}

export function HomePage() {
	const componentCount = registry.length;
	const categoryCount = categories.length;
	const packageCount = 5;

	return (
		<section class="page">
			<Seo title="solid-ui — SolidJS component library" description={HOME_DESCRIPTION} path="/" />

			<div class="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:py-20">
				<div class="pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden="true">
					<div class="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
					<div class="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
				</div>

				<div class="mx-auto max-w-3xl">
					<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
						<SolidJSIcon class="h-4 w-4" />
						<span>Built for SolidJS</span>
					</div>

					<h1 class="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
						Design systems, <span class="text-primary">simplified</span>
					</h1>

					<p class="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
						solid-ui gives you a typed, accessible component library, real-world packages, and a fully themeable docs
						site so you can ship faster without rebuilding the basics.
					</p>

					<div class="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
						<Link
							to="/components"
							class="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm no-underline transition-all hover:bg-primary-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-auto"
						>
							Browse components
						</Link>
						<Link
							to="/docs/intro"
							class="inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium no-underline transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-auto"
						>
							Get started
						</Link>
					</div>
				</div>
			</div>

			<div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
				<StatCard value={String(componentCount)} label="Components" />
				<StatCard value={String(categoryCount)} label="Categories" />
				<StatCard value={String(packageCount)} label="Packages" />
				<StatCard value="1" label="MCP server" />
			</div>

			<div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<For each={highlights}>
					{(item) => (
						<Link
							to={item.to}
							class="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md no-underline"
						>
							<div class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
								{item.icon()}
							</div>
							<div>
								<div class="font-semibold text-foreground">{item.label}</div>
								<div class="text-sm text-muted-foreground">{item.description}</div>
							</div>
						</Link>
					)}
				</For>
			</div>
		</section>
	);
}
