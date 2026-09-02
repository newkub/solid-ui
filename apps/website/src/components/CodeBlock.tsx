import { createSignal, For, Show } from "solid-js";
import { CopyButton } from "./CopyButton";
import { ShikiCode } from "./ShikiCode";

interface CodeTab {
	label: string;
	code: string;
	language?: string;
}

export function CodeBlock(props: { code: string; language?: string; tabs?: CodeTab[]; twoslash?: boolean }) {
	const initialTabs = () =>
		props.tabs && props.tabs.length > 0
			? props.tabs
			: [
					{
						label: props.language ? props.language.toUpperCase() : "TSX",
						code: props.code,
						language: props.language ?? "tsx",
					},
				];

	const [active, setActive] = createSignal(0);

	const activeTab = () => initialTabs()[active()];

	return (
		<div class="relative overflow-hidden rounded-xl border border-border bg-surface">
			<Show when={initialTabs().length > 1}>
				<div class="flex items-center gap-1 border-b border-border bg-muted/50 px-2 py-1.5">
					<For each={initialTabs()}>
						{(tab, index) => (
							<button
								type="button"
								class={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
									active() === index()
										? "bg-surface text-foreground shadow-sm"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								}`}
								onClick={() => setActive(index())}
								aria-pressed={active() === index()}
							>
								{tab.label}
							</button>
						)}
					</For>
				</div>
			</Show>
			<CopyButton
				text={activeTab().code}
				class={`absolute right-2 z-10 inline-flex h-7 items-center rounded-md border border-border bg-background px-2.5 text-xs font-medium hover:bg-muted ${
					initialTabs().length > 1 ? "top-10" : "top-2"
				}`}
			/>
			<ShikiCode code={activeTab().code} lang={activeTab().language} twoslash={props.twoslash} />
		</div>
	);
}
