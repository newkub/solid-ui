import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { CategoryCheck, Finding } from "../types";
import { runShell } from "./shell";

const root = process.cwd();

function walkDir(dir: string, files: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) {
			if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
			walkDir(full, files);
		} else if (stat.isFile() && (full.endsWith(".ts") || full.endsWith(".tsx")) && !entry.endsWith("-report.json")) {
			files.push(full);
		}
	}
	return files;
}

export async function analyzeCodeQuality(
	categories: CategoryCheck[],
): Promise<{ findings: Finding[]; passed: Set<string> }> {
	const findings: Finding[] = [];
	const passed = new Set<string>();
	const cats = new Map(categories.map((c) => [c.id, c]));

	const typecheck = await runShell("bun", ["run", "--filter", "*", "typecheck"], root);
	if (typecheck.exitCode === 0) {
		passed.add("typecheck-pass");
	} else {
		findings.push({
			categoryId: "typecheck-pass",
			category: cats.get("typecheck-pass")?.name ?? "",
			domain: "code-quality",
			severity: "High",
			message: "TypeScript typecheck failed",
			evidence: typecheck.stdout.slice(0, 500) || typecheck.stderr.slice(0, 500),
			recommendation: "Run `bun run typecheck` and fix reported errors",
		});
	}

	const lint = await runShell("bun", ["x", "biome", "check", "packages", "apps", "tools"], root);
	if (lint.exitCode === 0) {
		passed.add("lint-pass");
	} else {
		findings.push({
			categoryId: "lint-pass",
			category: cats.get("lint-pass")?.name ?? "",
			domain: "code-quality",
			severity: "Medium",
			message: "Lint check failed",
			evidence: lint.stdout.slice(0, 500) || lint.stderr.slice(0, 500),
			recommendation: "Run `bun run lint` and address errors",
		});
	}

	const build = await runShell("bun", ["run", "--filter", "@wrikka/website", "build"], root);
	if (build.exitCode === 0) {
		passed.add("build-pass");
	} else {
		findings.push({
			categoryId: "build-pass",
			category: cats.get("build-pass")?.name ?? "",
			domain: "code-quality",
			severity: "High",
			message: "Website build failed",
			evidence: build.stdout.slice(0, 500) || build.stderr.slice(0, 500),
			recommendation: "Fix build errors for website package",
		});
	}

	let testCount = 0;
	let anyFile = false;
	let maxFileLines = 0;
	let hugeFile = "";
	const files = walkDir(root);
	for (const file of files) {
		anyFile = true;
		const rel = relative(root, file);
		const content = readFileSync(file, "utf-8");
		const lines = content.split("\n").length;
		if (lines > maxFileLines) {
			maxFileLines = lines;
			hugeFile = rel;
		}
		const basename = (rel.split(/[\\/]/).pop() ?? "").toLowerCase();
		const generated = basename === "generated.ts" || basename === "generated.tsx" || basename.endsWith(".d.ts");
		if (!generated && lines > 500) {
			findings.push({
				categoryId: "no-huge-files",
				category: cats.get("no-huge-files")?.name ?? "",
				domain: "architecture",
				severity: "Low",
				message: `File exceeds 500 lines`,
				file: rel,
				evidence: `${rel} has ${lines} lines`,
				recommendation: "Split large files into smaller modules",
			});
		}

		const anyRe = /(?<![A-Za-z0-9_])(?::\s*|as\s+|,\s*)?any\b(?=\s*[\[\]>;{},)\|&\n]|$)/g;
		const anyReNoG = /(?<![A-Za-z0-9_])(?::\s*|as\s+|,\s*)?any\b(?=\s*[\[\]>;{},)\|&\n]|$)/;
		const anyMatch = anyReNoG.test(content);
		if (anyMatch) {
			const linesArr = content.split("\n");
			const line = linesArr.findIndex((l) => anyReNoG.test(l)) + 1;
			findings.push({
				categoryId: "no-explicit-any",
				category: cats.get("no-explicit-any")?.name ?? "",
				domain: "code-quality",
				severity: "Medium",
				message: `Explicit any found`,
				file: rel,
				line,
				evidence: `any used in ${rel}`,
				recommendation: "Replace any with a more specific type",
			});
		}

		const nonNullRe = /(?<=[A-Za-z0-9_)\]])\s*!(?=[\s\n.;,)\]}]|$)/g;
		const nonNullMatch = nonNullRe.test(content);
		if (nonNullMatch) {
			const linesArr = content.split("\n");
			const line = linesArr.findIndex((l) => nonNullRe.test(l)) + 1;
			findings.push({
				categoryId: "no-non-null-assertion",
				category: cats.get("no-non-null-assertion")?.name ?? "",
				domain: "code-quality",
				severity: "Low",
				message: `Non-null assertion found`,
				file: rel,
				line,
				evidence: `! used in ${rel}`,
				recommendation: "Use optional chaining or runtime checks",
			});
		}

		if (/^\s*debugger\s*;/m.test(content)) {
			findings.push({
				categoryId: "no-debugger",
				category: cats.get("no-debugger")?.name ?? "",
				domain: "code-quality",
				severity: "Medium",
				message: `debugger statement found`,
				file: rel,
				evidence: `debugger; in ${rel}`,
				recommendation: "Remove debugger statements",
			});
		}

		if (rel.endsWith(".test.ts") || rel.endsWith(".spec.ts")) {
			testCount++;
		}
	}

	if (anyFile && maxFileLines <= 500) passed.add("no-huge-files");
	const hugeBasename = (hugeFile.split(/[\\/]/).pop() ?? "").toLowerCase();
	if (maxFileLines <= 250 || hugeBasename === "generated.ts" || hugeBasename === "generated.tsx")
		passed.add("max-file-length");
	else {
		findings.push({
			categoryId: "max-file-length",
			category: cats.get("max-file-length")?.name ?? "",
			domain: "code-quality",
			severity: "Low",
			message: `File exceeds 250 lines`,
			file: hugeFile,
			evidence: `${hugeFile} has ${maxFileLines} lines`,
			recommendation: "Refactor large files",
		});
	}

	if (testCount > 0) passed.add("test-coverage");
	else {
		findings.push({
			categoryId: "test-coverage",
			category: cats.get("test-coverage")?.name ?? "",
			domain: "code-quality",
			severity: "Medium",
			message: "No test files found",
			evidence: "No .test.ts or .spec.ts files",
			recommendation: "Add unit or integration tests",
		});
	}

	try {
		const tsconfig = readFileSync(join(root, "tsconfig.base.json"), "utf-8");
		if (tsconfig.includes('"strict": true')) passed.add("strict-tsconfig");
		else
			findings.push({
				categoryId: "strict-tsconfig",
				category: cats.get("strict-tsconfig")?.name ?? "",
				domain: "code-quality",
				severity: "Medium",
				message: "tsconfig not strict",
				evidence: "strict is false or missing",
				recommendation: "Enable strict mode",
			});
	} catch {
		findings.push({
			categoryId: "strict-tsconfig",
			category: cats.get("strict-tsconfig")?.name ?? "",
			domain: "code-quality",
			severity: "Medium",
			message: "No tsconfig.base.json",
			evidence: "tsconfig.base.json missing",
			recommendation: "Add a strict tsconfig.base.json",
		});
	}

	if (!findings.some((f) => f.categoryId === "no-debugger")) passed.add("no-debugger");

	return { findings, passed };
}
