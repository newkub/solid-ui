// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface RadioProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function Radio(props: RadioProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "h-4 w-4 accent-primary cursor-pointer rounded-full border border-primary";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <input type="radio" class={className} {...rest} />;
}
