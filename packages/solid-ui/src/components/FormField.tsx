import { type JSX, Show, splitProps } from "solid-js";
import { Label } from "./Label";

export interface FormFieldProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label?: string;
	htmlFor?: string;
	error?: string;
	hint?: string;
	required?: boolean;
}

export function FormField(props: FormFieldProps) {
	const [local, rest] = splitProps(props, ["class", "children", "label", "htmlFor", "error", "hint", "required"]);

	const base = "grid gap-2";
	const className = () => [base, local.class || ""].filter(Boolean).join(" ");

	return (
		<div class={className()} {...rest}>
			<Show when={local.label}>
				<Label for={local.htmlFor}>
					{local.label}
					<Show when={local.required}>
						<span class="text-destructive" aria-hidden="true">
							*
						</span>
					</Show>
				</Label>
			</Show>
			{local.children}
			<Show when={local.error}>
				<span class="text-sm text-destructive" role="alert">
					{local.error}
				</span>
			</Show>
			<Show when={local.hint}>
				<span class="text-sm text-muted-foreground">{local.hint}</span>
			</Show>
		</div>
	);
}
