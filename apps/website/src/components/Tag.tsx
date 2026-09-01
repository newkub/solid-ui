interface TagProps {
	label: string;
	variant?: "default" | "primary";
}

export function Tag(props: TagProps) {
	const isPrimary = () => props.variant === "primary";
	return (
		<span
			class={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
				isPrimary() ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"
			}`}
		>
			{props.label}
		</span>
	);
}
