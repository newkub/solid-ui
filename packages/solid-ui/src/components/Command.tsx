// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CommandProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Command(props: CommandProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-command";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
