import { DocsLayout } from "./DocsLayout";
import { TemplateGallery } from "./TemplateGallery";
import { TemplateSidebar } from "./TemplateSidebar";

export function TemplatesPage() {
	return (
		<DocsLayout sidebar={<TemplateSidebar />}>
			<TemplateGallery />
		</DocsLayout>
	);
}
