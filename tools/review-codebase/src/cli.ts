#!/usr/bin/env bun
import { runReview } from "./application/review";
import { printJson } from "./presentation/json";
import { printReport } from "./presentation/table";

const args = process.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
	console.log("review-codebase -- review the solid-ui monorepo");
	console.log();
	console.log("Usage:");
	console.log("  bun run tools/review-codebase/src/cli.ts [options]");
	console.log("  bun run review-codebase");
	console.log("  bun run review-codebase:json");
	console.log();
	console.log("Options:");
	console.log("  --json, -j       output JSON report");
	console.log("  --output, -o     write JSON report to file");
	console.log("  --help, -h       show help");
	process.exit(0);
}

async function main() {
	const json = args.includes("--json") || args.includes("-j");
	const outputIndex = Math.max(args.indexOf("--output"), args.indexOf("-o"));
	const output = outputIndex !== -1 ? args[outputIndex + 1] : undefined;

	const report = await runReview();

	if (json) {
		await printJson(report, output);
	} else {
		printReport(report);
	}

	process.exit(report.grade === "A" ? 0 : 1);
}

main().catch((err) => {
	console.error(err);
	process.exit(2);
});
