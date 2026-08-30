import type { AnalyzerResult, Finding } from "@wrikka/analyze";

export type { Finding };

export interface DomainBreakdown {
	domain: string;
	checked: number;
	passed: number;
	score: number;
	grade: string;
}

export interface ReviewReport {
	totalCategories: number;
	checked: number;
	passed: number;
	score: number;
	grade: string;
	domains: DomainBreakdown[];
	findings: Finding[];
	findingsBySeverity: Record<string, number>;
	analyzerErrors: number;
	falsePositiveRate: number;
	topActionItems: string[];
}

export function gradeFromScore(score: number): string {
	if (score >= 90) return "A";
	if (score >= 80) return "B";
	if (score >= 70) return "C";
	if (score >= 60) return "D";
	return "F";
}

export function buildReport(result: AnalyzerResult): ReviewReport {
	const domains: DomainBreakdown[] = result.domains.map((d) => ({
		domain: d.domain,
		checked: d.checked,
		passed: d.passed,
		score: d.score,
		grade: gradeFromScore(d.score),
	}));

	const score = Math.round((result.passed / result.checked) * 100) || 0;
	const grade = gradeFromScore(score);

	const findingsBySeverity: Record<string, number> = {};
	for (const finding of result.findings) {
		findingsBySeverity[finding.severity] = (findingsBySeverity[finding.severity] ?? 0) + 1;
	}

	const falsePositiveRate = 0;
	const topActionItems = result.findings
		.filter((f) => f.severity === "Critical" || f.severity === "High")
		.map((f) => `${f.domain} / ${f.category}: ${f.recommendation}`)
		.slice(0, 10);

	return {
		totalCategories: result.categories.length,
		checked: result.checked,
		passed: result.passed,
		score,
		grade,
		domains,
		findings: result.findings,
		findingsBySeverity,
		analyzerErrors: result.analyzerErrors,
		falsePositiveRate,
		topActionItems,
	};
}
