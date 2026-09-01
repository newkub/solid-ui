import { Link } from "@tanstack/solid-router";
import { For } from "solid-js";
import { Seo } from "./Seo";

const layouts = [
	{
		name: "Box",
		description: "A foundational container with theme-aware background, border, and spacing.",
		slug: "box",
	},
	{
		name: "Flex",
		description: "Flexible layout component using CSS flexbox.",
		slug: "flex",
	},
	{
		name: "Grid",
		description: "CSS grid layout component.",
		slug: "grid",
	},
	{
		name: "Stack",
		description: "Vertically or horizontally stacked children with consistent spacing.",
		slug: "stack",
	},
	{
		name: "Separator",
		description: "Visual divider between sections or items.",
		slug: "separator",
	},
	{
		name: "AspectRatio",
		description: "Locks child content to a specific aspect ratio.",
		slug: "aspect-ratio",
	},
	{
		name: "ScrollArea",
		description: "Scrollable container with custom overflow handling.",
		slug: "scroll-area",
	},
	{
		name: "Resizable",
		description: "Resizable panel layout.",
		slug: "resizable",
	},
];

export function LayoutsPage() {
	return (
		<section class="page mx-auto max-w-4xl">
			<Seo
				title="Layouts — solid-ui"
				description="Layout components for building responsive, structured pages with solid-ui."
				path="/layouts"
			/>
			<header class="mb-8">
				<h2 class="text-2xl font-bold tracking-tight">Layouts</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Structural components to compose responsive, accessible layouts.
				</p>
			</header>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<For each={layouts}>
					{(item) => (
						<article class="flex flex-col gap-2 rounded-xl border border-border bg-surface p-5 shadow-sm">
							<h3 class="text-lg font-semibold text-foreground">{item.name}</h3>
							<p class="flex-1 text-sm text-muted-foreground">{item.description}</p>
							<Link
								to={`/docs/components/${item.slug}`}
								class="mt-auto inline-flex h-8 w-fit items-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground no-underline hover:bg-secondary/80"
							>
								View docs
							</Link>
						</article>
					)}
				</For>
			</div>
		</section>
	);
}
