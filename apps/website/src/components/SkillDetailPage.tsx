import { useParams } from "@tanstack/solid-router";
import { createSignal, Show } from "solid-js";
import skillsData from "../data/skills.json";
import { skillsContent } from "../data/skills-content";
import { Markdown } from "./Markdown";
import { PageHeader } from "./PageHeader";
import { Seo } from "./Seo";
import { Tag } from "./Tag";

export type Skill = {
	name: string;
	description: string;
	source: string;
};

const skills: Skill[] = skillsData as Skill[];

function findSkill(name: string): Skill | undefined {
	return skills.find((s) => s.name === name);
}

export function SkillDetailPage() {
	const params = useParams({ strict: false });
	const skill = () => findSkill(params().name);
	const [copied, setCopied] = createSignal(false);

	async function copyCommand() {
		const s = skill();
		if (!s) return;
		const command = `bun "${s.source}/${s.name}/SKILL.md"`;
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		} catch {}
	}

	return (
		<section class="page">
			<Show when={skill()} fallback={<p class="text-muted-foreground">Skill not found.</p>}>
				{(s) => (
					<>
						<Seo title={`${s().name} — solid-ui`} description={s().description} path={`/skills/${s().name}`} />
						<PageHeader title={s().name} description={s().description}>
							<Tag label="skill" variant="primary" />
						</PageHeader>

						<div class="mb-6 flex flex-wrap items-center gap-3">
							<button
								type="button"
								onClick={copyCommand}
								class="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							>
								{copied() ? "Copied" : "Copy command"}
							</button>
							<a
								href={`https://github.com/newkub/solid-ui/tree/main/${s().source}/${s().name}`}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex h-10 items-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
							>
								View on GitHub
							</a>
						</div>

						<Show when={skillsContent[s().name]}>
							<div class="rounded-xl border border-border bg-surface p-6 shadow-sm">
								<Markdown content={skillsContent[s().name]} />
							</div>
						</Show>
					</>
				)}
			</Show>
		</section>
	);
}
