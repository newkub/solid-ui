export type InlineNode =
	| { type: "text"; text: string }
	| { type: "bold"; children: InlineNode[] }
	| { type: "italic"; children: InlineNode[] }
	| { type: "code"; text: string }
	| { type: "link"; href: string; children: InlineNode[] };

export type BlockNode =
	| { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; children: InlineNode[] }
	| { type: "paragraph"; children: InlineNode[] }
	| { type: "list"; ordered: boolean; items: InlineNode[][] }
	| { type: "code"; lang: string; code: string }
	| { type: "blockquote"; children: BlockNode[] }
	| { type: "rule" };

export function parseInline(text: string): InlineNode[] {
	const nodes: InlineNode[] = [];
	let pos = 0;

	const patterns: {
		re: RegExp;
		type: "bold" | "italic" | "code" | "link";
		content: (m: RegExpExecArray) => string | { href: string; text: string };
	}[] = [
		{
			re: /\*\*(.+?)\*\*/,
			type: "bold",
			content: (m) => m[1],
		},
		{
			re: /\*(.+?)\*/,
			type: "italic",
			content: (m) => m[1],
		},
		{
			re: /`([^`]+)`/,
			type: "code",
			content: (m) => m[1],
		},
		{
			re: /\[([^\]]+)\]\(([^)]+)\)/,
			type: "link",
			content: (m) => ({ href: m[2], text: m[1] }),
		},
	];

	while (pos < text.length) {
		let earliest: {
			type: InlineNode["type"];
			content: string | { href: string; text: string };
			start: number;
			end: number;
		} | null = null;
		for (const pat of patterns) {
			const sub = text.slice(pos);
			pat.re.lastIndex = 0;
			const m = pat.re.exec(sub);
			if (m) {
				const start = pos + m.index;
				if (!earliest || start < earliest.start) {
					earliest = { type: pat.type, content: pat.content(m), start, end: start + m[0].length };
				}
			}
		}
		if (!earliest) break;
		if (earliest.start > pos) {
			nodes.push({ type: "text", text: text.slice(pos, earliest.start) });
		}
		if (earliest.type === "code") {
			nodes.push({ type: "code", text: earliest.content as string });
		} else if (earliest.type === "link") {
			const link = earliest.content as { href: string; text: string };
			nodes.push({ type: "link", href: link.href, children: parseInline(link.text) });
		} else if (earliest.type === "bold") {
			nodes.push({ type: "bold", children: parseInline(earliest.content as string) });
		} else if (earliest.type === "italic") {
			nodes.push({ type: "italic", children: parseInline(earliest.content as string) });
		}
		pos = earliest.end;
	}

	if (pos < text.length) {
		nodes.push({ type: "text", text: text.slice(pos) });
	}

	return nodes;
}

function trimCodeIndent(code: string) {
	const lines = code.split("\n");
	const nonBlank = lines.filter((l) => l.trim() !== "");
	if (nonBlank.length === 0) return code.trim();
	const indents = nonBlank.map((l) => l.match(/^\s*/)?.[0].length ?? 0);
	const min = Math.min(...indents);
	return lines
		.map((l, i) => {
			if (i === 0 && l.trim() === "") return "";
			if (i === lines.length - 1 && l.trim() === "") return "";
			return l.slice(min);
		})
		.join("\n")
		.trim();
}

export function parseMarkdown(source: string): BlockNode[] {
	const blocks: BlockNode[] = [];
	const lines = source.split("\n");
	let i = 0;

	function readParagraph(start: number): { end: number; text: string } {
		const parts: string[] = [];
		let j = start;
		while (j < lines.length && lines[j].trim() !== "") {
			parts.push(lines[j]);
			j++;
		}
		return { end: j, text: parts.join(" ").trim() };
	}

	while (i < lines.length) {
		const line = lines[i];
		if (line.trim() === "") {
			i++;
			continue;
		}

		const heading = line.match(/^(#{1,6})\s+(.+)$/);
		if (heading) {
			blocks.push({
				type: "heading",
				level: heading[1].length as 1 | 2 | 3 | 4 | 5 | 6,
				children: parseInline(heading[2].trim()),
			});
			i++;
			continue;
		}

		if (line.startsWith("```")) {
			const fence = line.match(/^```(.*)$/);
			const lang = (fence?.[1] ?? "").trim();
			const codeLines: string[] = [];
			let j = i + 1;
			while (j < lines.length && !lines[j].startsWith("```")) {
				codeLines.push(lines[j]);
				j++;
			}
			blocks.push({ type: "code", lang: lang || "text", code: trimCodeIndent(codeLines.join("\n")) });
			i = j + 1;
			continue;
		}

		const hr = line.match(/^---+\s*$|^\*\*\*+\s*$/);
		if (hr) {
			blocks.push({ type: "rule" });
			i++;
			continue;
		}

		const blockquote = line.match(/^>\s?(.*)$/);
		if (blockquote) {
			const quoteLines: string[] = [];
			let j = i;
			while (j < lines.length) {
				const m = lines[j].match(/^>\s?(.*)$/);
				if (!m) break;
				quoteLines.push(m[1]);
				j++;
			}
			const children = parseMarkdown(quoteLines.join("\n"));
			blocks.push({ type: "blockquote", children });
			i = j;
			continue;
		}

		const unordered = line.match(/^[-*]\s+(.+)$/);
		const ordered = line.match(/^\d+\.\s+(.+)$/);
		if (unordered || ordered) {
			const isOrdered = !!ordered;
			const items: InlineNode[][] = [];
			const markerRe = isOrdered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;
			let j = i;
			let current: string[] = [];
			while (j < lines.length) {
				const m = lines[j].match(markerRe);
				if (m) {
					if (current.length > 0) {
						items.push(parseInline(current.join(" ").trim()));
					}
					current = [m[1]];
				} else if (
					lines[j].trim() === "" ||
					lines[j].match(/^>/) ||
					lines[j].match(/^[#*`-]/) ||
					lines[j].match(/^\d+\./)
				) {
					break;
				} else {
					current.push(lines[j].trimStart());
				}
				j++;
			}
			if (current.length > 0) {
				items.push(parseInline(current.join(" ").trim()));
			}
			blocks.push({ type: "list", ordered: isOrdered, items });
			i = j;
			continue;
		}

		const p = readParagraph(i);
		blocks.push({ type: "paragraph", children: parseInline(p.text) });
		i = p.end;
	}

	return blocks;
}
