import type { JSX } from "solid-js";

interface PageSectionProps {
	title?: string;
	children: JSX.Element;
	class?: string;
}

export function PageSection(props: PageSectionProps) {
	return (
		<section class={`rounded-xl border border-border bg-surface p-5 shadow-sm ${props.class ?? ""}`}>
			{props.title && <h3 class="mb-4 text-lg font-semibold">{props.title}</h3>}
			{props.children}
		</section>
	);
}
