import { Link } from "@tanstack/solid-router";
import { For, Show } from "solid-js";
import skillsData from "../data/skills.json";
import { useSearch } from "../hooks/useSearch";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";
import { SearchInput } from "./SearchInput";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

export type Skill = {
	name: string;
	description: string;
	source: string;
};

const skills: Skill[] = skillsData as Skill[];

function matchesQuery(skill: Skill, query: string): boolean {
	const haystack = `${skill.name} ${skill.description}`.toLowerCase();
	return haystack.includes(query.toLowerCase());
}

function SkillCard(props: { skill: Skill }) {
	return (
		<li>
			<Link
				to={`/skills/${props.skill.name}`}
				class="group flex h-full flex-col gap-2 rounded-xl border border-border bg-surface p-4 shadow-sm no-underline transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
			>
				<div class="flex items-start justify-between gap-2">
					<h3 class="text-base font-semibold text-foreground group-hover:text-primary">{props.skill.name}</h3>
					<Tag label="skill" />
				</div>
				<p class="flex-1 text-sm text-muted-foreground line-clamp-3">
					{props.skill.description || "No description available."}
				</p>
			</Link>
		</li>
	);
}

export function SkillsPage() {
	const { query, setQuery, debouncedQuery, filtered } = useSearch(
		() => skills,
		(skill, q) => matchesQuery(skill, q),
	);

	return (
		<section class="page flex flex-col gap-6">
			<Seo
				title="Skills — solid-ui"
				description="Explore solid-ui skills, primitives, and integrations."
				path="/skills"
			/>
			<PageHeader
				title="Skills"
				description={`${skills.length} solid-ui project skills and reusable prompts.`}
				count={filtered().length}
			>
				<SearchInput
					id="skills-search"
					placeholder="Search skills…"
					value={query()}
					onInput={setQuery}
					label="Search skills"
					class="max-w-sm"
				/>
			</PageHeader>
			<Show when={filtered().length > 0} fallback={<EmptyState query={debouncedQuery()} label="skills" />}>
				<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<For each={filtered()}>{(skill) => <SkillCard skill={skill} />}</For>
				</ul>
			</Show>
		</section>
	);
}
