// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToggleGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function ToggleGroup(props: ToggleGroupProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-toggle-group";
	return (
		<div class={`solidui-toggle-group ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
