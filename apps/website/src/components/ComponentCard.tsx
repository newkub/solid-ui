import { Link } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { ErrorBoundary, Show } from "solid-js";
import { categories } from "../categories";
import { ComponentPreview, PreviewFallback } from "./ComponentPreview";
import { CopyButton } from "./CopyButton";

function TagChip(props: { label: string; color?: "default" | "primary" | "secondary" }) {
	const colorClass = () => {
		if (props.color === "primary") {
			return "border-primary/20 bg-primary/5 text-primary";
		}
		if (props.color === "secondary") {
			return "border-border bg-muted text-muted-foreground";
		}
		return "border-border bg-muted text-muted-foreground";
	};

	return (
		<span
			class={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${colorClass()}`}
		>
			{props.label}
		</span>
	);
}

export function ComponentCard(props: { name: string | (() => string) }) {
	const name = () => (typeof props.name === "function" ? (props.name as () => string)() : props.name);
	const item = () => registry.find((r) => r.name === name());
	const group = () => categories.find((c) => c.items.includes(name()));
	const importText = () => `import { ${name()} } from "@wrikka/solid-ui";`;

	return (
		<div class="group flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md focus-within:ring-1 focus-within:ring-ring">
			<div
				class="flex min-h-[120px] items-center justify-center overflow-hidden rounded-lg bg-muted/50 p-3"
				aria-hidden="true"
			>
				<Show when={item()} fallback={<span class="text-sm text-muted-foreground">—</span>}>
					{(i) => (
						<ErrorBoundary fallback={<PreviewFallback name={name()} tag={i().tag} />}>
							<ComponentPreview name={name()} tag={i().tag} />
						</ErrorBoundary>
					)}
				</Show>
			</div>
			<div class="flex flex-col gap-1.5">
				<div class="flex flex-wrap items-center gap-1.5">
					<TagChip label={item()?.tag ?? "—"} color="primary" />
					<TagChip label={group()?.label ?? "Component"} color="secondary" />
				</div>
				<h3 class="text-base font-semibold text-foreground">{name()}</h3>
				<p class="line-clamp-2 text-sm text-muted-foreground">{item()?.description ?? ""}</p>
			</div>
			<div class="mt-auto flex items-center gap-2">
				<CopyButton
					text={importText()}
					label={`Copy ${name()} import`}
					class="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-border bg-background text-xs font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				/>
				<Link
					to={`/docs/${group()?.id ?? "components"}/${name().toLowerCase()}`}
					class="inline-flex h-8 items-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground no-underline shadow-sm transition-all hover:bg-secondary-hover hover:shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					aria-label={`View ${name()} documentation`}
				>
					View
				</Link>
			</div>
		</div>
	);
}
