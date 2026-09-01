import { createMemo, For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type BlockNode, type InlineNode, parseMarkdown } from "../lib/markdown";
import { ShikiCode } from "./ShikiCode";

function extractText(children: InlineNode[]): string {
	return children
		.map((c) => {
			if (c.type === "text" || c.type === "code") return c.text;
			if (c.type === "link") return extractText(c.children);
			if ("children" in c) return extractText(c.children);
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

function Inline(props: { nodes: InlineNode[] }) {
	return (
		<For each={props.nodes}>
			{(node) => {
				switch (node.type) {
					case "text":
						return <>{node.text}</>;
					case "bold":
						return (
							<strong>
								<Inline nodes={node.children} />
							</strong>
						);
					case "italic":
						return (
							<em>
								<Inline nodes={node.children} />
							</em>
						);
					case "code":
						return <code>{node.text}</code>;
					case "link":
						return (
							<a href={node.href}>
								<Inline nodes={node.children} />
							</a>
						);
				}
			}}
		</For>
	);
}

function Block(props: { node: BlockNode }) {
	const node = props.node;
	switch (node.type) {
		case "heading": {
			const tag = `h${node.level}`;
			const id = slugify(extractText(node.children));
			return (
				<Dynamic component={tag} id={id}>
					<Inline nodes={node.children} />
				</Dynamic>
			);
		}
		case "paragraph":
			return (
				<p>
					<Inline nodes={node.children} />
				</p>
			);
		case "list": {
			const tag = node.ordered ? "ol" : "ul";
			return (
				<Dynamic component={tag}>
					<For each={node.items}>
						{(items) => (
							<li>
								<Inline nodes={items} />
							</li>
						)}
					</For>
				</Dynamic>
			);
		}
		case "code":
			return <ShikiCode code={node.code} lang={node.lang} />;
		case "rule":
			return <hr />;
		case "blockquote":
			return (
				<blockquote>
					<For each={node.children}>{(child) => <Block node={child} />}</For>
				</blockquote>
			);
	}
}

export function Markdown(props: { content: string }) {
	const blocks = createMemo(() => parseMarkdown(props.content));
	return (
		<div class="markdown-body">
			<For each={blocks()}>{(node) => <Block node={node} />}</For>
		</div>
	);
}
