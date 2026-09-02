import { Link, useParams } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui/registry";
import { type Accessor, createMemo, ErrorBoundary, lazy, Show, Suspense } from "solid-js";
import { categories } from "../categories";
import { docs } from "../docs/generated";
import { CodeBlock } from "./CodeBlock";
import { ComponentPreview, PreviewFallback } from "./ComponentPreview";
import { DocsLayout } from "./DocsLayout";
import { Markdown } from "./Markdown";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Toc } from "./Toc";

const ComponentPlayground = lazy(async () => {
	const mod = await import("./ComponentPlayground");
	return { default: mod.ComponentPlayground };
});

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
	const usageSnippet = createMemo(() => {
		const entry = registryEntry();
		if (!entry) return "";
		return `import { ${entry.name} } from "@wrikka/solid-ui";\n\nfunction App() {\n  return <${entry.name} />;\n}`;
	});
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
		<Show
			when={page()}
			fallback={
				<DocsLayout>
					<PageSection title="Page not found">
						<div class="space-y-4">
							<p class="text-muted-foreground">The requested docs page does not exist.</p>
							<Link to="/docs/intro" class="text-primary hover:underline">
								Back to docs
							</Link>
						</div>
					</PageSection>
				</DocsLayout>
			}
		>
			{(page) => (
				<DocsLayout rightSidebar={<Toc content={page().content} />}>
					<article class="mx-auto w-full max-w-5xl">
						<Seo title={seoTitle()} description={seoDescription()} />
						<header class="mb-6 border-b border-border pb-6">
							<h1 class="text-3xl font-bold tracking-tight">{page().title}</h1>
							<p class="text-sm text-muted-foreground capitalize">{page().group}</p>
						</header>
						<Markdown content={page().content} />
						<Show when={isComponent() && componentName()}>
							{(name) => (
								<>
									<PageSection title="Preview">
										<div class="overflow-hidden rounded-xl border border-border bg-surface p-6">
											<div class="flex min-h-[160px] items-center justify-center rounded-lg bg-muted/50 p-4">
												<ErrorBoundary
													fallback={(_err: Error) => (
														<PreviewFallback name={name()} tag={registryEntry()?.tag ?? name()} />
													)}
												>
													<ComponentPreview name={name()} tag={registryEntry()?.tag ?? name()} />
												</ErrorBoundary>
											</div>
										</div>
									</PageSection>

									<PageSection title="Usage">
										<CodeBlock code={usageSnippet()} language="tsx" />
									</PageSection>

									<h2 class="mt-10 text-xl font-semibold mb-4">Playground</h2>
									<Suspense fallback={<div class="text-sm text-muted-foreground">Loading playground…</div>}>
										<ComponentPlayground name={name()} />
									</Suspense>
								</>
							)}
						</Show>
					</article>
				</DocsLayout>
			)}
		</Show>
	);
}
