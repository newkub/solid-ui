import { type JSX, Show, splitProps } from "solid-js";

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLElement> {}

export function Breadcrumb(props: BreadcrumbProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["text-sm text-muted-foreground", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<nav aria-label="breadcrumb" class={className()} {...rest}>
			<ol class="flex flex-wrap items-center gap-1.5">{local.children}</ol>
		</nav>
	);
}

export interface BreadcrumbItemProps extends JSX.HTMLAttributes<HTMLLIElement> {}

export function BreadcrumbItem(props: BreadcrumbItemProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["flex items-center gap-1.5", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<li class={className()} {...rest}>
			{local.children}
		</li>
	);
}

export interface BreadcrumbLinkProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
	current?: boolean;
}

export function BreadcrumbLink(props: BreadcrumbLinkProps) {
	const [local, rest] = splitProps(props, ["class", "current", "children", "href"]);
	const base = "transition-colors hover:text-foreground";
	const className = () =>
		[
			base,
			local.current ? "pointer-events-none font-medium text-foreground" : "text-muted-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<Show
			when={local.current}
			fallback={
				<a class={className()} href={local.href ?? "#"} {...rest}>
					{local.children}
				</a>
			}
		>
			<span class={className()} aria-current="page">
				{local.children}
			</span>
		</Show>
	);
}

export interface BreadcrumbSeparatorProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	children?: JSX.Element;
}

export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["text-muted-foreground", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<span role="presentation" aria-hidden="true" class={className()} {...rest}>
			{local.children ?? (
				<svg
					class="h-3.5 w-3.5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			)}
		</span>
	);
}

export interface BreadcrumbEllipsisProps extends JSX.HTMLAttributes<HTMLSpanElement> {}

export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const className = () =>
		["flex h-5 w-5 items-center justify-center text-muted-foreground", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<span aria-hidden="true" class={className()} {...rest}>
			<span class="sr-only">More</span>…
		</span>
	);
}
