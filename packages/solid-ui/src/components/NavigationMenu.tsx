// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface NavigationMenuProps extends JSX.HTMLAttributes<HTMLElement> {}

export function NavigationMenu(props: NavigationMenuProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "solidui-navigation-menu";
	return (
		<nav class={`solidui-navigation-menu ${local.class || ""}`.trim()} {...rest}>
			{local.children}
		</nav>
	);
}
