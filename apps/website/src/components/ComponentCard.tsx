import { Link } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { ErrorBoundary, Show } from "solid-js";
import { categories } from "../categories";
import { ComponentPreview } from "./ComponentPreview";
import { CopyButton } from "./CopyButton";

function TagChip(props: { label: string }) {
	return (
		<span class="inline-flex rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
			{props.label}
		</span>
	);
}

function PreviewFallback(props: { name: string; tag: string }) {
	return (
		<span class="inline-flex items-center gap-2 text-sm text-muted-foreground">
			<TagChip label={props.tag} />
			{props.name}
		</span>
	);
}

export function ComponentCard(props: { name: string | (() => string) }) {
	const name = () => (typeof props.name === "function" ? (props.name as () => string)() : props.name);
	const item = () => registry.find((r) => r.name === name());
	const group = () => categories.find((c) => c.items.includes(name()));
	const importText = () => `import { ${name()} } from "@wrikka/solid-ui";`;

	return (
		<div class="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
			<div class="flex min-h-[100px] items-center justify-center rounded-lg bg-muted/50 p-3" aria-hidden="true">
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
					<TagChip label={item()?.tag ?? "—"} />
					<TagChip label={group()?.label ?? "Component"} />
				</div>
				<h3 class="text-base font-semibold">{name()}</h3>
				<p class="text-sm text-muted-foreground line-clamp-2">{item()?.description ?? ""}</p>
			</div>
			<div class="mt-auto flex items-center gap-2">
				<CopyButton
					text={importText()}
					label={`Copy ${name()} import`}
					class="inline-flex h-8 flex-1 items-center justify-center rounded-md border border-border bg-background text-xs font-medium hover:bg-muted"
				/>
				<Link
					to={`/docs/${group()?.id ?? "components"}/${name().toLowerCase()}`}
					class="inline-flex h-8 items-center rounded-md bg-secondary px-3 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
					aria-label={`View ${name()} documentation`}
				>
					View
				</Link>
			</div>
		</div>
	);
}
