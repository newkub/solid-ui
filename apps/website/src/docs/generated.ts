// Auto-generated docs content — do not edit manually
export interface DocPage {
	title: string;
	group: string;
	order: number;
	content: string;
}
export const docs: Record<string, DocPage> = {
	intro: {
		title: "Get started",
		group: "getting-started",
		order: 0,
		content:
			'# Get started\n\n**solid-ui** is a SolidJS design system that gives you typed, accessible, and themeable components without rebuilding the basics.\n\n## What you get\n\n- **60+ UI components** — from buttons and inputs to data tables, command palettes, and dialogs.\n- **Composable packages** — form, table, image, and transitions utilities for real-world use cases.\n- **MCP server** — discover components and generate snippets from any MCP client.\n- **CLI** — list, inspect, and scaffold new components from the terminal.\n- **Built-in theming** — switch light/dark mode, pick a color, and tune spacing/radius live.\n\n## Quick start\n\nInstall the workspace and run the docs site:\n\n```bash\nbun install\nbun run dev\n```\n\nImport a component:\n\n```tsx\nimport { Button } from "@wrikka/solid-ui";\n\nfunction App() {\n\treturn <Button>Get started</Button>;\n}\n```\n\nBrowse the [components](/components) gallery, read the [docs](/docs/intro), or customize the [theme](/theme) to see it in action.\n',
	},
	installation: {
		title: "Installation",
		group: "getting-started",
		order: 1,
		content:
			'# Installation\n\nsolid-ui is a Bun monorepo. Make sure you have [Bun](https://bun.sh) installed, then run:\n\n```bash\nbun install\nbun run build\n```\n\nImport components from the workspace package:\n\n```tsx\nimport { Button, Card } from "@wrikka/solid-ui";\n```\n',
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
			"# MCP Server\n\nThe solid-ui MCP server exposes component discovery and template generation tools.\n\n## Start\n\n```bash\nbun run --filter @wrikka/mcp start\n```\n\n## Tools\n\n- `list-components` — list every component in the registry with tag and description\n- `get-component` — get details, usage template, and import path for a component\n- `search-components` — search the registry by name, tag, or description\n- `count-components` — return the total number of components\n- `check-component-exists` — verify whether a component exists\n- `get-usage-snippet` — generate a SolidJS import and usage snippet\n",
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
			"# Primitives\n\nThe following primitives are available in solid-ui:\n\n- [Button](/docs/primitives/button)\n- [Input](/docs/primitives/input)\n- [Textarea](/docs/primitives/textarea)\n- [Select](/docs/primitives/select)\n- [Checkbox](/docs/primitives/checkbox)\n- [Radio](/docs/primitives/radio)\n- [Switch](/docs/primitives/switch)\n- [Label](/docs/primitives/label)\n- [Form](/docs/primitives/form)\n- [FormField](/docs/primitives/formfield)\n- [FileInput](/docs/primitives/fileinput)\n- [Slider](/docs/primitives/slider)\n- [DatePicker](/docs/primitives/datepicker)\n- [CheckboxGroup](/docs/primitives/checkboxgroup)\n- [Combobox](/docs/primitives/combobox)\n- [MultiSelect](/docs/primitives/multiselect)\n- [PinInput](/docs/primitives/pininput)\n- [RadioGroup](/docs/primitives/radiogroup)\n- [TagsInput](/docs/primitives/tagsinput)\n",
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
	"primitives/checkboxgroup": {
		title: "CheckboxGroup",
		group: "primitives",
		order: 1,
		content:
			'# CheckboxGroup\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { CheckboxGroup } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <CheckboxGroup class="my-checkboxgroup">CheckboxGroup content</CheckboxGroup>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/combobox": {
		title: "Combobox",
		group: "primitives",
		order: 1,
		content:
			'# Combobox\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Combobox } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Combobox class="my-combobox">Combobox content</Combobox>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/multiselect": {
		title: "MultiSelect",
		group: "primitives",
		order: 1,
		content:
			'# MultiSelect\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { MultiSelect } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <MultiSelect class="my-multiselect">MultiSelect content</MultiSelect>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/pininput": {
		title: "PinInput",
		group: "primitives",
		order: 1,
		content:
			'# PinInput\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { PinInput } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <PinInput class="my-pininput">PinInput content</PinInput>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/radiogroup": {
		title: "RadioGroup",
		group: "primitives",
		order: 1,
		content:
			'# RadioGroup\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { RadioGroup } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <RadioGroup class="my-radiogroup">RadioGroup content</RadioGroup>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"primitives/tagsinput": {
		title: "TagsInput",
		group: "primitives",
		order: 1,
		content:
			'# TagsInput\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { TagsInput } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <TagsInput class="my-tagsinput">TagsInput content</TagsInput>;\n}\n```\n\n## Variants\n\nMany primitive components accept a `class` prop. Higher-level components such as `Button` accept `variant` and `size`.\n\n```tsx\n<Button variant="primary" size="lg">Primary large</Button>\n<Button variant="ghost" size="sm">Ghost small</Button>\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	components: {
		title: "Components",
		group: "components",
		order: 0,
		content:
			"# Components\n\nThe following components are available in solid-ui:\n\n- [Card](/docs/components/card)\n- [Box](/docs/components/box)\n- [Flex](/docs/components/flex)\n- [Grid](/docs/components/grid)\n- [Stack](/docs/components/stack)\n- [Separator](/docs/components/separator)\n- [AspectRatio](/docs/components/aspectratio)\n- [Skeleton](/docs/components/skeleton)\n- [Spinner](/docs/components/spinner)\n- [Loading](/docs/components/loading)\n- [Progress](/docs/components/progress)\n- [Avatar](/docs/components/avatar)\n- [Badge](/docs/components/badge)\n- [Breadcrumb](/docs/components/breadcrumb)\n- [Tabs](/docs/components/tabs)\n- [Pagination](/docs/components/pagination)\n- [Steps](/docs/components/steps)\n- [Timeline](/docs/components/timeline)\n- [Menubar](/docs/components/menubar)\n- [NavigationMenu](/docs/components/navigationmenu)\n- [TreeView](/docs/components/treeview)\n- [Dialog](/docs/components/dialog)\n- [Modal](/docs/components/modal)\n- [Sheet](/docs/components/sheet)\n- [Drawer](/docs/components/drawer)\n- [Tooltip](/docs/components/tooltip)\n- [Popover](/docs/components/popover)\n- [Toast](/docs/components/toast)\n- [Toaster](/docs/components/toaster)\n- [Alert](/docs/components/alert)\n- [Command](/docs/components/command)\n- [CommandPalette](/docs/components/commandpalette)\n- [Notification](/docs/components/notification)\n- [Table](/docs/components/table)\n- [DataTable](/docs/components/datatable)\n- [VirtualList](/docs/components/virtuallist)\n- [ScrollArea](/docs/components/scrollarea)\n- [Image](/docs/components/image)\n- [Chart](/docs/components/chart)\n- [Calendar](/docs/components/calendar)\n- [Transition](/docs/components/transition)\n- [Collapsible](/docs/components/collapsible)\n- [Accordion](/docs/components/accordion)\n- [DropdownMenu](/docs/components/dropdownmenu)\n- [Toggle](/docs/components/toggle)\n- [ToggleGroup](/docs/components/togglegroup)\n- [Resizable](/docs/components/resizable)\n- [Terminal](/docs/components/terminal)\n- [Motion](/docs/components/motion)\n- [Kbd](/docs/components/kbd)\n- [Code](/docs/components/code)\n- [Blockquote](/docs/components/blockquote)\n- [List](/docs/components/list)\n- [ListItem](/docs/components/listitem)\n- [VisuallyHidden](/docs/components/visuallyhidden)\n- [ProgressCircle](/docs/components/progresscircle)\n- [Meter](/docs/components/meter)\n- [Stat](/docs/components/stat)\n- [SkeletonText](/docs/components/skeletontext)\n- [AlertDialog](/docs/components/alertdialog)\n- [HoverCard](/docs/components/hovercard)\n- [ContextMenu](/docs/components/contextmenu)\n- [SkeletonCircle](/docs/components/skeletoncircle)\n",
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
			'# Progress\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Progress } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Progress class="my-progress">Progress content</Progress>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
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
			'# Command\n\nA searchable list for command selection.\n\n## Usage\n\n```tsx\nimport { Command } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn (\n\t\t<Command\n\t\t\titems={[\n\t\t\t\t{ value: "profile", label: "Profile" },\n\t\t\t\t{ value: "settings", label: "Settings" },\n\t\t\t]}\n\t\t\tonSelect={(item) => void item.value}\n\t\t/>\n\t);\n}\n```\n\n## Props\n\n- `items` — array of { value, label, shortcut?, onSelect? }\n- `placeholder` — input placeholder\n- `emptyText` — message when no results match\n',
	},
	"components/commandpalette": {
		title: "CommandPalette",
		group: "components",
		order: 1,
		content:
			'# Command Palette\n\nA full-screen overlay with a searchable command list.\n\n## Usage\n\n```tsx\nimport { CommandPalette } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn (\n\t\t<CommandPalette\n\t\t\titems={[\n\t\t\t\t{ value: "home", label: "Go home" },\n\t\t\t\t{ value: "docs", label: "Open docs" },\n\t\t\t]}\n\t\t\tonSelect={(item) => void item.value}\n\t\t/>\n\t);\n}\n```\n\n## Props\n\n- `open` — controlled open state\n- `onOpenChange` — called when the overlay is toggled\n- Toggle with `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux)\n',
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
			'# Chart\n\nA simple bar chart for data visualization.\n\n## Usage\n\n```tsx\nimport { Chart } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn (\n\t\t<Chart\n\t\t\ttitle="Weekly views"\n\t\t\tdata={[\n\t\t\t\t{ label: "Mon", value: 40 },\n\t\t\t\t{ label: "Tue", value: 70 },\n\t\t\t]}\n\t\t/>\n\t);\n}\n```\n\n## Props\n\n- `data` — array of { label, value, color? }\n- `title` — optional chart title\n- `height` — bar area height in pixels\n',
	},
	"components/calendar": {
		title: "Calendar",
		group: "components",
		order: 1,
		content:
			'# Calendar\n\nA month grid with previous/next navigation.\n\n## Usage\n\n```tsx\nimport { Calendar } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Calendar value={new Date()} onChange={(date) => void date} />;\n}\n```\n\n## Props\n\n- `value` — selected date\n- `onChange` — called when a day is selected\n- Accepts `class` for custom styling\n',
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
			'# Accordion\n\nA vertically stacked set of expandable panels.\n\n## Usage\n\n```tsx\nimport { Accordion, AccordionItem } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn (\n\t\t<Accordion class="my-accordion">\n\t\t\t<AccordionItem title="Section one">\n\t\t\t\tFirst panel content.\n\t\t\t</AccordionItem>\n\t\t\t<AccordionItem title="Section two" defaultOpen>\n\t\t\t\tSecond panel content.\n\t\t\t</AccordionItem>\n\t\t</Accordion>\n\t);\n}\n```\n\n## Props\n\n- `Accordion` extends the standard JSX attributes for `<div>`\n- `AccordionItem` accepts `title`, `children`, and `defaultOpen`\n',
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
	"components/terminal": {
		title: "Terminal",
		group: "components",
		order: 1,
		content:
			'# Terminal\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Terminal } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Terminal class="my-terminal">Terminal content</Terminal>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/motion": {
		title: "Motion",
		group: "components",
		order: 1,
		content:
			'# Motion\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Motion } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Motion class="my-motion">Motion content</Motion>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/kbd": {
		title: "Kbd",
		group: "components",
		order: 1,
		content:
			'# Kbd\n\nRenders a `<kbd>` element.\n\n## Usage\n\n```tsx\nimport { Kbd } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Kbd class="my-kbd">Kbd content</Kbd>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<kbd>`\n- Accepts `class` for custom styling\n',
	},
	"components/code": {
		title: "Code",
		group: "components",
		order: 1,
		content:
			'# Code\n\nRenders a `<code>` element.\n\n## Usage\n\n```tsx\nimport { Code } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Code class="my-code">Code content</Code>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<code>`\n- Accepts `class` for custom styling\n',
	},
	"components/blockquote": {
		title: "Blockquote",
		group: "components",
		order: 1,
		content:
			'# Blockquote\n\nRenders a `<blockquote>` element.\n\n## Usage\n\n```tsx\nimport { Blockquote } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Blockquote class="my-blockquote">Blockquote content</Blockquote>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<blockquote>`\n- Accepts `class` for custom styling\n',
	},
	"components/list": {
		title: "List",
		group: "components",
		order: 1,
		content:
			'# List\n\nRenders a `<ul>` element.\n\n## Usage\n\n```tsx\nimport { List } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <List class="my-list">List content</List>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<ul>`\n- Accepts `class` for custom styling\n',
	},
	"components/listitem": {
		title: "ListItem",
		group: "components",
		order: 1,
		content:
			'# ListItem\n\nRenders a `<li>` element.\n\n## Usage\n\n```tsx\nimport { ListItem } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <ListItem class="my-listitem">ListItem content</ListItem>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<li>`\n- Accepts `class` for custom styling\n',
	},
	"components/visuallyhidden": {
		title: "VisuallyHidden",
		group: "components",
		order: 1,
		content:
			'# VisuallyHidden\n\nRenders a `<span>` element.\n\n## Usage\n\n```tsx\nimport { VisuallyHidden } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <VisuallyHidden class="my-visuallyhidden">VisuallyHidden content</VisuallyHidden>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<span>`\n- Accepts `class` for custom styling\n',
	},
	"components/progresscircle": {
		title: "ProgressCircle",
		group: "components",
		order: 1,
		content:
			'# ProgressCircle\n\nRenders a `<svg>` element.\n\n## Usage\n\n```tsx\nimport { ProgressCircle } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <ProgressCircle class="my-progresscircle">ProgressCircle content</ProgressCircle>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<svg>`\n- Accepts `class` for custom styling\n',
	},
	"components/meter": {
		title: "Meter",
		group: "components",
		order: 1,
		content:
			'# Meter\n\nRenders a `<meter>` element.\n\n## Usage\n\n```tsx\nimport { Meter } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Meter class="my-meter">Meter content</Meter>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<meter>`\n- Accepts `class` for custom styling\n',
	},
	"components/stat": {
		title: "Stat",
		group: "components",
		order: 1,
		content:
			'# Stat\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { Stat } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <Stat class="my-stat">Stat content</Stat>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/skeletontext": {
		title: "SkeletonText",
		group: "components",
		order: 1,
		content:
			'# SkeletonText\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { SkeletonText } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <SkeletonText class="my-skeletontext">SkeletonText content</SkeletonText>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/alertdialog": {
		title: "AlertDialog",
		group: "components",
		order: 1,
		content:
			'# AlertDialog\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { AlertDialog } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <AlertDialog class="my-alertdialog">AlertDialog content</AlertDialog>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/hovercard": {
		title: "HoverCard",
		group: "components",
		order: 1,
		content:
			'# HoverCard\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { HoverCard } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <HoverCard class="my-hovercard">HoverCard content</HoverCard>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/contextmenu": {
		title: "ContextMenu",
		group: "components",
		order: 1,
		content:
			'# ContextMenu\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { ContextMenu } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <ContextMenu class="my-contextmenu">ContextMenu content</ContextMenu>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
	},
	"components/skeletoncircle": {
		title: "SkeletonCircle",
		group: "components",
		order: 1,
		content:
			'# SkeletonCircle\n\nRenders a `<div>` element.\n\n## Usage\n\n```tsx\nimport { SkeletonCircle } from "@wrikka/solid-ui";\n\nfunction Example() {\n\treturn <SkeletonCircle class="my-skeletoncircle">SkeletonCircle content</SkeletonCircle>;\n}\n```\n## Props\n\n- Extends the standard JSX attributes for `<div>`\n- Accepts `class` for custom styling\n',
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
	"templates/chatbot": {
		title: "Chatbot template",
		group: "templates",
		order: 5,
		content:
			'# Chatbot template\n\nA minimal chatbot UI built from solid-ui primitives.\n\n```tsx\nimport { createSignal, For } from "solid-js";\nimport { Button, Input, Card } from "@wrikka/solid-ui";\n\nfunction Chatbot() {\n\tconst [messages, setMessages] = createSignal([{ role: "assistant", text: "How can I help you?" }]);\n\tconst [input, setInput] = createSignal("");\n\n\tfunction send() {\n\t\tconst text = input().trim();\n\t\tif (!text) return;\n\t\tsetMessages((prev) => [...prev, { role: "user", text }]);\n\t\tsetInput("");\n\t\tsetTimeout(() => {\n\t\t\tsetMessages((prev) => [...prev, { role: "assistant", text: "This is a placeholder reply." }]);\n\t\t}, 600);\n\t}\n\n\treturn (\n\t\t<Card class="flex h-[600px] flex-col">\n\t\t\t<div class="flex-1 space-y-3 overflow-y-auto p-4">\n\t\t\t\t<For each={messages()}>\n\t\t\t\t\t{(msg) => (\n\t\t\t\t\t\t<div class={["rounded-lg px-3 py-2", msg.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"].join(" ")}>\n\t\t\t\t\t\t\t{msg.text}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t)}\n\t\t\t\t</For>\n\t\t\t</div>\n\t\t\t<div class="flex gap-2 border-t border-border p-3">\n\t\t\t\t<Input value={input()} onInput={(e) => setInput(e.currentTarget.value)} placeholder="Type a message…" />\n\t\t\t\t<Button onClick={send}>Send</Button>\n\t\t\t</div>\n\t\t</Card>\n\t);\n}\n```\n',
	},
	principles: {
		title: "Principles",
		group: "core",
		order: 0,
		content:
			"# Principles\n\nsolid-ui is built on a small set of principles that guide every component and API decision.\n\n## Composability first\n\nComponents are small, focused, and easy to compose. Higher-level patterns are built from primitives, not hard-coded.\n\n## Type safety\n\nEvery component is written in TypeScript and ships with typed props. Form, table, and image helpers use type inference so you catch mistakes early.\n\n## Accessibility\n\nKeyboard navigation, focus management, ARIA roles, and color contrast are considered by default. Components work with screen readers and reduced-motion preferences.\n\n## Themeability\n\nColors, fonts, spacing, and radius are driven by CSS custom properties. Switch presets or fine-tune tokens without touching component internals.\n\n## SolidJS native\n\nThe library uses SolidJS primitives — signals, stores, and fine-grained reactivity — without extra abstraction layers.\n",
	},
	"key-concepts": {
		title: "Key concepts",
		group: "core",
		order: 1,
		content:
			"# Key concepts\n\nA few concepts make solid-ui easier to work with.\n\n## Primitives and components\n\n**Primitives** are low-level controls like `Button`, `Input`, and `Select`. **Components** are higher-level patterns like `CommandPalette`, `DataTable`, and `NavigationMenu`.\n\n## The theme system\n\nThe site and components read from CSS custom properties. The `ThemePicker` in the header writes to these tokens so every preview updates live.\n\n## Registry-driven docs\n\nThe component registry powers the docs, the MCP server, and the CLI. Adding a component to the registry and a category makes it discoverable everywhere.\n\n## Workspace packages\n\n- `@wrikka/solid-ui` — UI components\n- `@wrikka/form` — form field helpers\n- `@wrikka/table` — typed table columns\n- `@wrikka/image` — image transform URLs\n- `@wrikka/transitions` — CSS transition utilities\n",
	},
	comparison: {
		title: "Comparison",
		group: "core",
		order: 2,
		content:
			"# Comparison\n\nHow solid-ui compares to common alternatives.\n\n## vs. shadcn/ui\n\nshadcn/ui is a collection of copy-paste React components. solid-ui is a SolidJS design system with a registry, MCP server, CLI, and built-in docs.\n\n## vs. other SolidJS libraries\n\nMany SolidJS libraries are small sets of primitives. solid-ui adds higher-level components, real-world packages, and an AI-ready MCP layer.\n\n## When to use solid-ui\n\nChoose solid-ui when you want:\n\n- A single, consistent design system\n- SolidJS-native, fine-grained reactivity\n- Typed form, table, and image helpers\n- Component discovery through MCP or CLI\n- Live theme customization out of the box\n",
	},
};
