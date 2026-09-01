import { createSignal, For, Show } from "solid-js";

export interface VibeEntry {
	id: string;
	type: "user" | "system" | "action" | "observation";
	message: string;
	timestamp: number;
}

const STORAGE_KEY = "solid-ui-vibe-logs";

function loadEntries(): VibeEntry[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) return JSON.parse(raw) as VibeEntry[];
	} catch {}
	return [];
}

function saveEntries(entries: VibeEntry[]) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
	} catch {}
}

function exportMarkdown(entries: VibeEntry[]) {
	const lines = [
		"# solid-ui vibe coding log",
		"",
		"This file is a human/AI-readable transcript of user instructions, system observations, and intended actions.",
		"",
		"| Time | Type | Message |",
		"|------|------|---------|",
	];
	for (const entry of entries) {
		const time = new Date(entry.timestamp).toISOString();
		lines.push(`| ${time} | ${entry.type} | ${entry.message.replace(/\|/g, "\\|")} |`);
	}
	return lines.join("\n");
}

function downloadFile(filename: string, content: string, type: string) {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}

export function VibeCoding() {
	const [entries, setEntries] = createSignal<VibeEntry[]>(loadEntries());
	const [input, setInput] = createSignal("");
	const [copied, setCopied] = createSignal(false);

	function add(type: VibeEntry["type"]) {
		const message = input().trim();
		if (!message) return;
		const next: VibeEntry = {
			id: crypto.randomUUID(),
			type,
			message,
			timestamp: Date.now(),
		};
		const updated = [next, ...entries()];
		setEntries(updated);
		saveEntries(updated);
		setInput("");
	}

	function clear() {
		setEntries([]);
		saveEntries([]);
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(exportMarkdown(entries()));
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	}

	function download() {
		downloadFile("feedback.md", exportMarkdown(entries()), "text/markdown");
	}

	return (
		<div class="space-y-3 text-sm">
			<div class="rounded-lg border border-border bg-background p-2">
				<div class="flex flex-col gap-2">
					<textarea
						value={input()}
						onInput={(e) => setInput(e.currentTarget.value)}
						placeholder="Type instructions, observations, or actions for the AI to watch..."
						class="h-20 w-full resize-none rounded-md border border-border bg-surface p-2 text-sm text-foreground outline-none focus-visible:ring-1 focus-visible:ring-ring"
					/>
					<div class="flex flex-wrap gap-2">
						<button
							type="button"
							onClick={() => add("user")}
							class="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary-hover"
						>
							Add instruction
						</button>
						<button
							type="button"
							onClick={() => add("observation")}
							class="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted"
						>
							Add log
						</button>
						<button
							type="button"
							onClick={copy}
							class="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted"
						>
							{copied() ? "Copied" : "Copy markdown"}
						</button>
						<button
							type="button"
							onClick={download}
							class="inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground hover:bg-muted"
						>
							Download feedback.md
						</button>
						<button
							type="button"
							onClick={clear}
							class="ml-auto inline-flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-muted-foreground hover:bg-muted"
						>
							Clear
						</button>
					</div>
				</div>
			</div>

			<div class="max-h-48 space-y-1.5 overflow-y-auto rounded-lg border border-border bg-background p-2">
				<Show
					when={entries().length > 0}
					fallback={
						<p class="py-4 text-center text-xs text-muted-foreground">
							No entries yet. Add the first instruction or observation.
						</p>
					}
				>
					<For each={entries()}>
						{(entry) => (
							<div
								class={`rounded-md border-l-2 p-2 text-xs ${
									entry.type === "user"
										? "border-primary bg-primary/5"
										: entry.type === "action"
											? "border-warning bg-warning/5"
											: entry.type === "observation"
												? "border-info bg-info/5"
												: "border-border bg-muted"
								}`}
							>
								<div class="mb-1 flex items-center justify-between">
									<span class="font-semibold uppercase tracking-wide text-muted-foreground">{entry.type}</span>
									<span class="text-[10px] text-muted-foreground">
										{new Date(entry.timestamp).toLocaleTimeString()}
									</span>
								</div>
								<p class="whitespace-pre-wrap text-foreground">{entry.message}</p>
							</div>
						)}
					</For>
				</Show>
			</div>
		</div>
	);
}
