import { useParams } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { type Accessor, createMemo, type JSX, Show } from "solid-js";
import { categories } from "../categories";
import { docs } from "../docs/generated";
import { ComponentPlayground } from "./ComponentPlayground";
import { Markdown } from "./Markdown";
import { Sidebar } from "./Sidebar";
import { Toc } from "./Toc";

export function DocsLayout(props: { children: JSX.Element }) {
	return (
		<div class="docs-layout">
			<Sidebar />
			<main class="docs-main">{props.children}</main>
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

	return (
		<DocsLayout>
			<Show when={page()} fallback={<div class="page">Docs page not found</div>}>
				{(page) => (
					<article class="docs-article">
						<header class="docs-article__header">
							<h1 class="docs-article__title">{page().title}</h1>
							<p class="docs-article__group">{page().group}</p>
						</header>
						<div class="docs-article__body">
							<div class="docs-article__content">
								<Markdown content={page().content} />
								<Show when={isComponent() && componentName()}>
									<h2 class="docs-article__subtitle">Playground</h2>
									<ComponentPlayground name={componentName() as string} />
								</Show>
							</div>
							<aside class="docs-article__toc">
								<Toc content={page().content} />
							</aside>
						</div>
					</article>
				)}
			</Show>
		</DocsLayout>
	);
}
