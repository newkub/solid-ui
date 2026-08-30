// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FormFieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label?: string;
	error?: string;
}

export function FormField(props: FormFieldProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-form-field";
	return (
		<div class={`solidui-form-field ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
