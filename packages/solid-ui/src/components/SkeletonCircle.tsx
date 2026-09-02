import { type JSX, mergeProps, splitProps } from "solid-js";

export interface SkeletonCircleProps extends JSX.HTMLAttributes<HTMLDivElement> {
	size?: number;
}

export function SkeletonCircle(props: SkeletonCircleProps) {
	const merged = mergeProps({ size: 48 }, props);
	const [local, rest] = splitProps(merged, ["class", "size", "style"]);

	const style = () => ({
		width: `${local.size}px`,
		height: `${local.size}px`,
		...(local.style as JSX.CSSProperties),
	});

	const className = () => ["animate-pulse rounded-full bg-muted", local.class ?? ""].filter(Boolean).join(" ");

	return <div class={className()} style={style()} role="status" aria-busy="true" aria-label="Loading" {...rest} />;
}
