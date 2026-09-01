// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLHRElement> {}

export function Separator(props: SeparatorProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base = "w-full border-0 border-t border-border";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <hr class={className} {...rest} />;
}
