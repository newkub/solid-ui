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
	if (typeof C !== "function") return <div class="text-sm text-muted-foreground">Preview unavailable</div>;

	if (selfClosing.has(props.name)) {
		if (props.name === "Image") {
			return <C src="https://picsum.photos/120/80" alt="" width={120} height={80} />;
		}
		if (props.name === "Avatar") {
			return (
				<C>
					<img src="https://picsum.photos/40" alt="" />
				</C>
			);
		}
		if (props.name === "Badge") {
			return <C>{props.name}</C>;
		}
		if (props.name === "Button") {
			return (
				<C variant="primary" size="sm">
					Button
				</C>
			);
		}
		if (props.name === "Input") {
			return <C type="text" placeholder="Input" readOnly />;
		}
		if (props.name === "Textarea") {
			return <C placeholder="Textarea" readOnly />;
		}
		if (props.name === "Checkbox" || props.name === "Radio") {
			return <C checked readOnly />;
		}
		if (props.name === "Switch") {
			return <C checked aria-label="Preview switch" />;
		}
		if (props.name === "Toggle") {
			return <C pressed aria-label="Preview toggle" />;
		}
		if (props.name === "Slider") {
			return <C min={0} max={100} value={40} />;
		}
		if (props.name === "Select") {
			return (
				<C>
					<option>Option 1</option>
					<option>Option 2</option>
				</C>
			);
		}
		if (props.name === "Progress") {
			return <C value={60} max={100} />;
		}
		return <C />;
	}

	if (colored.has(props.name)) {
		return (
			<C variant="primary" size="sm">
				{props.name}
			</C>
		);
	}

	return (
		<C class="flex items-center gap-2 rounded-lg border border-border bg-background p-3 text-sm">
			<SolidUI.Badge>{props.tag}</SolidUI.Badge>
			{props.name}
		</C>
	);
}
