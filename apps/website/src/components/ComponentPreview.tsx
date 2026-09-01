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
	"Button",
	"Spinner",
	"Skeleton",
	"Loading",
	"Progress",
	"Separator",
	"Kbd",
	"Code",
	"Blockquote",
	"List",
	"ListItem",
	"VisuallyHidden",
	"ProgressCircle",
	"Meter",
	"Stat",
	"SkeletonText",
]);

const previewClass =
	"flex h-20 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background p-3 text-sm";

const overlay = new Set(["Dialog", "Modal", "Drawer", "Sheet", "Popover", "Tooltip", "DropdownMenu"]);
const feedback = new Set(["Alert", "Notification", "Toast", "Toaster", "Loading", "Spinner", "Skeleton", "Progress"]);
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

function SampleAlertDialog() {
	const [open, setOpen] = createSignal(false);
	return (
		<>
			<SolidUI.Button onClick={() => setOpen(true)} size="sm">
				Open Alert
			</SolidUI.Button>
			<SolidUI.AlertDialog
				open={open()}
				onOpenChange={setOpen}
				title="Confirm action"
				description="This is a sample alert dialog."
				onConfirm={() => setOpen(false)}
				onCancel={() => setOpen(false)}
			/>
		</>
	);
}

function SampleHoverCard() {
	return (
		<SolidUI.HoverCard content={<p class="text-sm text-foreground">Hover card content.</p>}>
			<SolidUI.Button size="sm">Hover me</SolidUI.Button>
		</SolidUI.HoverCard>
	);
}

function SampleContextMenu() {
	return (
		<SolidUI.ContextMenu items={[{ label: "Edit" }, { label: "Copy" }, { label: "Delete" }]}>
			<SolidUI.Button variant="secondary" size="sm">
				Right-click me
			</SolidUI.Button>
		</SolidUI.ContextMenu>
	);
}

function SampleCheckboxGroup() {
	const [value, setValue] = createSignal<string[]>(["a"]);
	return (
		<SolidUI.CheckboxGroup
			options={[
				{ value: "a", label: "Alpha" },
				{ value: "b", label: "Beta" },
			]}
			value={value()}
			onChange={setValue}
		/>
	);
}

function SampleCombobox() {
	const [value, setValue] = createSignal("");
	return (
		<SolidUI.Combobox
			options={[
				{ value: "a", label: "Alpha" },
				{ value: "b", label: "Beta" },
			]}
			value={value()}
			onChange={setValue}
			class="w-full"
		/>
	);
}

function SampleMultiSelect() {
	const [value, setValue] = createSignal<string[]>(["a"]);
	return (
		<SolidUI.MultiSelect
			options={[
				{ value: "a", label: "Alpha" },
				{ value: "b", label: "Beta" },
			]}
			value={value()}
			onChange={setValue}
			class="w-full"
		/>
	);
}

function SampleRadioGroup() {
	const [value, setValue] = createSignal("a");
	return (
		<SolidUI.RadioGroup
			name="sample-radio"
			options={[
				{ value: "a", label: "Alpha" },
				{ value: "b", label: "Beta" },
			]}
			value={value()}
			onChange={setValue}
		/>
	);
}

function SampleTagsInput() {
	const [value, setValue] = createSignal<string[]>(["solid"]);
	return <SolidUI.TagsInput value={value()} onChange={setValue} class="w-full" />;
}

function SamplePinInput() {
	const [value, setValue] = createSignal("");
	return <SolidUI.PinInput length={3} value={value()} onChange={setValue} class="w-full justify-center" />;
}

function SampleSkeletonCircle() {
	return <SolidUI.SkeletonCircle size={40} />;
}

function SampleBox(C: AnyComp) {
	return (
		<C class={previewClass}>
			<div class="h-8 w-8 rounded bg-primary" />
		</C>
	);
}

function SampleCard(C: AnyComp) {
	return (
		<C class="w-full text-left">
			<SolidUI.CardHeader>
				<h4 class="text-sm font-semibold">Card title</h4>
				<p class="text-xs text-muted-foreground">Card description</p>
			</SolidUI.CardHeader>
			<SolidUI.CardContent>
				<p class="text-xs text-muted-foreground">Card content area.</p>
			</SolidUI.CardContent>
			<SolidUI.CardFooter>
				<SolidUI.Button variant="secondary" size="sm">
					Action
				</SolidUI.Button>
			</SolidUI.CardFooter>
		</C>
	);
}

function SampleStack(C: AnyComp) {
	return (
		<C direction="horizontal" gap={8} align="center" justify="center" class={previewClass}>
			<div class="h-6 w-6 rounded bg-primary" />
			<div class="h-6 w-6 rounded bg-secondary" />
			<div class="h-6 w-6 rounded bg-accent" />
		</C>
	);
}

function SampleFlex(C: AnyComp) {
	return (
		<C gap={8} align="center" justify="center" wrap class={previewClass}>
			<div class="h-6 w-6 rounded bg-primary" />
			<div class="h-6 w-6 rounded bg-secondary" />
			<div class="h-6 w-6 rounded bg-accent" />
		</C>
	);
}

function SampleGrid(C: AnyComp) {
	return (
		<C columns={3} gap={4} class={previewClass}>
			<div class="h-6 w-full rounded bg-primary" />
			<div class="h-6 w-full rounded bg-secondary" />
			<div class="h-6 w-full rounded bg-accent" />
			<div class="h-6 w-full rounded bg-primary" />
		</C>
	);
}

function SampleAspectRatio(C: AnyComp) {
	return (
		<C ratio={16 / 9} class="w-32">
			<div class="h-full w-full rounded-md bg-primary" />
		</C>
	);
}

function SampleScrollArea(C: AnyComp) {
	return (
		<C class={previewClass}>
			<div class="h-24 w-48 space-y-2 text-left text-xs text-muted-foreground">
				<p>Line one of scrolling content.</p>
				<p>Line two of scrolling content.</p>
				<p>Line three of scrolling content.</p>
				<p>Line four of scrolling content.</p>
			</div>
		</C>
	);
}

function SampleResizable(C: AnyComp) {
	const [sizes, setSizes] = createSignal<number[]>([40, 60]);
	return (
		<C direction="horizontal" onResize={setSizes} class="h-24 w-full" style={{ height: "96px" }}>
			<SolidUI.ResizablePanel defaultSize={sizes()[0]} class="flex items-center justify-center text-xs">
				Panel A
			</SolidUI.ResizablePanel>
			<SolidUI.ResizableHandle />
			<SolidUI.ResizablePanel defaultSize={sizes()[1]} class="flex items-center justify-center text-xs">
				Panel B
			</SolidUI.ResizablePanel>
		</C>
	);
}

function SampleVirtualList(C: AnyComp) {
	return (
		<C
			itemCount={1000}
			itemHeight={28}
			renderItem={(index: number) => <div class="px-2 text-xs text-muted-foreground">Item {index + 1}</div>}
			class={previewClass}
			height={80}
			overscan={5}
		/>
	);
}

function SampleTransition(C: AnyComp) {
	const [show, setShow] = createSignal(true);
	return (
		<div class="flex items-center gap-2">
			<C show={show()} enter="opacity-100 translate-y-0" exit="opacity-0 -translate-y-2" duration={300}>
				<div class="h-8 w-8 rounded bg-primary" />
			</C>
			<SolidUI.Button variant="secondary" size="sm" onClick={() => setShow(!show())}>
				Toggle
			</SolidUI.Button>
		</div>
	);
}

function SampleCollapsible(C: AnyComp) {
	return (
		<C open class="w-full text-left">
			<SolidUI.CollapsibleTrigger>Toggle</SolidUI.CollapsibleTrigger>
			<SolidUI.CollapsibleContent>
				<p class="py-2 text-xs text-muted-foreground">Collapsible content.</p>
			</SolidUI.CollapsibleContent>
		</C>
	);
}

function SampleTable(C: AnyComp) {
	return (
		<C class="w-full text-left text-xs">
			<thead>
				<tr class="border-b border-border text-muted-foreground">
					<th class="pb-1 font-medium">Name</th>
					<th class="pb-1 font-medium">Role</th>
				</tr>
			</thead>
			<tbody>
				<tr class="text-foreground">
					<td class="py-1">Alice</td>
					<td class="py-1">Admin</td>
				</tr>
				<tr class="text-foreground">
					<td class="py-1">Bob</td>
					<td class="py-1">Editor</td>
				</tr>
			</tbody>
		</C>
	);
}

function SampleDataTable(C: AnyComp) {
	type Person = { name: string; role: string; status: string };
	const tableData: Person[] = [
		{ name: "Alice", role: "Admin", status: "Active" },
		{ name: "Bob", role: "Editor", status: "Away" },
		{ name: "Carol", role: "Viewer", status: "Active" },
		{ name: "Dave", role: "Editor", status: "Offline" },
		{ name: "Eve", role: "Admin", status: "Active" },
	];
	const columns = [
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "role", header: "Role" },
		{ accessorKey: "status", header: "Status" },
	];
	return <C data={tableData} columns={columns as unknown[]} pageSize={3} sortable paginate class="w-full text-xs" />;
}

function SampleMenubar(C: AnyComp) {
	const [value, setValue] = createSignal("file");
	return (
		<C value={value()} onValueChange={setValue} class={previewClass}>
			<SolidUI.MenubarMenu value="file">
				<SolidUI.MenubarTrigger>File</SolidUI.MenubarTrigger>
				<SolidUI.MenubarContent>
					<SolidUI.MenubarItem>New</SolidUI.MenubarItem>
					<SolidUI.MenubarItem>Open</SolidUI.MenubarItem>
				</SolidUI.MenubarContent>
			</SolidUI.MenubarMenu>
			<SolidUI.MenubarMenu value="edit">
				<SolidUI.MenubarTrigger>Edit</SolidUI.MenubarTrigger>
				<SolidUI.MenubarContent>
					<SolidUI.MenubarItem>Cut</SolidUI.MenubarItem>
					<SolidUI.MenubarItem>Copy</SolidUI.MenubarItem>
				</SolidUI.MenubarContent>
			</SolidUI.MenubarMenu>
		</C>
	);
}

function SampleNavigationMenu(C: AnyComp) {
	const [value, setValue] = createSignal("products");
	return (
		<C value={value()} onValueChange={setValue} class={previewClass}>
			<SolidUI.NavigationMenuItem value="products">
				<SolidUI.NavigationMenuTrigger>Products</SolidUI.NavigationMenuTrigger>
				<SolidUI.NavigationMenuContent>
					<p class="text-xs text-muted-foreground">Product listing.</p>
				</SolidUI.NavigationMenuContent>
			</SolidUI.NavigationMenuItem>
			<SolidUI.NavigationMenuItem value="docs">
				<SolidUI.NavigationMenuTrigger>Docs</SolidUI.NavigationMenuTrigger>
				<SolidUI.NavigationMenuContent>
					<p class="text-xs text-muted-foreground">Documentation links.</p>
				</SolidUI.NavigationMenuContent>
			</SolidUI.NavigationMenuItem>
		</C>
	);
}

function SampleDropdownMenu(C: AnyComp) {
	const [open, setOpen] = createSignal(false);
	return (
		<C open={open()} onOpenChange={setOpen}>
			<SolidUI.DropdownMenuTrigger>
				<SolidUI.Button variant="secondary" size="sm" onClick={() => setOpen(!open())}>
					Open Menu
				</SolidUI.Button>
			</SolidUI.DropdownMenuTrigger>
			<SolidUI.DropdownMenuContent>
				<SolidUI.DropdownMenuItem onClick={() => setOpen(false)}>Profile</SolidUI.DropdownMenuItem>
				<SolidUI.DropdownMenuItem onClick={() => setOpen(false)}>Settings</SolidUI.DropdownMenuItem>
				<SolidUI.DropdownMenuSeparator />
				<SolidUI.DropdownMenuItem onClick={() => setOpen(false)}>Log out</SolidUI.DropdownMenuItem>
			</SolidUI.DropdownMenuContent>
		</C>
	);
}

function SampleTreeView(C: AnyComp) {
	return (
		<C class="w-full text-left text-xs">
			<SolidUI.TreeItem label="src" defaultExpanded>
				<SolidUI.TreeItem label="components" defaultExpanded>
					<SolidUI.TreeItem label="Button.tsx" />
					<SolidUI.TreeItem label="Input.tsx" />
				</SolidUI.TreeItem>
				<SolidUI.TreeItem label="index.ts" />
			</SolidUI.TreeItem>
		</C>
	);
}

function PreviewContent(C: AnyComp, name: string, tag: string) {
	if (selfClosing.has(name)) {
		return <div class={previewClass}>{renderSelfClosing(C, name)}</div>;
	}

	const category = findCategory(name)?.id;

	switch (category) {
		case "templates":
			if (name === "Table") return SampleTable(C);
			if (name === "DataTable") return SampleDataTable(C);
			if (name === "Image") return null;
			if (name === "Form") return <SampleForm />;
			if (name === "Transition") return SampleTransition(C);
			return <SampleList />;
		case "primitives":
			if (name === "Button") return renderSelfClosing(C, name);
			if (name === "CheckboxGroup") return <SampleCheckboxGroup />;
			if (name === "Combobox") return <SampleCombobox />;
			if (name === "MultiSelect") return <SampleMultiSelect />;
			if (name === "PinInput") return <SamplePinInput />;
			if (name === "RadioGroup") return <SampleRadioGroup />;
			if (name === "TagsInput") return <SampleTagsInput />;
			return <SampleForm />;
		default:
			break;
	}

	if (name === "Accordion") return <SampleAccordion />;
	if (name === "Terminal") return <SampleTerminal />;
	if (name === "Motion") return <SampleMotion />;

	if (name === "AlertDialog") return <SampleAlertDialog />;
	if (name === "HoverCard") return <SampleHoverCard />;
	if (name === "ContextMenu") return <SampleContextMenu />;
	if (name === "SkeletonCircle") return <SampleSkeletonCircle />;

	if (overlay.has(name)) {
		switch (name) {
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
			case "DropdownMenu":
				return SampleDropdownMenu(C);
			default:
				return (
					<SolidUI.Button variant="secondary" size="sm">
						{name}
					</SolidUI.Button>
				);
		}
	}

	if (feedback.has(name)) {
		switch (name) {
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
			default:
				return (
					<div class={previewClass}>
						<SampleBlocks />
					</div>
				);
		}
	}

	if (layout.has(name)) {
		switch (name) {
			case "Box":
				return SampleBox(C);
			case "Card":
				return SampleCard(C);
			case "Stack":
				return SampleStack(C);
			case "Flex":
				return SampleFlex(C);
			case "Grid":
				return SampleGrid(C);
			case "AspectRatio":
				return SampleAspectRatio(C);
			case "ScrollArea":
				return SampleScrollArea(C);
			case "Resizable":
				return SampleResizable(C);
			case "VirtualList":
				return SampleVirtualList(C);
			case "Transition":
				return SampleTransition(C);
			case "Collapsible":
				return SampleCollapsible(C);
			case "Separator":
				return <C class="w-24" />;
			default:
				return (
					<C class={previewClass}>
						<SampleBlocks />
					</C>
				);
		}
	}

	if (nav.has(name)) {
		switch (name) {
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
			case "Menubar":
				return SampleMenubar(C);
			case "NavigationMenu":
				return SampleNavigationMenu(C);
			case "TreeView":
				return SampleTreeView(C);
			default:
				return <SampleNav />;
		}
	}

	if (form.has(name)) return <SampleForm />;

	if (data.has(name)) {
		if (name === "Chart") return <SampleChart />;
		if (name === "Calendar") return <SampleCalendar />;
		if (name === "Table") return SampleTable(C);
		if (name === "DataTable") return SampleDataTable(C);
		return <SampleCommand />;
	}

	return <PreviewFallback name={name} tag={tag} />;
}

const selfClosingRenderers: Record<string, (C: AnyComp, name: string) => JSX.Element> = {
	Image: (C) => (
		<C src={PREVIEW_IMAGE_SMALL_SRC} alt="Preview" fallback="IMG" class="h-16 w-24 rounded-md object-cover" />
	),
	Avatar: (C) => <C src={PREVIEW_IMAGE_TINY_SRC} alt="A" fallback="A" class="h-8 w-8" />,
	Badge: (C, name) => <C>{name}</C>,
	Button: (C) => (
		<C variant="primary" size="sm">
			Button
		</C>
	),
	Input: (C) => {
		const [value, setValue] = createSignal("");
		return <C value={value()} onChange={setValue} placeholder="Input" />;
	},
	Textarea: (C) => {
		const [value, setValue] = createSignal("");
		return <C value={value()} onChange={setValue} placeholder="Textarea" />;
	},
	Checkbox: (C) => {
		const [checked, setChecked] = createSignal(false);
		return <C checked={checked()} onChange={setChecked} aria-label="Preview checkbox" />;
	},
	Radio: (C) => {
		const [checked, setChecked] = createSignal(false);
		return <C checked={checked()} onClick={() => setChecked(!checked())} value="preview" aria-label="Preview radio" />;
	},
	Switch: (C) => {
		const [checked, setChecked] = createSignal(false);
		return <C checked={checked()} onChange={setChecked} aria-label="Preview switch" />;
	},
	Toggle: (C) => {
		const [pressed, setPressed] = createSignal(false);
		return <C pressed={pressed()} onPressedChange={setPressed} value="Toggle" aria-label="Preview toggle" />;
	},
	Slider: (C) => {
		const [value, setValue] = createSignal(40);
		return <C min={0} max={100} step={1} value={value()} onChange={setValue} aria-label="Preview slider" />;
	},
	Select: (C) => {
		const [value, setValue] = createSignal("option-1");
		return (
			<C value={value()} onChange={setValue} aria-label="Preview select">
				<option value="option-1">Option 1</option>
				<option value="option-2">Option 2</option>
			</C>
		);
	},
	Progress: (C) => <C value={60} max={100} />,
	Skeleton: (C) => <C class="h-2 w-24" />,
	Spinner: (C) => <C class="h-5 w-5" />,
	Loading: (C) => <C class="h-5 w-5" />,
	Separator: (C) => <C class="w-24" />,
	FileInput: (C) => {
		const [, setFiles] = createSignal<File[]>([]);
		return <C multiple onChange={setFiles} aria-label="Preview file input" />;
	},
	DatePicker: (C) => {
		const [value, setValue] = createSignal("");
		return <C value={value()} onChange={setValue} aria-label="Preview date picker" />;
	},
	Kbd: (C) => <C>⌘K</C>,
	Code: (C) => <C>npm install</C>,
	Blockquote: (C) => <C citation="Docs">Build accessible UIs with solid-ui.</C>,
	List: (C) => (
		<C class="w-full text-left">
			<SolidUI.ListItem>First item</SolidUI.ListItem>
			<SolidUI.ListItem>Second item</SolidUI.ListItem>
		</C>
	),
	ListItem: (C) => <C>A list item</C>,
	VisuallyHidden: (C) => (
		<div class="flex items-center gap-2">
			<C>Hidden text</C>
			<span class="text-xs text-muted-foreground">Visually hidden</span>
		</div>
	),
	ProgressCircle: (C) => <C value={60} max={100} size={48} stroke={4} />,
	Meter: (C) => <C value={70} max={100} low={30} high={80} optimum={90} />,
	Stat: (C) => <C label="Revenue" value="$12k" helpText="vs last month" trend={12} />,
	SkeletonText: (C) => <C lines={3} class="w-32" />,
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

	return PreviewContent(AnyC, props.name, props.tag);
}
