// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Avatar(props: AvatarProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-avatar";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
