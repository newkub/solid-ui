// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface AspectRatioProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function AspectRatio(props: AspectRatioProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "relative w-full overflow-hidden rounded-md bg-muted";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
