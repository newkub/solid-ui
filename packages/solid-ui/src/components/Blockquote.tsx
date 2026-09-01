import { type JSX, Show, splitProps } from "solid-js";

export interface BlockquoteProps extends JSX.BlockquoteHTMLAttributes<HTMLQuoteElement> {
	citation?: JSX.Element;
}

export function Blockquote(props: BlockquoteProps) {
	const [local, rest] = splitProps(props, ["class", "citation", "children"]);

	const className = () =>
		["border-l-4 border-border pl-4 italic text-foreground", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<blockquote class={className()} {...rest}>
			{local.children}
			<Show when={local.citation}>
				<footer class="mt-2 text-sm not-italic text-muted-foreground">
					— <cite>{local.citation}</cite>
				</footer>
			</Show>
		</blockquote>
	);
}
