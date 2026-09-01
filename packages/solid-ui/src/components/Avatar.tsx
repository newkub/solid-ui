// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Avatar(props: AvatarProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
