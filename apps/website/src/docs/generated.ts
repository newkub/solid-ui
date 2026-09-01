// Auto-generated docs content — do not edit manually
export interface DocPage {
	title: string;
	group: string;
	order: number;
	content: string;
}
export const docs: Record<string, DocPage> = {
	intro: {
		title: "Introduction",
		group: "getting-started",
		order: 0,
		content:
			"# Introduction\n\n**solid-ui** is a comprehensive, accessible SolidJS component library built for Cloudflare Workers and real-world applications.\n\nIt ships with:\n\n- 60+ reusable UI components\n- Form, table, image, and transition utilities\n- An MCP server for component discovery\n- A CLI for listing and generating component templates\n- Dark mode and responsive design out of the box\n\nThis site is the documentation and showcase for solid-ui. Use the sidebar to navigate through primitives, components, templates, theming, and integrations.\n",
	},
	installation: {
		title: "Installation",
		group: "getting-started",
		order: 1,
		content:
			'# Installation\n\nsolid-ui is organized as a Bun monorepo. Install the website dependencies and build with:\n\n```bash\nbun install\nbun run build\n```\n\nImport components from the workspace package:\n\n```tsx\nimport { Button, Card } from "@wrikka/solid-ui";\n```\n',
	},
	theme: {
		title: "Theming",
		group: "theming",
		order: 0,
		content:
			'# Theming\n\nsolid-ui uses CSS custom properties for theming. Toggle dark mode with the sun/moon button in the header.\n\n## CSS variables\n\n```css\n:root {\n\t--su-bg: #f8fafc;\n\t--su-surface: #ffffff;\n\t--su-text: #0f172a;\n\t--su-text-muted: #64748b;\n\t--su-border: #e2e8f0;\n\t--su-primary: #0f172a;\n\t--su-primary-text: #ffffff;\n\t--su-radius: 0.5rem;\n}\n```\n\nDark mode is activated by setting `data-theme="dark"` on `<html>`.\n',
	},
	mcp: {
		title: "MCP Server",
		group: "integrations",
		order: 0,
		content:
			"# MCP Server\n\nThe solid-ui MCP server exposes component discovery and template generation tools.\n\n## Start\n\n```bash\nbun run --filter @wrikka/mcp start\n```\n\n## Tools\n\n- `list_components` — list all components in the registry\n- `show_component` — show metadata for a component\n- `generate_component` — generate a Solid component template\n",
	},
	cli: {
		title: "CLI",
		group: "integrations",
		order: 1,
		content:
			"# CLI\n\nThe solid-ui CLI lists, inspects, and generates component templates.\n\n## Commands\n\n```bash\nbun run --filter @wrikka/cli start list\nbun run --filter @wrikka/cli start show Button\nbun run --filter @wrikka/cli start add MyComponent div\n```\n",
	},
	primitives: {
		title: "Primitives",
		group: "primitives",
		order: 0,
		content:
			"# Primitives\n\nThe following primitives are available in solid-ui:\n\n- [Button](/docs/primitives/button)\n- [Input](/docs/primitives/input)\n- [Textarea](/docs/primitives/textarea)\n- [Select](/docs/primitives/select)\n- [Checkbox](/docs/primitives/checkbox)\n- [Radio](/docs/primitives/radio)\n- [Switch](/docs/primitives/switch)\n- [Label](/docs/primitives/label)\n- [Form](/docs/primitives/form)\n- [FormField](/docs/primitives/formfield)\n- [FileInput](/docs/primitives/fileinput)\n- [Slider](/docs/primitives/slider)\n- [DatePicker](/docs/primitives/datepicker)\n",
	},
	"primitives/button": {
		title: "Button",
		group: "primitives",
		order: 1,
		content:
			'# Button\n\nRenders a `<button>` element.\n\n## Usage\n\n```tsx\nimport { Button } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Button class="my-button">Button content</Button>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<button>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/input": {
		title: "Input",
		group: "primitives",
		order: 1,
		content:
			'# Input\n\nRenders a `<input>` element.\n\n## Usage\n\n```tsx\nimport { Input } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Input class="my-input" />;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<input>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/textarea": {
		title: "Textarea",
		group: "primitives",
		order: 1,
		content:
			'# Textarea\n\nRenders a `<textarea>` element.\n\n## Usage\n\n```tsx\nimport { Textarea } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Textarea class="my-textarea">Textarea content</Textarea>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<textarea>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/select": {
		title: "Select",
		group: "primitives",
		order: 1,
		content:
			'# Select\n\nRenders a `<select>` element.\n\n## Usage\n\n```tsx\nimport { Select } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Select class="my-select">Select content</Select>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<select>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/checkbox": {
		title: "Checkbox",
		group: "primitives",
		order: 1,
		content:
			'# Checkbox\n\nRenders a `<input>` element.\n\n## Usage\n\n```tsx\nimport { Checkbox } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Checkbox class="my-checkbox" />;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<input>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/radio": {
		title: "Radio",
		group: "primitives",
		order: 1,
		content:
			'# Radio\n\nRenders a `<input>` element.\n\n## Usage\n\n```tsx\nimport { Radio } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Radio class="my-radio" />;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<input>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/switch": {
		title: "Switch",
		group: "primitives",
		order: 1,
		content:
			'# Switch\n\nRenders a `<button>` element.\n\n## Usage\n\n```tsx\nimport { Switch } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Switch class="my-switch">Switch content</Switch>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<button>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/label": {
		title: "Label",
		group: "primitives",
		order: 1,
		content:
			'# Label\n\nRenders a `<label>` element.\n\n## Usage\n\n```tsx\nimport { Label } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Label class="my-label">Label content</Label>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<label>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/form": {
		title: "Form",
		group: "primitives",
		order: 1,
		content:
			'# Form\n\nRenders a `<form>` element.\n\n## Usage\n\n```tsx\nimport { Form } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Form class="my-form">Form content</Form>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<form>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/formfield": {
		title: "FormField",
		group: "primitives",
		order: 1,
		content:
			'# FormField\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { FormField } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <FormField class="my-formfield">FormField content</FormField>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/fileinput": {
		title: "FileInput",
		group: "primitives",
		order: 1,
		content:
			'# FileInput\n\nRenders a `<input>` element.\n\n## Usage\n\n```tsx\nimport { FileInput } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <FileInput class="my-fileinput" />;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<input>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/slider": {
		title: "Slider",
		group: "primitives",
		order: 1,
		content:
			'# Slider\n\nRenders a `<input>` element.\n\n## Usage\n\n```tsx\nimport { Slider } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Slider class="my-slider" />;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<input>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/datepicker": {
		title: "DatePicker",
		group: "primitives",
		order: 1,
		content:
			'# DatePicker\n\nRenders a `<input>` element.\n\n## Usage\n\n```tsx\nimport { DatePicker } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <DatePicker class="my-datepicker" />;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<input>`\n- Accepts `class` for custom styling\n',
	},
	components: {
		title: "Components",
		group: "components",
		order: 0,
		content:
			"# Components\n\nThe following components are available in solid-ui:\n\n- [Card](/docs/components/card)\n- [Box](/docs/components/box)\n- [Flex](/docs/components/flex)\n- [Grid](/docs/components/grid)\n- [Stack](/docs/components/stack)\n- [Separator](/docs/components/separator)\n- [AspectRatio](/docs/components/aspectratio)\n- [Skeleton](/docs/components/skeleton)\n- [Spinner](/docs/components/spinner)\n- [Loading](/docs/components/loading)\n- [Progress](/docs/components/progress)\n- [Avatar](/docs/components/avatar)\n- [Badge](/docs/components/badge)\n- [Breadcrumb](/docs/components/breadcrumb)\n- [Tabs](/docs/components/tabs)\n- [Pagination](/docs/components/pagination)\n- [Steps](/docs/components/steps)\n- [Timeline](/docs/components/timeline)\n- [Menubar](/docs/components/menubar)\n- [NavigationMenu](/docs/components/navigationmenu)\n- [TreeView](/docs/components/treeview)\n- [Dialog](/docs/components/dialog)\n- [Modal](/docs/components/modal)\n- [Sheet](/docs/components/sheet)\n- [Drawer](/docs/components/drawer)\n- [Tooltip](/docs/components/tooltip)\n- [Popover](/docs/components/popover)\n- [Toast](/docs/components/toast)\n- [Toaster](/docs/components/toaster)\n- [Alert](/docs/components/alert)\n- [Command](/docs/components/command)\n- [CommandPalette](/docs/components/commandpalette)\n- [Notification](/docs/components/notification)\n- [Table](/docs/components/table)\n- [DataTable](/docs/components/datatable)\n- [VirtualList](/docs/components/virtuallist)\n- [ScrollArea](/docs/components/scrollarea)\n- [Image](/docs/components/image)\n- [Chart](/docs/components/chart)\n- [Calendar](/docs/components/calendar)\n- [Transition](/docs/components/transition)\n- [Collapsible](/docs/components/collapsible)\n- [Accordion](/docs/components/accordion)\n- [DropdownMenu](/docs/components/dropdownmenu)\n- [Toggle](/docs/components/toggle)\n- [ToggleGroup](/docs/components/togglegroup)\n- [Resizable](/docs/components/resizable)\n",
	},
	"components/card": {
		title: "Card",
		group: "components",
		order: 1,
		content:
			'# Card\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Card } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Card class="my-card">Card content</Card>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/box": {
		title: "Box",
		group: "components",
		order: 1,
		content:
			'# Box\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Box } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Box class="my-box">Box content</Box>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/flex": {
		title: "Flex",
		group: "components",
		order: 1,
		content:
			'# Flex\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Flex } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Flex class="my-flex">Flex content</Flex>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/grid": {
		title: "Grid",
		group: "components",
		order: 1,
		content:
			'# Grid\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Grid } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Grid class="my-grid">Grid content</Grid>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/stack": {
		title: "Stack",
		group: "components",
		order: 1,
		content:
			'# Stack\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Stack } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Stack class="my-stack">Stack content</Stack>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/separator": {
		title: "Separator",
		group: "components",
		order: 1,
		content:
			'# Separator\n\nRenders a `<hr>` element.\n\n## Usage\n\n```tsx\nimport { Separator } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Separator class="my-separator" />;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<hr>`\n- Accepts `class` for custom styling\n',
	},
	"components/aspectratio": {
		title: "AspectRatio",
		group: "components",
		order: 1,
		content:
			'# AspectRatio\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { AspectRatio } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <AspectRatio class="my-aspectratio">AspectRatio content</AspectRatio>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/skeleton": {
		title: "Skeleton",
		group: "components",
		order: 1,
		content:
			'# Skeleton\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Skeleton } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Skeleton class="my-skeleton">Skeleton content</Skeleton>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/spinner": {
		title: "Spinner",
		group: "components",
		order: 1,
		content:
			'# Spinner\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Spinner } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Spinner class="my-spinner">Spinner content</Spinner>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/loading": {
		title: "Loading",
		group: "components",
		order: 1,
		content:
			'# Loading\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Loading } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Loading class="my-loading">Loading content</Loading>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/progress": {
		title: "Progress",
		group: "components",
		order: 1,
		content:
			'# Progress\n\nRenders a `<progress>` element.\n\n## Usage\n\n```tsx\nimport { Progress } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Progress class="my-progress" />;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<progress>`\n- Accepts `class` for custom styling\n',
	},
	"components/avatar": {
		title: "Avatar",
		group: "components",
		order: 1,
		content:
			'# Avatar\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Avatar } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Avatar class="my-avatar">Avatar content</Avatar>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/badge": {
		title: "Badge",
		group: "components",
		order: 1,
		content:
			'# Badge\n\nRenders a `<span>` element.\n\n## Usage\n\n```tsx\nimport { Badge } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Badge class="my-badge">Badge content</Badge>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<span>`\n- Accepts `class` for custom styling\n',
	},
	"components/breadcrumb": {
		title: "Breadcrumb",
		group: "components",
		order: 1,
		content:
			'# Breadcrumb\n\nRenders a `<nav>` element.\n\n## Usage\n\n```tsx\nimport { Breadcrumb } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Breadcrumb class="my-breadcrumb">Breadcrumb content</Breadcrumb>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<nav>`\n- Accepts `class` for custom styling\n',
	},
	"components/tabs": {
		title: "Tabs",
		group: "components",
		order: 1,
		content:
			'# Tabs\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Tabs } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Tabs class="my-tabs">Tabs content</Tabs>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/pagination": {
		title: "Pagination",
		group: "components",
		order: 1,
		content:
			'# Pagination\n\nRenders a `<nav>` element.\n\n## Usage\n\n```tsx\nimport { Pagination } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Pagination class="my-pagination">Pagination content</Pagination>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<nav>`\n- Accepts `class` for custom styling\n',
	},
	"components/steps": {
		title: "Steps",
		group: "components",
		order: 1,
		content:
			'# Steps\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Steps } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Steps class="my-steps">Steps content</Steps>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/timeline": {
		title: "Timeline",
		group: "components",
		order: 1,
		content:
			'# Timeline\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Timeline } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Timeline class="my-timeline">Timeline content</Timeline>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/menubar": {
		title: "Menubar",
		group: "components",
		order: 1,
		content:
			'# Menubar\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Menubar } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Menubar class="my-menubar">Menubar content</Menubar>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/navigationmenu": {
		title: "NavigationMenu",
		group: "components",
		order: 1,
		content:
			'# NavigationMenu\n\nRenders a `<nav>` element.\n\n## Usage\n\n```tsx\nimport { NavigationMenu } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <NavigationMenu class="my-navigationmenu">NavigationMenu content</NavigationMenu>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<nav>`\n- Accepts `class` for custom styling\n',
	},
	"components/treeview": {
		title: "TreeView",
		group: "components",
		order: 1,
		content:
			'# TreeView\n\nRenders a `<ul>` element.\n\n## Usage\n\n```tsx\nimport { TreeView } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <TreeView class="my-treeview">TreeView content</TreeView>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<ul>`\n- Accepts `class` for custom styling\n',
	},
	"components/dialog": {
		title: "Dialog",
		group: "components",
		order: 1,
		content:
			'# Dialog\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Dialog } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Dialog class="my-dialog">Dialog content</Dialog>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/modal": {
		title: "Modal",
		group: "components",
		order: 1,
		content:
			'# Modal\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Modal } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Modal class="my-modal">Modal content</Modal>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/sheet": {
		title: "Sheet",
		group: "components",
		order: 1,
		content:
			'# Sheet\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Sheet } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Sheet class="my-sheet">Sheet content</Sheet>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/drawer": {
		title: "Drawer",
		group: "components",
		order: 1,
		content:
			'# Drawer\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Drawer } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Drawer class="my-drawer">Drawer content</Drawer>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/tooltip": {
		title: "Tooltip",
		group: "components",
		order: 1,
		content:
			'# Tooltip\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Tooltip } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Tooltip class="my-tooltip">Tooltip content</Tooltip>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/popover": {
		title: "Popover",
		group: "components",
		order: 1,
		content:
			'# Popover\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Popover } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Popover class="my-popover">Popover content</Popover>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/toast": {
		title: "Toast",
		group: "components",
		order: 1,
		content:
			'# Toast\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Toast } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Toast class="my-toast">Toast content</Toast>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/toaster": {
		title: "Toaster",
		group: "components",
		order: 1,
		content:
			'# Toaster\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Toaster } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Toaster class="my-toaster">Toaster content</Toaster>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/alert": {
		title: "Alert",
		group: "components",
		order: 1,
		content:
			'# Alert\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Alert } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Alert class="my-alert">Alert content</Alert>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/command": {
		title: "Command",
		group: "components",
		order: 1,
		content:
			'# Command\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Command } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Command class="my-command">Command content</Command>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/commandpalette": {
		title: "CommandPalette",
		group: "components",
		order: 1,
		content:
			'# CommandPalette\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { CommandPalette } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <CommandPalette class="my-commandpalette">CommandPalette content</CommandPalette>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/notification": {
		title: "Notification",
		group: "components",
		order: 1,
		content:
			'# Notification\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Notification } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Notification class="my-notification">Notification content</Notification>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/table": {
		title: "Table",
		group: "components",
		order: 1,
		content:
			'# Table\n\nRenders a `<table>` element.\n\n## Usage\n\n```tsx\nimport { Table } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Table class="my-table">Table content</Table>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<table>`\n- Accepts `class` for custom styling\n',
	},
	"components/datatable": {
		title: "DataTable",
		group: "components",
		order: 1,
		content:
			'# DataTable\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { DataTable } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <DataTable class="my-datatable">DataTable content</DataTable>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/virtuallist": {
		title: "VirtualList",
		group: "components",
		order: 1,
		content:
			'# VirtualList\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { VirtualList } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <VirtualList class="my-virtuallist">VirtualList content</VirtualList>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/scrollarea": {
		title: "ScrollArea",
		group: "components",
		order: 1,
		content:
			'# ScrollArea\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { ScrollArea } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <ScrollArea class="my-scrollarea">ScrollArea content</ScrollArea>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/image": {
		title: "Image",
		group: "components",
		order: 1,
		content:
			'# Image\n\nRenders a `<img>` element.\n\n## Usage\n\n```tsx\nimport { Image } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Image class="my-image" />;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<img>`\n- Accepts `class` for custom styling\n',
	},
	"components/chart": {
		title: "Chart",
		group: "components",
		order: 1,
		content:
			'# Chart\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Chart } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Chart class="my-chart">Chart content</Chart>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/calendar": {
		title: "Calendar",
		group: "components",
		order: 1,
		content:
			'# Calendar\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Calendar } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Calendar class="my-calendar">Calendar content</Calendar>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/transition": {
		title: "Transition",
		group: "components",
		order: 1,
		content:
			'# Transition\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Transition } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Transition class="my-transition">Transition content</Transition>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/collapsible": {
		title: "Collapsible",
		group: "components",
		order: 1,
		content:
			'# Collapsible\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Collapsible } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Collapsible class="my-collapsible">Collapsible content</Collapsible>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/accordion": {
		title: "Accordion",
		group: "components",
		order: 1,
		content:
			'# Accordion\n\nA vertically stacked set of expandable panels.\n\n## Usage\n\n```tsx\nimport { Accordion, AccordionItem } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn (\n\t\t<Accordion class="my-accordion">\n\t\t\t<AccordionItem title="Section one">\n\t\t\t\tFirst panel content.\n\t\t\t</AccordionItem>\n\t\t\t<AccordionItem title="Section two" defaultOpen>\n\t\t\t\tSecond panel content.\n\t\t\t</AccordionItem>\n\t\t</Accordion>\n\t);\n}\n```\n## Props\n\n- `Accordion` extends the standard JSX attributes for `<div>`\n- `AccordionItem` accepts `title`, `children`, and `defaultOpen`\n',
	},
	"components/dropdownmenu": {
		title: "DropdownMenu",
		group: "components",
		order: 1,
		content:
			'# DropdownMenu\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { DropdownMenu } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <DropdownMenu class="my-dropdownmenu">DropdownMenu content</DropdownMenu>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/toggle": {
		title: "Toggle",
		group: "components",
		order: 1,
		content:
			'# Toggle\n\nRenders a `<button>` element.\n\n## Usage\n\n```tsx\nimport { Toggle } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Toggle class="my-toggle">Toggle content</Toggle>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<button>`\n- Accepts `class` for custom styling\n',
	},
	"components/togglegroup": {
		title: "ToggleGroup",
		group: "components",
		order: 1,
		content:
			'# ToggleGroup\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { ToggleGroup } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <ToggleGroup class="my-togglegroup">ToggleGroup content</ToggleGroup>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/resizable": {
		title: "Resizable",
		group: "components",
		order: 1,
		content:
			'# Resizable\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Resizable } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Resizable class="my-resizable">Resizable content</Resizable>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	templates: {
		title: "Templates",
		group: "templates",
		order: 0,
		content:
			"# Templates\n\nThe following templates are available in solid-ui:\n\n- [Form](/docs/templates/form)\n- [Table](/docs/templates/table)\n- [Image](/docs/templates/image)\n- [Transitions](/docs/templates/transitions)\n",
	},
	"templates/form": {
		title: "Form template",
		group: "templates",
		order: 1,
		content:
			'# Form template\n\nUse `createTextField` from `@wrikka/form` to build a form field factory.\n\n```tsx\nimport { createTextField } from "@wrikka/solid-ui";\n\nfunction EmailField() {\n\tconst field = createTextField("email", "Email", { placeholder: "Enter your email" });\n\treturn (\n\t\t<FormField label={field.label}>\n\t\t\t<Input type="email" placeholder={field.placeholder} />\n\t\t</FormField>\n\t);\n}\n```\n',
	},
	"templates/table": {
		title: "Table template",
		group: "templates",
		order: 2,
		content:
			'# Table template\n\nUse `textColumn` from `@wrikka/table` to build typed columns.\n\n```tsx\nimport { textColumn } from "@wrikka/solid-ui";\n\nconst columns = [\n\ttextColumn("email", "Email"),\n\ttextColumn("name", "Name"),\n];\n```\n',
	},
	"templates/image": {
		title: "Image template",
		group: "templates",
		order: 3,
		content:
			'# Image template\n\nUse `buildIpxUrl` and `buildTransformString` from `@wrikka/image`.\n\n```tsx\nimport { buildIpxUrl, buildTransformString } from "@wrikka/solid-ui";\n\nconst transform = buildTransformString({ width: 400, format: "webp", quality: 80 });\nconst url = buildIpxUrl("https://example.com/photo.jpg", transform);\n```\n',
	},
	"templates/transitions": {
		title: "Transitions template",
		group: "templates",
		order: 4,
		content:
			'# Transitions template\n\nUse `buildCssTransition` and `mergeTransitionOptions` from `@wrikka/transitions`.\n\n```tsx\nimport { buildCssTransition, mergeTransitionOptions } from "@wrikka/solid-ui";\n\nconst css = buildCssTransition(mergeTransitionOptions({ duration: 300, easing: "ease-in-out" }));\n```\n',
	},
};
