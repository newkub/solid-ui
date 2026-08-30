import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import { createMemo } from "solid-js";
import { highlightCode } from "../lib/highlight";
import "highlight.js/styles/github.css";

const marked = new Marked(
	markedHighlight({
		langPrefix: "language-",
		highlight(code, lang) {
			return highlightCode(code, lang);
		},
	}),
);

export function Markdown(props: { content: string }) {
	const html = createMemo(() => marked.parse(props.content) as string);
	return <div class="markdown-body" innerHTML={html()} />;
}
