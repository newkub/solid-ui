// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface MenubarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Menubar(props: MenubarProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-menubar";
	return (
		<div class={`solidui-menubar ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
