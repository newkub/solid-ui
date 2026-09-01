---
name: run-review-codebase-cli
description: Run the Solid UI review-codebase CLI
allowed-tools: [exec, read]
permissions:
  allow:
    - Exec(bun run)
    - Exec(bun)
  ask:
    - Exec(rm)
    - Exec(rmdir)
triggers: [user, model]
---

## Goal

Run the internal `review-codebase` CLI to produce a human-readable or JSON quality report for the Solid UI monorepo.

## Scope

This skill targets `tools/review-codebase`. It covers the human-readable and JSON report commands. It does not modify source code except for optional generated report files.

## Execute

### 1. Verify Tool

> Goal: Confirm the CLI is available

1. Verify `tools/review-codebase/src/cli.ts` exists
2. Read `package.json` at `tools/review-codebase/package.json` for entry point and scripts
3. Confirm the root `package.json` scripts `review-codebase` and `review-codebase:json`

### 2. Run Human-Readable Report

> Goal: Produce a readable report

1. Run `bun run review-codebase` from the monorepo root
2. Capture the output and the generated report file path (often `review-codebase-report.md` or similar)
3. Read the report and summarize the grade and top findings

### 3. Run JSON Report

> Goal: Produce a machine-readable report

1. Run `bun run review-codebase:json` from the root
2. Capture the JSON output or generated file path
3. Summarize the grade, category scores, and top issues

### 4. Interpret Results

> Goal: Convert the report into actionable next steps

1. Check the exit code: `0` for grades A/B/C, `1` for D/F
2. Identify the top categories and files with issues
3. Recommend the next skill to invoke (e.g. `deep-review-codebase`, `use-ast-grep`, `follow-lang-typescript`)

## Rules

### 1. Report Handling
- Do not delete existing reports unless the user asks
- If the CLI writes a generated report file, report the path
- Do not commit reports; they are usually in `.gitignore`

### 2. Exit Code
- Treat exit code `1` as a quality failure, not a crash
- Summarize why the grade is low before suggesting fixes

### 3. Scope
- Do not fix issues found by the review unless explicitly asked
- Focus on running the CLI and interpreting the report accurately

## Expected Outcome

- The review CLI runs and produces a report
- The grade, exit code, and key findings are summarized
- The JSON and human-readable reports are located and described
- Actionable next steps are recommended
