import type { CategoryCheck } from "../types";

export const categories: CategoryCheck[] = [
	// Dependencies
	{
		id: "lockfile-sync",
		name: "Lockfile in sync",
		domain: "dependencies",
		description: "bun.lock matches package.json",
		weight: 1,
	},
	{
		id: "no-duplicate-deps",
		name: "No duplicate dependencies",
		domain: "dependencies",
		description: "Same dep version across workspaces",
		weight: 1,
	},
	{
		id: "no-missing-peer",
		name: "No missing peer deps",
		domain: "dependencies",
		description: "Peer dependencies declared",
		weight: 1,
	},
	{
		id: "version-present",
		name: "All dependencies have versions",
		domain: "dependencies",
		description: "No versionless dependencies",
		weight: 1,
	},
	{
		id: "no-workspace-star-external",
		name: "No workspace:* in external",
		domain: "dependencies",
		description: "workspace:* only for internal",
		weight: 1,
	},
	{
		id: "no-unused-deps",
		name: "No unused dependencies",
		domain: "dependencies",
		description: "Dependencies referenced in code",
		weight: 1,
	},
	{
		id: "semver-valid",
		name: "Semver versions valid",
		domain: "dependencies",
		description: "Version ranges parseable",
		weight: 1,
	},
	{
		id: "dev-prod-separation",
		name: "Dev/prod separation",
		domain: "dependencies",
		description: "Dev deps not in dependencies",
		weight: 1,
	},
	{
		id: "transitive-size",
		name: "Reasonable dependency size",
		domain: "dependencies",
		description: "No single package over 50MB",
		weight: 1,
	},
	{
		id: "package-manager-field",
		name: "Package manager field",
		domain: "dependencies",
		description: "packageManager defined",
		weight: 1,
	},
	{
		id: "catalog-usage",
		name: "Catalog usage consistent",
		domain: "dependencies",
		description: "catalog: deps resolved",
		weight: 1,
	},
];
