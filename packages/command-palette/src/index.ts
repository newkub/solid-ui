/**
 * Command Palette Module - Clean Architecture
 *
 * A Raycast-like command palette for SolidJS applications
 *
 * Structure:
 * - modules/command-palette/ - Domain module
 *   - types/                 - Domain types
 *   - domain/                - Pure business logic
 *   - application/           - Orchestration layer
 *   - ports/                 - Interface definitions
 * - adapters/                - External system integrations
 * - presentation/            - Entry points
 * - shared/                  - Shared kernel
 */

// Adapters - specific exports to avoid conflicts
export {
	createCommandRepository,
	createMemoryCommandRepository,
} from "#adapters/db/memory-command-repository";
export {
	createCustomCommandSearcher,
	searchWithCustom,
} from "#adapters/search/fuse-command-searcher";
export * from "#modules/command-palette/application/usecases/category";
export * from "#modules/command-palette/application/usecases/command";
export * from "#modules/command-palette/application/usecases/history";
// Application layer exports
export {
	quickSearchUseCase,
	searchCommandsMainUseCase,
	searchCommandsPaginatedUseCase,
	searchCommandsUseCase,
} from "#modules/command-palette/application/usecases/search";
export * from "#modules/command-palette/application/usecases/workflow";

// Domain layer exports
export {
	COMMAND_LABEL_MAX_LENGTH,
	DEFAULT_HISTORY_LIMIT,
	DEFAULT_MAX_RESULTS,
	DEFAULT_SEARCH_THRESHOLD,
} from "#modules/command-palette/domain/constants";
export {
	createCommandCategoryChangedEvent,
	createCommandCreatedEvent,
	createCommandDeletedEvent,
	createCommandDisabledEvent,
	createCommandEnabledEvent,
	createCommandExecutedEvent,
	createCommandHotkeyChangedEvent,
	createCommandSearchedEvent,
	createCommandUpdatedEvent,
} from "#modules/command-palette/domain/events/command-events";
export {
	commandHasHotkey,
	commandMatchesCategory,
	commandMatchesQuery,
	compareCommandsByCreatedAt,
	compareCommandsByLabel,
	compareCommandsByUpdatedAt,
	createCommand,
	disableCommand,
	enableCommand,
	isCommandEnabled,
	isCommandInCategory,
	toggleCommand,
	updateCommand,
	validateCommand,
} from "#modules/command-palette/domain/models/command";
export * from "#modules/command-palette/domain/operations";

// Ports exports
export * from "#modules/command-palette/ports";

// Types exports
export * from "#modules/command-palette/types/command";
export type {
	ClipboardEntry,
	ClipboardHistory,
} from "#modules/command-palette/types/integration/clipboard";
export {
	addClipboardEntry,
	createClipboardHistory,
	getRecentClipboardEntries,
} from "#modules/command-palette/types/integration/clipboard";
export type { CommandHistoryEntry } from "#modules/command-palette/types/integration/history";
export type {
	CommandHistory,
	CommandLabel,
	Theme,
	ThemeType,
} from "#modules/command-palette/types/integration/value-objects";
export {
	createTheme,
	isDarkTheme,
	isSystemTheme,
	themeToString,
} from "#modules/command-palette/types/integration/value-objects";
export * from "#modules/command-palette/types/search";
export * from "#modules/command-palette/types/ui";
export { useClipboard, useSnippets } from "#presentation/solid/composables";

// Presentation layer exports (SolidJS specific)
export {
	CommandPaletteProvider,
	useCommandPalette,
} from "#presentation/solid/module";
// Remove shared exports to avoid duplicate export conflicts
// export * from '#shared';
