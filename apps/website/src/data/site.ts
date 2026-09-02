import { GITHUB_REPO_URL } from "../lib/config";

export const siteMeta = {
	name: "solid-ui",
	description:
		"An accessible, batteries-included SolidJS component library with 60+ components, form/table/image utilities, and an MCP server.",
	repoUrl: GITHUB_REPO_URL,
	deployTarget: "Cloudflare Workers",
	builtWith: ["Solid", "TanStack Router"],
};
