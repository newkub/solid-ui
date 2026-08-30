import { createMemo, For, type JSX } from "solid-js";
import { type BlockNode, type InlineNode, parseMarkdown } from "../lib/markdown";
import { ShikiCode } from "./ShikiCode";

function escapeText(text: string) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />");
}

function Inline(props: { nodes: InlineNode[] }) {
	return (
		<For each={props.nodes}>
			{(node) => {
				switch (node.type) {
					case "text":
						return <span innerHTML={escapeText(node.text)} />;
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
			const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
			return (
				<Tag>
					<Inline nodes={node.children} />
				</Tag>
			);
		}
		case "paragraph":
			return (
				<p>
					<Inline nodes={node.children} />
				</p>
			);
		case "list": {
			const Tag = node.ordered ? "ol" : "ul";
			return (
				<Tag>
					<For each={node.items}>
						{(items) => (
							<li>
								<Inline nodes={items} />
							</li>
						)}
					</For>
				</Tag>
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
