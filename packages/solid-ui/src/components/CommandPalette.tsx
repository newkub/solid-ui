// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CommandPaletteProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CommandPalette(props: CommandPaletteProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-command-palette";
	return (
		<div class={`solidui-command-palette ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
