// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface TextareaProps extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea(props: TextareaProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const base =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[60px]";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<textarea class={className} {...rest}>
			{local.children}
		</textarea>
	);
}
