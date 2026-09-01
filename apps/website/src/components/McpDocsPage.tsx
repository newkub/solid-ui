import { DocsLayout } from "./DocsLayout";
import { McpPage } from "./McpPage";
import { McpRightSidebar } from "./McpRightSidebar";
import { Sidebar } from "./Sidebar";

export function McpDocsPage() {
	return (
		<DocsLayout sidebar={<Sidebar />} rightSidebar={<McpRightSidebar />}>
			<McpPage />
		</DocsLayout>
	);
}
