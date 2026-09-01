import type { JSX } from "solid-js";
import { useClassName } from "../hooks/useClassName";

export interface ListItemProps extends JSX.LiHTMLAttributes<HTMLLIElement> {}

export function ListItem(props: ListItemProps) {
	const { className, rest } = useClassName(props, "text-sm text-foreground");
	return <li class={className()} {...rest} />;
}
