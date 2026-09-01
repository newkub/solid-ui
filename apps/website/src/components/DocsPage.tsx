import { useParams } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { type Accessor, createMemo, type JSX, Show } from "solid-js";
import { categories } from "../categories";
import { docs } from "../docs/generated";
import { ComponentPlayground } from "./ComponentPlayground";
import { Markdown } from "./Markdown";
import { Seo } from "./Seo";
import { Sidebar } from "./Sidebar";
import { Toc } from "./Toc";

/** Strips markdown syntax down to a plain-text excerpt suitable for a meta description. */
function toPlainExcerpt(markdown: string, maxLength = 160): string {
	const plain = markdown
		.replace(/^#{1,6}\s+.*$/gm, "")
		.replace(/```[\s\S]*?```/g, "")
		.replace(/[`*_>#]/g, "")
		.replace(/\s+/g, " ")
		.trim();
	return plain.length > maxLength ? `${plain.slice(0, maxLength).trimEnd()}…` : plain;
}

export function DocsLayout(props: { children: JSX.Element }) {
	return (
		<div class="flex flex-col gap-8 lg:flex-row lg:items-start">
			<Sidebar />
			<main class="min-w-0 flex-1">{props.children}</main>
		</div>
	);
}

export function DocsPage() {
	const params = useParams({ strict: false }) as Accessor<{ group: string; name?: string }>;
	const docId = createMemo(() => {
		const p = params();
		return p.name ? `${p.group}/${p.name}` : p.group;
	});
	const page = createMemo(() => docs[docId()]);
	const isComponent = createMemo(() => {
		const p = params();
		if (!p.name) return false;
		const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
		return registry.some((r) => r.name === name) && categories.some((c) => c.items.includes(name));
	});
	const componentName = createMemo(() => {
		const p = params();
		return p.name ? p.name.charAt(0).toUpperCase() + p.name.slice(1) : null;
	});
	const registryEntry = createMemo(() => registry.find((r) => r.name === componentName()));
	const seoTitle = createMemo(() => {
		const entry = registryEntry();
		const current = page();
		if (isComponent() && entry) return `${entry.name} — solid-ui`;
		return current ? `${current.title} — solid-ui` : "Docs — solid-ui";
	});
	const seoDescription = createMemo(() => {
		const entry = registryEntry();
		const current = page();
		if (isComponent() && entry) return `${entry.description} (<${entry.tag}>). solid-ui documentation and playground.`;
		return current ? toPlainExcerpt(current.content) : "solid-ui documentation.";
	});

	return (
		<DocsLayout>
			<Show when={page()} fallback={<div class="page text-muted-foreground">Docs page not found</div>}>
				{(page) => (
					<article class="max-w-3xl">
						<Seo title={seoTitle()} description={seoDescription()} />
						<header class="mb-6 border-b border-border pb-6">
							<h1 class="text-3xl font-bold tracking-tight">{page().title}</h1>
							<p class="text-sm text-muted-foreground capitalize">{page().group}</p>
						</header>
						<div class="grid gap-8 lg:grid-cols-[1fr_180px]">
							<div class="min-w-0">
								<Markdown content={page().content} />
								<Show when={isComponent() && componentName()}>
									<h2 class="mt-10 text-xl font-semibold mb-4">Playground</h2>
									<ComponentPlayground name={componentName() as string} />
								</Show>
							</div>
							<aside class="lg:sticky lg:top-24">
								<Toc content={page().content} />
							</aside>
						</div>
					</article>
				)}
			</Show>
		</DocsLayout>
	);
}
