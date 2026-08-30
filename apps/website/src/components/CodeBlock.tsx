import { createSignal, Show } from "solid-js";
import { ShikiCode } from "./ShikiCode";

export function CodeBlock(props: { code: string; language?: string }) {
	const [copied, setCopied] = createSignal(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(props.code);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	}

	return (
		<div class="code-block">
			<button type="button" class="code-block__copy" onClick={copy} aria-live="polite">
				<Show when={copied()} fallback="Copy">
					Copied
				</Show>
			</button>
			<ShikiCode code={props.code} lang={props.language ?? "tsx"} />
		</div>
	);
}
