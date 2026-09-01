import * as SolidUI from "@wrikka/solid-ui";
import type { JSX } from "solid-js";
import { PREVIEW_IMAGE_SMALL_SRC, PREVIEW_IMAGE_TINY_SRC } from "../lib/config";

const selfClosing = new Set([
	"Input",
	"Textarea",
	"Select",
	"Checkbox",
	"Radio",
	"Switch",
	"Slider",
	"FileInput",
	"DatePicker",
	"Image",
	"Avatar",
	"Badge",
	"Spinner",
	"Skeleton",
	"Loading",
	"Progress",
	"Separator",
	"ScrollArea",
]);

const colored = new Set(["Badge", "Button", "Toggle"]);

type AnyComp = (props: Record<string, unknown>) => JSX.Element;

const selfClosingRenderers: Record<string, (C: AnyComp, name: string) => JSX.Element> = {
	Image: (C) => <C src={PREVIEW_IMAGE_SMALL_SRC} alt="" width={120} height={80} />,
	Avatar: (C) => (
		<C>
			<img src={PREVIEW_IMAGE_TINY_SRC} alt="" />
		</C>
	),
	Badge: (C, name) => <C>{name}</C>,
	Button: (C) => (
		<C variant="primary" size="sm">
			Button
		</C>
	),
	Input: (C) => <C type="text" placeholder="Input" readOnly />,
	Textarea: (C) => <C placeholder="Textarea" readOnly />,
	Checkbox: (C) => <C checked readOnly />,
	Radio: (C) => <C checked readOnly />,
	Switch: (C) => <C checked aria-label="Preview switch" />,
	Toggle: (C) => <C pressed aria-label="Preview toggle" />,
	Slider: (C) => <C min={0} max={100} value={40} />,
	Select: (C) => (
		<C>
			<option>Option 1</option>
			<option>Option 2</option>
		</C>
	),
	Progress: (C) => <C value={60} max={100} />,
};

function renderSelfClosing(C: AnyComp, name: string) {
	const renderer = selfClosingRenderers[name];
	if (renderer) return renderer(C, name);
	return <C />;
}

export function ComponentPreview(props: { name: string; tag: string }) {
	const C = (SolidUI as unknown as Record<string, unknown>)[props.name];
	if (typeof C !== "function") return <div class="text-sm text-muted-foreground">Preview unavailable</div>;
	const AnyC = C as AnyComp;

	if (selfClosing.has(props.name)) {
		return renderSelfClosing(AnyC, props.name);
	}

	if (colored.has(props.name)) {
		return (
			<AnyC variant="primary" size="sm">
				{props.name}
			</AnyC>
		);
	}

	return (
		<AnyC class="flex items-center gap-2 rounded-lg border border-border bg-background p-3 text-sm">
			<SolidUI.Badge>{props.tag}</SolidUI.Badge>
			{props.name}
		</AnyC>
	);
}
