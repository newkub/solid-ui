// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface AspectRatioProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function AspectRatio(props: AspectRatioProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-aspect-ratio";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
