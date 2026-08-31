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
		<nav class="toc" aria-label="On this page">
			<h2 class="toc__title">On this page</h2>
			<ul class="toc__list">
				<For each={headings()}>
					{(h) => (
						<li class={`toc__item toc__item--level-${h.level}`}>
							<a href={`#${h.id}`}>{h.text}</a>
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
