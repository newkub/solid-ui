import * as SolidUI from "@wrikka/solid-ui";

const selfClosing = new Set([
	"Input",
	"Textarea",
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

export function ComponentPreview(props: { name: string; tag: string }) {
	const C = (SolidUI as unknown as Record<string, unknown>)[props.name];
	if (typeof C !== "function") return <div class="preview-element preview-element--empty">Preview unavailable</div>;

	const className = "preview-element";

	if (selfClosing.has(props.name)) {
		if (props.name === "Image") {
			return <C class={className} src="https://picsum.photos/120/80" alt="" width={120} height={80} />;
		}
		if (props.name === "Avatar") {
			return <C class={className} src="https://picsum.photos/40" alt="" />;
		}
		if (props.name === "Badge") {
			return <C class={className}>{props.name}</C>;
		}
		if (props.name === "Button") {
			return (
				<C class={className} variant="primary" size="sm">
					Button
				</C>
			);
		}
		if (props.name === "Input") {
			return <C class={className} type="text" placeholder="Input" readOnly />;
		}
		if (props.name === "Textarea") {
			return <C class={className} placeholder="Textarea" readOnly />;
		}
		if (props.name === "Checkbox" || props.name === "Radio") {
			return <C class={className} checked readOnly />;
		}
		if (props.name === "Switch" || props.name === "Toggle") {
			return <C class={className} checked />;
		}
		if (props.name === "Slider") {
			return <C class={className} min={0} max={100} />;
		}
		if (props.name === "Progress") {
			return <C class={className} value={60} max={100} />;
		}
		return <C class={className} />;
	}

	if (colored.has(props.name)) {
		return (
			<C class={className} variant="primary" size="sm">
				{props.name}
			</C>
		);
	}

	return (
		<C class={className}>
			<SolidUI.Badge>{props.tag}</SolidUI.Badge>
			{props.name}
		</C>
	);
}
