import "../../tools/tsdown-polyfill.ts";
import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["./src/index.ts"],
	format: ["esm"],
	dts: true,
	clean: true,
	treeshake: true,
	minify: false,
});
