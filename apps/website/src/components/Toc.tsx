import { For } from "solid-js";
import { type BlockNode, parseMarkdown } from "../lib/markdown";

export function Toc(props: { content: string }) {
	const headings = () => {
		const blocks = parseMarkdown(props.content);
		return blocks
			.filter((b): b is Extract<BlockNode, { type: "heading" }> => b.type === "heading")
			.map((b) => ({
				level: b.level,
				text: extractText(b.children),
				id: slugify(extractText(b.children)),
			}));
	};

	return (
		<nav class="text-sm" aria-label="On this page">
			<h2 class="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</h2>
			<ul class="space-y-1 border-l border-border">
				<For each={headings()}>
					{(h) => (
						<li class={`${h.level === 2 ? "pl-3" : h.level === 3 ? "pl-6" : "pl-3"}`}>
							<a
								href={`#${h.id}`}
								class="block border-l-2 border-transparent py-1 pl-3 -ml-px text-muted-foreground transition-colors hover:border-border hover:text-foreground"
							>
								{h.text}
							</a>
						</li>
					)}
				</For>
			</ul>
		</nav>
	);
}

function extractText(children: { type: string; text?: string; children?: unknown[] }[]): string {
	return children
		.map((c) => {
			if ("text" in c && c.text) return c.text;
			if ("children" in c && Array.isArray(c.children))
				return extractText(c.children as { type: string; text?: string; children?: unknown[] }[]);
			return "";
		})
		.join("");
}

function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
