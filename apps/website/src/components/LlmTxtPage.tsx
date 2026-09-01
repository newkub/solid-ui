import { createMemo } from "solid-js";
import { buildLlmTxt } from "../lib/llmTxt";
import { CopyButton } from "./CopyButton";
import { Seo } from "./Seo";

const LLM_TXT_DESCRIPTION =
	"Machine-readable summary of the solid-ui monorepo — tech stack, commands, docs, and components — for LLMs and AI agents.";

function LlmTxtActions(props: { content: string }) {
	const href = createMemo(() => `data:text/plain;charset=utf-8,${encodeURIComponent(props.content)}`);

	return (
		<div class="flex flex-wrap items-center gap-2">
			<CopyButton
				text={props.content}
				label="Copy llm.txt"
				copiedLabel="Copied!"
				class="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
			/>
			<a
				href={href()}
				download="llm.txt"
				class="inline-flex h-9 items-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted"
			>
				Download raw
			</a>
			<a
				href="/llm.txt"
				class="inline-flex h-9 items-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted"
			>
				Open /llm.txt
			</a>
		</div>
	);
}

export function LlmTxtPage() {
	const content = createMemo(() => buildLlmTxt());

	return (
		<section class="page mx-auto max-w-4xl">
			<Seo title="llm.txt — solid-ui" description={LLM_TXT_DESCRIPTION} path="/llm" />
			<header class="mb-6">
				<h1 class="text-3xl font-bold tracking-tight">llm.txt</h1>
				<p class="mt-2 text-sm text-muted-foreground">
					A machine-readable summary of the solid-ui monorepo for LLMs and AI agents. The same content is served
					statically at <code class="rounded bg-muted px-1.5 py-0.5">/llm.txt</code>.
				</p>
			</header>
			<div class="mb-4">
				<LlmTxtActions content={content()} />
			</div>
			<label class="mb-2 block text-sm font-medium text-foreground" for="llm-txt-output">
				Full content
			</label>
			<textarea
				id="llm-txt-output"
				readonly
				rows={28}
				class="w-full resize-y rounded-xl border border-border bg-surface p-4 font-mono text-xs leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
				value={content()}
			/>
		</section>
	);
}
