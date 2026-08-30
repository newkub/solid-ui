---
name: generate-component
description: Generate or regenerate Solid UI components in packages/solid-ui
---

# generate-component

Use this skill when the user asks to add, update, or regenerate components for `@wrikka/solid-ui`.

## Workflow

1. Open `packages/solid-ui/scripts/generate.ts`.
2. Add or edit the `Spec` entry in the `components` array.
   - `name` — PascalCase component name.
   - `tag` — the rendered HTML tag.
   - `element` — the DOM type used for the props interface.
   - `extraProps` — optional custom props.
   - `body` — optional custom render body.
   - `splitKeys` — optional props to split from `rest`.
3. Run the generator:
   ```bash
   bun packages/solid-ui/scripts/generate.ts
   ```
4. Typecheck the package:
   ```bash
   bun run --filter @wrikka/solid-ui typecheck
   ```
5. If the package passes, also run the website build to verify:
   ```bash
   bun run --filter @wrikka/website build
   ```

## Common HTML attribute interfaces

The generator maps `tag` to a valid `JSX.*HTMLAttributes<...>` interface. Use the existing map or extend it if a new tag is added.
