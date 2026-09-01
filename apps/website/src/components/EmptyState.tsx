interface EmptyStateProps {
	query: string;
	label?: string;
}

export function EmptyState(props: EmptyStateProps) {
	return (
		<div class="rounded-xl border border-border bg-surface py-12 text-center">
			<p class="text-sm text-muted-foreground">
				No {props.label ?? "results"} match "<span class="font-medium text-foreground">{props.query}</span>".
			</p>
		</div>
	);
}
