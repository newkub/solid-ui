import { PageHeader } from "./PageHeader";
import { Seo } from "./Seo";
import { ThemeSettings } from "./ThemeSettings";

export function SettingsPage() {
	return (
		<section class="page">
			<Seo
				title="Settings — solid-ui"
				description="Configure solid-ui appearance and preferences. Changes apply live to the running site."
				path="/settings"
			/>
			<PageHeader
				title="Settings"
				description="Configure appearance and preferences. Every change applies live to the site and component previews."
			/>

			<div class="space-y-6">
				<section class="rounded-xl border border-border bg-surface p-6">
					<h2 class="mb-2 text-lg font-semibold">Appearance</h2>
					<p class="mb-4 text-sm text-muted-foreground">
						Theme presets, mode, color, font, spacing, and radius are shared across all pages.
					</p>
					<ThemeSettings />
				</section>
			</div>
		</section>
	);
}
