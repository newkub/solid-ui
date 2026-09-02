export interface NavItem {
	label: string;
	to?: string;
	children?: NavItem[];
}

export const topNavItems: NavItem[] = [
	{ label: "Home", to: "/" },
	{
		label: "Docs",
		children: [
			{ label: "Get started", to: "/docs/intro" },
			{ label: "Installation", to: "/docs/installation" },
			{ label: "Theming", to: "/docs/theme" },
			{ label: "Principles", to: "/docs/core/principles" },
			{ label: "Key concepts", to: "/docs/core/key-concepts" },
			{ label: "Comparison", to: "/docs/core/comparison" },
		],
	},
	{ label: "Components", to: "/components" },
	{ label: "Templates", to: "/templates" },
	{ label: "Examples", to: "/examples" },
	{ label: "Layouts", to: "/layouts" },
	{ label: "Hooks", to: "/hooks" },
	{
		label: "More",
		children: [
			{ label: "CLI", to: "/cli" },
			{ label: "Skills", to: "/skills" },
			{ label: "Plugins", to: "/plugins" },
			{ label: "MCP", to: "/docs/integrations/mcp" },
		],
	},
];

export interface SidebarGroup {
	id: string;
	label: string;
	icon: string;
}

export const sidebarGroups: Record<string, { label: string }> = {
	"getting-started": { label: "Getting started" },
	core: { label: "Core" },
	primitives: { label: "Primitives" },
	components: { label: "Components" },
	templates: { label: "Templates" },
	theming: { label: "Theming" },
	integrations: { label: "Integrations" },
};

export interface McpExample {
	command: string;
	description?: string;
}

export const mcpExamples: { title: string; items: McpExample[] }[] = [
	{
		title: "Run locally",
		items: [{ command: "bun --filter @wrikka/mcp dev", description: "Start the MCP server locally." }],
	},
	{
		title: "Tool examples",
		items: [
			{ command: "list-components", description: "List all available components." },
			{ command: "get-component <name>", description: "Get details for a specific component." },
			{ command: "search-components <query>", description: "Search components by keyword." },
		],
	},
];
