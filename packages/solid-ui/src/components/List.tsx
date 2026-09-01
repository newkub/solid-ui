import { type JSX, mergeProps, splitProps } from "solid-js";

export interface ListProps extends JSX.HTMLAttributes<HTMLElement> {
	ordered?: boolean;
	unstyled?: boolean;
}

export function List(props: ListProps) {
	const [local, rest] = splitProps(props, ["class", "ordered", "unstyled", "children"]);
	const merged = mergeProps({ ordered: false, unstyled: false }, local);

	const markers = () => (merged.unstyled ? [] : [merged.ordered ? "list-decimal" : "list-disc"]);
	const className = () =>
		["my-2 ml-5 space-y-1 text-foreground", ...markers(), local.class ?? ""].filter(Boolean).join(" ");

	return merged.ordered ? (
		<ol class={className()} {...(rest as unknown as JSX.OlHTMLAttributes<HTMLOListElement>)}>
			{local.children}
		</ol>
	) : (
		<ul class={className()} {...(rest as unknown as JSX.HTMLAttributes<HTMLUListElement>)}>
			{local.children}
		</ul>
	);
}
