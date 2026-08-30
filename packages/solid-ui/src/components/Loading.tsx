// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface LoadingProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Loading(props: LoadingProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-loading";
	return (
		<div class={`${base} ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</div>
	);
}
