import { Link } from "@tanstack/solid-router";
import { createMemo, createSignal, For, Show } from "solid-js";
import skillsData from "../data/skills.json";

export type Skill = {
	name: string;
	description: string;
	source: string;
};

const skills: Skill[] = skillsData as Skill[];

function matchesQuery(skill: Skill, query: string): boolean {
	if (!query) return true;
	const haystack = `${skill.name} ${skill.description}`.toLowerCase();
	return haystack.includes(query.toLowerCase());
}

function SkillCard(props: { skill: Skill }) {
	return (
		<li class="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:shadow-md">
			<h3 class="text-base font-semibold text-foreground">{props.skill.name}</h3>
			<p class="flex-1 text-sm text-muted-foreground line-clamp-3">
				{props.skill.description || "No description available."}
			</p>
			<Link
				to={`/skills/${props.skill.name}`}
				class="inline-flex h-8 w-fit items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
				aria-label={`Run ${props.skill.name} skill`}
			>
				Run
			</Link>
		</li>
	);
}

function SearchInput(props: { value: string; onInput: (value: string) => void }) {
	return (
		<div class="relative w-full max-w-sm">
			<label for="skills-search" class="sr-only">
				Search skills
			</label>
			<input
				id="skills-search"
				type="search"
				placeholder="Search skills…"
				value={props.value}
				onInput={(event) => props.onInput(event.currentTarget.value)}
				class="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
			/>
		</div>
	);
}

export function SkillsPage() {
	const [query, setQuery] = createSignal("");
	const filtered = createMemo(() => skills.filter((skill) => matchesQuery(skill, query())));

	return (
		<section class="page flex flex-col gap-6">
			<header class="flex flex-col gap-2">
				<h2 class="text-2xl font-bold tracking-tight text-foreground">Skills</h2>
				<p class="text-sm text-muted-foreground">{skills.length} skills available from the Devin skill library.</p>
				<SearchInput value={query()} onInput={setQuery} />
			</header>
			<Show
				when={filtered().length > 0}
				fallback={<p class="text-sm text-muted-foreground">No skills match "{query()}".</p>}
			>
				<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<For each={filtered()}>{(skill) => <SkillCard skill={skill} />}</For>
				</ul>
			</Show>
		</section>
	);
}
