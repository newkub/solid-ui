// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SheetProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Sheet(props: SheetProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-sheet";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
