// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ResizableProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Resizable(props: ResizableProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex h-64 w-full gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
