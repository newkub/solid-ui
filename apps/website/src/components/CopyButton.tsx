import { createSignal, Show } from "solid-js";

export function CopyButton(props: { text: string; label?: string; copiedLabel?: string; class?: string }) {
	const [copied, setCopied] = createSignal(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(props.text);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			setCopied(false);
		}
	}

	return (
		<button type="button" class={`copy-button ${props.class ?? ""}`} onClick={copy} aria-live="polite">
			<Show when={copied()} fallback={props.label ?? "Copy"}>
				{props.copiedLabel ?? "Copied"}
			</Show>
		</button>
	);
}
