import { GITHUB_REPO_URL } from "../lib/config";

export function Footer() {
	return (
		<footer class="border-t border-border bg-surface py-6 text-center text-sm text-muted-foreground">
			<div class="mx-auto max-w-7xl px-4">
				<p>
					Built with Solid + TanStack Router, deployed on Cloudflare Workers. Source on{" "}
					<a
						href={GITHUB_REPO_URL}
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
