import type { UserConfig } from "unocss";
import type { Plugin } from "vite";
import type { ValidatorOptions } from "./types.ts";
import { validate } from "./validator.ts";

export interface VitePluginOptions extends Partial<ValidatorOptions> {
	config?: UserConfig;
	failOnBuild?: boolean;
}

export default function unocssThemeValidator(options: VitePluginOptions = {}): Plugin {
	const label = "[unocss-theme-validator]";
	return {
		name: "unocss-theme-validator",
		enforce: "pre",
		async buildStart() {
			const report = await validate({
				config: options.config,
				configPath: options.configPath,
				include: options.include,
				exclude: options.exclude,
				cwd: options.cwd,
				failOnError: false,
				verbose: options.verbose,
			});

			console.log(`${label} Scanned ${report.files} files, ${report.colorClasses} color class usages`);

			if (report.colorsUnused.size > 0) {
				console.log(`${label} Unused theme colors: ${[...report.colorsUnused].join(", ")}`);
			}

			if (report.invalid.length === 0) {
				console.log(`${label} All color classes match the theme`);
			} else {
				console.warn(`${label} Found ${report.invalid.length} invalid color class(es)`);
				for (const item of report.invalid) {
					console.warn(`  ${item.file}:${item.line}  ${item.className} — ${item.reason}`);
				}
				if (options.failOnBuild) {
					throw new Error(`${label} Invalid UnoCSS theme color classes found`);
				}
			}
		},
	};
}
