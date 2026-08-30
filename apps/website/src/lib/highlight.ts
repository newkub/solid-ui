import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("text", plaintext);

export function highlightCode(code: string, lang?: string) {
	const mapped = lang === "tsx" || lang === "ts" ? "typescript" : lang === "text" || !lang ? "text" : lang;
	if (mapped && hljs.getLanguage(mapped)) {
		return hljs.highlight(code, { language: mapped }).value;
	}
	return hljs.highlightAuto(code).value;
}

export { hljs };
