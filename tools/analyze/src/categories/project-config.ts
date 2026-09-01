import type { CategoryCheck } from "../types";

export const categories: CategoryCheck[] = [
	// Project config
	{
		id: "ci-cd-pipeline",
		name: "CI/CD pipeline configured",
		domain: "documentation",
		description: ".github/workflows or CI config present",
		weight: 1,
	},
	{
		id: "cloudflare-config",
		name: "Cloudflare config present",
		domain: "documentation",
		description: "wrangler.toml or Cloudflare config exists",
		weight: 1,
	},
	{
		id: "deploy-script",
		name: "Deploy script present",
		domain: "documentation",
		description: "package.json has a deploy script",
		weight: 1,
	},
	{
		id: "package-metadata",
		name: "Package metadata complete",
		domain: "documentation",
		description: "All package.json files have name, version, and description",
		weight: 1,
	},
];
