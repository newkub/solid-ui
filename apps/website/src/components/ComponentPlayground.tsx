import * as SolidUI from "@wrikka/solid-ui";
import { registry } from "@wrikka/solid-ui";
import { createSignal, ErrorBoundary, For, type JSX, Match, Show, Switch } from "solid-js";
import { PLAYGROUND_IMAGE_SRC } from "../lib/config";
import { CodeBlock } from "./CodeBlock";

type AnyComponent = (props: Record<string, unknown>) => JSX.Element;

function controlId(label: string) {
	return `playground-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function SelectControl(props: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
	const id = controlId(props.label);
	return (
		<div class="playground-control">
			<label for={id} class="playground-control__label">
				{props.label}
			</label>
			<SolidUI.Select id={id} value={props.value} onChange={(e) => props.onChange(e.currentTarget.value)}>
				<For each={props.options}>{(opt) => <option value={opt}>{opt}</option>}</For>
			</SolidUI.Select>
		</div>
	);
}

function BoolControl(props: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
	const id = controlId(props.label);
	return (
		<div class="playground-control playground-control--inline">
			<SolidUI.Checkbox id={id} checked={props.checked} onChange={(e) => props.onChange(e.currentTarget.checked)} />
			<label for={id} class="playground-control__label">
				{props.label}
			</label>
		</div>
	);
}

function TextControl(props: { label: string; value: string; onChange: (value: string) => void }) {
	const id = controlId(props.label);
	return (
		<div class="playground-control">
			<label for={id} class="playground-control__label">
				{props.label}
			</label>
			<SolidUI.Input id={id} type="text" value={props.value} onInput={(e) => props.onChange(e.currentTarget.value)} />
		</div>
	);
}

interface PlaygroundValues {
	variant: string;
	size: string;
	content: string;
	pressed: boolean;
	checked: boolean;
	inputType: string;
	placeholder: string;
	src: string;
	alt: string;
}

const usageCodeGenerators: Record<string, (name: string, v: PlaygroundValues) => string> = {
	Button: (_name, v) => {
		const variantAttr = v.variant !== "default" ? ` variant="${v.variant}"` : "";
		const sizeAttr = v.size !== "md" ? ` size="${v.size}"` : "";
		return `import { Button } from "@wrikka/solid-ui";\n\n<Button${variantAttr}${sizeAttr}>${v.content}</Button>`;
	},
	Switch: (_name, v) => {
		const c = v.checked ? ` checked` : "";
		return `import { Switch } from "@wrikka/solid-ui";\n\n<Switch${c}>${v.content}</Switch>`;
	},
	Toggle: (_name, v) => {
		const p = v.pressed ? ` pressed` : "";
		return `import { Toggle } from "@wrikka/solid-ui";\n\n<Toggle${p}>${v.content}</Toggle>`;
	},
	Input: (_name, v) => {
		const t = v.inputType !== "text" ? ` type="${v.inputType}"` : "";
		const ph = v.placeholder ? ` placeholder="${v.placeholder}"` : "";
		return `import { Input } from "@wrikka/solid-ui";\n\n<Input${t}${ph} />`;
	},
	Textarea: (_name, v) => {
		const ph = v.placeholder ? ` placeholder="${v.placeholder}"` : "";
		return `import { Textarea } from "@wrikka/solid-ui";\n\n<Textarea${ph} />`;
	},
	Select: () =>
		`import { Select } from "@wrikka/solid-ui";\n\n<Select>\n\t<option>Option 1</option>\n\t<option>Option 2</option>\n</Select>`,
	Checkbox: (_name, v) => {
		const c = v.checked ? ` checked` : "";
		return `import { Checkbox } from "@wrikka/solid-ui";\n\n<Checkbox${c} />`;
	},
	Radio: (_name, v) => {
		const c = v.checked ? ` checked` : "";
		return `import { Radio } from "@wrikka/solid-ui";\n\n<Radio${c} />`;
	},
	FileInput: () => `import { FileInput } from "@wrikka/solid-ui";\n\n<FileInput />`,
	Slider: () => `import { Slider } from "@wrikka/solid-ui";\n\n<Slider min="0" max="100" />`,
	DatePicker: () => `import { DatePicker } from "@wrikka/solid-ui";\n\n<DatePicker />`,
	Image: (_name, v) =>
		`import { Image } from "@wrikka/solid-ui";\n\n<Image src="${v.src}" alt="${v.alt}" width={400} height={300} />`,
};

function buildUsageCode(name: string, values: PlaygroundValues) {
	const generator = usageCodeGenerators[name];
	if (generator) return generator(name, values);
	return `import { ${name} } from "@wrikka/solid-ui";\n\n<${name} class="my-${name.toLowerCase()}">\n\t${name} content\n</${name}>`;
}

const previewRenderers: Record<
	string,
	(C: AnyComponent, common: Record<string, unknown>, v: PlaygroundValues, item?: { tag: string }) => JSX.Element
> = {
	Button: (C, common, v) => (
		<C {...common} variant={v.variant} size={v.size}>
			{v.content}
		</C>
	),
	Switch: (C, common, v) => (
		<C {...common} checked={v.checked}>
			{v.content}
		</C>
	),
	Toggle: (C, common, v) => (
		<C {...common} pressed={v.pressed}>
			{v.content}
		</C>
	),
	Input: (C, common, v) => <C {...common} type={v.inputType} placeholder={v.placeholder} />,
	Textarea: (C, common, v) => <C {...common} placeholder={v.placeholder} />,
	Checkbox: (C, common, v) => <C {...common} checked={v.checked} />,
	Radio: (C, common, v) => <C {...common} checked={v.checked} />,
	Slider: (C, common) => <C {...common} min={0} max={100} />,
	Image: (C, common, v) => <C {...common} src={v.src} alt={v.alt} width={400} height={300} />,
};

function renderDefaultPreview(C: AnyComponent, common: Record<string, unknown>, name: string, tag?: string) {
	return (
		<C {...common}>
			<SolidUI.Badge>{tag}</SolidUI.Badge>
			{name}
		</C>
	);
}

interface PlaygroundControlsProps {
	name: string;
	variant: string;
	setVariant: (v: string) => void;
	size: string;
	setSize: (v: string) => void;
	content: string;
	setContent: (v: string) => void;
	pressed: boolean;
	setPressed: (v: boolean) => void;
	checked: boolean;
	setChecked: (v: boolean) => void;
	inputType: string;
	setInputType: (v: string) => void;
	placeholder: string;
	setPlaceholder: (v: string) => void;
	src: string;
	setSrc: (v: string) => void;
	alt: string;
	setAlt: (v: string) => void;
}

function PlaygroundControls(props: PlaygroundControlsProps) {
	return (
		<Switch>
			<Match when={props.name === "Button"}>
				<SelectControl
					label="Variant"
					value={props.variant}
					options={["default", "primary", "secondary", "destructive", "ghost", "link"]}
					onChange={props.setVariant}
				/>
				<SelectControl label="Size" value={props.size} options={["sm", "md", "lg", "icon"]} onChange={props.setSize} />
				<TextControl label="Content" value={props.content} onChange={props.setContent} />
			</Match>
			<Match when={props.name === "Switch" || props.name === "Toggle"}>
				<BoolControl
					label="Active"
					checked={props.checked || props.pressed}
					onChange={(v) => (props.name === "Switch" ? props.setChecked(v) : props.setPressed(v))}
				/>
				<TextControl label="Content" value={props.content} onChange={props.setContent} />
			</Match>
			<Match when={props.name === "Input"}>
				<SelectControl
					label="Type"
					value={props.inputType}
					options={["text", "email", "password", "number", "tel", "url"]}
					onChange={props.setInputType}
				/>
				<TextControl label="Placeholder" value={props.placeholder} onChange={props.setPlaceholder} />
			</Match>
			<Match when={props.name === "Textarea"}>
				<TextControl label="Placeholder" value={props.placeholder} onChange={props.setPlaceholder} />
			</Match>
			<Match when={props.name === "Checkbox" || props.name === "Radio"}>
				<BoolControl label="Checked" checked={props.checked} onChange={props.setChecked} />
			</Match>
			<Match when={props.name === "Image"}>
				<TextControl label="Source" value={props.src} onChange={props.setSrc} />
				<TextControl label="Alt" value={props.alt} onChange={props.setAlt} />
			</Match>
		</Switch>
	);
}

function createPlaygroundState() {
	const [variant, setVariant] = createSignal("default");
	const [size, setSize] = createSignal("md");
	const [content, setContent] = createSignal("Button");
	const [pressed, setPressed] = createSignal(false);
	const [checked, setChecked] = createSignal(false);
	const [inputType, setInputType] = createSignal("text");
	const [placeholder, setPlaceholder] = createSignal("Enter value…");
	const [src, setSrc] = createSignal(PLAYGROUND_IMAGE_SRC);
	const [alt, setAlt] = createSignal("Demo image");

	const values = (): PlaygroundValues => ({
		variant: variant(),
		size: size(),
		content: content(),
		pressed: pressed(),
		checked: checked(),
		inputType: inputType(),
		placeholder: placeholder(),
		src: src(),
		alt: alt(),
	});

	return {
		variant,
		setVariant,
		size,
		setSize,
		content,
		setContent,
		pressed,
		setPressed,
		checked,
		setChecked,
		inputType,
		setInputType,
		placeholder,
		setPlaceholder,
		src,
		setSrc,
		alt,
		setAlt,
		values,
	};
}

export function ComponentPlayground(props: { name: string }) {
	const item = () => registry.find((r) => r.name === props.name);
	const C = () => (SolidUI as unknown as Record<string, unknown>)[props.name];
	const state = createPlaygroundState();

	const usageCode = () => buildUsageCode(props.name, state.values());

	const renderPreview = () => {
		const Comp = C();
		if (typeof Comp !== "function") return <div>Component not found</div>;
		const AnyComp = Comp as AnyComponent;
		const common: Record<string, unknown> = { class: "playground-stage__element" };
		const renderer = previewRenderers[props.name];
		if (renderer) return renderer(AnyComp, common, state.values(), item());
		return renderDefaultPreview(AnyComp, common, props.name, item()?.tag);
	};

	return (
		<div class="playground">
			<div class="playground-stage">
				<ErrorBoundary
					fallback={(err) => (
						<div class="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive">
							Preview error: {err instanceof Error ? err.message : String(err)}
						</div>
					)}
				>
					{renderPreview()}
				</ErrorBoundary>
			</div>

			<div class="playground-controls">
				<PlaygroundControls
					name={props.name}
					variant={state.variant()}
					setVariant={state.setVariant}
					size={state.size()}
					setSize={state.setSize}
					content={state.content()}
					setContent={state.setContent}
					pressed={state.pressed()}
					setPressed={state.setPressed}
					checked={state.checked()}
					setChecked={state.setChecked}
					inputType={state.inputType()}
					setInputType={state.setInputType}
					placeholder={state.placeholder()}
					setPlaceholder={state.setPlaceholder}
					src={state.src()}
					setSrc={state.setSrc}
					alt={state.alt()}
					setAlt={state.setAlt}
				/>
			</div>

			<Show when={usageCode()}>
				<CodeBlock code={usageCode()} language="tsx" />
			</Show>
		</div>
	);
}
