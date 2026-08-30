import { defineConfig } from "tsdown";

export default defineConfig({
	entries: ["./src/index.ts"],
	shims: {
		"solid-js": "solid-js",
	},
	solid: {
		preset: "solid",
	},
});
