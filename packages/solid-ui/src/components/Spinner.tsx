// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface SpinnerProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Spinner(props: SpinnerProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-spinner";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
