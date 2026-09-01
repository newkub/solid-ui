import * as SolidUI from "@wrikka/solid-ui";
import { For, type JSX } from "solid-js";
import { categories } from "../categories";
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
]);

const colored = new Set(["Button"]);

const previewClass =
	"flex h-20 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background p-3 text-sm";

type AnyComp = (props: Record<string, unknown>) => JSX.Element;

function findCategory(name: string) {
	return categories.find((c) => c.items.includes(name));
}

export function PreviewFallback(props: { name: string; tag: string }) {
	return (
		<div class={`${previewClass} flex-col gap-2`}>
			<div class="flex items-center gap-2">
				<SolidUI.Badge>{props.tag}</SolidUI.Badge>
				<span class="font-medium text-foreground">{props.name}</span>
			</div>
			<div class="w-full space-y-1.5">
				<SolidUI.Skeleton class="h-2 w-3/4" />
				<SolidUI.Skeleton class="h-2 w-1/2" />
			</div>
		</div>
	);
}

function SampleBlocks() {
	return (
		<div class="flex items-center gap-1.5">
			<div class="h-6 w-6 rounded bg-primary/80" />
			<div class="h-6 w-6 rounded bg-secondary/80" />
			<div class="h-6 w-6 rounded bg-accent/80" />
		</div>
	);
}

function SampleList() {
	return (
		<ul class="w-full space-y-1 text-left text-xs text-muted-foreground">
			<li class="rounded bg-muted px-2 py-1">Item one</li>
			<li class="rounded bg-muted px-2 py-1">Item two</li>
			<li class="rounded bg-muted px-2 py-1">Item three</li>
		</ul>
	);
}

function SampleNav() {
	return (
		<nav class="flex items-center gap-2 text-xs text-muted-foreground">
			<span class="rounded bg-muted px-2 py-1">Home</span>
			<span class="text-border">/</span>
			<span class="rounded bg-primary/10 px-2 py-1 text-primary">Active</span>
		</nav>
	);
}

function SampleTable() {
	return (
		<table class="w-full text-left text-xs">
			<thead>
				<tr class="border-b border-border text-muted-foreground">
					<th class="pb-1 font-medium">A</th>
					<th class="pb-1 font-medium">B</th>
				</tr>
			</thead>
			<tbody>
				<tr class="text-foreground">
					<td class="py-1">One</td>
					<td class="py-1">Two</td>
				</tr>
			</tbody>
		</table>
	);
}

function SampleChart() {
	return (
		<div class="flex h-12 w-full items-end justify-center gap-1">
			<div class="w-3 rounded-t bg-primary/80" style={{ height: "40%" }} />
			<div class="w-3 rounded-t bg-primary/80" style={{ height: "70%" }} />
			<div class="w-3 rounded-t bg-primary/80" style={{ height: "50%" }} />
			<div class="w-3 rounded-t bg-primary/80" style={{ height: "90%" }} />
			<div class="w-3 rounded-t bg-primary/80" style={{ height: "60%" }} />
		</div>
	);
}

function SampleCalendar() {
	return (
		<div class="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
			<For each={Array.from({ length: 14 }, (_, i) => i + 1)}>
				{(day) => (
					<div class={`h-5 w-5 rounded-sm ${day === 8 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{day}</div>
				)}
			</For>
		</div>
	);
}

function SampleTerminal() {
	return (
		<SolidUI.Terminal
			class="max-h-28 w-full overflow-hidden text-[10px]"
			showPrompt
			lines={[{ content: "bun run build" }, { content: "✓ built in 3.15s", variant: "success" }]}
		/>
	);
}

function SampleMotion() {
	return (
		<SolidUI.Motion initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 600 }}>
			<div class="rounded bg-primary px-3 py-1.5 text-xs text-primary-foreground">{/* Motion */}</div>
		</SolidUI.Motion>
	);
}

function SampleCommand() {
	return (
		<div class="w-full space-y-1.5 text-left">
			<div class="h-7 w-full rounded border border-border bg-background px-2 text-xs text-muted-foreground flex items-center">
				Search…
			</div>
			<div class="space-y-1">
				<div class="h-5 w-3/4 rounded bg-muted" />
				<div class="h-5 w-1/2 rounded bg-muted" />
			</div>
		</div>
	);
}

function SampleAlert(props: { name: string }) {
	return (
		<div class="w-full rounded border border-border bg-muted p-2 text-xs text-foreground">
			<div class="flex items-center gap-1 font-medium">
				<span class="h-2 w-2 rounded-full bg-primary" />
				{props.name}
			</div>
		</div>
	);
}

function SampleForm() {
	return (
		<div class="w-full space-y-1.5 text-left">
			<div class="text-[10px] font-medium text-muted-foreground">Label</div>
			<div class="h-7 w-full rounded border border-border bg-background" />
		</div>
	);
}

function SampleLoading() {
	return (
		<div class="flex items-center gap-2 text-sm text-muted-foreground">
			<SolidUI.Spinner />
			<span>Loading…</span>
		</div>
	);
}

function SampleAccordion() {
	return (
		<SolidUI.Accordion class="w-full text-left">
			<SolidUI.AccordionItem title="Section one">
				<p class="text-xs">Preview content for the first panel.</p>
			</SolidUI.AccordionItem>
			<SolidUI.AccordionItem title="Section two">
				<p class="text-xs">Preview content for the second panel.</p>
			</SolidUI.AccordionItem>
		</SolidUI.Accordion>
	);
}

function PreviewContent(props: { name: string; tag: string }) {
	const category = findCategory(props.name)?.id;

	switch (category) {
		case "templates":
			if (props.name === "Table" || props.name === "DataTable") return <SampleTable />;
			if (props.name === "Image") return null;
			if (props.name === "Form") return <SampleForm />;
			if (props.name === "Transition") return <SampleBlocks />;
			return <SampleList />;
		case "primitives":
			if (props.name === "Button") return <SolidUI.Badge>{props.name}</SolidUI.Badge>;
			return <SampleForm />;
		default:
			break;
	}

	if (props.name === "Accordion") return <SampleAccordion />;
	if (props.name === "Terminal") return <SampleTerminal />;
	if (props.name === "Motion") return <SampleMotion />;

	const layout = new Set([
		"Box",
		"Card",
		"Stack",
		"Flex",
		"Grid",
		"AspectRatio",
		"ScrollArea",
		"Resizable",
		"VirtualList",
		"Transition",
		"Collapsible",
	]);
	const nav = new Set([
		"Tabs",
		"Accordion",
		"Breadcrumb",
		"Menubar",
		"NavigationMenu",
		"Pagination",
		"Steps",
		"Timeline",
		"TreeView",
		"ToggleGroup",
	]);
	const overlay = new Set(["Dialog", "Modal", "Drawer", "Sheet", "Popover", "Tooltip", "DropdownMenu"]);
	const feedback = new Set(["Alert", "Notification", "Toast", "Toaster", "Loading", "Spinner", "Skeleton", "Progress"]);
	const alertItems = new Set(["Alert", "Notification", "Toast", "Toaster"]);
	const form = new Set(["Form", "FormField", "Label"]);
	const data = new Set(["Table", "DataTable", "Chart", "Calendar", "Command", "CommandPalette"]);

	if (layout.has(props.name)) return <SampleBlocks />;
	if (nav.has(props.name)) return <SampleNav />;
	if (overlay.has(props.name))
		return (
			<SolidUI.Button variant="secondary" size="sm">
				{props.name}
			</SolidUI.Button>
		);
	if (feedback.has(props.name))
		return alertItems.has(props.name) ? <SampleAlert name={props.name} /> : <SampleLoading />;
	if (form.has(props.name)) return <SampleForm />;
	if (data.has(props.name)) {
		if (props.name === "Chart") return <SampleChart />;
		if (props.name === "Calendar") return <SampleCalendar />;
		if (props.name === "DataTable") return <SampleTable />;
		return <SampleCommand />;
	}
	return <PreviewFallback name={props.name} tag={props.tag} />;
}

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
	FileInput: (C) => <C />,
	DatePicker: (C) => <C />,
};

function renderSelfClosing(C: AnyComp, name: string) {
	const renderer = selfClosingRenderers[name];
	if (renderer) return renderer(C, name);
	return <C />;
}

export function ComponentPreview(props: { name: string; tag: string }) {
	const C = (SolidUI as unknown as Record<string, unknown>)[props.name];
	if (typeof C !== "function") return <PreviewFallback name={props.name} tag={props.tag} />;
	const AnyC = C as AnyComp;

	if (selfClosing.has(props.name)) {
		return <div class={previewClass}>{renderSelfClosing(AnyC, props.name)}</div>;
	}

	if (colored.has(props.name)) {
		return (
			<AnyC variant="primary" size="sm">
				{props.name}
			</AnyC>
		);
	}

	if (props.name === "Toggle") {
		return (
			<AnyC pressed class="rounded-md border border-border px-3 py-1.5 text-sm">
				{props.name}
			</AnyC>
		);
	}

	const content = <PreviewContent name={props.name} tag={props.tag} />;
	return <AnyC class={previewClass}>{content}</AnyC>;
}
