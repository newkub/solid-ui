import { type JSX, Show, splitProps } from "solid-js";

export interface TimelineProps extends JSX.HTMLAttributes<HTMLOListElement> {}

export function Timeline(props: TimelineProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["relative list-none space-y-6", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<ol class={className()} {...rest}>
			<span class="absolute left-2.5 top-3 bottom-0 w-px bg-border" aria-hidden="true" />
			{local.children}
		</ol>
	);
}

export interface TimelineItemProps extends Omit<JSX.HTMLAttributes<HTMLLIElement>, "title"> {
	title?: JSX.Element;
	description?: JSX.Element;
	time?: JSX.Element;
	dot?: JSX.Element;
}

export function TimelineItem(props: TimelineItemProps) {
	const [local, rest] = splitProps(props, ["class", "title", "description", "time", "dot", "children"]);
	const className = () => ["relative pl-8", local.class ?? ""].filter(Boolean).join(" ");
	const dotClass =
		"absolute left-2.5 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary";

	return (
		<li class={className()} {...rest}>
			<span class={dotClass} aria-hidden="true">
				<Show when={local.dot}>{local.dot}</Show>
			</span>
			<div class="flex flex-col gap-0.5">
				<div class="flex items-center justify-between gap-2">
					<Show when={local.title}>
						<span class="text-sm font-medium text-foreground">{local.title}</span>
					</Show>
					<Show when={local.time}>
						<span class="text-xs text-muted-foreground">{local.time}</span>
					</Show>
				</div>
				<Show when={local.description}>
					<p class="text-xs text-muted-foreground">{local.description}</p>
				</Show>
				{local.children}
			</div>
		</li>
	);
}
