import type { JSX } from "solid-js";

interface DocsLayoutProps {
	sidebar: JSX.Element;
	children: JSX.Element;
}

export function DocsLayout(props: DocsLayoutProps) {
	return (
		<div class="flex flex-col gap-8 lg:flex-row lg:items-start">
			<aside class="lg:sticky lg:top-24 lg:w-64 lg:shrink-0" aria-label="Page sidebar">
				{props.sidebar}
			</aside>
			<main class="min-w-0 flex-1">{props.children}</main>
		</div>
	);
}
