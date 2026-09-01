import { useSelector } from "@tanstack/solid-store";
import { createResource, Show } from "solid-js";
import { themeStore } from "../lib/theme";

export function ShikiCode(props: { code: string; lang?: string }) {
	const themeMode = useSelector(themeStore, (state) => state.mode);
	const [html] = createResource(
		() => ({ code: props.code, lang: props.lang, t: themeMode() }),
		async ({ code, lang, t }) => {
			const { highlightCode } = await import("../lib/shiki");
			return highlightCode(code, lang, t);
		},
	);

	return (
		<Show
			when={html()}
			fallback={
				<pre class="m-0 overflow-x-auto p-4 text-sm">
					<code>{props.code}</code>
				</pre>
			}
		>
			{(h) => <div class="shiki-wrapper" innerHTML={h()} />}
		</Show>
	);
}
