// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface NavigationMenuProps extends JSX.HTMLAttributes<HTMLElement> {}

export function NavigationMenu(props: NavigationMenuProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "w-full";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<nav class={className} {...rest}>
			{local.children}
		</nav>
	);
}
