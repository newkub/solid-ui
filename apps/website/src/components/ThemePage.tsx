import { PageHeader } from "./PageHeader";
import { Seo } from "./Seo";
import { LivePreviewSection, ThemeSettings } from "./ThemeSettings";

const THEME_DESCRIPTION =
	"Customize solid-ui theme tokens — color, font, spacing, and radius — with a live preview across components.";

export function ThemePage() {
	return (
		<section class="page">
			<Seo title="Theme Studio — solid-ui" description={THEME_DESCRIPTION} path="/theme" />
			<PageHeader
				title="Theme Studio"
				description="Customize colors, font, spacing, and radius. Changes apply live across the site and all component previews."
			/>
			<div class="grid gap-6 lg:grid-cols-[1fr,320px] xl:grid-cols-[1fr,360px]">
				<div class="space-y-6">
					<ThemeSettings />
				</div>
				<div class="h-fit lg:sticky lg:top-20">
					<LivePreviewSection />
				</div>
			</div>
		</section>
	);
}
