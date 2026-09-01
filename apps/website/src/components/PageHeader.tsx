import type { JSX } from "solid-js";

interface PageHeaderProps {
	title: string;
	description?: string;
	count?: number;
	countLabel?: string;
	children?: JSX.Element;
}

export function PageHeader(props: PageHeaderProps) {
	return (
		<header class="mb-6 space-y-2">
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="text-2xl font-bold tracking-tight">{props.title}</h2>
				{typeof props.count === "number" && (
					<span class="inline-flex h-6 w-fit items-center rounded-full bg-muted px-2.5 text-xs font-medium text-muted-foreground">
						{props.count} {props.countLabel ?? "items"}
					</span>
				)}
			</div>
			{props.description && <p class="max-w-2xl text-sm text-muted-foreground">{props.description}</p>}
			{props.children}
		</header>
	);
}
