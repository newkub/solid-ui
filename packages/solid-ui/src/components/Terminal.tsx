import { createEffect, createSignal, For, type JSX, mergeProps, onCleanup, Show } from "solid-js";

export interface TerminalLine {
	prefix?: string;
	content: string;
	variant?: "default" | "success" | "error" | "warning" | "muted";
}

export interface TerminalProps {
	title?: string;
	lines?: TerminalLine[];
	children?: JSX.Element;
	typing?: boolean;
	typingSpeed?: number;
	showPrompt?: boolean;
	class?: string;
}

const variantClass: Record<Exclude<TerminalLine["variant"], undefined>, string> = {
	default: "text-foreground",
	success: "text-success",
	error: "text-destructive",
	warning: "text-warning",
	muted: "text-muted-foreground",
};

export function Terminal(props: TerminalProps) {
	const merged = mergeProps({ title: "bash — zsh", typing: false, typingSpeed: 40, showPrompt: false }, props);
	const [visible, setVisible] = createSignal(props.typing ? 0 : (props.lines?.length ?? 0));

	createEffect(() => {
		if (!merged.typing || !props.lines) {
			setVisible(props.lines?.length ?? 0);
			return;
		}
		setVisible(0);
		let index = 0;
		const timer = setInterval(() => {
			index++;
			setVisible(index);
			if (index >= (props.lines?.length ?? 0)) clearInterval(timer);
		}, merged.typingSpeed);
		onCleanup(() => clearInterval(timer));
	});

	return (
		<div
			class={`overflow-hidden rounded-xl border border-border bg-background font-mono text-sm shadow-sm ${merged.class ?? ""}`}
		>
			<div class="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
				<div class="flex items-center gap-1.5">
					<span class="h-3 w-3 rounded-full bg-destructive" />
					<span class="h-3 w-3 rounded-full bg-warning" />
					<span class="h-3 w-3 rounded-full bg-success" />
				</div>
				<span class="ml-2 text-xs text-muted-foreground">{merged.title}</span>
			</div>
			<div class="space-y-1 p-4">
				<For each={props.lines?.slice(0, visible())}>
					{(line) => (
						<div class={`whitespace-pre-wrap break-words ${variantClass[line.variant ?? "default"]}`}>
							<Show when={merged.showPrompt || line.prefix}>
								<span class="mr-2 text-muted-foreground">{line.prefix ?? "$"}</span>
							</Show>
							{line.content}
						</div>
					)}
				</For>
				<Show when={merged.typing && visible() < (props.lines?.length ?? 0)}>
					<span class="inline-block h-4 w-2 animate-pulse bg-primary" />
				</Show>
				{merged.children}
			</div>
		</div>
	);
}
