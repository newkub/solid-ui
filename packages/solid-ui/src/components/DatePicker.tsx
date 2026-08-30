// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface DatePickerProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function DatePicker(props: DatePickerProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "solidui-date-picker";
	return <input type="date" class={`${base} ${local.class || ""}`.trim()} {...rest} />;
}
