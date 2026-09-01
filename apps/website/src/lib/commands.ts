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
	action: CommandAction;
}

const pageCommands: Command[] = [
	{ id: "page-home", label: "Home", group: "Pages", action: { type: "navigate", to: "/" } },
	{ id: "page-components", label: "Components", group: "Pages", action: { type: "navigate", to: "/components" } },
	{ id: "page-docs", label: "Docs", group: "Pages", action: { type: "navigate", to: "/docs/intro" } },
	{ id: "page-theme", label: "Theme Studio", group: "Pages", action: { type: "navigate", to: "/theme" } },
	{ id: "page-hooks", label: "Hooks", group: "Pages", action: { type: "navigate", to: "/hooks" } },
	{ id: "page-cli", label: "CLI", group: "Pages", action: { type: "navigate", to: "/cli" } },
	{ id: "page-skills", label: "Skills", group: "Pages", action: { type: "navigate", to: "/skills" } },
	{ id: "page-templates", label: "Templates", group: "Pages", action: { type: "navigate", to: "/templates" } },
	{ id: "page-layouts", label: "Layouts", group: "Pages", action: { type: "navigate", to: "/layouts" } },
	{ id: "page-mcp", label: "MCP", group: "Pages", action: { type: "navigate", to: "/mcp" } },
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
		action: { type: "navigate", to: id.includes("/") ? `/docs/${id}` : `/docs/${id}` },
	}));
}

function skillCommands(): Command[] {
	return skillsData.map((skill: { name: string; description: string }) => ({
		id: `skill-${skill.name}`,
		label: skill.name,
		group: "Skills",
		keywords: skill.description,
		action: { type: "navigate", to: `/skills/${skill.name}` },
	}));
}

export function buildCommands(): Command[] {
	return [...pageCommands, ...componentCommands(), ...docCommands(), ...skillCommands()];
}
