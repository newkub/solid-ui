import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: [{ find: /^#(.*)$/, replacement: "src/$1" }],
	},
	test: {
		globals: true,
		environment: "node",
		passWithNoTests: true,
	},
});
