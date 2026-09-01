import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import type { CategoryCheck, Finding } from "../types";

const root = process.cwd();

const sensitivePatterns = [
	{ pattern: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/, name: "private key" },
	{ pattern: /password\s*=\s*["'][^"']+["']/i, name: "password" },
	{ pattern: /api[_-]?key\s*[:=]\s*["'][^"']+["']/i, name: "API key" },
	{ pattern: /token\s*[:=]\s*["'][^"']+["']/i, name: "token" },
	{ pattern: /secret\s*[:=]\s*["'][^"']+["']/i, name: "secret" },
];

function walkDir(dir: string, files: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) {
			if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
			walkDir(full, files);
		} else if (
			stat.isFile() &&
			(full.endsWith(".ts") || full.endsWith(".tsx") || full.endsWith(".js") || full.endsWith(".json")) &&
			!entry.endsWith("-report.json")
		) {
			files.push(full);
		}
	}
	return files;
}

export async function analyzeSecurity(
	categories: CategoryCheck[],
): Promise<{ findings: Finding[]; passed: Set<string> }> {
	const findings: Finding[] = [];
	const passed = new Set<string>();
	const cats = new Map(categories.map((c) => [c.id, c]));

	try {
		const gitignore = readFileSync(join(root, ".gitignore"), "utf-8");
		const hasNodeModules = /node_modules/.test(gitignore);
		const hasDist = /dist/.test(gitignore);
		const hasEnv = /\.env/.test(gitignore);
		if (hasNodeModules && hasDist && hasEnv) passed.add("gitignore-complete");
		else {
			findings.push({
				categoryId: "gitignore-complete",
				category: cats.get("gitignore-complete")?.name ?? "",
				domain: "security",
				severity: "Low",
				message: ".gitignore incomplete",
				evidence: `node_modules: ${hasNodeModules}, dist: ${hasDist}, .env: ${hasEnv}`,
				recommendation: "Add node_modules, dist, and .env to .gitignore",
			});
		}
	} catch {
		findings.push({
			categoryId: "gitignore-complete",
			category: cats.get("gitignore-complete")?.name ?? "",
			domain: "security",
			severity: "Low",
			message: "No .gitignore",
			evidence: ".gitignore missing",
			recommendation: "Create .gitignore",
		});
	}

	if (existsSync(join(root, ".env"))) {
		findings.push({
			categoryId: "no-env-committed",
			category: cats.get("no-env-committed")?.name ?? "",
			domain: "security",
			severity: "Critical",
			message: ".env file committed",
			file: ".env",
			evidence: ".env exists",
			recommendation: "Remove .env from git and add to .gitignore",
		});
	} else {
		passed.add("no-env-committed");
	}

	const files = walkDir(root);
	for (const file of files) {
		const rel = relative(root, file);
		if (rel.endsWith("bun.lock") || rel.endsWith("package-lock.json")) continue;
		const content = readFileSync(file, "utf-8");

		for (const { pattern, name } of sensitivePatterns) {
			if (pattern.test(content)) {
				const line = content.split("\n").findIndex((l) => pattern.test(l)) + 1;
				findings.push({
					categoryId: "no-tokens",
					category: cats.get("no-tokens")?.name ?? `No ${name}`,
					domain: "security",
					severity: "High",
					message: `Possible ${name} in code`,
					file: rel,
					line,
					evidence: `${name} pattern matched in ${rel}`,
					recommendation: "Move secrets to environment variables or secret manager",
				});
			}
		}

		if (/\beval\s*\(/.test(content) || /new\s+Function\s*\(/.test(content)) {
			findings.push({
				categoryId: "no-eval",
				category: cats.get("no-eval")?.name ?? "",
				domain: "security",
				severity: "High",
				message: "Unsafe eval or new Function usage",
				file: rel,
				evidence: "eval or new Function found",
				recommendation: "Avoid dynamic code execution",
			});
		}

		if (/innerHTML\s*=/.test(content) && !/escape|trusted|shiki/.test(content)) {
			findings.push({
				categoryId: "safe-inner-html",
				category: cats.get("safe-inner-html")?.name ?? "",
				domain: "security",
				severity: "Medium",
				message: "innerHTML assigned without obvious sanitization",
				file: rel,
				evidence: "innerHTML assignment found",
				recommendation: "Ensure innerHTML content is trusted or sanitized",
			});
		}

		if (!rel.startsWith("tools") && /http:\/\//.test(content)) {
			findings.push({
				categoryId: "no-http",
				category: cats.get("no-http")?.name ?? "",
				domain: "security",
				severity: "Low",
				message: "HTTP URL found",
				file: rel,
				evidence: "http:// URL",
				recommendation: "Use https://",
			});
		}

		const basename = (rel.split(/[\\/]/).pop() ?? "").toLowerCase();
		const generatedFile = basename === "generated.ts" || basename === "generated.tsx" || basename.endsWith(".d.ts");
		const configOrTool = rel.startsWith("tools") || rel.split(/[\\/]/).includes("scripts") || rel.endsWith(".json");
		if (!generatedFile && !configOrTool && /https:\/\//.test(content)) {
			const line = content.split("\n").findIndex((l) => /https:\/\//.test(l)) + 1;
			findings.push({
				categoryId: "no-hardcoded-urls",
				category: cats.get("no-hardcoded-urls")?.name ?? "",
				domain: "security",
				severity: "Low",
				message: "Hardcoded https URL found",
				file: rel,
				line,
				evidence: `https:// URL in ${rel}`,
				recommendation: "Move URLs to configuration or constants file",
			});
		}
	}

	if (!findings.some((f) => f.categoryId === "no-private-keys")) passed.add("no-private-keys");
	if (!findings.some((f) => f.categoryId === "no-passwords")) passed.add("no-passwords");
	if (!findings.some((f) => f.categoryId === "no-tokens")) passed.add("no-tokens");
	if (!findings.some((f) => f.categoryId === "no-eval")) passed.add("no-eval");
	if (!findings.some((f) => f.categoryId === "safe-inner-html")) passed.add("safe-inner-html");
	if (!findings.some((f) => f.categoryId === "no-http")) passed.add("no-http");
	if (!findings.some((f) => f.categoryId === "no-hardcoded-urls")) passed.add("no-hardcoded-urls");
	if (!findings.some((f) => f.categoryId === "wrangler-secrets")) passed.add("wrangler-secrets");
	if (!findings.some((f) => f.categoryId === "no-secrets-logs")) passed.add("no-secrets-logs");
	if (!findings.some((f) => f.categoryId === "dependency-vulns")) passed.add("dependency-vulns");
	if (!findings.some((f) => f.categoryId === "csp")) passed.add("csp");

	return { findings, passed };
}
