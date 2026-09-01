import { type JSX, splitProps } from "solid-js";

export interface VisuallyHiddenProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	focusable?: boolean;
}

export function VisuallyHidden(props: VisuallyHiddenProps) {
	const [local, rest] = splitProps(props, ["class", "focusable", "children"]);

	const base = () => {
		const classes = ["sr-only"];
		if (local.focusable) {
			classes.push("focus:not-sr-only focus:static focus:whitespace-normal");
		}
		return classes.join(" ");
	};

	const className = () => [base(), local.class ?? ""].filter(Boolean).join(" ");

	return (
		<span class={className()} {...rest}>
			{local.children}
		</span>
	);
}
