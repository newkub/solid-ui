import path from "node:path";
import { fileURLToPath } from "node:url";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import unocssThemeValidator from "../../tools/unocss-theme-validator/src/vite.ts";
import unoConfig from "./uno.config.ts";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");

const solidUiRoot = path.resolve(__dirname, "../../packages/solid-ui/src").replace(/\\/g, "/");
const formRoot = path.resolve(__dirname, "../../packages/form/src").replace(/\\/g, "/");
const imageRoot = path.resolve(__dirname, "../../packages/image/src").replace(/\\/g, "/");
const tableRoot = path.resolve(__dirname, "../../packages/table/src").replace(/\\/g, "/");
const tableDomain = path.resolve(__dirname, "../../packages/table/src/modules/table").replace(/\\/g, "/");
const transitionsRoot = path.resolve(__dirname, "../../packages/transitions/src").replace(/\\/g, "/");

export default defineConfig({
	plugins: [
		unocssThemeValidator({
			config: unoConfig,
			cwd: projectRoot,
			include: ["apps/website/src/**/*.tsx", "packages/solid-ui/src/**/*.tsx"],
			exclude: ["node_modules", "dist", ".solid"],
		}),
		UnoCSS(),
		solid(),
	],
	build: {
		chunkSizeWarningLimit: 4000,
	},
	resolve: {
		alias: [
			{ find: /^#form$/, replacement: `${formRoot}/index.ts` },
			{ find: /^#form\/(.*)$/, replacement: `${formRoot}/$1` },
			{ find: /^#image$/, replacement: `${imageRoot}/index.ts` },
			{ find: /^#image\/(.*)$/, replacement: `${imageRoot}/$1` },
			{ find: /^#table$/, replacement: `${tableDomain}/index.ts` },
			{ find: /^#table\/(.*)$/, replacement: `${tableDomain}/$1` },
			{ find: /^#transitions$/, replacement: `${transitionsRoot}/index.ts` },
			{ find: /^#transitions\/(.*)$/, replacement: `${transitionsRoot}/$1` },
			{ find: /^@wrikka\/solid-ui$/, replacement: `${solidUiRoot}/index.ts` },
			{ find: /^@wrikka\/solid-ui\/(.*)$/, replacement: `${solidUiRoot}/$1` },
			{ find: /^@wrikka\/form$/, replacement: `${formRoot}/index.ts` },
			{ find: /^@wrikka\/image$/, replacement: `${imageRoot}/index.ts` },
			{ find: /^@wrikka\/table$/, replacement: `${tableRoot}/index.ts` },
			{
				find: /^@wrikka\/transitions$/,
				replacement: `${transitionsRoot}/index.ts`,
			},
		],
	},
});
