// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ModalProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Modal(props: ModalProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-modal";
	return (
		<div class={`solidui-modal ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
