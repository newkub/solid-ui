interface EmptyStateProps {
	query: string;
	label?: string;
}

function SearchIcon(props: { class?: string }) {
	return (
		<svg
			class={props.class}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			aria-hidden="true"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

export function EmptyState(props: EmptyStateProps) {
	return (
		<div class="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface py-12 text-center">
			<SearchIcon class="h-8 w-8 text-muted-foreground" />
			<p class="text-sm text-muted-foreground">
				No {props.label ?? "results"} match "<span class="font-medium text-foreground">{props.query}</span>".
			</p>
		</div>
	);
}
