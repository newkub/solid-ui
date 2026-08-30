import type { Finding, ReviewReport } from "../domain/models";

function pad(s: string | number, w: number): string {
	return String(s).padEnd(w).slice(0, w);
}

export function printReport(report: ReviewReport): void {
	console.log(`solid-ui codebase review report`);
	console.log(`================================`);
	console.log(`score        : ${report.score} / 100`);
	console.log(`grade        : ${report.grade}`);
	console.log(`categories   : ${report.checked} checked, ${report.passed} passed`);
	console.log(`findings     : ${report.findings.length}`);
	console.log(`analyzerErrors: ${report.analyzerErrors}`);
	console.log(`falsePositiveRate: ${report.falsePositiveRate}%`);
	console.log();

	console.log("Domain breakdown");
	console.log(
		pad("No.", 4) + pad("Domain", 18) + pad("Checked", 10) + pad("Passed", 10) + pad("Score", 10) + pad("Grade", 8),
	);
	console.log("-".repeat(60));
	report.domains.forEach((d, i) => {
		console.log(
			pad(i + 1, 4) + pad(d.domain, 18) + pad(d.checked, 10) + pad(d.passed, 10) + pad(d.score, 10) + pad(d.grade, 8),
		);
	});
	console.log();

	console.log("Findings by severity");
	console.log(pad("Severity", 15) + pad("Count", 10));
	console.log("-".repeat(25));
	for (const [severity, count] of Object.entries(report.findingsBySeverity).sort((a, b) => b[1] - a[1])) {
		console.log(pad(severity, 15) + pad(count, 10));
	}
	console.log();

	if (report.topActionItems.length > 0) {
		console.log("Top action items");
		report.topActionItems.forEach((item, i) => {
			console.log(`${i + 1}. ${item}`);
		});
		console.log();
	}

	if (report.findings.length > 0) {
		console.log("Findings");
		console.log(`${pad("No.", 4) + pad("Severity", 12) + pad("Domain", 18) + pad("Category", 30)}Evidence`);
		console.log("-".repeat(90));
		report.findings.slice(0, 30).forEach((f: Finding, i) => {
			const evidence = f.evidence.replace(/\n/g, " ").slice(0, 40);
			console.log(pad(i + 1, 4) + pad(f.severity, 12) + pad(f.domain, 18) + pad(f.category, 30) + evidence);
		});
		if (report.findings.length > 30) {
			console.log(`... and ${report.findings.length - 30} more`);
		}
	}
}
