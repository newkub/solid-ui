import * as SolidUI from "@wrikka/solid-ui";
import { createSignal, type JSX } from "solid-js";
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

const overlay = new Set(["Dialog", "Modal", "Drawer", "Sheet", "Popover", "Tooltip", "DropdownMenu"]);
const feedback = new Set(["Alert", "Notification", "Toast", "Toaster", "Loading", "Spinner", "Skeleton", "Progress"]);
const interactive = new Set([...overlay, ...feedback]);
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
const form = new Set(["Form", "FormField", "Label"]);
const data = new Set(["Table", "DataTable", "Chart", "Calendar", "Command", "CommandPalette"]);

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

function SampleTabs() {
	return (
		<SolidUI.Tabs defaultValue="account" class="w-full text-left">
			<SolidUI.TabsList class="grid w-full grid-cols-2">
				<SolidUI.TabsTrigger value="account">Account</SolidUI.TabsTrigger>
				<SolidUI.TabsTrigger value="password">Password</SolidUI.TabsTrigger>
			</SolidUI.TabsList>
			<SolidUI.TabsContent value="account">
				<p class="text-xs text-muted-foreground">Manage your account settings.</p>
			</SolidUI.TabsContent>
			<SolidUI.TabsContent value="password">
				<p class="text-xs text-muted-foreground">Change your password.</p>
			</SolidUI.TabsContent>
		</SolidUI.Tabs>
	);
}

function SampleBreadcrumb() {
	return (
		<SolidUI.Breadcrumb>
			<SolidUI.BreadcrumbItem>
				<SolidUI.BreadcrumbLink href="#">Home</SolidUI.BreadcrumbLink>
				<SolidUI.BreadcrumbSeparator />
			</SolidUI.BreadcrumbItem>
			<SolidUI.BreadcrumbItem>
				<SolidUI.BreadcrumbLink href="#">Products</SolidUI.BreadcrumbLink>
				<SolidUI.BreadcrumbSeparator />
			</SolidUI.BreadcrumbItem>
			<SolidUI.BreadcrumbItem>
				<SolidUI.BreadcrumbLink current>Active</SolidUI.BreadcrumbLink>
			</SolidUI.BreadcrumbItem>
		</SolidUI.Breadcrumb>
	);
}

function SamplePagination() {
	const [page, setPage] = createSignal(1);
	return <SolidUI.Pagination totalPages={5} page={page()} onPageChange={setPage} />;
}

function SampleSteps() {
	return (
		<SolidUI.Steps current={1} class="w-full">
			<SolidUI.Step index={0} title="Cart" description="Items selected" />
			<SolidUI.Step index={1} title="Checkout" description="Payment details" />
			<SolidUI.Step index={2} title="Complete" description="Order placed" />
		</SolidUI.Steps>
	);
}

function SampleTimeline() {
	return (
		<SolidUI.Timeline class="w-full text-left">
			<SolidUI.TimelineItem title="Order placed" description="Your order has been received." time="2h ago" />
			<SolidUI.TimelineItem title="Shipped" description="Package is on its way to you." time="1h ago" />
		</SolidUI.Timeline>
	);
}

function SampleToggleGroup() {
	const [value, setValue] = createSignal<string[]>(["bold"]);
	return (
		<SolidUI.ToggleGroup type="multiple" value={value()} onValueChange={setValue}>
			<SolidUI.ToggleGroupItem value="bold">Bold</SolidUI.ToggleGroupItem>
			<SolidUI.ToggleGroupItem value="italic">Italic</SolidUI.ToggleGroupItem>
			<SolidUI.ToggleGroupItem value="underline">Underline</SolidUI.ToggleGroupItem>
		</SolidUI.ToggleGroup>
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
		<SolidUI.Chart
			height={80}
			data={[
				{ label: "Mon", value: 40 },
				{ label: "Tue", value: 70 },
				{ label: "Wed", value: 50 },
				{ label: "Thu", value: 90 },
				{ label: "Fri", value: 60 },
			]}
		/>
	);
}

function SampleCalendar() {
	return (
		<div class="w-full overflow-hidden">
			<SolidUI.Calendar />
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
		<SolidUI.Command
			items={[
				{ value: "profile", label: "Profile", shortcut: "⌘P" },
				{ value: "settings", label: "Settings", shortcut: "⌘," },
				{ value: "logout", label: "Log out" },
			]}
			class="max-h-28"
		/>
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

function SampleDialog() {
	const [open, setOpen] = createSignal(false);
	return (
		<>
			<SolidUI.Button onClick={() => setOpen(true)} size="sm">
				Open Dialog
			</SolidUI.Button>
			<SolidUI.Dialog open={open()} onOpenChange={setOpen} title="Dialog" description="A sample dialog.">
				<p class="text-sm text-foreground">Dialog content goes here.</p>
			</SolidUI.Dialog>
		</>
	);
}

function SampleModal() {
	const [open, setOpen] = createSignal(false);
	return (
		<>
			<SolidUI.Button onClick={() => setOpen(true)} size="sm">
				Open Modal
			</SolidUI.Button>
			<SolidUI.Modal open={open()} onOpenChange={setOpen} title="Modal" description="A sample modal.">
				<p class="text-sm text-foreground">Modal content goes here.</p>
			</SolidUI.Modal>
		</>
	);
}

function SampleDrawer() {
	const [open, setOpen] = createSignal(false);
	return (
		<>
			<SolidUI.Button onClick={() => setOpen(true)} size="sm">
				Open Drawer
			</SolidUI.Button>
			<SolidUI.Drawer open={open()} onOpenChange={setOpen} title="Drawer" description="A sample drawer.">
				<p class="text-sm text-foreground">Drawer content goes here.</p>
			</SolidUI.Drawer>
		</>
	);
}

function SampleSheet() {
	const [open, setOpen] = createSignal(false);
	return (
		<>
			<SolidUI.Button onClick={() => setOpen(true)} size="sm">
				Open Sheet
			</SolidUI.Button>
			<SolidUI.Sheet open={open()} onOpenChange={setOpen} title="Sheet" description="A sample sheet.">
				<p class="text-sm text-foreground">Sheet content goes here.</p>
			</SolidUI.Sheet>
		</>
	);
}

function SamplePopover() {
	const [open, setOpen] = createSignal(false);
	return (
		<SolidUI.Popover
			open={open()}
			onOpenChange={setOpen}
			content={<p class="text-sm text-foreground">Popover content.</p>}
		>
			<SolidUI.Button onClick={() => setOpen(!open())} size="sm">
				Toggle Popover
			</SolidUI.Button>
		</SolidUI.Popover>
	);
}

function SampleTooltip() {
	const [open, setOpen] = createSignal(false);
	return (
		<SolidUI.Tooltip open={open()} content="Tooltip text">
			<SolidUI.Button
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				size="sm"
			>
				Hover me
			</SolidUI.Button>
		</SolidUI.Tooltip>
	);
}

function SampleToaster() {
	return (
		<>
			<SolidUI.Button
				onClick={() =>
					SolidUI.addToast({
						title: "Sample toast",
						description: "Pushed from preview.",
						variant: "success",
					})
				}
				size="sm"
			>
				Push Toast
			</SolidUI.Button>
			<SolidUI.Toaster />
		</>
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

	if (overlay.has(props.name)) {
		switch (props.name) {
			case "Dialog":
				return <SampleDialog />;
			case "Modal":
				return <SampleModal />;
			case "Drawer":
				return <SampleDrawer />;
			case "Sheet":
				return <SampleSheet />;
			case "Popover":
				return <SamplePopover />;
			case "Tooltip":
				return <SampleTooltip />;
			default:
				return (
					<SolidUI.Button variant="secondary" size="sm">
						{props.name}
					</SolidUI.Button>
				);
		}
	}

	if (feedback.has(props.name)) {
		switch (props.name) {
			case "Alert":
				return (
					<SolidUI.Alert title="Heads up" variant="info" class="w-full text-left">
						This is a preview alert.
					</SolidUI.Alert>
				);
			case "Notification":
				return (
					<SolidUI.Notification title="Update" variant="success" class="w-full text-left">
						Changes saved successfully.
					</SolidUI.Notification>
				);
			case "Toast":
				return <SolidUI.Toast title="Sample toast" description="A real toast message." onClose={() => {}} />;
			case "Toaster":
				return <SampleToaster />;
			case "Loading":
				return <SolidUI.Loading class="h-6 w-6" />;
			case "Spinner":
				return <SolidUI.Spinner class="h-6 w-6" />;
			case "Skeleton":
				return <SolidUI.Skeleton class="h-2 w-24" />;
			case "Progress":
				return <SolidUI.Progress value={60} max={100} class="w-24" />;
			default:
				return <SampleLoading />;
		}
	}

	if (layout.has(props.name)) return <SampleBlocks />;
	if (nav.has(props.name)) {
		switch (props.name) {
			case "Tabs":
				return <SampleTabs />;
			case "Breadcrumb":
				return <SampleBreadcrumb />;
			case "Pagination":
				return <SamplePagination />;
			case "Steps":
				return <SampleSteps />;
			case "Timeline":
				return <SampleTimeline />;
			case "ToggleGroup":
				return <SampleToggleGroup />;
			default:
				return <SampleNav />;
		}
	}
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

	if (interactive.has(props.name)) {
		return (
			<div class={previewClass}>
				<PreviewContent name={props.name} tag={props.tag} />
			</div>
		);
	}

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
