// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FileInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function FileInput(props: FileInputProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-file-input";
	return <input type="file" class={`${base} ${local.class || ""}`.trim()} {...rest} />;
}
