import { children, createSignal, type JSX, Show, splitProps } from "solid-js";

export interface AccordionItemProps {
	title: JSX.Element;
	children: JSX.Element;
	defaultOpen?: boolean;
}

export function AccordionItem(props: AccordionItemProps) {
	const [open, setOpen] = createSignal(props.defaultOpen ?? false);
	const content = children(() => props.children);

	return (
		<div class="border-b border-border last:border-b-0">
			<button
				type="button"
				class="flex w-full items-center justify-between py-3 text-sm font-medium transition-colors hover:text-foreground"
				onClick={() => setOpen((v) => !v)}
				aria-expanded={open()}
			>
				<span class="text-foreground">{props.title}</span>
				<svg
					class={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open() ? "rotate-180" : ""}`}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>
			<Show when={open()}>
				<div class="pb-3 text-sm text-muted-foreground">{content()}</div>
			</Show>
		</div>
	);
}

export interface AccordionProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Accordion(props: AccordionProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["w-full rounded-lg border border-border", local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className()} {...rest}>
			<div class="px-4">{local.children}</div>
		</div>
	);
}
