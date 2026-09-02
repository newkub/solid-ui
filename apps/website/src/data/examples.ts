import { registry } from "@wrikka/solid-ui/registry";
import { categories } from "../categories";
import { docs } from "../docs/generated";

export interface ExampleItem {
	id: string;
	source: string;
	title: string;
	to: string;
	snippet: string;
	file: string;
	componentName?: string;
}

function firstSnippet(content: string) {
	const match = content.match(/```tsx\n([\s\S]*?)```/);
	return match ? match[1].trim() : "";
}

export function buildExamples(): ExampleItem[] {
	const items: ExampleItem[] = [];

	Object.entries(docs)
		.filter(([, page]) => page.group === "templates")
		.forEach(([id, page]) => {
			items.push({
				id: `template-${id}`,
				source: "Templates",
				title: page.title,
				to: `/docs/${id}`,
				snippet: firstSnippet(page.content),
				file: `${id.split("/").pop() ?? "example"}.tsx`,
			});
		});

	registry
		.filter((item) => categories.some((c) => c.items.includes(item.name)))
		.forEach((item) => {
			const group = categories.find((c) => c.items.includes(item.name));
			items.push({
				id: `comp-${item.name}`,
				source: "Components",
				title: item.name,
				to: `/docs/${group?.id ?? "components"}/${item.name.toLowerCase()}`,
				snippet: `import { ${item.name} } from "@wrikka/solid-ui";\n\nfunction App() {\n  return <${item.name} />;\n}`,
				file: `${item.name}.tsx`,
				componentName: item.name,
			});
		});

	return items;
}
