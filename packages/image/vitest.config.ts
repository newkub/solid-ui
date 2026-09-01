import path from "node:path";
import { defineConfig } from "vitest/config";

// Mirrors the "#image/*" path alias declared in tsconfig.json so that
// vitest can resolve the package's internal subpath imports.
export default defineConfig({
	resolve: {
		alias: [
			{ find: /^#image$/, replacement: path.resolve(__dirname, "./src") },
			{ find: /^#image\/(.*)$/, replacement: path.resolve(__dirname, "./src/$1") },
		],
	},
	test: {
		environment: "node",
	},
});
