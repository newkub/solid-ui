interface Env {
	ASSETS?: { fetch: (request: Request | string) => Promise<Response> };
}

function hasExtension(pathname: string) {
	const last = pathname.split("/").pop() ?? "";
	return last.includes(".");
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (!env.ASSETS) {
			return new Response("Not found", { status: 404 });
		}

		const response = await env.ASSETS.fetch(request);

		if (response.status === 404 && !hasExtension(new URL(request.url).pathname)) {
			const fallback = await env.ASSETS.fetch(new URL("/index.html", request.url).toString());
			if (fallback.status === 200) {
				return new Response(fallback.body, {
					status: 200,
					headers: fallback.headers,
				});
			}
		}

		return response;
	},
};
