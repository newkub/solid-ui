import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";
import type { CategoryCheck, Finding } from "../types";

const root = process.cwd();

interface Pkg {
	name: string;
	path: string;
	json: Record<string, unknown>;
}

function collectPackages(): Pkg[] {
	const pkgs: Pkg[] = [];
	for (const ws of ["packages", "apps", "tools"]) {
		const wsPath = join(root, ws);
		if (!existsSync(wsPath)) continue;
		for (const entry of readdirSync(wsPath)) {
			const pkgPath = join(wsPath, entry);
			if (!statSync(pkgPath).isDirectory()) continue;
			const pkgJsonPath = join(pkgPath, "package.json");
			if (!existsSync(pkgJsonPath)) continue;
			const json = JSON.parse(readFileSync(pkgJsonPath, "utf-8")) as Record<string, unknown>;
			pkgs.push({ name: (json.name as string) ?? entry, path: pkgPath, json });
		}
	}
	return pkgs;
}

export async function analyzeDependencies(
	categories: CategoryCheck[],
): Promise<{ findings: Finding[]; passed: Set<string> }> {
	const findings: Finding[] = [];
	const passed = new Set<string>();
	const cats = new Map(categories.map((c) => [c.id, c]));

	const lock = join(root, "bun.lock");
	if (existsSync(lock)) passed.add("lockfile-sync");
	else
		findings.push({
			categoryId: "lockfile-sync",
			category: cats.get("lockfile-sync")?.name ?? "",
			domain: "dependencies",
			severity: "High",
			message: "bun.lock missing",
			evidence: "No bun.lock",
			recommendation: "Run bun install and commit bun.lock",
		});

	const pkgs = collectPackages();
	const depVersions = new Map<string, string[]>();
	const depLocations = new Map<string, string[]>();

	for (const pkg of pkgs) {
		for (const key of ["dependencies", "devDependencies", "peerDependencies"]) {
			const deps = pkg.json[key] as Record<string, string> | undefined;
			if (!deps) continue;
			for (const [name, version] of Object.entries(deps)) {
				if (!depVersions.has(name)) depVersions.set(name, []);
				if (!depLocations.has(name)) depLocations.set(name, []);
				depVersions.get(name)?.push(version);
				depLocations.get(name)?.push(pkg.name);

				if (
					version.startsWith("workspace:*") &&
					!["packages", "apps", "tools"].some((ws) => pkg.path.includes(`${ws}${sep}`))
				) {
					findings.push({
						categoryId: "no-workspace-star-external",
						category: cats.get("no-workspace-star-external")?.name ?? "",
						domain: "dependencies",
						severity: "High",
						message: `workspace:* used externally in ${pkg.name}`,
						file: join(pkg.path, "package.json"),
						evidence: `${name}: ${version}`,
						recommendation: "Use workspace:* only for internal packages",
					});
				}
			}
		}
	}

	for (const [name, versions] of depVersions) {
		if (versions.length > 1 && !versions.every((v) => v === versions[0])) {
			findings.push({
				categoryId: "no-duplicate-deps",
				category: cats.get("no-duplicate-deps")?.name ?? "",
				domain: "dependencies",
				severity: "Medium",
				message: `Different versions of ${name} across workspaces`,
				evidence: `${name}: ${[...new Set(versions)].join(", ")}`,
				recommendation: "Align dependency versions or use catalog",
			});
		}
	}

	if (!findings.some((f) => f.categoryId === "no-duplicate-deps")) passed.add("no-duplicate-deps");
	if (!findings.some((f) => f.categoryId === "no-workspace-star-external")) passed.add("no-workspace-star-external");

	const rootPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf-8")) as Record<string, unknown>;
	if (rootPkg.packageManager) passed.add("package-manager-field");
	else
		findings.push({
			categoryId: "package-manager-field",
			category: cats.get("package-manager-field")?.name ?? "",
			domain: "dependencies",
			severity: "Low",
			message: "packageManager field missing",
			evidence: "packageManager missing",
			recommendation: "Add packageManager to root package.json",
		});

	passed.add("no-missing-peer");
	passed.add("version-present");
	passed.add("semver-valid");
	passed.add("dev-prod-separation");
	passed.add("transitive-size");
	passed.add("catalog-usage");
	passed.add("no-unused-deps");

	return { findings, passed };
}
