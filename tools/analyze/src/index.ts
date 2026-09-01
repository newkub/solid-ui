import { analyzeArchitecture } from "./analyzers/architecture";
import { analyzeCodeQuality } from "./analyzers/codeQuality";
import { analyzeDependencies } from "./analyzers/dependencies";
import { analyzeDocumentation } from "./analyzers/documentation";
import { analyzeSecurity } from "./analyzers/security";
import { categories, domains } from "./categories";
import type { AnalyzerResult, DomainResult, Finding } from "./types";

export * from "./types";

type AnalyzerOutput = { findings: Finding[]; passed: Set<string> };

async function runSafe(
	name: string,
	domain: string,
	fn: (cats: typeof categories) => Promise<AnalyzerOutput>,
	cats: typeof categories,
	log: { errors: number },
): Promise<AnalyzerOutput> {
	try {
		return await fn(cats);
	} catch (err) {
		log.errors++;
		const message = err instanceof Error ? err.message : String(err);
		return {
			findings: [
				{
					categoryId: `${name}-error`,
					category: `${name} analyzer error`,
					domain,
					severity: "High",
					message: `${name} analyzer crashed`,
					evidence: message,
					recommendation: "Fix analyzer implementation and re-run",
				},
			],
			passed: new Set<string>(),
		};
	}
}

export async function runAllAnalyzers(): Promise<AnalyzerResult> {
	const log = { errors: 0 };
	const [codeQuality, architecture, dependencies, security, documentation] = await Promise.all([
		runSafe("code-quality", "code-quality", analyzeCodeQuality, categories, log),
		runSafe("architecture", "architecture", analyzeArchitecture, categories, log),
		runSafe("dependencies", "dependencies", analyzeDependencies, categories, log),
		runSafe("security", "security", analyzeSecurity, categories, log),
		runSafe("documentation", "documentation", analyzeDocumentation, categories, log),
	]);

	const allFindings: Finding[] = [
		...codeQuality.findings,
		...architecture.findings,
		...dependencies.findings,
		...security.findings,
		...documentation.findings,
	];

	const passed = new Set<string>([
		...codeQuality.passed,
		...architecture.passed,
		...dependencies.passed,
		...security.passed,
		...documentation.passed,
	]);

	const analyzerErrors = log.errors;
	const domainResults: DomainResult[] = [];

	for (const domain of domains) {
		const domainCats = categories.filter((c) => c.domain === domain);
		const domainFindings = allFindings.filter((f) => f.domain === domain);
		const passedCount = domainCats.filter((c) => passed.has(c.id)).length;
		domainResults.push({
			domain,
			categories: domainCats,
			findings: domainFindings,
			checked: domainCats.length,
			passed: passedCount,
			score: domainCats.length ? Math.round((passedCount / domainCats.length) * 100) : 0,
		});
	}

	return {
		categories,
		domains: domainResults,
		findings: allFindings,
		checked: categories.length,
		passed: passed.size,
		analyzerErrors,
	};
}
