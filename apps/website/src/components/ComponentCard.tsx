import { Link } from "@tanstack/solid-router";
import { registry } from "@wrikka/solid-ui";
import { categories } from "../categories";
import { ComponentPreview } from "./ComponentPreview";

export function ComponentCard(props: { name: string }) {
	const item = () => registry.find((r) => r.name === props.name);
	const group = () => categories.find((c) => c.items.includes(props.name))?.id ?? "components";

	const i = item();

	return (
		<div class="component-card solidui-card">
			<div class="component-card__preview" aria-hidden="true">
				{i ? <ComponentPreview name={i.name} tag={i.tag} /> : <span>—</span>}
			</div>
			<div class="component-card__meta">
				<h3 class="component-card__name">{props.name}</h3>
				<p class="component-card__tag">{item()?.tag ?? "—"}</p>
				<p class="component-card__desc">{item()?.description ?? ""}</p>
			</div>
			<Link
				to={`/docs/${group()}/${props.name.toLowerCase()}`}
				class="solidui-button solidui-button--ghost component-card__action"
			>
				View docs
			</Link>
		</div>
	);
}
