import { type JSX, splitProps } from "solid-js";

export interface GridProps extends JSX.HTMLAttributes<HTMLDivElement> {
	columns?: number | string;
	rows?: number | string;
	gap?: number | string;
}

function template(value: number | string | undefined) {
	if (value === undefined) return undefined;
	if (typeof value === "number") return `repeat(${value}, minmax(0, 1fr))`;
	return value;
}

export function Grid(props: GridProps) {
	const [local, rest] = splitProps(props, ["class", "columns", "rows", "gap", "children"]);

	const style = () => ({
		display: "grid",
		"grid-template-columns": template(local.columns),
		"grid-template-rows": template(local.rows),
		gap: typeof local.gap === "number" ? `${local.gap}px` : (local.gap ?? undefined),
	});

	return (
		<div class={local.class ?? ""} style={style()} {...rest}>
			{local.children}
		</div>
	);
}
