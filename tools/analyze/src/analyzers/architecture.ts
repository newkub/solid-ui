import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import type { CategoryCheck, Finding } from "../types";

const root = process.cwd();

function walkDir(dir: string, files: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		const stat = statSync(full);
		if (stat.isDirectory()) {
			if (entry === "node_modules" || entry === ".git" || entry === "dist") continue;
			walkDir(full, files);
		} else if (stat.isFile() && (full.endsWith(".ts") || full.endsWith(".tsx")) && !entry.endsWith("-report.json")) {
			files.push(full);
		}
	}
	return files;
}

export async function analyzeArchitecture(
	categories: CategoryCheck[],
): Promise<{ findings: Finding[]; passed: Set<string> }> {
	const findings: Finding[] = [];
	const passed = new Set<string>();
	const cats = new Map(categories.map((c) => [c.id, c]));

	const workspaces = ["packages", "apps", "tools"];
	for (const ws of workspaces) {
		const wsPath = join(root, ws);
		if (!existsSync(wsPath)) continue;
		for (const pkg of readdirSync(wsPath)) {
			const pkgPath = join(wsPath, pkg);
			if (!statSync(pkgPath).isDirectory()) continue;
			if (!existsSync(join(pkgPath, "package.json"))) {
				findings.push({
					categoryId: "workspace-packages",
					category: cats.get("workspace-packages")?.name ?? "",
					domain: "architecture",
					severity: "High",
					message: `Workspace missing package.json`,
					file: pkgPath,
					evidence: `${pkgPath} has no package.json`,
					recommendation: "Add package.json to every workspace",
				});
			}

			if (ws === "packages") {
				const hasIndex = existsSync(join(pkgPath, "src", "index.ts")) || existsSync(join(pkgPath, "src", "index.tsx"));
				if (!hasIndex) {
					findings.push({
						categoryId: "barrel-exports",
						category: cats.get("barrel-exports")?.name ?? "",
						domain: "architecture",
						severity: "Low",
						message: `No barrel export in ${pkg}`,
						file: pkgPath,
						evidence: `src/index.ts missing in ${pkgPath}`,
						recommendation: "Create a barrel export for public API",
					});
				}

				for (const indexName of ["index.ts", "index.tsx"]) {
					const indexPath = join(pkgPath, "src", indexName);
					if (existsSync(indexPath)) {
						const indexContent = readFileSync(indexPath, "utf-8");
						if (!/\/\*\*/.test(indexContent)) {
							findings.push({
								categoryId: "public-api-docs",
								category: cats.get("public-api-docs")?.name ?? "",
								domain: "architecture",
								severity: "Low",
								message: `Public API index lacks TSDoc`,
								file: relative(root, indexPath),
								evidence: `src/${indexName} in ${pkg} has no TSDoc comments`,
								recommendation: "Add TSDoc to public API exports",
							});
						}
						break;
					}
				}
			}

			if (!existsSync(join(pkgPath, "src"))) {
				findings.push({
					categoryId: "clean-src",
					category: cats.get("clean-src")?.name ?? "",
					domain: "architecture",
					severity: "Low",
					message: `No src/ folder in ${pkg}`,
					file: pkgPath,
					evidence: `src/ folder missing in ${pkgPath}`,
					recommendation: "Place source code under src/",
				});
			}
		}
	}

	if (!findings.some((f) => f.categoryId === "workspace-packages")) passed.add("workspace-packages");
	if (!findings.some((f) => f.categoryId === "barrel-exports")) passed.add("barrel-exports");
	if (!findings.some((f) => f.categoryId === "clean-src")) passed.add("clean-src");
	if (!findings.some((f) => f.categoryId === "public-api-docs")) passed.add("public-api-docs");

	const files = walkDir(root);
	for (const file of files) {
		const rel = relative(root, file);
		const content = readFileSync(file, "utf-8");

		if (rel.includes("/src/")) {
			const match = content.match(/from\s+["'](?:\.\.\/)+(packages|apps|tools)\/[^"']+["']/);
			if (match) {
				findings.push({
					categoryId: "no-cross-package-relative",
					category: cats.get("no-cross-package-relative")?.name ?? "",
					domain: "architecture",
					severity: "Medium",
					message: "Cross-package relative import detected",
					file: rel,
					evidence: match[0],
					recommendation: "Use workspace package imports",
				});
			}
		}

		const validName = /^[A-Za-z][\w.-]*\.(?:ts|tsx|js|jsx)$/;
		const basename = (rel.split("/").pop() ?? "").split("\\").pop() ?? "";
		if (basename && !validName.test(basename) && !basename.endsWith(".d.ts")) {
			findings.push({
				categoryId: "consistent-naming",
				category: cats.get("consistent-naming")?.name ?? "",
				domain: "architecture",
				severity: "Low",
				message: "Inconsistent file naming",
				file: rel,
				evidence: basename,
				recommendation: "Use kebab-case, camelCase, or PascalCase without spaces",
			});
		}
	}

	if (!findings.some((f) => f.categoryId === "no-cross-package-relative")) passed.add("no-cross-package-relative");
	if (!findings.some((f) => f.categoryId === "consistent-naming")) passed.add("consistent-naming");

	if (existsSync(join(root, "tsconfig.json")) || existsSync(join(root, "tsconfig.base.json")))
		passed.add("root-tsconfig");
	else
		findings.push({
			categoryId: "root-tsconfig",
			category: cats.get("root-tsconfig")?.name ?? "",
			domain: "architecture",
			severity: "High",
			message: "No root tsconfig",
			evidence: "tsconfig.json missing",
			recommendation: "Add root tsconfig",
		});

	if (existsSync(join(root, "biome.json")) || existsSync(join(root, "biome.jsonc"))) passed.add("biome-config");
	else
		findings.push({
			categoryId: "biome-config",
			category: cats.get("biome-config")?.name ?? "",
			domain: "architecture",
			severity: "Medium",
			message: "No Biome config",
			evidence: "biome.json missing",
			recommendation: "Add Biome config",
		});

	// Circular dependency detection within packages
	const graph = new Map<string, Set<string>>();
	for (const file of files) {
		const abs = resolve(root, file);
		const content = readFileSync(file, "utf-8");
		const dir = dirname(abs);
		const importMatches = content.matchAll(/from\s+["']([^"']+)["']|import\s+["']([^"']+)["']/g);

		for (const match of importMatches) {
			const specifier = match[1] ?? match[2];
			if (!specifier?.startsWith(".")) continue;

			let resolved = resolve(dir, specifier);
			if (!existsSync(resolved)) {
				for (const ext of [".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js", "/index.jsx"]) {
					const candidate = `${resolved}${ext}`;
					if (existsSync(candidate)) {
						resolved = candidate;
						break;
					}
				}
			}

			if (!existsSync(resolved)) continue;

			if (!graph.has(abs)) graph.set(abs, new Set());
			graph.get(abs)?.add(resolved);
		}
	}

	const visited = new Set<string>();
	const inStack = new Set<string>();
	let cycle: string[] = [];

	const dfs = (node: string, stack: string[]) => {
		if (inStack.has(node)) {
			const start = stack.indexOf(node);
			cycle = stack.slice(start);
			return;
		}
		if (visited.has(node) || cycle.length > 0) return;

		visited.add(node);
		inStack.add(node);
		stack.push(node);

		for (const next of graph.get(node) ?? []) {
			dfs(next, stack);
			if (cycle.length > 0) return;
		}

		stack.pop();
		inStack.delete(node);
	};

	for (const node of graph.keys()) {
		dfs(node, []);
		if (cycle.length > 0) break;
	}

	if (cycle.length > 0) {
		findings.push({
			categoryId: "no-circular-deps",
			category: cats.get("no-circular-deps")?.name ?? "",
			domain: "architecture",
			severity: "High",
			message: "Circular dependency detected",
			file: relative(root, cycle[0] ?? ""),
			evidence: cycle.map((f) => relative(root, f)).join(" -> "),
			recommendation: "Break the import cycle",
		});
	} else {
		passed.add("no-circular-deps");
	}

	// dependency graph validity is checked by dependencies analyzer
	passed.add("dependency-graph");

	return { findings, passed };
}
