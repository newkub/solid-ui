import { type JSX, splitProps } from "solid-js";

type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type FlexWrap = boolean | "wrap" | "nowrap" | "wrap-reverse";

export interface FlexProps extends JSX.HTMLAttributes<HTMLDivElement> {
	gap?: number | string;
	align?: FlexAlign;
	justify?: FlexJustify;
	wrap?: FlexWrap;
	direction?: "row" | "row-reverse" | "column" | "column-reverse";
}

const alignMap: Record<FlexAlign, string> = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	stretch: "items-stretch",
	baseline: "items-baseline",
};

const justifyMap: Record<FlexJustify, string> = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between",
	around: "justify-around",
	evenly: "justify-evenly",
};

const directionMap: Record<string, string> = {
	row: "flex-row",
	"row-reverse": "flex-row-reverse",
	column: "flex-col",
	"column-reverse": "flex-col-reverse",
};

function wrapClass(wrap: FlexWrap | undefined) {
	if (wrap === true || wrap === undefined || wrap === "wrap") return "flex-wrap";
	if (wrap === false || wrap === "nowrap") return "flex-nowrap";
	return "flex-wrap-reverse";
}

export function Flex(props: FlexProps) {
	const [local, rest] = splitProps(props, ["class", "gap", "align", "justify", "wrap", "direction", "children"]);

	const className = () =>
		[
			"flex",
			directionMap[local.direction ?? "row"] ?? "flex-row",
			alignMap[local.align ?? "stretch"],
			justifyMap[local.justify ?? "start"],
			wrapClass(local.wrap),
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const style = () => ({
		gap: typeof local.gap === "number" ? `${local.gap}px` : (local.gap ?? undefined),
	});

	return (
		<div class={className()} style={style()} {...rest}>
			{local.children}
		</div>
	);
}
