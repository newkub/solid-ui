/**
 * CommandHistoryViewer - SolidJS component for viewing command execution history
 */

import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type {
	Command,
	CommandHistoryEntry,
} from "#modules/command-palette/types";
import { HistoryEntryCard } from "./command-history-viewer/HistoryEntryCard";
import {
	formatDate,
	formatExecutionTime,
} from "./command-history-viewer/utils";

interface CommandHistoryViewerProps {
	history?: readonly CommandHistoryEntry[];
	commands?: readonly Command[];
	onReplayCommand?: (commandId: string) => void;
	onClearHistory?: () => void;
	onFilterByCategory?: (category: string) => void;
	maxEntries?: number;
}

export function CommandHistoryViewer(props: CommandHistoryViewerProps) {
	const [local] = splitProps(props, [
		"history",
		"commands",
		"onReplayCommand",
		"onClearHistory",
		"onFilterByCategory",
		"maxEntries",
	]);

	const [selectedCategory, setSelectedCategory] = createSignal<string | null>(
		null,
	);
	const [showSuccessfulOnly, setShowSuccessfulOnly] = createSignal(false);

	const displayHistory = createMemo(() => {
		let filtered = local.history ?? [];

		if (showSuccessfulOnly()) {
			filtered = filtered.filter((entry) => entry.success);
		}

		if (selectedCategory()) {
			const categoryCommands = local.commands?.filter(
				(c) => c.category === selectedCategory(),
			);
			const categoryCommandIds = new Set(categoryCommands?.map((c) => c.id));
			filtered = filtered.filter((entry) =>
				categoryCommandIds.has(entry.commandId),
			);
		}

		const limit = local.maxEntries ?? 50;
		return filtered.slice(0, limit);
	});

	const categories = createMemo(() => {
		const cats = new Set(
			(local.commands ?? []).map((c) => c.category).filter(Boolean),
		);
		return Array.from(cats) as string[];
	});

	const successfulCount = createMemo(
		() => (local.history ?? []).filter((h) => h.success).length,
	);

	const failedCount = createMemo(
		() => (local.history ?? []).filter((h) => !h.success).length,
	);

	const getCommandById = (commandId: string) => {
		return local.commands?.find((c) => c.id === commandId);
	};

	const handleReplay = (entry: CommandHistoryEntry) => {
		local.onReplayCommand?.(entry.commandId);
	};

	const handleClearHistory = () => {
		local.onClearHistory?.();
	};

	return (
		<div class="command-history-viewer">
			<div class="history-header">
				<h2 class="history-title">Command History</h2>
				<div class="history-stats">
					<div class="stat-item">
						<span class="stat-label">Total:</span>
						<span class="stat-value">{local.history?.length ?? 0}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Success:</span>
						<span class="stat-value success">{successfulCount()}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Failed:</span>
						<span class="stat-value failed">{failedCount()}</span>
					</div>
				</div>
			</div>

			<div class="history-controls">
				<label class="filter-toggle">
					<input
						type="checkbox"
						checked={showSuccessfulOnly()}
						onChange={(e) => setShowSuccessfulOnly(e.currentTarget.checked)}
						class="toggle-checkbox"
					/>
					Show Successful Only
				</label>

				<select
					value={selectedCategory() ?? ""}
					onChange={(e) => setSelectedCategory(e.currentTarget.value || null)}
					class="category-filter"
				>
					<option value="">All Categories</option>
					<For each={categories()}>
						{(category) => <option value={category}>{category}</option>}
					</For>
				</select>

				<button
					class="action-button clear"
					onClick={handleClearHistory}
					type="button"
				>
					Clear History
				</button>
			</div>

			<div class="history-list">
				<For each={displayHistory()}>
					{(entry) => (
						<HistoryEntryCard
							entry={entry}
							command={getCommandById(entry.commandId)}
							formatExecutionTime={formatExecutionTime}
							formatDate={formatDate}
							onReplay={handleReplay}
						/>
					)}
				</For>

				<Show when={displayHistory().length === 0}>
					<div class="empty-state">
						<p class="empty-message">No command history</p>
					</div>
				</Show>
			</div>
		</div>
	);
}
