---
name: run-solid-ui-generator
description: Run the Solid UI component generator
allowed-tools: [exec, read, write, edit]
permissions:
  allow:
    - Exec(bun)
    - Exec(bun run)
  ask:
    - Edit(packages/solid-ui/scripts/generate.ts)
    - Edit(packages/solid-ui/src/components/*)
    - Write(packages/solid-ui/src/components/*)
triggers: [user, model]
---

## Goal

Run the Solid UI component generator and regenerate the component library when the component list or templates change.

## Scope

This skill targets `packages/solid-ui/scripts/generate.ts`. It runs the generator, verifies output, and reports generated files. It may modify `packages/solid-ui/src/components/*`, `packages/solid-ui/src/index.ts`, and `packages/solid-ui/src/registry.ts` when regeneration is requested.

## Execute

### 1. Verify Setup

> Goal: Confirm the generator is runnable

1. Verify `packages/solid-ui/scripts/generate.ts` exists
2. Read `packages/solid-ui/package.json` scripts for a `generate` command
3. Check `packages/solid-ui/src/components/` directory

### 2. Inspect Component Specs

> Goal: Understand what will be generated

1. Read the `components` array in `packages/solid-ui/scripts/generate.ts`
2. Note `name`, `tag`, `element`, `extraProps`, `splitKeys`, and `body` for each spec
3. Check the `makeComponent` function for the template format

### 3. Run Generator

> Goal: Generate components

1. Run `bun packages/solid-ui/scripts/generate.ts` from the monorepo root, or `bun run --filter @wrikka/solid-ui generate` if the script exists
2. Confirm `packages/solid-ui/src/index.ts` and `packages/solid-ui/src/registry.ts` are updated
3. List the generated files in `packages/solid-ui/src/components/`

### 4. Validate Output

> Goal: Ensure generated code is safe

1. Run `bun run --filter @wrikka/solid-ui typecheck`
2. If type errors are introduced, inspect the changed component files and the generator template
3. Do not proceed until `typecheck` passes unless the user explicitly accepts the failure

### 5. Report

> Goal: Summarize regeneration

1. Report the number of generated components
2. List any new or changed files
3. Report the `typecheck` result

## Rules

### 1. Safety
- Ask for confirmation before overwriting a large number of generated files
- Do not delete customizations in `packages/solid-ui/src/components/` unless asked
- Keep the `biome-ignore-all` comment at the top of `packages/solid-ui/scripts/generate.ts` intact

### 2. Template Changes
- If modifying `generate.ts`, keep the `components` spec list clear and minimal
- Ensure generated `base` class names are `solidui-<kebab-name>` by default
- Preserve custom `body` templates for components that need non-default markup

### 3. Validation
- Always typecheck the `solid-ui` package after regeneration
- If `tsdown` build fails due to `Promise.withResolvers`, report it as an environment limitation, not a generator bug

## Expected Outcome

- The generator runs successfully
- `packages/solid-ui/src/index.ts` and `packages/solid-ui/src/registry.ts` reflect the latest component list
- Generated components type check
- A summary of generated files is reported
