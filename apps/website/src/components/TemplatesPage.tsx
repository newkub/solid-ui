import { Link } from "@tanstack/solid-router";
import { createMemo, For } from "solid-js";
import { docs } from "../docs/generated";
import { Markdown } from "./Markdown";
import { Seo } from "./Seo";

function templateEntries() {
	return Object.entries(docs)
		.filter(([, page]) => page.group === "templates")
		.map(([key, page]) => ({ key, page, slug: key.split("/").pop() ?? "" }));
}

interface TemplateEntry {
	key: string;
	page: {
		title: string;
		order: number;
		content: string;
		group: string;
	};
	slug: string;
}

function TemplateCard(props: { entry: TemplateEntry }) {
	return (
		<article class="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 shadow-sm">
			<h3 class="text-lg font-semibold">{props.entry.page.title}</h3>
			<div class="prose prose-sm max-w-none text-muted-foreground">
				<Markdown content={props.entry.page.content.slice(0, 240)} />
			</div>
			<Link
				to={`/docs/${props.entry.page.group}/${props.entry.slug}`}
				class="mt-auto inline-flex h-8 w-fit items-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
			>
				View template
			</Link>
		</article>
	);
}

export function TemplatesPage() {
	const entries = createMemo(() => templateEntries().sort((a, b) => a.page.order - b.page.order));

	return (
		<section class="page mx-auto max-w-4xl">
			<Seo
				title="Templates — solid-ui"
				description="Starter templates and integration examples for solid-ui: form, table, image, and transitions."
				path="/templates"
			/>
			<header class="mb-8">
				<h2 class="text-2xl font-bold tracking-tight">Templates</h2>
				<p class="mt-2 text-sm text-muted-foreground">
					Ready-to-use starter templates that wire solid-ui primitives into real pages.
				</p>
			</header>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<For each={entries()}>{(entry) => <TemplateCard entry={entry} />}</For>
			</div>
		</section>
	);
}
