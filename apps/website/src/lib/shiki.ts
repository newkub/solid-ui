import { createHighlighterCore } from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import githubDark from "@shikijs/themes/github-dark";
import githubLight from "@shikijs/themes/github-light";

const highlighter = createHighlighterCore({
	langs: [
		async () => (await import("@shikijs/langs/tsx")).default,
		async () => (await import("@shikijs/langs/typescript")).default,
		async () => (await import("@shikijs/langs/bash")).default,
		async () => (await import("@shikijs/langs/css")).default,
		async () => (await import("@shikijs/langs/json")).default,
		async () => (await import("@shikijs/langs/markdown")).default,
	],
	themes: [githubLight, githubDark],
	engine: createJavaScriptRegexEngine(),
});

export async function highlightCode(code: string, lang?: string, colorTheme: "light" | "dark" = "light") {
	const h = await highlighter;
	const mapped = lang === "tsx" || lang === "ts" ? "tsx" : lang === "text" || !lang ? "text" : lang;
	if (mapped === "text" || !h.getLoadedLanguages().includes(mapped)) {
		return `<pre class="shiki" style="background-color:${colorTheme === "dark" ? "#161b22" : "#f6f8fa"};color:${colorTheme === "dark" ? "#c9d1d9" : "#24292f"};padding:1rem;border-radius:0.5rem;overflow-x:auto"><code>${code.replace(/</g, "&lt;")}</code></pre>`;
	}
	return h.codeToHtml(code, {
		lang: mapped,
		theme: colorTheme === "dark" ? "github-dark" : "github-light",
	});
}
