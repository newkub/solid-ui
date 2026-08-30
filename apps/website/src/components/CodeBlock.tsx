import { createSignal, Show } from "solid-js";
import { highlightCode } from "../lib/highlight";

export function CodeBlock(props: { code: string; language?: string }) {
	const [copied, setCopied] = createSignal(false);
	const html = () => highlightCode(props.code, props.language ?? "tsx");

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
			<pre>
				<code class={`language-${props.language ?? "tsx"}`} innerHTML={html()} />
			</pre>
		</div>
	);
}
