// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface FormFieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label?: string;
	error?: string;
}

export function FormField(props: FormFieldProps) {
	const [local, rest] = splitProps(props, ["class", "children", "label", "error"]);
	const base = "grid gap-2";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return (
		<div class={className} {...rest}>
			{local.label ? (
				<span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{local.label}
				</span>
			) : null}
			{local.children}
			{local.error ? (
				<span class="text-sm text-destructive" role="alert">
					{local.error}
				</span>
			) : null}
		</div>
	);
}
