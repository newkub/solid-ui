import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface SkeletonProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Skeleton(props: SkeletonProps) {
	const { className, rest } = useClassName(props, "h-4 w-full animate-pulse rounded-md bg-muted");
	return <div class={className()} {...rest} />;
}
