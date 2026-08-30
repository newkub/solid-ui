export default {
	async fetch(request: Request, env: Record<string, any>): Promise<Response> {
		if (env.ASSETS) {
			return env.ASSETS.fetch(request)
		}
		return new Response('Not found', { status: 404 })
	},
}