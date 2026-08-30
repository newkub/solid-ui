/**
 * useCommandPalette - SolidJS composable for command palette (Functional style)
 */

import { createSignal, onCleanup, onMount } from "solid-js";
import { createCommandRepository } from "#adapters/db/command-repository-adapter";
import { createMemoryCommandRepository } from "#adapters/db/memory-command-repository";
import { createEventDispatcher, createMemoryEventDispatcher } from "#adapters/events/memory-event-dispatcher";
import { searchCommandsUseCase } from "#modules/command-palette/application/usecases/search";
import { DEFAULT_MAX_RESULTS } from "#modules/command-palette/domain/constants";
import type { CommandRepository } from "#modules/command-palette/ports";
import type { Command } from "#modules/command-palette/types";

export function useCommandPalette(repository?: CommandRepository) {
	const [isOpen, setIsOpen] = createSignal(false);
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedIndex, setSelectedIndex] = createSignal(0);

	const repoState = createMemoryCommandRepository();
	const commandRepository = repository || createCommandRepository(repoState);

	const eventDispatcherState = createMemoryEventDispatcher();
	const eventDispatcher = createEventDispatcher(eventDispatcherState);

	const [commands, setCommands] = createSignal<Command[]>([]);
	const [filteredCommands, setFilteredCommands] = createSignal<Command[]>([]);

	const open = () => {
		setIsOpen(true);
		setSearchQuery("");
		setSelectedIndex(0);
	};

	const close = () => {
		setIsOpen(false);
	};

	const toggle = () => {
		isOpen() ? close() : open();
	};

	const registerCommand = async (command: Command) => {
		try {
			setCommands([...commands(), command]);
			const saveResult = await commandRepository.save(command);
			if (!saveResult.success) {
				console.error("Failed to register command", saveResult.error);
			}
		} catch (error) {
			console.error("Error registering command", error);
		}
	};

	const unregisterCommand = async (id: string) => {
		try {
			setCommands(commands().filter((c) => c.id !== id));
			const deleteResult = await commandRepository.delete(id);
			if (!deleteResult.success) {
				console.error("Failed to unregister command", deleteResult.error);
			}
		} catch (error) {
			console.error("Error unregistering command", error);
		}
	};

	const search = async (query: string) => {
		try {
			setSearchQuery(query);
			const allCommandsResult = await commandRepository.findAll();
			if (!allCommandsResult.success) {
				console.error("Failed to fetch commands", allCommandsResult.error);
				return;
			}

			const searchUseCase = searchCommandsUseCase(commandRepository, eventDispatcher);
			const result = await searchUseCase({ query, limit: DEFAULT_MAX_RESULTS });
			if (result.success) {
				setFilteredCommands([...result.data.commands] as Command[]);
			} else {
				console.error("Search failed", result.error);
			}
		} catch (error) {
			console.error("Error during search", error);
		}
	};

	const execute = async (command: Command) => {
		try {
			// Execute command action based on type
			if (command.action.type === "url" && typeof command.action.payload === "string") {
				window.open(command.action.payload, "_blank");
			} else if (command.action.type === "function" && typeof command.action.payload === "function") {
				await command.action.payload();
			}
			close();
		} catch (error) {
			console.error("Error executing command", error);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			close();
		} else if (event.key === "ArrowDown") {
			setSelectedIndex(Math.min(selectedIndex() + 1, filteredCommands().length - 1));
		} else if (event.key === "ArrowUp") {
			setSelectedIndex(Math.max(selectedIndex() - 1, 0));
		} else if (event.key === "Enter") {
			const selectedCommand = filteredCommands()[selectedIndex()];
			if (selectedCommand) {
				execute(selectedCommand);
			}
		}
	};

	onMount(() => {
		window.addEventListener("keydown", handleKeyDown);
	});

	onCleanup(() => {
		window.removeEventListener("keydown", handleKeyDown);
	});

	return {
		isOpen,
		searchQuery,
		selectedIndex,
		commands,
		filteredCommands,
		open,
		close,
		toggle,
		registerCommand,
		unregisterCommand,
		search,
		execute,
		handleKeyDown,
	};
}
