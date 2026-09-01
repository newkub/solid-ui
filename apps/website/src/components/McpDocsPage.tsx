import { DocsLayout } from "./DocsLayout";
import { McpPage } from "./McpPage";
import { McpRightSidebar } from "./McpRightSidebar";

export function McpDocsPage() {
	return (
		<DocsLayout rightSidebar={<McpRightSidebar />}>
			<McpPage />
		</DocsLayout>
	);
}
