import { type JSX, mergeProps, splitProps } from "solid-js";

export interface ScrollAreaProps extends JSX.HTMLAttributes<HTMLDivElement> {
	orientation?: "vertical" | "horizontal" | "both";
	scrollbars?: boolean;
}

export function ScrollArea(props: ScrollAreaProps) {
	const merged = mergeProps({ orientation: "both" as const, scrollbars: true }, props);
	const [local, rest] = splitProps(merged, ["class", "orientation", "scrollbars", "children"]);

	const overflow = () => {
		switch (local.orientation) {
			case "vertical":
				return "overflow-y-auto overflow-x-hidden";
			case "horizontal":
				return "overflow-x-auto overflow-y-hidden";
			default:
				return "overflow-auto";
		}
	};

	const hideScroll = () => (local.scrollbars ? "" : "scrollbar-none");
	const className = () =>
		["relative h-full w-full rounded-md border", overflow(), hideScroll(), local.class ?? ""].filter(Boolean).join(" ");

	return (
		<div class={className()} {...rest}>
			{local.children}
		</div>
	);
}
