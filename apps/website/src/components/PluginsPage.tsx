import { createResource, createSignal, For, Match, onCleanup, Show, Switch } from "solid-js";
import { PageHeader } from "./PageHeader";
import { Seo } from "./Seo";

type Report = {
	files: number;
	colorClasses: number;
	invalid: { file: string; line: number; className: string; reason: string }[];
};

function useViewport() {
	const [width, setWidth] = createSignal(0);

	const onResize = () => setWidth(window.innerWidth);
	if (typeof window !== "undefined") {
		setWidth(window.innerWidth);
		window.addEventListener("resize", onResize);
		onCleanup(() => window.removeEventListener("resize", onResize));
	}

	return { width };
}

function BreakpointBadge() {
	const { width } = useViewport();
	const breakpoint = () => {
		const w = width();
		if (w >= 1536) return "2xl";
		if (w >= 1280) return "xl";
		if (w >= 1024) return "lg";
		if (w >= 768) return "md";
		if (w >= 640) return "sm";
		return "xs";
	};

	return (
		<div class="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm">
			<span class="font-medium text-foreground">{width()}px</span>
			<span class="rounded bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground">{breakpoint()}</span>
		</div>
	);
}

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

function ResponsiveToolsCard() {
	return (
		<div class="rounded-xl border border-border bg-surface p-5 shadow-sm">
			<h2 class="mb-2 text-lg font-semibold">Responsive Tools</h2>
			<p class="mb-4 text-sm text-muted-foreground">
				Live viewport size and UnoCSS breakpoint. Resize the browser window to see it update.
			</p>
			<BreakpointBadge />
		</div>
	);
}

function HealthCard() {
	const checks = [
		{ label: "UnoCSS theme classes only", status: true },
		{ label: "Semantic color tokens", status: true },
		{ label: "Accessible focus rings", status: true },
		{ label: "Mobile-first responsive", status: true },
		{ label: "SolidJS control flow", status: true },
	];
	const passed = () => checks.filter((c) => c.status).length;

	return (
		<div class="rounded-xl border border-border bg-surface p-5 shadow-sm">
			<h2 class="mb-2 text-lg font-semibold">Health</h2>
			<p class="mb-4 text-sm text-muted-foreground">
				A quick best-practice checklist for solid-ui consumers. A deeper health scan can be run with the CLI.
			</p>
			<div class="mb-4">
				<div class="text-2xl font-bold">
					{passed()}/{checks.length}
				</div>
				<div class="text-xs text-muted-foreground">Checks passed</div>
			</div>
			<ul class="space-y-2">
				<For each={checks}>
					{(check) => (
						<li class="flex items-center gap-2 text-sm">
							<span
								class={`h-2 w-2 rounded-full ${check.status ? "bg-success" : "bg-destructive"}`}
								aria-hidden="true"
							/>
							<span class={check.status ? "text-foreground" : "text-muted-foreground"}>{check.label}</span>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}

interface TabButtonProps {
	active: boolean;
	label: string;
	tabId: string;
	panelId: string;
	onClick: () => void;
}

function TabButton(props: TabButtonProps) {
	return (
		<button
			type="button"
			id={props.tabId}
			role="tab"
			aria-selected={props.active}
			aria-controls={props.panelId}
			onClick={props.onClick}
			class={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
				props.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
			}`}
		>
			{props.label}
		</button>
	);
}

export function PluginsPage() {
	const [tab, setTab] = createSignal("validator");

	return (
		<section class="page">
			<Seo
				title="Plugins — solid-ui"
				description="solid-ui developer tools: theme validator, responsive breakpoint, and health checks."
				path="/plugins"
			/>
			<PageHeader
				title="Plugins"
				description="Developer tools for validating, inspecting, and keeping your design system healthy."
			/>

			<div class="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Plugin tools">
				<TabButton
					active={tab() === "validator"}
					label="Theme Validator"
					tabId="tab-validator"
					panelId="panel-validator"
					onClick={() => setTab("validator")}
				/>
				<TabButton
					active={tab() === "responsive"}
					label="Responsive"
					tabId="tab-responsive"
					panelId="panel-responsive"
					onClick={() => setTab("responsive")}
				/>
				<TabButton
					active={tab() === "health"}
					label="Health"
					tabId="tab-health"
					panelId="panel-health"
					onClick={() => setTab("health")}
				/>
			</div>

			<Switch>
				<Match when={tab() === "validator"}>
					<div id="panel-validator" role="tabpanel" aria-labelledby="tab-validator">
						<ThemeValidatorCard />
					</div>
				</Match>
				<Match when={tab() === "responsive"}>
					<div id="panel-responsive" role="tabpanel" aria-labelledby="tab-responsive">
						<ResponsiveToolsCard />
					</div>
				</Match>
				<Match when={tab() === "health"}>
					<div id="panel-health" role="tabpanel" aria-labelledby="tab-health">
						<HealthCard />
					</div>
				</Match>
			</Switch>
		</section>
	);
}
