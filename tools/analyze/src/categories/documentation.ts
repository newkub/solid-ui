import type { CategoryCheck } from "../types";

export const categories: CategoryCheck[] = [
	// Documentation
	{
		id: "root-readme",
		name: "Root README exists",
		domain: "documentation",
		description: "README.md at project root",
		weight: 1,
	},
	{
		id: "agents-md",
		name: "AGENTS.md exists",
		domain: "documentation",
		description: "AGENTS.md or similar guidelines",
		weight: 1,
	},
	{
		id: "package-readmes",
		name: "Package READMEs",
		domain: "documentation",
		description: "Major packages have README",
		weight: 1,
	},
	{
		id: "changelog",
		name: "Changelog exists",
		domain: "documentation",
		description: "CHANGELOG.md or releases",
		weight: 1,
	},
	{
		id: "api-docs",
		name: "API docs",
		domain: "documentation",
		description: "Generated or written API docs",
		weight: 1,
	},
	{
		id: "inline-comments",
		name: "Inline comments",
		domain: "documentation",
		description: "Complex logic has comments",
		weight: 1,
	},
	{
		id: "examples",
		name: "Examples exist",
		domain: "documentation",
		description: "Examples for key features",
		weight: 1,
	},
	{
		id: "website-docs",
		name: "Website docs",
		domain: "documentation",
		description: "Website contains docs",
		weight: 1,
	},
	{
		id: "tsdoc-public",
		name: "TSDoc for public API",
		domain: "documentation",
		description: "Public exports have TSDoc",
		weight: 1,
	},
	{
		id: "contributing",
		name: "Contributing guide",
		domain: "documentation",
		description: "CONTRIBUTING.md or section",
		weight: 1,
	},
	{ id: "license", name: "License", domain: "documentation", description: "LICENSE file present", weight: 1 },
	{
		id: "code-of-conduct",
		name: "Code of conduct",
		domain: "documentation",
		description: "CODE_OF_CONDUCT.md or section",
		weight: 1,
	},
];
