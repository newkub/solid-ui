import type { CategoryCheck } from "../types";

export const categories: CategoryCheck[] = [
	// Tooling
	{
		id: "no-debugger",
		name: "No debugger statements",
		domain: "code-quality",
		description: "No `debugger;` in code",
		weight: 1,
	},
	{
		id: "gitignore-complete",
		name: "Complete .gitignore",
		domain: "security",
		description: ".gitignore covers dist, node_modules, .env",
		weight: 1,
	},
];
