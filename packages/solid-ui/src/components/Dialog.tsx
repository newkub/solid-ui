// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface DialogProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Dialog(props: DialogProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-dialog";
	return (
		<div class={`solidui-dialog ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
