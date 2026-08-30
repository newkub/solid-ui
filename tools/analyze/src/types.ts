export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface Finding {
	categoryId: string;
	category: string;
	domain: string;
	severity: Severity;
	message: string;
	evidence: string;
	file?: string;
	line?: number;
	recommendation: string;
}

export interface CategoryCheck {
	id: string;
	name: string;
	domain: string;
	description: string;
	weight: number;
}

export interface DomainResult {
	domain: string;
	categories: CategoryCheck[];
	findings: Finding[];
	checked: number;
	passed: number;
	score: number;
}

export interface AnalyzerResult {
	categories: CategoryCheck[];
	domains: DomainResult[];
	findings: Finding[];
	checked: number;
	passed: number;
	analyzerErrors: number;
}
