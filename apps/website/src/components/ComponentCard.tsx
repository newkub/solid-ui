import { Link } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { Show } from "solid-js";
import { categories } from "../categories";
import { ComponentPreview } from "./ComponentPreview";
import { CopyButton } from "./CopyButton";

export function ComponentCard(props: { name: string }) {
	const item = () => registry.find((r) => r.name === props.name);
	const group = () => categories.find((c) => c.items.includes(props.name));
	const importText = () => `import { ${props.name} } from "@wrikka/solid-ui";`;

	return (
		<div class="component-card solidui-card">
			<div class="component-card__preview" aria-hidden="true">
				<Show when={item()} fallback={<span class="component-card__no-preview">—</span>}>
					{(i) => <ComponentPreview name={i().name} tag={i().tag} />}
				</Show>
			</div>
			<div class="component-card__meta">
				<div class="component-card__header">
					<h3 class="component-card__name">{props.name}</h3>
					<span class="component-card__badge">{group()?.label ?? "Component"}</span>
				</div>
				<p class="component-card__tag">{item()?.tag ?? "—"}</p>
				<p class="component-card__desc">{item()?.description ?? ""}</p>
			</div>
			<div class="component-card__actions">
				<CopyButton text={importText()} label="Copy" class="solidui-button solidui-button--sm" />
				<Link
					to={`/docs/${group()?.id ?? "components"}/${props.name.toLowerCase()}`}
					class="solidui-button solidui-button--sm solidui-button--secondary"
				>
					View
				</Link>
			</div>
		</div>
	);
}
