// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TextareaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-textarea";
	return (
		<textarea class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</textarea>
	);
}
