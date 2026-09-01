// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SkeletonProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Skeleton(props: SkeletonProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "h-4 w-full animate-pulse rounded-md bg-muted";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
