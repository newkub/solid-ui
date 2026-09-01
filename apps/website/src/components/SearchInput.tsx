import type { JSX } from "solid-js";

interface SearchInputProps {
	id?: string;
	placeholder?: string;
	value: string;
	onInput: (value: string) => void;
	class?: string;
	label?: string;
	autoFocus?: boolean;
}

function SearchIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

export function SearchInput(props: SearchInputProps): JSX.Element {
	const inputId = () => props.id ?? "search";
	return (
		<div class={`relative ${props.class ?? ""}`}>
			<label for={inputId()} class="sr-only">
				{props.label ?? "Search"}
			</label>
			<SearchIcon class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
			<input
				id={inputId()}
				type="search"
				placeholder={props.placeholder ?? "Search…"}
				value={props.value}
				onInput={(e) => props.onInput(e.currentTarget.value)}
				autocomplete="off"
				autofocus={props.autoFocus}
				class="h-9 w-full rounded-md border border-input bg-background py-1 pl-9 pr-3 text-sm text-foreground shadow-sm placeholder:text-muted-foreground transition-all hover:border-border-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			/>
		</div>
	);
}
