// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {}

export function Form(props: FormProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-form";
	return (
		<form class={`solidui-form ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</form>
	);
}
