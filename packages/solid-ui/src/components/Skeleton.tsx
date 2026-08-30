// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SkeletonProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Skeleton(props: SkeletonProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-skeleton";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
