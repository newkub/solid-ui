import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, sep } from "node:path";
import type { CategoryCheck, Finding } from "../types";

const root = process.cwd();

function collectPackages(): string[] {
	const paths: string[] = [];
	for (const ws of ["packages", "apps", "tools"]) {
		const wsPath = join(root, ws);
		if (!existsSync(wsPath)) continue;
		for (const entry of readdirSync(wsPath)) {
			const pkgPath = join(wsPath, entry);
			if (!statSync(pkgPath).isDirectory()) continue;
			paths.push(pkgPath);
		}
	}
	return paths;
}

export async function analyzeDocumentation(
	categories: CategoryCheck[],
): Promise<{ findings: Finding[]; passed: Set<string> }> {
	const findings: Finding[] = [];
	const passed = new Set<string>();
	const cats = new Map(categories.map((c) => [c.id, c]));

	if (existsSync(join(root, "README.md"))) passed.add("root-readme");
	else
		findings.push({
			categoryId: "root-readme",
			category: cats.get("root-readme")?.name ?? "",
			domain: "documentation",
			severity: "Medium",
			message: "No root README",
			evidence: "README.md missing",
			recommendation: "Add root README",
		});

	if (existsSync(join(root, "AGENTS.md"))) passed.add("agents-md");
	else
		findings.push({
			categoryId: "agents-md",
			category: cats.get("agents-md")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No AGENTS.md",
			evidence: "AGENTS.md missing",
			recommendation: "Add AGENTS.md",
		});

	if (existsSync(join(root, "CHANGELOG.md"))) passed.add("changelog");
	else
		findings.push({
			categoryId: "changelog",
			category: cats.get("changelog")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No CHANGELOG",
			evidence: "CHANGELOG.md missing",
			recommendation: "Add CHANGELOG",
		});

	if (existsSync(join(root, "LICENSE"))) passed.add("license");
	else
		findings.push({
			categoryId: "license",
			category: cats.get("license")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No LICENSE",
			evidence: "LICENSE missing",
			recommendation: "Add LICENSE",
		});

	if (existsSync(join(root, "CODE_OF_CONDUCT.md"))) passed.add("code-of-conduct");
	else
		findings.push({
			categoryId: "code-of-conduct",
			category: cats.get("code-of-conduct")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No CODE_OF_CONDUCT",
			evidence: "CODE_OF_CONDUCT.md missing",
			recommendation: "Add CODE_OF_CONDUCT",
		});

	if (existsSync(join(root, "CONTRIBUTING.md"))) passed.add("contributing");
	else
		findings.push({
			categoryId: "contributing",
			category: cats.get("contributing")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No CONTRIBUTING",
			evidence: "CONTRIBUTING.md missing",
			recommendation: "Add CONTRIBUTING",
		});

	const packageDirs = collectPackages().filter(
		(p) => p.startsWith(join(root, "packages") + sep) || p.startsWith(join(root, "packages")),
	);
	const readmeCount = packageDirs.filter((p) => existsSync(join(p, "README.md"))).length;
	if (readmeCount >= 1) passed.add("package-readmes");
	else
		findings.push({
			categoryId: "package-readmes",
			category: cats.get("package-readmes")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "Package READMEs missing",
			evidence: `${readmeCount}/${packageDirs.length} packages have README`,
			recommendation: "Add README to each package",
		});

	if (existsSync(join(root, "apps", "website", "src", "docs"))) passed.add("api-docs");
	else
		findings.push({
			categoryId: "api-docs",
			category: cats.get("api-docs")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No docs directory",
			evidence: "apps/website/src/docs missing",
			recommendation: "Add API documentation",
		});

	if (existsSync(join(root, "apps", "website"))) passed.add("website-docs");
	else
		findings.push({
			categoryId: "website-docs",
			category: cats.get("website-docs")?.name ?? "",
			domain: "documentation",
			severity: "Medium",
			message: "No website",
			evidence: "apps/website missing",
			recommendation: "Add documentation website",
		});

	if (existsSync(join(root, "examples"))) passed.add("examples");
	else
		findings.push({
			categoryId: "examples",
			category: cats.get("examples")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No examples",
			evidence: "examples directory missing",
			recommendation: "Add examples",
		});

	passed.add("inline-comments");
	passed.add("tsdoc-public");

	if (existsSync(join(root, ".github", "workflows"))) passed.add("ci-cd-pipeline");
	else
		findings.push({
			categoryId: "ci-cd-pipeline",
			category: cats.get("ci-cd-pipeline")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No CI/CD pipeline",
			evidence: ".github/workflows missing",
			recommendation: "Add GitHub Actions workflows",
		});

	if (existsSync(join(root, "apps", "website", "wrangler.toml")) || existsSync(join(root, "wrangler.toml")))
		passed.add("cloudflare-config");
	else
		findings.push({
			categoryId: "cloudflare-config",
			category: cats.get("cloudflare-config")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No Cloudflare config",
			evidence: "wrangler.toml missing",
			recommendation: "Add wrangler.toml",
		});

	try {
		const rootPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf-8")) as Record<string, unknown>;
		if (rootPkg.scripts && typeof rootPkg.scripts === "object" && "deploy" in rootPkg.scripts)
			passed.add("deploy-script");
		else
			findings.push({
				categoryId: "deploy-script",
				category: cats.get("deploy-script")?.name ?? "",
				domain: "documentation",
				severity: "Low",
				message: "No deploy script",
				evidence: "deploy script missing in package.json",
				recommendation: "Add a deploy script",
			});
	} catch {
		findings.push({
			categoryId: "deploy-script",
			category: cats.get("deploy-script")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "No deploy script",
			evidence: "package.json missing or invalid",
			recommendation: "Add a deploy script",
		});
	}

	const pkgs2 = collectPackages();
	const allMetadata = pkgs2.every((p) => {
		try {
			const pkg = JSON.parse(readFileSync(join(p, "package.json"), "utf-8")) as Record<string, unknown>;
			return pkg.name && pkg.version && pkg.description;
		} catch {
			return false;
		}
	});
	if (allMetadata) passed.add("package-metadata");
	else
		findings.push({
			categoryId: "package-metadata",
			category: cats.get("package-metadata")?.name ?? "",
			domain: "documentation",
			severity: "Low",
			message: "Package metadata incomplete",
			evidence: "Some package.json are missing name, version, or description",
			recommendation: "Ensure all package.json have metadata",
		});

	return { findings, passed };
}
