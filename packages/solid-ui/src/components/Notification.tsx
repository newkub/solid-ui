// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface NotificationProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Notification(props: NotificationProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-notification";
	return (
		<div class={`solidui-notification ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
