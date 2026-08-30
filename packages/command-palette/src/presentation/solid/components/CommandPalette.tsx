/**
 * CommandPalette - SolidJS component for command palette
 */

import { For, onCleanup, onMount, Show, splitProps } from "solid-js";
import type { Command } from "#modules/command-palette/types";
import { CommandItem } from "./CommandItem";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { useCommandPalette } from "./useCommandPalette";

interface CommandPaletteProps {
	isOpen: boolean;
	commands: readonly Command[];
	placeholder?: string;
	onClose?: () => void;
	onSelect?: (command: Command) => void;
	onToggleFavorite?: (command: Command) => void;
	isLoading?: boolean;
	error?: string | null;
}

export function CommandPalette(props: CommandPaletteProps) {
	const [local] = splitProps(props, [
		"isOpen",
		"commands",
		"placeholder",
		"onClose",
		"onSelect",
		"onToggleFavorite",
		"isLoading",
		"error",
	]);

	const {
		searchQuery,
		setSearchQuery,
		selectedIndex,
		filteredCommands,
		emptySuggestions,
		handleKeyDown,
		selectCommand,
	} = useCommandPalette({
		commands: local.commands,
		onSelect: local.onSelect,
		onClose: local.onClose,
	});

	const handleToggleFavorite = (event: MouseEvent, command: Command) => {
		event.stopPropagation();
		local.onToggleFavorite?.(command);
	};

	const handleOverlayClick = () => {
		local.onClose?.();
	};

	const handlePaletteClick = (event: MouseEvent) => {
		event.stopPropagation();
	};

	// Focus input when opened
	let inputRef: HTMLInputElement | undefined;
	let paletteRef: HTMLDivElement | undefined;

	onMount(() => {
		if (local.isOpen && inputRef) {
			inputRef.focus();
		}
	});

	// Focus trap temporarily disabled - requires implementation
	onCleanup(() => {
		// Cleanup when needed
	});

	return (
		<Show when={local.isOpen}>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: Overlay with presentation role for click handling */}
			<div
				class="command-palette-overlay"
				onClick={handleOverlayClick}
				role="presentation"
			>
				<div
					ref={paletteRef}
					class="command-palette"
					onClick={handlePaletteClick}
					onKeyDown={handleKeyDown}
					role="dialog"
					aria-modal="true"
					aria-label="Command palette"
					tabIndex={-1}
				>
					<input
						ref={inputRef}
						value={searchQuery()}
						onInput={(e) => setSearchQuery(e.currentTarget.value)}
						placeholder={local.placeholder}
						class="command-palette-input"
						autofocus
						role="combobox"
						aria-expanded="true"
						aria-controls="command-list"
						aria-autocomplete="list"
						aria-activedescendant={`command-item-${selectedIndex()}`}
					/>
					<div id="command-list" class="command-list" role="listbox">
						<Show when={local.isLoading}>
							<LoadingState />
						</Show>
						<Show when={!local.isLoading && local.error}>
							<ErrorState error={local.error ?? "An error occurred"} />
						</Show>
						<Show when={!local.isLoading && !local.error}>
							<For each={filteredCommands()}>
								{(command, index) => (
									<CommandItem
										command={command}
										index={index()}
										isSelected={index() === selectedIndex()}
										searchQuery={searchQuery()}
										onSelect={selectCommand}
										onToggleFavorite={handleToggleFavorite}
									/>
								)}
							</For>
							<Show when={filteredCommands().length === 0}>
								<EmptyState
									suggestions={emptySuggestions()}
									onSelectCommand={selectCommand}
								/>
							</Show>
						</Show>
					</div>
				</div>
			</div>
		</Show>
	);
}
