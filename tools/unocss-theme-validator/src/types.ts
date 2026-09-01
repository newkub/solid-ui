import type { UserConfig } from "unocss";

export interface ValidatorOptions {
	config?: UserConfig;
	configPath?: string;
	include: string[];
	exclude: string[];
	cwd: string;
	failOnError: boolean;
	verbose: boolean;
}

export type InvalidReason = "unknown-color";

export interface InvalidUsage {
	file: string;
	line: number;
	className: string;
	reason: InvalidReason;
}

export interface ValidationReport {
	files: number;
	colorClasses: number;
	invalid: InvalidUsage[];
	colorsUsed: Set<string>;
	colorsUnused: Set<string>;
}
