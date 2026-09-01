import { type JSX, splitProps } from "solid-js";

export interface SeparatorProps extends JSX.HTMLAttributes<HTMLHRElement> {
	orientation?: "horizontal" | "vertical";
}

export function Separator(props: SeparatorProps) {
	const [local, rest] = splitProps(props, ["class", "orientation"]);
	const orientation = () => local.orientation ?? "horizontal";

	const className = () => {
		if (orientation() === "vertical") {
			return ["inline-block h-full w-px shrink-0 border-0 bg-border", local.class ?? ""].filter(Boolean).join(" ");
		}
		return ["h-px w-full shrink-0 border-0 bg-border", local.class ?? ""].filter(Boolean).join(" ");
	};

	return <hr class={className()} aria-orientation={orientation()} {...rest} />;
}
