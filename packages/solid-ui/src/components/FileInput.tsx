// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FileInputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

export function FileInput(props: FileInputProps) {
	const [local, rest] = splitProps(props, ["class"]);
	const base =
		"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 file:mr-4";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <input type="file" class={className} {...rest} />;
}
