// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface VirtualListProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function VirtualList(props: VirtualListProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "relative h-full w-full overflow-auto";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
