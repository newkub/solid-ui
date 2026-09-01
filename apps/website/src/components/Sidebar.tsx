import { Link, useParams } from "@tanstack/solid-router";
import { type Accessor, createMemo, createSignal, For, type JSX } from "solid-js";
import { docs } from "../docs/generated";

interface DocGroupMeta {
	label: string;
	icon: (props: { class?: string }) => JSX.Element;
}

interface SidebarItem {
	id: string;
	title: string;
	order: number;
}

interface SidebarSection {
	group: string;
	label: string;
	icon: DocGroupMeta["icon"];
	items: SidebarItem[];
}

function RocketIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c.8-.8 1-2 1-2M15 9l-3 3M12 15l-3-3m0 0 6-6c1.5-1.5 4-2.5 6-2.5 0 2-1 4.5-2.5 6l-6 6-3.5.5.5-3.5Z"
			/>
		</svg>
	);
}

function PuzzleIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4 9h3a1 1 0 0 0 1-1V5.5a1.5 1.5 0 0 1 3 0V8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V5.5a1.5 1.5 0 0 1 3 0V8a1 1 0 0 0 1 1h2v3a1 1 0 0 1-1 1h-2.5a1.5 1.5 0 0 0 0 3H20v3H4v-3h2.5a1.5 1.5 0 0 0 0-3H4V9Z"
			/>
		</svg>
	);
}

function LayoutIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<rect x="3" y="3" width="18" height="18" rx="2" />
			<path stroke-linecap="round" d="M3 9h18M9 21V9" />
		</svg>
	);
}

function LayersIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="m12 3 9 5-9 5-9-5 9-5Z" />
			<path stroke-linecap="round" stroke-linejoin="round" d="m3 12 9 5 9-5M3 16.5l9 5 9-5" />
		</svg>
	);
}

function PaintbrushIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M18.4 3.6a1.5 1.5 0 0 1 2 2.2L12.5 14l-3-3 8.9-7.4ZM9 12l-1 5-4 1 1-4 4-2Z"
			/>
		</svg>
	);
}

function PlugIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9 3v4M15 3v4M6.5 7h11l-1 5.5a5 5 0 0 1-9 0L6.5 7ZM12 17v4"
			/>
		</svg>
	);
}

function ChevronIcon(props: { class?: string }) {
	return (
		<svg class={props.class} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
			<path stroke-linecap="round" stroke-linejoin="round" d="m9 6 6 6-6 6" />
		</svg>
	);
}

const groupMeta: Record<string, DocGroupMeta> = {
	"getting-started": { label: "Getting started", icon: RocketIcon },
	primitives: { label: "Primitives", icon: PuzzleIcon },
	components: { label: "Components", icon: LayoutIcon },
	templates: { label: "Templates", icon: LayersIcon },
	theming: { label: "Theming", icon: PaintbrushIcon },
	integrations: { label: "Integrations", icon: PlugIcon },
};

const groupOrder = Object.keys(groupMeta);

function pagePath(id: string) {
	const [group, ...rest] = id.split("/");
	return rest.length ? `/docs/${group}/${rest.join("/")}` : `/docs/${group}`;
}

function buildSections(): SidebarSection[] {
	const byGroup: Record<string, SidebarItem[]> = {};
	for (const [id, page] of Object.entries(docs)) {
		byGroup[page.group] = byGroup[page.group] ?? [];
		byGroup[page.group].push({ id, title: page.title, order: page.order });
	}
	for (const group of Object.keys(byGroup)) {
		byGroup[group].sort((a, b) => a.order - b.order);
	}
	return groupOrder
		.map((group) => {
			const meta = groupMeta[group] ?? { label: group, icon: LayoutIcon };
			return { group, label: meta.label, icon: meta.icon, items: byGroup[group] ?? [] };
		})
		.filter((s) => s.items.length > 0);
}

function SidebarGroup(props: { section: SidebarSection; activeGroup: string; activeId?: string }) {
	const isActiveGroup = () => props.section.group === props.activeGroup;
	const [expanded, setExpanded] = createSignal(isActiveGroup());
	const panelId = `docs-group-${props.section.group}`;
	const Icon = props.section.icon;

	return (
		<div class="mb-4">
			<button
				type="button"
				class={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-muted ${
					isActiveGroup() ? "text-foreground" : "text-muted-foreground"
				}`}
				aria-expanded={expanded()}
				aria-controls={panelId}
				onClick={() => setExpanded((v) => !v)}
			>
				<Icon class="h-4 w-4 shrink-0" />
				<span class="flex-1 text-left">{props.section.label}</span>
				<ChevronIcon class={`h-3.5 w-3.5 shrink-0 transition-transform ${expanded() ? "rotate-90" : ""}`} />
			</button>
			<ul id={panelId} class={`mt-1 space-y-1 ${expanded() ? "block" : "hidden"}`}>
				<For each={props.section.items}>
					{(item) => {
						const active = item.id === props.activeId;
						return (
							<li>
								<Link
									to={pagePath(item.id)}
									class={`block rounded-md border-l-2 py-1.5 pl-4 pr-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
										active
											? "border-primary bg-muted font-medium text-primary"
											: "border-transparent text-muted-foreground"
									}`}
									activeProps={() => ({
										class:
											"block rounded-md border-l-2 border-primary bg-muted py-1.5 pl-4 pr-2 text-sm font-medium text-primary",
									})}
									activeOptions={{ exact: true }}
									aria-current={active ? "page" : undefined}
								>
									{item.title}
								</Link>
							</li>
						);
					}}
				</For>
			</ul>
		</div>
	);
}

export function Sidebar() {
	const params = useParams({ strict: false }) as Accessor<{ group: string; name?: string }>;
	const activeGroup = () => params().group;
	const activeId = () => (params().name ? `${params().group}/${params().name}` : params().group);

	const sections = createMemo(() => buildSections());

	return (
		<aside class="lg:sticky lg:top-24 lg:w-64 lg:shrink-0" aria-label="Docs sidebar">
			<For each={sections()}>
				{(section) => <SidebarGroup section={section} activeGroup={activeGroup()} activeId={activeId()} />}
			</For>
		</aside>
	);
}
