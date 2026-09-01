import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const SKILL_DIR = join(root, ".devin", "skills");
const REL_SOURCE = ".devin/skills";

function parseFrontmatter(content) {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return { meta: {}, body: content };
	const lines = match[1].split(/\r?\n/);
	const data = {};
	for (const line of lines) {
		const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
		if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
	}
	const body = content.slice(match[0].length).trim();
	return { meta: data, body };
}

function collectSkills(dir) {
	const skills = [];
	const content = {};
	let entries = [];
	try {
		entries = readdirSync(dir);
	} catch {
		return { skills, content };
	}
	for (const entry of entries) {
		const full = join(dir, entry);
		let isDir = false;
		try {
			isDir = statSync(full).isDirectory();
		} catch {
			continue;
		}
		if (!isDir) continue;
		const skillFile = join(full, "SKILL.md");
		try {
			const raw = readFileSync(skillFile, "utf8");
			const { meta, body } = parseFrontmatter(raw);
			skills.push({
				name: meta.name || entry,
				description: meta.description || "",
				source: REL_SOURCE,
			});
			content[meta.name || entry] = body;
		} catch {
			// no SKILL.md, skip
		}
	}
	return { skills, content };
}

const { skills, content } = collectSkills(SKILL_DIR);
const sorted = skills.sort((a, b) => a.name.localeCompare(b.name));
const sortedContent = Object.fromEntries(Object.entries(content).sort(([a], [b]) => a.localeCompare(b)));

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data");
writeFileSync(join(dataDir, "skills.json"), `${JSON.stringify(sorted, null, "\t")}\n`, "utf8");
writeFileSync(
	join(dataDir, "skills-content.ts"),
	`${["export const skillsContent: Record<string, string> = {", ...Object.entries(sortedContent).map(([name, body]) => `\t${JSON.stringify(name)}: ${JSON.stringify(body)},`), "};", ""].join("\n")}\n`,
	"utf8",
);
console.log(`Wrote ${sorted.length} skills to skills.json and skills-content.ts`);
