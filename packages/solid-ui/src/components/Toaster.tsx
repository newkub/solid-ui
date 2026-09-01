// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ToasterProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Toaster(props: ToasterProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base = "fixed bottom-4 right-4 z-toast flex flex-col gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.children}
		</div>
	);
}
