import * as SolidUI from "@wrikka/solid-ui";
import { registry } from "@wrikka/solid-ui";
import { createSignal, For, type JSX, Match, Show, Switch } from "solid-js";
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

export function ComponentPlayground(props: { name: string }) {
	const item = () => registry.find((r) => r.name === props.name);
	const C = () => (SolidUI as unknown as Record<string, unknown>)[props.name];

	const [variant, setVariant] = createSignal("default");
	const [size, setSize] = createSignal("md");
	const [content, setContent] = createSignal("Button");
	const [pressed, setPressed] = createSignal(false);
	const [checked, setChecked] = createSignal(false);
	const [inputType, setInputType] = createSignal("text");
	const [placeholder, setPlaceholder] = createSignal("Enter value…");
	const [src, setSrc] = createSignal("https://picsum.photos/400/300");
	const [alt, setAlt] = createSignal("Demo image");

	const usageCode = () => {
		const v = variant() !== "default" ? ` variant="${variant()}"` : "";
		const s = size() !== "md" ? ` size="${size()}"` : "";
		const p = pressed() ? ` pressed` : "";
		const c = checked() ? ` checked` : "";
		const t = inputType() !== "text" ? ` type="${inputType()}"` : "";
		const ph = placeholder() ? ` placeholder="${placeholder()}"` : "";
		const srcAttr = ` src="${src()}"`;
		const altAttr = ` alt="${alt()}"`;

		switch (props.name) {
			case "Button":
				return `import { Button } from "@wrikka/solid-ui";\n\n<Button${v}${s}>${content()}</Button>`;
			case "Switch":
				return `import { Switch } from "@wrikka/solid-ui";\n\n<Switch${c}>${content()}</Switch>`;
			case "Toggle":
				return `import { Toggle } from "@wrikka/solid-ui";\n\n<Toggle${p}>${content()}</Toggle>`;
			case "Input":
				return `import { Input } from "@wrikka/solid-ui";\n\n<Input${t}${ph} />`;
			case "Textarea":
				return `import { Textarea } from "@wrikka/solid-ui";\n\n<Textarea${ph} />`;
			case "Select":
				return `import { Select } from "@wrikka/solid-ui";\n\n<Select>\n\t<option>Option 1</option>\n\t<option>Option 2</option>\n</Select>`;
			case "Checkbox":
				return `import { Checkbox } from "@wrikka/solid-ui";\n\n<Checkbox${c} />`;
			case "Radio":
				return `import { Radio } from "@wrikka/solid-ui";\n\n<Radio${c} />`;
			case "FileInput":
				return `import { FileInput } from "@wrikka/solid-ui";\n\n<FileInput />`;
			case "Slider":
				return `import { Slider } from "@wrikka/solid-ui";\n\n<Slider min="0" max="100" />`;
			case "DatePicker":
				return `import { DatePicker } from "@wrikka/solid-ui";\n\n<DatePicker />`;
			case "Image":
				return `import { Image } from "@wrikka/solid-ui";\n\n<Image${srcAttr}${altAttr} width={400} height={300} />`;
			default:
				return `import { ${props.name} } from "@wrikka/solid-ui";\n\n<${props.name} class="my-${props.name.toLowerCase()}">\n\t${props.name} content\n</${props.name}>`;
		}
	};

	const renderPreview = () => {
		const Comp = C();
		if (typeof Comp !== "function") return <div>Component not found</div>;
		const AnyComp = Comp as AnyComponent;

		const common: Record<string, unknown> = { class: "playground-stage__element" };

		switch (props.name) {
			case "Button":
				return (
					<AnyComp {...common} variant={variant()} size={size()}>
						{content()}
					</AnyComp>
				);
			case "Switch":
				return (
					<AnyComp {...common} checked={checked()}>
						{content()}
					</AnyComp>
				);
			case "Toggle":
				return (
					<AnyComp {...common} pressed={pressed()}>
						{content()}
					</AnyComp>
				);
			case "Input":
				return <AnyComp {...common} type={inputType()} placeholder={placeholder()} />;
			case "Textarea":
				return <AnyComp {...common} placeholder={placeholder()} />;
			case "Checkbox":
			case "Radio":
				return <AnyComp {...common} checked={checked()} />;
			case "Slider":
				return <AnyComp {...common} min={0} max={100} />;
			case "Image":
				return <AnyComp {...common} src={src()} alt={alt()} width={400} height={300} />;
			default:
				return (
					<AnyComp {...common}>
						<SolidUI.Badge>{item()?.tag}</SolidUI.Badge>
						{props.name}
					</AnyComp>
				);
		}
	};

	return (
		<div class="playground">
			<div class="playground-stage">{renderPreview()}</div>

			<div class="playground-controls">
				<Switch>
					<Match when={props.name === "Button"}>
						<SelectControl
							label="Variant"
							value={variant()}
							options={["default", "primary", "secondary", "destructive", "ghost", "link"]}
							onChange={setVariant}
						/>
						<SelectControl label="Size" value={size()} options={["sm", "md", "lg", "icon"]} onChange={setSize} />
						<TextControl label="Content" value={content()} onChange={setContent} />
					</Match>
					<Match when={props.name === "Switch" || props.name === "Toggle"}>
						<BoolControl
							label="Active"
							checked={checked() || pressed()}
							onChange={(v) => (props.name === "Switch" ? setChecked(v) : setPressed(v))}
						/>
						<TextControl label="Content" value={content()} onChange={setContent} />
					</Match>
					<Match when={props.name === "Input"}>
						<SelectControl
							label="Type"
							value={inputType()}
							options={["text", "email", "password", "number", "tel", "url"]}
							onChange={setInputType}
						/>
						<TextControl label="Placeholder" value={placeholder()} onChange={setPlaceholder} />
					</Match>
					<Match when={props.name === "Textarea"}>
						<TextControl label="Placeholder" value={placeholder()} onChange={setPlaceholder} />
					</Match>
					<Match when={props.name === "Checkbox" || props.name === "Radio"}>
						<BoolControl label="Checked" checked={checked()} onChange={setChecked} />
					</Match>
					<Match when={props.name === "Image"}>
						<TextControl label="Source" value={src()} onChange={setSrc} />
						<TextControl label="Alt" value={alt()} onChange={setAlt} />
					</Match>
				</Switch>
			</div>

			<Show when={usageCode()}>
				<CodeBlock code={usageCode()} language="tsx" />
			</Show>
		</div>
	);
}
