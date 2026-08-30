// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface StepsProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Steps(props: StepsProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-steps";
	return (
		<div class={`solidui-steps ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
