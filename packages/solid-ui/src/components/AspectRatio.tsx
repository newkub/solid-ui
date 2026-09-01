import { type JSX, splitProps } from "solid-js";

export interface AspectRatioProps extends JSX.HTMLAttributes<HTMLDivElement> {
	ratio?: number;
}

export function AspectRatio(props: AspectRatioProps) {
	const [local, rest] = splitProps(props, ["class", "ratio", "children"]);
	const className = () => ["relative w-full overflow-hidden rounded-md", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<div class={className()} style={{ "aspect-ratio": local.ratio ?? 1 }} {...rest}>
			<div class="absolute inset-0">{local.children}</div>
		</div>
	);
}
