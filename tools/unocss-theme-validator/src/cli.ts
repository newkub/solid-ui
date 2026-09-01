#!/usr/bin/env bun
import { resolve } from "node:path";
import type { ValidatorOptions } from "./types.ts";
import { validate } from "./validator.ts";

const args = process.argv.slice(2);

function hasFlag(...flags: string[]) {
	return flags.some((f) => args.includes(f));
}

function nextValue(...flags: string[]) {
	for (const f of flags) {
		const idx = args.indexOf(f);
		if (idx !== -1 && idx + 1 < args.length) {
			return args[idx + 1];
		}
	}
	return undefined;
}

if (hasFlag("--help", "-h")) {
	console.log("unocss-theme-validator");
	console.log();
	console.log("Validate .tsx class names against UnoCSS theme colors.");
	console.log();
	console.log("Usage:");
	console.log("  bun run tools/unocss-theme-validator/src/cli.ts [options]");
	console.log("  bun run unocss-theme-validator");
	console.log();
	console.log("Options:");
	console.log("  --config, -c     path to uno.config.ts (default: ./uno.config.ts)");
	console.log("  --include, -i    glob pattern(s) to scan (default: **/*.tsx)");
	console.log("  --exclude, -e    glob pattern(s) to exclude");
	console.log("  --cwd            working directory (default: current)");
	console.log("  --fail           exit with non-zero on invalid classes");
	console.log("  --json, -j       output JSON report");
	console.log("  --help, -h       show help");
	process.exit(0);
}

async function main() {
	const configPath = nextValue("--config", "-c") ?? "./uno.config.ts";
	const includeRaw = nextValue("--include", "-i") ?? "**/*.tsx";
	const excludeRaw = nextValue("--exclude", "-e");
	const cwd = nextValue("--cwd") ?? process.cwd();
	const failOnError = hasFlag("--fail");
	const json = hasFlag("--json", "-j");

	const include = includeRaw.split(",").filter(Boolean);
	const exclude = excludeRaw ? excludeRaw.split(",").filter(Boolean) : undefined;

	const options: Partial<ValidatorOptions> = {
		configPath: resolve(cwd, configPath),
		include,
		exclude,
		cwd,
		failOnError,
		verbose: true,
	};

	const report = await validate(options);

	if (json) {
		console.log(JSON.stringify(report, (_key, value) => (value instanceof Set ? [...value] : value), 2));
	} else {
		const label = "[unocss-theme-validator]";
		console.log(`${label} Scanned ${report.files} files, ${report.colorClasses} color class usages`);
		console.log(
			`${label} Theme color count: ${[...report.colorsUsed].length} used, ${[...report.colorsUnused].length} unused`,
		);

		if (report.colorsUnused.size > 0) {
			console.log(`${label} Unused: ${[...report.colorsUnused].join(", ")}`);
		}

		if (report.invalid.length === 0) {
			console.log(`${label} All color classes match the theme`);
		} else {
			console.warn(`${label} Found ${report.invalid.length} invalid color class(es)`);
			for (const item of report.invalid) {
				console.warn(`  ${item.file}:${item.line}  ${item.className} — ${item.reason}`);
			}
		}
	}

	process.exit(report.invalid.length > 0 && failOnError ? 1 : 0);
}

main().catch((err) => {
	console.error(err);
	process.exit(2);
});
