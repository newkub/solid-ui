import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
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
	let nonGeneratedMaxFileLines = 0;
	let nonGeneratedHugeFile = "";
	const files = walkDir(root);
	for (const file of files) {
		anyFile = true;
		const rel = relative(root, file);
		const content = readFileSync(file, "utf-8");
		const lines = content.split("\n").length;
		const basename = (rel.split(/[\\/]/).pop() ?? "").toLowerCase();
		const isGeneratedFile = basename === "generated.ts" || basename === "generated.tsx" || basename.endsWith(".d.ts");
		if (!isGeneratedFile && lines > nonGeneratedMaxFileLines) {
			nonGeneratedMaxFileLines = lines;
			nonGeneratedHugeFile = rel;
		}
		if (!isGeneratedFile && lines > 500) {
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

		const anyRe = /(?<![A-Za-z0-9_])(?::\s*|as\s+|,\s*)?any\b(?=\s*[[\]>;{},)|&\n]|$)/;
		const anyMatch = anyRe.test(content);
		if (anyMatch) {
			const linesArr = content.split("\n");
			const line = linesArr.findIndex((l) => anyRe.test(l)) + 1;
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

		const relSlash = rel.replace(/\\/g, "/");
		const isConsoleLogExcluded =
			relSlash.startsWith("tools/") ||
			relSlash.startsWith("apps/cli/") ||
			relSlash.startsWith("examples/") ||
			relSlash.includes("/scripts/") ||
			relSlash.endsWith(".test.ts") ||
			relSlash.endsWith(".spec.ts");
		if (!isConsoleLogExcluded && /\bconsole\.log\s*\(/.test(content)) {
			const linesArr = content.split("\n");
			const line = linesArr.findIndex((l) => /\bconsole\.log\s*\(/.test(l)) + 1;
			findings.push({
				categoryId: "no-console-log",
				category: cats.get("no-console-log")?.name ?? "",
				domain: "code-quality",
				severity: "Low",
				message: `console.log found`,
				file: rel,
				line,
				evidence: `console.log in ${rel}`,
				recommendation: "Remove debug logging",
			});
		}

		if (rel.endsWith(".test.ts") || rel.endsWith(".spec.ts")) {
			testCount++;
		}
	}

	if (anyFile && nonGeneratedMaxFileLines <= 500) passed.add("no-huge-files");
	if (nonGeneratedMaxFileLines <= 250) passed.add("max-file-length");
	else {
		findings.push({
			categoryId: "max-file-length",
			category: cats.get("max-file-length")?.name ?? "",
			domain: "code-quality",
			severity: "Low",
			message: `File exceeds 250 lines`,
			file: nonGeneratedHugeFile,
			evidence: `${nonGeneratedHugeFile} has ${nonGeneratedMaxFileLines} lines`,
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

	if (!findings.some((f) => f.categoryId === "no-explicit-any")) passed.add("no-explicit-any");

	if (!findings.some((f) => f.categoryId === "no-non-null-assertion")) passed.add("no-non-null-assertion");

	if (!findings.some((f) => f.categoryId === "no-console-log")) passed.add("no-console-log");

	await checkUnusedVars(root, cats, findings);
	await checkDuplicateCode(root, cats, findings);
	await checkMaxFunctionLength(root, cats, findings);
	await checkPackageBuilds(root, cats, findings);
	checkPackageTests(root, cats, findings);

	if (!findings.some((f) => f.categoryId === "no-unused-vars")) passed.add("no-unused-vars");
	if (!findings.some((f) => f.categoryId === "no-duplicate-code")) passed.add("no-duplicate-code");
	if (!findings.some((f) => f.categoryId === "max-function-length")) passed.add("max-function-length");
	if (!findings.some((f) => f.categoryId === "package-builds")) passed.add("package-builds");
	if (!findings.some((f) => f.categoryId === "package-tests")) passed.add("package-tests");

	return { findings, passed };
}

async function checkUnusedVars(root: string, cats: Map<string, CategoryCheck>, findings: Finding[]) {
	const tsconfigs: string[] = [];
	for (const ws of ["packages", "apps", "tools"]) {
		const wsPath = join(root, ws);
		if (!existsSync(wsPath)) continue;
		for (const entry of readdirSync(wsPath)) {
			const tsconfigPath = join(wsPath, entry, "tsconfig.json");
			if (existsSync(tsconfigPath)) tsconfigs.push(tsconfigPath);
		}
	}

	const failing: string[] = [];
	await Promise.all(
		tsconfigs.map(async (tsconfigPath) => {
			const result = await runShell(
				"bunx",
				["tsc", "--noEmit", "--noUnusedLocals", "--noUnusedParameters", "-p", tsconfigPath],
				root,
			);
			if (result.exitCode !== 0) {
				failing.push(`${relative(root, tsconfigPath)}: ${result.stdout.slice(0, 120) || result.stderr.slice(0, 120)}`);
			}
		}),
	);

	if (failing.length > 0) {
		findings.push({
			categoryId: "no-unused-vars",
			category: cats.get("no-unused-vars")?.name ?? "",
			domain: "code-quality",
			severity: "Medium",
			message: `Unused variables or parameters found in ${failing.length} workspace(s)`,
			evidence: failing.join("; ").slice(0, 500),
			recommendation: "Remove unused variables or enable stricter tsconfig checks",
		});
	}
}

async function checkDuplicateCode(root: string, cats: Map<string, CategoryCheck>, findings: Finding[]) {
	const tmpDir = mkdtempSync(join(tmpdir(), "jscpd-"));
	const reportPath = join(tmpDir, "jscpd-report.json");
	await runShell(
		"bunx",
		[
			"jscpd",
			"--min-lines",
			"5",
			"--min-tokens",
			"25",
			"--reporters",
			"json",
			"--output",
			tmpDir,
			"packages",
			"apps",
			"tools",
		],
		root,
	);
	let percentage = 0;
	try {
		const report = JSON.parse(readFileSync(reportPath, "utf-8")) as {
			statistics?: { total?: { percentage?: number } };
		};
		percentage = report.statistics?.total?.percentage ?? 0;
	} catch {
		// ignore missing/invalid report
	} finally {
		try {
			rmSync(tmpDir, { recursive: true, force: true });
		} catch {
			// ignore cleanup errors
		}
	}

	if (percentage > 5) {
		findings.push({
			categoryId: "no-duplicate-code",
			category: cats.get("no-duplicate-code")?.name ?? "",
			domain: "code-quality",
			severity: "Medium",
			message: `High code duplication detected (${percentage.toFixed(2)}%)`,
			evidence: `jscpd reported ${percentage.toFixed(2)}% duplicated lines across packages/apps/tools`,
			recommendation: "Extract shared helpers or use factories to reduce duplication",
		});
	}
}

async function checkMaxFunctionLength(root: string, cats: Map<string, CategoryCheck>, findings: Finding[]) {
	const result = await runShell(
		"ast-grep",
		["run", "-p", "function $NAME($$$ARGS) { $$$BODY }", "--json", "packages", "apps", "tools"],
		root,
	);
	if (result.exitCode !== 0 && result.stdout.trim() === "") return;

	let matches: Array<{
		file?: string;
		range?: { start?: { line?: number }; end?: { line?: number } };
		metaVariables?: { single?: { NAME?: { text?: string } } };
	}> = [];
	try {
		matches = JSON.parse(result.stdout) as typeof matches;
	} catch {
		return;
	}

	const longFunctions: string[] = [];
	for (const match of matches) {
		const start = match.range?.start?.line ?? 0;
		const end = match.range?.end?.line ?? 0;
		const length = end - start + 1;
		if (length > 60) {
			const name = match.metaVariables?.single?.NAME?.text ?? "anonymous";
			const file = match.file ?? "unknown";
			longFunctions.push(`${file}: ${name} (${length} lines)`);
			if (longFunctions.length >= 10) break;
		}
	}

	if (longFunctions.length > 0) {
		findings.push({
			categoryId: "max-function-length",
			category: cats.get("max-function-length")?.name ?? "",
			domain: "code-quality",
			severity: "Low",
			message: `${longFunctions.length} function(s) exceed 60 lines`,
			evidence: longFunctions.join("; ").slice(0, 500),
			recommendation: "Refactor long functions into smaller helpers",
		});
	}
}

async function checkPackageBuilds(root: string, cats: Map<string, CategoryCheck>, findings: Finding[]) {
	const result = await runShell("bun", ["run", "--filter", "./packages/*", "build"], root);
	if (result.exitCode === 0) return;

	const failed: string[] = [];
	const regex = /^(@[\w/-]+)\s+build:\s+Exited with code (\d+)$/gm;
	let m: RegExpExecArray | null = regex.exec(result.stdout);
	while (m !== null) {
		if (Number(m[2]) !== 0) failed.push(m[1]);
		m = regex.exec(result.stdout);
	}

	findings.push({
		categoryId: "package-builds",
		category: cats.get("package-builds")?.name ?? "",
		domain: "code-quality",
		severity: "High",
		message: `Package build(s) failed: ${failed.join(", ") || "unknown"}`,
		evidence: result.stdout.slice(0, 500),
		recommendation: "Fix package build errors and ensure all optional peer deps are installed",
	});
}

function checkPackageTests(root: string, cats: Map<string, CategoryCheck>, findings: Finding[]) {
	const skipped: string[] = [];
	const packagesPath = join(root, "packages");
	if (!existsSync(packagesPath)) return;

	for (const entry of readdirSync(packagesPath)) {
		const pkgJsonPath = join(packagesPath, entry, "package.json");
		if (!existsSync(pkgJsonPath)) continue;
		try {
			const pkg = JSON.parse(readFileSync(pkgJsonPath, "utf-8")) as { scripts?: { test?: string } };
			if (!pkg.scripts?.test || pkg.scripts.test.includes("test skipped")) {
				skipped.push(entry);
			}
		} catch {
			// ignore invalid package.json
		}
	}

	if (skipped.length > 0) {
		findings.push({
			categoryId: "package-tests",
			category: cats.get("package-tests")?.name ?? "",
			domain: "code-quality",
			severity: "Medium",
			message: `${skipped.length} package(s) have no real tests`,
			evidence: `Packages with skipped/missing tests: ${skipped.join(", ")}`,
			recommendation: "Add test suites to all library packages",
		});
	}
}
