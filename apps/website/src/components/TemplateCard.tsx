import { Link } from "@tanstack/solid-router";
import type { DocPage } from "../docs/generated";
import { Tag } from "./Tag";

export interface TemplateEntry {
	slug: string;
	page: DocPage;
}

function toExcerpt(content: string) {
	return content
		.replace(/```[\s\S]*?```/g, "")
		.replace(/^#{1,6}\s+.*$/gm, "")
		.replace(/[*_`#[\]()]/g, "")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, 160);
}

function firstCodeSnippet(content: string) {
	const match = content.match(/```(?:\w+\n)?([\s\S]*?)```/);
	if (!match) return null;
	return match[1].trim().split("\n").slice(0, 6).join("\n");
}

export function TemplateCard(props: { entry: TemplateEntry }) {
	const snippet = () => firstCodeSnippet(props.entry.page.content);

	return (
		<article class="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
			<div class="flex flex-wrap items-center gap-2">
				<Tag label="template" />
				<Tag label={props.entry.page.group} variant="primary" />
			</div>
			<div class="flex flex-col gap-1.5">
				<h3 class="text-base font-semibold">{props.entry.page.title}</h3>
				<p class="text-sm text-muted-foreground line-clamp-3">{toExcerpt(props.entry.page.content)}</p>
			</div>
			{snippet() && (
				<div class="overflow-hidden rounded-lg border border-border bg-background p-3">
					<pre class="overflow-x-auto font-mono text-[11px] leading-relaxed text-foreground">
						<code>{snippet()}</code>
					</pre>
				</div>
			)}
			<Link
				to={`/docs/${props.entry.page.group}/${props.entry.slug}`}
				class="mt-auto inline-flex h-9 w-fit items-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground no-underline hover:bg-secondary/80"
				aria-label={`View ${props.entry.page.title} template`}
			>
				View template
			</Link>
		</article>
	);
}
