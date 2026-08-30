import { createResource, Show } from "solid-js";
import { theme } from "../lib/theme";

export function ShikiCode(props: { code: string; lang?: string }) {
	const [html] = createResource(
		() => ({ code: props.code, lang: props.lang, t: theme() }),
		async ({ code, lang, t }) => {
			const { highlightCode } = await import("../lib/shiki");
			return highlightCode(code, lang, t);
		},
	);

	return (
		<Show
			when={html()}
			fallback={
				<pre class="shiki">
					<code>{props.code}</code>
				</pre>
			}
		>
			{(h) => <div class="shiki-wrapper" innerHTML={h()} />}
		</Show>
	);
}
