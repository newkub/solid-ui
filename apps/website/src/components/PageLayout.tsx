import type { JSX } from "solid-js";

interface PageLayoutProps {
	children: JSX.Element;
	class?: string;
}

export function PageLayout(props: PageLayoutProps) {
	return <div class={`space-y-8 ${props.class ?? ""}`}>{props.children}</div>;
}
