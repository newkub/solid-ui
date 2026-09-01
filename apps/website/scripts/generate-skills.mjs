import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SKILL_DIRS = [
	"C:\\Users\\Veerapong\\AppData\\Roaming\\devin\\skills",
	"D:\\newkub\\solid-ui\\.devin\\skills",
];

function parseFrontmatter(content) {
	const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return {};
	const lines = match[1].split(/\r?\n/);
	const data = {};
	for (const line of lines) {
		const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
		if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
	}
	return data;
}

function collectSkills(dir) {
	const skills = [];
	let entries = [];
	try {
		entries = readdirSync(dir);
	} catch {
		return skills;
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
			const content = readFileSync(skillFile, "utf8");
			const meta = parseFrontmatter(content);
			skills.push({
				name: meta.name || entry,
				description: meta.description || "",
				source: dir,
			});
		} catch {
			// no SKILL.md, skip
		}
	}
	return skills;
}

const all = SKILL_DIRS.flatMap(collectSkills).sort((a, b) => a.name.localeCompare(b.name));
const outPath = join(import.meta.dirname, "..", "src", "data", "skills.json");
writeFileSync(outPath, `${JSON.stringify(all, null, "\t")}\n`, "utf8");
console.log(`Wrote ${all.length} skills to ${outPath}`);
