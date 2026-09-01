import { Link } from "@tanstack/solid-router";
import { For, type JSX } from "solid-js";
import { Tag } from "./Tag";

export interface LayoutItem {
	name: string;
	description: string;
	slug: string;
	preview: (props: { class?: string }) => JSX.Element;
}

function BoxPreview(props: { class?: string }) {
	return (
		<div class={`flex items-center justify-center rounded-lg border border-border bg-muted p-4 ${props.class ?? ""}`}>
			<div class="h-12 w-full rounded bg-primary/20" />
		</div>
	);
}

function FlexPreview(props: { class?: string }) {
	return (
		<div class={`flex items-center gap-1 rounded-lg border border-border bg-muted p-3 ${props.class ?? ""}`}>
			<div class="h-6 w-6 rounded bg-primary/30" />
			<div class="h-6 w-10 rounded bg-primary/30" />
			<div class="h-6 w-16 rounded bg-primary/30" />
		</div>
	);
}

function GridPreview(props: { class?: string }) {
	return (
		<div class={`grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted p-3 ${props.class ?? ""}`}>
			<For each={[...Array(6)]}>{() => <div class="h-6 rounded bg-primary/30" />}</For>
		</div>
	);
}

function StackPreview(props: { class?: string }) {
	return (
		<div class={`flex flex-col gap-1 rounded-lg border border-border bg-muted p-3 ${props.class ?? ""}`}>
			<div class="h-4 w-3/4 rounded bg-primary/30" />
			<div class="h-4 w-1/2 rounded bg-primary/30" />
			<div class="h-4 w-5/6 rounded bg-primary/30" />
		</div>
	);
}

function SeparatorPreview(props: { class?: string }) {
	return (
		<div class={`space-y-2 rounded-lg border border-border bg-muted p-3 ${props.class ?? ""}`}>
			<div class="h-3 w-3/4 rounded bg-primary/20" />
			<div class="h-0.5 w-full bg-border" />
			<div class="h-3 w-1/2 rounded bg-primary/20" />
		</div>
	);
}

function AspectRatioPreview(props: { class?: string }) {
	return (
		<div class={`rounded-lg border border-border bg-muted p-3 ${props.class ?? ""}`}>
			<div class="aspect-video w-full rounded bg-primary/20" />
		</div>
	);
}

function ScrollAreaPreview(props: { class?: string }) {
	return (
		<div class={`overflow-hidden rounded-lg border border-border bg-muted p-2 ${props.class ?? ""}`}>
			<div class="h-16 space-y-1 overflow-y-auto pr-1">
				<div class="h-4 w-full rounded bg-primary/20" />
				<div class="h-4 w-5/6 rounded bg-primary/20" />
				<div class="h-4 w-4/5 rounded bg-primary/20" />
				<div class="h-4 w-full rounded bg-primary/20" />
				<div class="h-4 w-3/4 rounded bg-primary/20" />
			</div>
		</div>
	);
}

function ResizablePreview(props: { class?: string }) {
	return (
		<div class={`flex gap-1 rounded-lg border border-border bg-muted p-2 ${props.class ?? ""}`}>
			<div class="h-12 w-1/3 rounded bg-primary/20" />
			<div class="w-0.5 bg-border" />
			<div class="h-12 flex-1 rounded bg-primary/20" />
		</div>
	);
}

export const layouts: LayoutItem[] = [
	{
		name: "Box",
		description: "A foundational container with theme-aware background, border, and spacing.",
		slug: "box",
		preview: BoxPreview,
	},
	{ name: "Flex", description: "Flexible layout component using CSS flexbox.", slug: "flex", preview: FlexPreview },
	{ name: "Grid", description: "CSS grid layout component.", slug: "grid", preview: GridPreview },
	{
		name: "Stack",
		description: "Vertically or horizontally stacked children with consistent spacing.",
		slug: "stack",
		preview: StackPreview,
	},
	{
		name: "Separator",
		description: "Visual divider between sections or items.",
		slug: "separator",
		preview: SeparatorPreview,
	},
	{
		name: "AspectRatio",
		description: "Locks child content to a specific aspect ratio.",
		slug: "aspect-ratio",
		preview: AspectRatioPreview,
	},
	{
		name: "ScrollArea",
		description: "Scrollable container with custom overflow handling.",
		slug: "scroll-area",
		preview: ScrollAreaPreview,
	},
	{ name: "Resizable", description: "Resizable panel layout.", slug: "resizable", preview: ResizablePreview },
];

export function LayoutCard(props: { item: LayoutItem }) {
	const Preview = props.item.preview;

	return (
		<article class="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
			<div class="flex flex-wrap items-center gap-2">
				<Tag label="layout" />
				<Tag label="component" variant="primary" />
			</div>
			<div class="overflow-hidden rounded-lg border border-border bg-background p-3">
				<Preview class="h-24 w-full" />
			</div>
			<div class="flex flex-col gap-1.5">
				<h3 class="text-base font-semibold">{props.item.name}</h3>
				<p class="text-sm text-muted-foreground line-clamp-2">{props.item.description}</p>
			</div>
			<Link
				to={`/docs/components/${props.item.slug}`}
				class="mt-auto inline-flex h-9 w-fit items-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground no-underline hover:bg-secondary/80"
				aria-label={`View ${props.item.name} docs`}
			>
				View docs
			</Link>
		</article>
	);
}
