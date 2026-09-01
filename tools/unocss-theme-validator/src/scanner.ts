import { readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

export interface ScannedToken {
	file: string;
	line: number;
	className: string;
}

const stringPatterns = [
	/class\s*=\s*(["'])(.*?)\1/gs,
	/class\s*=\s*\{\s*(["'])(.*?)\2\s*\}/gs,
	/class\s*=\s*\{\s*`([\s\S]*?)`\s*\}/g,
	/(?:const|let|var)\s+\w+\s*=\s*(["'])(.*?)\1/gs,
	/(?:const|let|var)\s+\w+\s*=\s*`([\s\S]*?)`/g,
];

function globToRegex(pattern: string): RegExp {
	const normalized = pattern.replace(/\\/g, "/").replace(/^\//, "").replace(/\/$/, "");
	const escaped = normalized
		.replace(/\*\*/g, "{{GLOBSTAR}}")
		.replace(/\*/g, "[^/]*")
		.replace(/\?/g, ".")
		.replace(/\./g, "\\.")
		.replace(/\{\{GLOBSTAR\}\}/g, ".*");
	return new RegExp(`^${escaped}$`);
}

async function* walkDir(dir: string, base: string, excludes: RegExp[]): AsyncGenerator<string> {
	let entries: string[];
	try {
		entries = await readdir(dir);
	} catch {
		return;
	}
	for (const entry of entries) {
		if (entry === "node_modules" || entry === ".git" || entry === "dist" || entry === ".solid") continue;
		const full = resolve(dir, entry);
		const rel = full.slice(base.length + 1).replace(/\\/g, "/");
		if (excludes.some((e) => e.test(rel))) continue;
		try {
			const s = await stat(full);
			if (s.isDirectory()) {
				yield* walkDir(full, base, excludes);
			} else if (s.isFile()) {
				yield rel;
			}
		} catch {}
	}
}

export async function* scanFiles(patterns: string[], exclude: string[], cwd: string): AsyncGenerator<string> {
	const base = resolve(cwd);
	const regexes = patterns.map(globToRegex);
	const excludes = exclude.map((e) => new RegExp(e.replace(/\*/g, ".*").replace(/\./g, "\\.")));

	for await (const rel of walkDir(base, base, excludes)) {
		for (const re of regexes) {
			if (re.test(rel)) {
				yield resolve(cwd, rel);
				break;
			}
		}
	}
}

function splitClassString(value: string): string[] {
	return value
		.replace(/\$\{[^}]*\}/g, "")
		.split(/\s+/)
		.map((t) => t.trim())
		.filter(Boolean);
}

export function extractClassTokens(text: string, file: string): ScannedToken[] {
	const tokens: ScannedToken[] = [];

	function lineNumber(index: number): number {
		return text.slice(0, index).split("\n").length;
	}

	for (const pattern of stringPatterns) {
		for (const match of text.matchAll(pattern)) {
			const value = match[match.length - 1] ?? "";
			const line = lineNumber(match.index ?? 0);
			for (const token of splitClassString(value)) {
				tokens.push({ file, line, className: token });
			}
		}
	}

	return tokens;
}
