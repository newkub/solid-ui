import { type JSX, splitProps } from "solid-js";

export interface LabelProps extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
	htmlFor?: string;
}

export function Label(props: LabelProps) {
	const [local, rest] = splitProps(props, ["class", "children", "for", "htmlFor"]);
	const targetFor = () => local.htmlFor ?? local.for;

	const base = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	return (
		<label class={className()} for={targetFor()} {...rest}>
			{local.children}
		</label>
	);
}
