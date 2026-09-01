import { CopyButton } from "./CopyButton";
import { ShikiCode } from "./ShikiCode";

export function CodeBlock(props: { code: string; language?: string }) {
	return (
		<div class="relative overflow-hidden rounded-xl border border-border bg-surface">
			<CopyButton
				text={props.code}
				class="absolute right-2 top-2 inline-flex h-7 items-center rounded-md border border-border bg-background px-2.5 text-xs font-medium hover:bg-muted"
			/>
			<ShikiCode code={props.code} lang={props.language ?? "tsx"} />
		</div>
	);
}
