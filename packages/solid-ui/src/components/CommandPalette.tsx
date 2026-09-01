// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface CommandPaletteProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CommandPalette(props: CommandPaletteProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "fixed inset-0 z-modal flex items-start justify-center pt-[10vh] bg-black/50";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
