import { For, type JSX, mergeProps, splitProps } from "solid-js";
import { Skeleton } from "./Skeleton";

export interface SkeletonTextProps extends JSX.HTMLAttributes<HTMLDivElement> {
	lines?: number;
}

export function SkeletonText(props: SkeletonTextProps) {
	const [local, rest] = splitProps(props, ["class", "lines"]);
	const merged = mergeProps({ lines: 3 }, local);

	const widths = ["w-full", "w-5/6", "w-4/5", "w-3/4", "w-2/3", "w-1/2"];
	const className = () => ["w-full space-y-2", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<div class={className()} role="status" aria-busy="true" aria-label="Loading text" {...rest}>
			<For each={Array.from({ length: merged.lines })}>
				{(_, i) => <Skeleton class={`h-2 rounded ${widths[i() % widths.length]}`} />}
			</For>
		</div>
	);
}
