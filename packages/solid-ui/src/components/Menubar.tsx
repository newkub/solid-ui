// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface MenubarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Menubar(props: MenubarProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "flex items-center gap-1 p-1 rounded-lg border bg-card";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
