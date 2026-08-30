import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

interface Spec {
	name: string;
	tag: string;
	selfClose?: boolean;
	element: string;
	extraProps?: string;
	body?: string;
	splitKeys?: string;
}

const components: Spec[] = [
	{
		name: "Button",
		tag: "button",
		element: "HTMLButtonElement",
		splitKeys: "'class', 'children', 'variant', 'size'",
		extraProps:
			"\n\tvariant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'ghost' | 'link'\n\tsize?: 'sm' | 'md' | 'lg' | 'icon'",
		body: "const variant = local.variant ? `solidui-button--${local.variant}` : ''\n  const size = local.size ? `solidui-button--${local.size}` : ''\n  return (\n    <button type=\"button\" class={`${base} ${variant} ${size} ${local.class || ''}`.trim()} {...rest}>\n      {local.children}\n    </button>\n  )",
	},
	{ name: "Input", tag: "input", selfClose: true, element: "HTMLInputElement" },
	{ name: "Textarea", tag: "textarea", element: "HTMLTextAreaElement" },
	{ name: "Select", tag: "select", element: "HTMLSelectElement" },
	{
		name: "Checkbox",
		tag: "input",
		selfClose: true,
		element: "HTMLInputElement",
		splitKeys: "'class'",
		body: "return <input type=\"checkbox\" class={`${base} ${local.class || ''}`.trim()} {...rest} />",
	},
	{
		name: "Radio",
		tag: "input",
		selfClose: true,
		element: "HTMLInputElement",
		splitKeys: "'class'",
		body: "return <input type=\"radio\" class={`${base} ${local.class || ''}`.trim()} {...rest} />",
	},
	{
		name: "Switch",
		tag: "button",
		element: "HTMLButtonElement",
		splitKeys: "'class', 'children', 'checked'",
		extraProps: "\n\tchecked?: boolean",
		body: 'return <button type="button" role="switch" aria-checked={local.checked} class={`${base} ${local.class || \'\'}`.trim()} {...rest}>{local.children}</button>',
	},
	{
		name: "Label",
		tag: "label",
		element: "HTMLLabelElement",
		splitKeys: "'class', 'children', 'for'",
		body: "return <label class={`${base} ${local.class || ''}`.trim()} for={local.for} {...rest}>{local.children}</label>",
	},
	{ name: "Form", tag: "form", element: "HTMLFormElement" },
	{
		name: "FormField",
		tag: "div",
		element: "HTMLDivElement",
		splitKeys: "'class', 'children', 'label', 'error'",
		extraProps: "\n\tlabel?: string\n\terror?: string",
		body: 'return (\n    <div class={`${base} ${local.class || \'\'}`.trim()} {...rest}>\n      {local.label ? <span class="solidui-label">{local.label}</span> : null}\n      {local.children}\n      {local.error ? <span class="solidui-form-field__error" role="alert">{local.error}</span> : null}\n    </div>\n  )',
	},
	{
		name: "FileInput",
		tag: "input",
		selfClose: true,
		element: "HTMLInputElement",
		splitKeys: "'class'",
		body: "return <input type=\"file\" class={`${base} ${local.class || ''}`.trim()} {...rest} />",
	},
	{
		name: "Slider",
		tag: "input",
		selfClose: true,
		element: "HTMLInputElement",
		splitKeys: "'class'",
		body: "return <input type=\"range\" class={`${base} ${local.class || ''}`.trim()} {...rest} />",
	},
	{
		name: "DatePicker",
		tag: "input",
		selfClose: true,
		element: "HTMLInputElement",
		splitKeys: "'class'",
		body: "return <input type=\"date\" class={`${base} ${local.class || ''}`.trim()} {...rest} />",
	},
	{ name: "Card", tag: "div", element: "HTMLDivElement" },
	{ name: "Box", tag: "div", element: "HTMLDivElement" },
	{ name: "Flex", tag: "div", element: "HTMLDivElement" },
	{ name: "Grid", tag: "div", element: "HTMLDivElement" },
	{ name: "Stack", tag: "div", element: "HTMLDivElement" },
	{ name: "Separator", tag: "hr", selfClose: true, element: "HTMLHRElement" },
	{ name: "AspectRatio", tag: "div", element: "HTMLDivElement" },
	{ name: "Skeleton", tag: "div", element: "HTMLDivElement" },
	{ name: "Spinner", tag: "div", element: "HTMLDivElement" },
	{ name: "Loading", tag: "div", element: "HTMLDivElement" },
	{
		name: "Progress",
		tag: "progress",
		selfClose: true,
		element: "HTMLProgressElement",
	},
	{ name: "Avatar", tag: "div", element: "HTMLDivElement" },
	{ name: "Badge", tag: "span", element: "HTMLSpanElement" },
	{ name: "Breadcrumb", tag: "nav", element: "HTMLElement" },
	{ name: "Tabs", tag: "div", element: "HTMLDivElement" },
	{ name: "Pagination", tag: "nav", element: "HTMLElement" },
	{ name: "Steps", tag: "div", element: "HTMLDivElement" },
	{ name: "Timeline", tag: "div", element: "HTMLDivElement" },
	{ name: "Menubar", tag: "div", element: "HTMLDivElement" },
	{ name: "NavigationMenu", tag: "nav", element: "HTMLElement" },
	{ name: "TreeView", tag: "ul", element: "HTMLUListElement" },
	{ name: "Dialog", tag: "div", element: "HTMLDivElement" },
	{ name: "Modal", tag: "div", element: "HTMLDivElement" },
	{ name: "Sheet", tag: "div", element: "HTMLDivElement" },
	{ name: "Drawer", tag: "div", element: "HTMLDivElement" },
	{ name: "Tooltip", tag: "div", element: "HTMLDivElement" },
	{ name: "Popover", tag: "div", element: "HTMLDivElement" },
	{ name: "Toast", tag: "div", element: "HTMLDivElement" },
	{ name: "Toaster", tag: "div", element: "HTMLDivElement" },
	{ name: "Alert", tag: "div", element: "HTMLDivElement" },
	{ name: "Command", tag: "div", element: "HTMLDivElement" },
	{ name: "CommandPalette", tag: "div", element: "HTMLDivElement" },
	{ name: "Notification", tag: "div", element: "HTMLDivElement" },
	{ name: "Table", tag: "table", element: "HTMLTableElement" },
	{ name: "DataTable", tag: "div", element: "HTMLDivElement" },
	{ name: "VirtualList", tag: "div", element: "HTMLDivElement" },
	{ name: "ScrollArea", tag: "div", element: "HTMLDivElement" },
	{
		name: "Image",
		tag: "img",
		selfClose: true,
		element: "HTMLImageElement",
		splitKeys: "'class', 'alt'",
		body: "return <img class={`${base} ${local.class || ''}`.trim()} alt={local.alt} {...rest} />",
	},
	{ name: "Chart", tag: "div", element: "HTMLDivElement" },
	{ name: "Calendar", tag: "div", element: "HTMLDivElement" },
	{ name: "Transition", tag: "div", element: "HTMLDivElement" },
	{ name: "Collapsible", tag: "div", element: "HTMLDivElement" },
	{ name: "Accordion", tag: "div", element: "HTMLDivElement" },
	{ name: "DropdownMenu", tag: "div", element: "HTMLDivElement" },
	{
		name: "Toggle",
		tag: "button",
		element: "HTMLButtonElement",
		splitKeys: "'class', 'children', 'pressed'",
		extraProps: "\n\tpressed?: boolean",
		body: "return <button type=\"button\" aria-pressed={local.pressed} class={`${base} ${local.class || ''}`.trim()} {...rest}>{local.children}</button>",
	},
	{ name: "ToggleGroup", tag: "div", element: "HTMLDivElement" },
	{ name: "Resizable", tag: "div", element: "HTMLDivElement" },
];

function kebab(name: string) {
	return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

const tagToAttrInterface: Record<string, string> = {
	a: "AnchorHTMLAttributes",
	button: "ButtonHTMLAttributes",
	div: "HTMLAttributes",
	form: "FormHTMLAttributes",
	hr: "HTMLAttributes",
	img: "ImgHTMLAttributes",
	input: "InputHTMLAttributes",
	label: "LabelHTMLAttributes",
	main: "HTMLAttributes",
	nav: "HTMLAttributes",
	ol: "HTMLAttributes",
	p: "HTMLAttributes",
	progress: "ProgressHTMLAttributes",
	section: "HTMLAttributes",
	select: "SelectHTMLAttributes",
	span: "HTMLAttributes",
	table: "HTMLAttributes",
	textarea: "TextareaHTMLAttributes",
	ul: "HTMLAttributes",
};

function makeComponent(spec: Spec) {
	const base = `solidui-${kebab(spec.name)}`;
	const interfaceName = tagToAttrInterface[spec.tag] ?? "HTMLAttributes";
	const attrInterface = `JSX.${interfaceName}<${spec.element}>`;

	const propsDecl = `export interface ${spec.name}Props extends ${attrInterface} {${spec.extraProps ?? ""}\n}\n`;

	const body =
		spec.body ??
		(spec.selfClose
			? `  return <${spec.tag} class={\`\${base} \${local.class || ''}\`.trim()} {...rest} />`
			: `  return <${spec.tag} class={\`\${base} \${local.class || ''}\`.trim()} {...rest}>{local.children}</${spec.tag}>`);

	const splitKeys = spec.splitKeys ?? (spec.selfClose ? "'class'" : "'class', 'children'");

	return `// Generated component — customize as needed
import { splitProps, type JSX } from 'solid-js'

${propsDecl}
export function ${spec.name}(props: ${spec.name}Props) {
  const [local, rest] = splitProps(props, [${splitKeys}])
  const base = '${base}'
${body}
}
`;
}

const outDir = new URL("../src/components/", import.meta.url);
const indexFile = new URL("../src/index.ts", import.meta.url);
const registryFile = new URL("../src/registry.ts", import.meta.url);

await mkdir(outDir, { recursive: true });

const indexLines: string[] = [
	"// Solid UI component library exports\n",
	"export * from '@wrikka/form';",
	"export * from '@wrikka/image';",
	"export * from '@wrikka/table';",
	"export * from '@wrikka/transitions';",
	"",
];
const registryLines: string[] = [
	"export interface RegistryItem { name: string; tag: string; description: string }\nexport const registry: RegistryItem[] = [",
];

for (const spec of components) {
	const file = new URL(`./${spec.name}.tsx`, outDir);
	await writeFile(file, makeComponent(spec));
	indexLines.push(`export { ${spec.name} } from './components/${spec.name}'`);
	registryLines.push(`  { name: '${spec.name}', tag: '${spec.tag}', description: '${spec.name} component' },`);
}

indexLines.push(`\nexport { registry } from './registry'`);
registryLines.push("]\n");

await writeFile(indexFile, indexLines.join("\n"));
await writeFile(registryFile, registryLines.join("\n"));

console.log(`Generated ${components.length} components`);
