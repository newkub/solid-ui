// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CheckboxProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox(props: CheckboxProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "h-4 w-4 accent-primary cursor-pointer rounded border border-primary";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <input type="checkbox" class={className} {...rest} />;
}
