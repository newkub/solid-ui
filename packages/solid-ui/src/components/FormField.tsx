// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FormFieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label?: string;
	error?: string;
}

export function FormField(props: FormFieldProps) {
	const [local, rest] = splitProps(props, ["class", "children", "label", "error"]);
	const base = "solidui-form-field";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.label ? <span class="solidui-label">{local.label}</span> : null}
			{local.children}
			{local.error ? (
				<span class="solidui-form-field__error" role="alert">
					{local.error}
				</span>
			) : null}
		</div>
	);
}
