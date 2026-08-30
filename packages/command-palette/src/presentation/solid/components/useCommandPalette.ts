/**
 * useCommandPalette - Custom hook for command palette logic
 */

import { createEffect, createMemo, createSignal } from "solid-js";
import {
	getCommandsSortedByFavorites,
	getEmptyStateSuggestions,
} from "#modules/command-palette/domain/operations";
import type { Command } from "#modules/command-palette/types";

interface UseCommandPaletteProps {
	commands: readonly Command[];
	onSelect?: (command: Command) => void;
	onClose?: () => void;
}

export function useCommandPalette(props: UseCommandPaletteProps) {
	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedIndex, setSelectedIndex] = createSignal(0);

	const filteredCommands = createMemo(() => {
		if (!searchQuery()) {
			return getCommandsSortedByFavorites(props.commands);
		}

		const query = searchQuery().toLowerCase();
		return props.commands.filter((cmd) => {
			const label = cmd.label?.toLowerCase() || "";
			const description = cmd.description?.toLowerCase() || "";
			const keywords = cmd.keywords?.map((k) => k.toLowerCase()) || [];
			const aliases = cmd.aliases?.map((a) => a.toLowerCase()) || [];

			return (
				label.includes(query) ||
				description.includes(query) ||
				keywords.some((k) => k.includes(query)) ||
				aliases.some((a) => a.includes(query))
			);
		});
	});

	const emptySuggestions = createMemo(() => {
		if (filteredCommands().length === 0) {
			return getEmptyStateSuggestions(props.commands, {
				timestamp: new Date(),
			});
		}
		return [];
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case "ArrowDown":
				setSelectedIndex((prev) =>
					Math.min(prev + 1, filteredCommands().length - 1),
				);
				event.preventDefault();
				break;
			case "ArrowUp":
				setSelectedIndex((prev) => Math.max(prev - 1, 0));
				event.preventDefault();
				break;
			case "Enter": {
				const selectedCmd = filteredCommands()[selectedIndex()];
				if (selectedCmd) {
					props.onSelect?.(selectedCmd);
				}
				break;
			}
			case "Escape":
				props.onClose?.();
				break;
		}
	};

	const selectCommand = (command: Command) => {
		props.onSelect?.(command);
	};

	// Reset selection when filtered commands change
	createEffect(() => {
		setSelectedIndex(0);
	});

	return {
		searchQuery,
		setSearchQuery,
		selectedIndex,
		filteredCommands,
		emptySuggestions,
		handleKeyDown,
		selectCommand,
	};
}
