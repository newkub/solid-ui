import type { ReviewReport } from "../domain/models";

export async function printJson(report: ReviewReport, output?: string): Promise<void> {
	const json = JSON.stringify(report, null, 2);
	if (output) {
		await Bun.write(output, json);
		console.log(`JSON report written to ${output}`);
	} else {
		console.log(json);
	}
}
