// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToasterProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Toaster(props: ToasterProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-toaster";
	return (
		<div class={`solidui-toaster ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
