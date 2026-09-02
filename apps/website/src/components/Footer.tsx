import { siteMeta } from "../data/site";

export function Footer() {
	return (
		<footer class="border-t border-border bg-surface py-6 text-center text-sm text-muted-foreground">
			<div class="mx-auto max-w-7xl px-4">
				<p>
					Built with {siteMeta.builtWith.join(" + ")}, deployed on {siteMeta.deployTarget}. Source on{" "}
					<a
						href={siteMeta.repoUrl}
						target="_blank"
						rel="noreferrer"
						class="text-foreground underline underline-offset-4 hover:text-primary"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</footer>
	);
}
