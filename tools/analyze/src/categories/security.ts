import type { CategoryCheck } from "../types";

export const categories: CategoryCheck[] = [
	// Security
	{
		id: "no-env-committed",
		name: "No .env committed",
		domain: "security",
		description: "No .env files in git",
		weight: 1,
	},
	{ id: "no-private-keys", name: "No private keys", domain: "security", description: "No SSH/PEM keys", weight: 1 },
	{
		id: "no-passwords",
		name: "No passwords in code",
		domain: "security",
		description: "No hardcoded passwords",
		weight: 1,
	},
	{ id: "no-tokens", name: "No tokens in code", domain: "security", description: "No API/secret tokens", weight: 1 },
	{ id: "no-eval", name: "No unsafe eval", domain: "security", description: "Avoid eval and new Function", weight: 1 },
	{
		id: "safe-inner-html",
		name: "Safe innerHTML usage",
		domain: "security",
		description: "innerHTML only with trusted content",
		weight: 1,
	},
	{
		id: "no-hardcoded-urls",
		name: "No hardcoded URLs",
		domain: "security",
		description: "Avoid hardcoded URLs in code",
		weight: 1,
	},
	{ id: "no-http", name: "No HTTP URLs", domain: "security", description: "Use HTTPS for external URLs", weight: 1 },
	{
		id: "wrangler-secrets",
		name: "Wrangler secrets not committed",
		domain: "security",
		description: "No wrangler secrets files",
		weight: 1,
	},
	{
		id: "no-secrets-logs",
		name: "No secrets in logs",
		domain: "security",
		description: "No logging of sensitive data",
		weight: 1,
	},
	{
		id: "dependency-vulns",
		name: "No known vulnerable patterns",
		domain: "security",
		description: "Avoid unsafe dependency usage",
		weight: 1,
	},
	{
		id: "csp",
		name: "CSP consideration",
		domain: "security",
		description: "Workers or headers mention CSP",
		weight: 1,
	},
];
