/**
 * Memory Command Repository State
 */

import type { Command } from "#modules/command-palette/types";

export type MemoryCommandRepositoryState = Readonly<{
	commands: Map<string, Command>;
}>;
