import { analyzeArchitecture } from "./analyzers/architecture";
import { analyzeCodeQuality } from "./analyzers/codeQuality";
import { analyzeDependencies } from "./analyzers/dependencies";
import { analyzeDocumentation } from "./analyzers/documentation";
import { analyzeSecurity } from "./analyzers/security";
import { categories, domains } from "./categories";
import type { AnalyzerResult, DomainResult, Finding } from "./types";

export * from "./types";

export async function runAllAnalyzers(): Promise<AnalyzerResult> {
	const [codeQuality, architecture, dependencies, security, documentation] = await Promise.all([
		analyzeCodeQuality(categories),
		analyzeArchitecture(categories),
		analyzeDependencies(categories),
		analyzeSecurity(categories),
		analyzeDocumentation(categories),
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

	const analyzerErrors = 0;
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
