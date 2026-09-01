import { pathToFileURL } from "node:url";
import type { UnoGenerator, UserConfig } from "unocss";
import { createGenerator } from "unocss";

const colorProperties = new Set([
	"color",
	"background-color",
	"background-image",
	"border-color",
	"border-top-color",
	"border-right-color",
	"border-bottom-color",
	"border-left-color",
	"outline-color",
	"text-decoration-color",
	"fill",
	"stroke",
	"caret-color",
	"accent-color",
	"column-rule-color",
	"--un-ring-color",
	"--un-ring-offset-color",
	"--un-gradient-from",
	"--un-gradient-from-stop",
	"--un-gradient-via",
	"--un-gradient-to",
]);

const themeVariablePattern = /var\(--su-[a-zA-Z0-9_-]+\)|var\(--color-[a-zA-Z0-9_-]+\)/;
const allowedColorValues = /:\s*(transparent|currentColor|inherit|unset)\s*(;|$)/;

export type ColorCheck = "valid" | "invalid" | "not-color" | "unmatched";

export interface ColorValidationResult {
	className: string;
	status: ColorCheck;
	css: string;
}

let generator: UnoGenerator<Record<string, unknown>> | undefined;
let loadedConfig: UserConfig | string | undefined;

export async function getGenerator(
	config?: UserConfig,
	configPath?: string,
): Promise<UnoGenerator<Record<string, unknown>>> {
	if (generator && loadedConfig === (config ?? configPath)) return generator;

	let userConfig: UserConfig;
	if (config) {
		userConfig = config;
	} else if (configPath) {
		const mod = (await import(pathToFileURL(configPath).href)) as { default?: UserConfig };
		userConfig = mod.default ?? {};
	} else {
		userConfig = {};
	}

	generator = (await createGenerator(userConfig)) as UnoGenerator<Record<string, unknown>>;
	loadedConfig = config ?? configPath;
	return generator;
}

export function usesThemeVariable(css: string): boolean {
	return themeVariablePattern.test(css);
}

export function hasColorProperty(css: string): boolean {
	const declarations = css.matchAll(/(?:^|;|\{)\s*([-\w]+)\s*:\s*([^;{}]+)/g);
	for (const match of declarations) {
		const prop = match[1].trim();
		if (colorProperties.has(prop)) return true;
	}
	return false;
}

export async function checkColorClass(
	className: string,
	config?: UserConfig,
	configPath?: string,
): Promise<ColorValidationResult> {
	const uno = await getGenerator(config, configPath);
	const { css, matched } = await uno.generate(className, { preflights: false });
	if (!matched || matched.size === 0) {
		return { className, status: "unmatched", css };
	}
	if (!hasColorProperty(css)) {
		return { className, status: "not-color", css };
	}
	if (usesThemeVariable(css) || allowedColorValues.test(css)) {
		return { className, status: "valid", css };
	}
	return { className, status: "invalid", css };
}

export function resetGenerator(): void {
	generator = undefined;
	loadedConfig = undefined;
}
