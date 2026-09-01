import type { CategoryCheck } from "../types";

export const categories: CategoryCheck[] = [
	// Architecture
	{
		id: "workspace-packages",
		name: "All workspaces have package.json",
		domain: "architecture",
		description: "Every package/app has package.json",
		weight: 1,
	},
	{
		id: "no-circular-deps",
		name: "No circular dependencies",
		domain: "architecture",
		description: "No circular imports within packages",
		weight: 1,
	},
	{
		id: "barrel-exports",
		name: "Barrel exports exist",
		domain: "architecture",
		description: "Packages expose public API via index",
		weight: 1,
	},
	{
		id: "clean-src",
		name: "Clean src/ structure",
		domain: "architecture",
		description: "Source code lives under src/",
		weight: 1,
	},
	{
		id: "no-cross-package-relative",
		name: "No cross-package relative imports",
		domain: "architecture",
		description: "Use workspace packages instead of relative paths",
		weight: 1,
	},
	{
		id: "public-api-docs",
		name: "Public API documented",
		domain: "architecture",
		description: "Exports have TSDoc or README",
		weight: 1,
	},
	{
		id: "consistent-naming",
		name: "Consistent file naming",
		domain: "architecture",
		description: "Files follow kebab-case convention",
		weight: 1,
	},
	{
		id: "root-tsconfig",
		name: "Root tsconfig exists",
		domain: "architecture",
		description: "tsconfig.json or tsconfig.base.json present",
		weight: 1,
	},
	{
		id: "biome-config",
		name: "Biome config present",
		domain: "architecture",
		description: "biome.json or biome.jsonc exists",
		weight: 1,
	},
	{
		id: "no-huge-files",
		name: "No huge files",
		domain: "architecture",
		description: "No source files over 500 lines",
		weight: 1,
	},
	{
		id: "dependency-graph",
		name: "Dependency graph valid",
		domain: "architecture",
		description: "Workspace dependencies reference valid names",
		weight: 1,
	},
];
