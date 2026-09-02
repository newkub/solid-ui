import type { JSX } from "solid-js";
import { Sidebar } from "./Sidebar";

interface DocsLayoutProps {
	rightSidebar?: JSX.Element;
	children: JSX.Element;
}

export function DocsLayout(props: DocsLayoutProps) {
	return (
		<div class="flex flex-col gap-6 lg:flex-row lg:items-stretch">
			<div class="hidden shrink-0 lg:block lg:w-60 xl:w-64">
				<Sidebar />
			</div>
			<main class="min-w-0 flex-1 py-4">{props.children}</main>
			{props.rightSidebar && <div class="hidden shrink-0 lg:block lg:w-60 xl:w-72">{props.rightSidebar}</div>}
		</div>
	);
}
