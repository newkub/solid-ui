import path from "node:path";
import solid from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [solid()],
	resolve: {
		conditions: ["solid", "browser"],
		alias: [
			{ find: /^solid-js$/, replacement: path.resolve(__dirname, "../../node_modules/solid-js/dist/solid.js") },
			{
				find: /^solid-js\/web$/,
				replacement: path.resolve(__dirname, "../../node_modules/solid-js/web/dist/web.js"),
			},
		],
	},
	test: {
		environment: "jsdom",
		globals: true,
		deps: {
			inline: ["@solidjs/testing-library", "solid-js", "solid-js/web"],
		},
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json-summary"],
			include: ["src/**/*.ts", "src/**/*.tsx"],
			exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/index.ts", "src/registry.ts", "src/styles/**"],
		},
	},
});
