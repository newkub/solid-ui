import { readFile } from "node:fs/promises";
import { checkColorClass, resetGenerator } from "./engine.ts";
import { extractClassTokens, scanFiles } from "./scanner.ts";
import type { InvalidUsage, ValidationReport, ValidatorOptions } from "./types.ts";

export async function validate(options: Partial<ValidatorOptions>): Promise<ValidationReport> {
	const include = options.include ?? ["**/*.tsx"];
	const exclude = options.exclude ?? ["node_modules", "dist", ".solid", ".devin"];
	const cwd = options.cwd ?? process.cwd();

	resetGenerator();

	const allInvalid: InvalidUsage[] = [];
	let files = 0;
	let colorClasses = 0;

	for await (const file of scanFiles(include, exclude, cwd)) {
		files++;
		const text = await readFile(file, "utf-8");
		const tokens = extractClassTokens(text, file);

		for (const token of tokens) {
			const result = await checkColorClass(token.className, options.config, options.configPath);
			if (result.status === "not-color" || result.status === "unmatched") continue;
			colorClasses++;
			if (result.status === "invalid") {
				allInvalid.push({
					file,
					line: token.line,
					className: token.className,
					reason: "unknown-color",
				});
			}
		}
	}

	return {
		files,
		colorClasses,
		invalid: allInvalid,
		colorsUsed: new Set<string>(),
		colorsUnused: new Set<string>(),
	};
}
