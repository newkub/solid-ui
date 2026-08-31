# solid-ui

A SolidJS design-system monorepo with packages, apps, tools, and skills.

## Packages

- `@wrikka/solid-ui` — component registry and templates
- `@wrikka/command-palette` — command palette with search, snippets, workflows
- `@wrikka/form` — form primitives and validation helpers
- `@wrikka/image` — image and media components
- `@wrikka/table` — table and data-grid components
- `@wrikka/transitions` — transition and animation utilities

## Apps

- `@wrikka/website` — documentation and showcase site
- `@wrikka/mcp` — MCP server for component discovery
- `@wrikka/cli` — CLI for listing and generating components

## Tools

- `tools/analyze` — 64-category analyzer suite
- `tools/review-codebase` — Clean Architecture review CLI

## Quick Start

```bash
bun install
bun run typecheck
bun run lint
bun run build
bun run review-codebase
```

## Deploy

```bash
bun run deploy
```

## License

MIT
