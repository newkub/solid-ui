---
name: run-solid-ui-mcp
description: Run and test the Solid UI MCP server
allowed-tools: [exec, read, write]
permissions:
  allow:
    - Exec(bun run)
    - Exec(bun)
    - Exec(node)
triggers: [user, model]
---

## Goal

Start the Solid UI MCP server and verify that its tools respond correctly over stdio.

## Scope

This skill targets `apps/mcp` in the `solid-ui` monorepo. It covers type checking, running the server, and testing tool calls with a client. It does not modify project source code.

## Execute

### 1. Verify Workspace

> Goal: Confirm the MCP workspace is ready

1. Verify the workspace exists at `apps/mcp`
2. Read `apps/mcp/package.json` to confirm scripts and dependencies
3. Read `apps/mcp/src/index.ts` to identify the registered tools

### 2. Validate

> Goal: Check the MCP server type safety

1. Run `bun run --filter @wrikka/mcp typecheck`
2. If it fails due to `@modelcontextprotocol/sdk` generic inference, review `apps/mcp/src/index.ts` for `any` assertions and `biome-ignore` comments
3. Stop and report on type errors

### 3. Run Server

> Goal: Start the MCP server

1. Run `bun run --filter @wrikka/mcp start` or `bun apps/mcp/src/index.ts` from `apps/mcp`
2. The server listens on stdio; it will not produce output until a client connects

### 4. Test Tools

> Goal: Verify tool responses

1. Use `apps/mcp/scripts/test.ts` if it exists, or create a temporary client script that uses `StdioClientTransport` and `Client` from `@modelcontextprotocol/sdk`
2. Call `list-tools` and at least `list-components`, `get-component`, `search-components`, and `count-components`
3. Assert that `list-components` returns 60 components and `get-component` with `Button` returns details
4. Stop the server with `kill_shell`
5. Remove any temporary test script

### 5. Report

> Goal: Summarize MCP status

1. Report the list of available tools
2. Report the result of each test call
3. Note any SDK type inference issues or workarounds

## Rules

### 1. Server Lifecycle
- Start the server in the background with `timeout: 0`
- Kill the server shell when testing is complete
- Do not leave the server running unattended

### 2. Client Testing
- Prefer a temporary `apps/mcp/scripts/test.ts` for repeated testing
- If creating a temp file, delete it before finishing
- Use `bun` to run both server and client

### 3. Error Handling
- If the server exits immediately, check `apps/mcp/src/index.ts` imports and `zod` schemas
- If the client cannot connect, verify the server started and is using stdio transport
- Report any `@modelcontextprotocol/sdk` type instability

## Expected Outcome

- The MCP server starts and stays alive
- All tested tools return expected text content
- Type check passes with documented workarounds if any
- The server process is stopped at the end
