import path from "node:path";
import { defineConfig } from "vitest/config";

// Mirrors the "#table/*" path alias declared in tsconfig.json so that
// vitest can resolve the package's internal subpath imports.
export default defineConfig({
	resolve: {
		alias: [
			{ find: /^#table$/, replacement: path.resolve(__dirname, "./src/modules/table") },
			{ find: /^#table\/(.*)$/, replacement: path.resolve(__dirname, "./src/modules/table/$1") },
		],
	},
	test: {
		environment: "node",
	},
});
