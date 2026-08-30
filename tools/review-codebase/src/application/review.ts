import { runAllAnalyzers } from "@wrikka/analyze";
import type { ReviewReport } from "../domain/models";
import { buildReport } from "../domain/models";

export async function runReview(): Promise<ReviewReport> {
	const result = await runAllAnalyzers();
	return buildReport(result);
}
