import { registry } from "@wrikka/solid-ui";
import { categories } from "../categories";
import skillsData from "../data/skills.json";
import { docs } from "../docs/generated";

export type CommandAction =
	| { type: "navigate"; to: string; search?: Record<string, string> }
	| { type: "exec"; handler: () => void };

export interface Command {
	id: string;
	label: string;
	group: string;
	keywords?: string;
	description?: string;
	component?: { name: string; tag: string };
	action: CommandAction;
}

const pageCommands: Command[] = [
	{
		id: "page-home",
		label: "Home",
		group: "Pages",
		description: "Landing page",
		action: { type: "navigate", to: "/" },
	},
	{
		id: "page-components",
		label: "Components",
		group: "Pages",
		description: "Component gallery with live previews",
		action: { type: "navigate", to: "/components" },
	},
	{
		id: "page-docs",
		label: "Docs",
		group: "Pages",
		description: "Documentation pages",
		action: { type: "navigate", to: "/docs/intro" },
	},
	{
		id: "page-theme",
		label: "Theme Studio",
		group: "Pages",
		description: "Customize colors, fonts, spacing, radius",
		action: { type: "navigate", to: "/theme" },
	},
	{
		id: "page-hooks",
		label: "Hooks",
		group: "Pages",
		description: "Browse hooks and utilities",
		action: { type: "navigate", to: "/hooks" },
	},
	{
		id: "page-cli",
		label: "CLI",
		group: "Pages",
		description: "Command-line interface",
		action: { type: "navigate", to: "/cli" },
	},
	{
		id: "page-skills",
		label: "Skills",
		group: "Pages",
		description: "solid-ui skills",
		action: { type: "navigate", to: "/skills" },
	},
	{
		id: "page-templates",
		label: "Templates",
		group: "Pages",
		description: "Starter templates",
		action: { type: "navigate", to: "/templates" },
	},
	{
		id: "page-layouts",
		label: "Layouts",
		group: "Pages",
		description: "Layout helpers",
		action: { type: "navigate", to: "/layouts" },
	},
	{
		id: "page-mcp",
		label: "MCP",
		group: "Pages",
		description: "MCP server docs",
		action: { type: "navigate", to: "/docs/integrations/mcp" },
	},
];

function componentCommands(): Command[] {
	return registry.map((item) => {
		const group = categories.find((c) => c.items.includes(item.name));
		const to = `/docs/${group?.id ?? "components"}/${item.name.toLowerCase()}`;
		return {
			id: `comp-${item.name}`,
			label: item.name,
			group: `Components — ${group?.label ?? "Other"}`,
			keywords: `${item.tag} ${item.description}`,
			description: `Renders a <${item.tag}> element.`,
			component: { name: item.name, tag: item.tag },
			action: { type: "navigate", to },
		};
	});
}

function docCommands(): Command[] {
	return Object.entries(docs).map(([id, page]) => ({
		id: `doc-${id}`,
		label: page.title,
		group: "Docs",
		keywords: page.group,
		description: `Documentation for ${page.title}.`,
		action: { type: "navigate", to: id.includes("/") ? `/docs/${id}` : `/docs/${id}` },
	}));
}

function skillCommands(): Command[] {
	return skillsData.map((skill: { name: string; description: string }) => ({
		id: `skill-${skill.name}`,
		label: skill.name,
		group: "Skills",
		keywords: skill.description,
		description: skill.description,
		action: { type: "navigate", to: `/skills/${skill.name}` },
	}));
}

export function buildCommands(): Command[] {
	return [...pageCommands, ...componentCommands(), ...docCommands(), ...skillCommands()];
}
