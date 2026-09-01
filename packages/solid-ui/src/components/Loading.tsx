import { type JSX, Show, splitProps } from "solid-js";
import { Spinner } from "./Spinner";

export interface LoadingProps extends JSX.HTMLAttributes<HTMLDivElement> {
	message?: string;
	overlay?: boolean;
}

export function Loading(props: LoadingProps) {
	const [local, rest] = splitProps(props, ["class", "message", "overlay"]);

	const base = () =>
		[
			local.overlay
				? "fixed inset-0 z-toast flex flex-col items-center justify-center gap-3 bg-overlay/80 text-foreground"
				: "inline-flex items-center gap-2 text-muted-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<div class={base()} role="status" aria-live="polite" {...rest}>
			<Spinner class={local.overlay ? "h-8 w-8" : "h-5 w-5"} />
			<Show when={local.message || local.overlay}>
				<span class="text-sm">{local.message ?? "Loading…"}</span>
			</Show>
		</div>
	);
}
