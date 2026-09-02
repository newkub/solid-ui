import { createResource, For, Show } from "solid-js";
import { CodeBlock } from "./CodeBlock";
import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

type Report = {
	files: number;
	colorClasses: number;
	invalid: { file: string; line: number; className: string; reason: string }[];
};

function ThemeValidatorCard() {
	const [report] = createResource<Report>(async () => {
		const res = await fetch("/theme-report.json");
		return res.json();
	});

	return (
		<div class="rounded-xl border border-border bg-surface p-5 shadow-sm">
			<h2 class="mb-2 text-lg font-semibold">UnoCSS Theme Validator</h2>
			<p class="mb-4 text-sm text-muted-foreground">
				Scans color class usages across the website and solid-ui package and reports any classes that do not match the
				theme palette.
			</p>
			<Show when={report.loading}>
				<div class="text-sm text-muted-foreground">Loading report…</div>
			</Show>
			<Show when={report.error}>
				<div class="text-sm text-destructive">Failed to load theme report.</div>
			</Show>
			<Show when={report()}>
				{(r) => (
					<div class="space-y-3">
						<div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
							<div class="rounded-lg bg-muted p-3 text-center">
								<div class="text-2xl font-bold">{r().files}</div>
								<div class="text-xs text-muted-foreground">Files scanned</div>
							</div>
							<div class="rounded-lg bg-muted p-3 text-center">
								<div class="text-2xl font-bold">{r().colorClasses}</div>
								<div class="text-xs text-muted-foreground">Color classes</div>
							</div>
							<div class="rounded-lg bg-muted p-3 text-center">
								<div class="text-2xl font-bold">{r().invalid.length}</div>
								<div class="text-xs text-muted-foreground">Invalid</div>
							</div>
							<div class="rounded-lg bg-muted p-3 text-center">
								<div class={`text-2xl font-bold ${r().invalid.length === 0 ? "text-success" : "text-destructive"}`}>
									{r().invalid.length === 0 ? "Pass" : "Fail"}
								</div>
								<div class="text-xs text-muted-foreground">Status</div>
							</div>
						</div>
						<Show
							when={r().invalid.length > 0}
							fallback={<div class="text-sm font-medium text-success">All color classes match the theme.</div>}
						>
							<ul class="space-y-1 text-sm text-destructive">
								<For each={r().invalid}>
									{(item) => (
										<li class="flex items-start gap-2">
											<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
											<span>
												{item.file}:{item.line} {item.className} — {item.reason}
											</span>
										</li>
									)}
								</For>
							</ul>
						</Show>
					</div>
				)}
			</Show>
		</div>
	);
}

function PluginsListCard() {
	const plugins = [
		{ name: "unocss-theme-validator", desc: "Validate every UnoCSS color class against the design token palette." },
		{ name: "unocss", desc: "Generate atomic CSS from class names and theme tokens." },
		{ name: "vite-plugin-solid", desc: "SolidJS compiler and HMR support for Vite." },
	];

	return (
		<div class="space-y-6">
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<For each={plugins}>
					{(plugin) => (
						<div class="rounded-xl border border-border bg-surface p-5 shadow-sm">
							<div class="mb-2 flex items-center gap-2">
								<h3 class="font-mono text-sm font-semibold text-foreground">{plugin.name}</h3>
								<Tag label="vite" />
							</div>
							<p class="text-sm text-muted-foreground">{plugin.desc}</p>
						</div>
					)}
				</For>
			</div>
			<PageSection title="Vite config">
				<CodeBlock
					code={`export default defineConfig({
  plugins: [
    unocssThemeValidator({
      include: ["apps/website/src/**/*.tsx", "packages/solid-ui/src/**/*.tsx"],
    }),
    UnoCSS(),
    solid(),
  ],
});`}
					language="ts"
				/>
			</PageSection>
			<PageSection title="Validator output">
				<CodeBlock
					code={`[unocss-theme-validator] Scanned 106 files, 559 color class usages
[unocss-theme-validator] All color classes match the theme`}
					language="bash"
				/>
			</PageSection>
		</div>
	);
}

export function PluginsPage() {
	return (
		<section class="page">
			<Seo
				title="Plugins — solid-ui"
				description="solid-ui Vite plugins: theme validator, UnoCSS integration, and the SolidJS compiler."
				path="/plugins"
			/>
			<PageHeader title="Plugins" description="Vite plugins that power the solid-ui design system and docs site." />

			<div class="space-y-8">
				<PluginsListCard />
				<ThemeValidatorCard />
			</div>
		</section>
	);
}
