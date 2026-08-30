import * as SolidUI from "@wrikka/solid-ui";
import type { JSX } from "solid-js";

type AnyComponent = (props: Record<string, unknown>) => JSX.Element;

export function ComponentPreview(props: { name: string; tag: string }) {
	const C = (SolidUI as unknown as Record<string, AnyComponent>)[props.name];
	if (!C) return <div class="solidui-card">Component preview not available.</div>;

	return (
		<C class="preview-element" inert={true}>
			<SolidUI.Badge>{props.tag}</SolidUI.Badge>
			{props.name}
		</C>
	);
}
