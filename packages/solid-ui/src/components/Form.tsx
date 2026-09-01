// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FormProps extends JSX.FormHTMLAttributes<HTMLFormElement> {}

export function Form(props: FormProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "w-full";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<form class={className} {...rest}>
			{local.children}
		</form>
	);
}
