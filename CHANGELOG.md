# Changelog

## 0.0.1 — 2025-08-31

### Added

- Initial `solid-ui` monorepo with Clean Architecture packages and apps.
- `tools/analyze` and `tools/review-codebase` CLI.
- Shiki-based documentation syntax highlighting and custom Markdown parser.
- Website with component previews, variants, and copyable code.
- MCP server and CLI for component discovery.
- AGENTS.md with project conventions and commands.

### Changed

- Removed empty `mise.toml`.
- Tuned review analyzers to reduce false positives.

### Fixed

- Replaced explicit `any` casts with proper types.
- Replaced non-null assertions with runtime checks or type assertions.
- Replaced `innerHTML` for search highlight with a JSX `HighlightText` component.
