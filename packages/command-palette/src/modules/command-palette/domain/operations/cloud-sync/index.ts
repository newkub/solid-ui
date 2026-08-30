/**
 * Cloud Sync Operations - Domain operations for cloud synchronization
 */

import type { Result } from "#shared/types";
import type {
	ConflictResolution,
	SyncConflict,
	SyncData,
	SyncResult,
	SyncStatus,
} from "../../../types/integration/cloud-sync";

// Create sync data
export const createSyncData = (
	commands: readonly unknown[],
	history: readonly unknown[],
	settings: Record<string, unknown>,
): Result<SyncData> => {
	const syncData: SyncData = {
		commands: commands as any,
		history: history as any,
		settings: settings as any,
		lastSyncAt: new Date(),
	};

	return { success: true, data: syncData };
};

// Merge sync data (local + remote)
export const mergeSyncData = (local: SyncData, remote: SyncData): SyncData => {
	const conflicts = detectConflicts(local, remote);

	if (conflicts.length === 0) {
		return {
			...remote,
			lastSyncAt: new Date(),
		};
	}

	const mergedCommands = [...local.commands];
	const mergedHistory = [...local.history];
	const mergedSettings = { ...local.settings };

	for (const conflict of conflicts) {
		switch (conflict.type) {
			case "command": {
				const localIndex = mergedCommands.findIndex((c: any) => c.id === conflict.itemId);
				if (localIndex >= 0) {
					mergedCommands[localIndex] = conflict.remoteVersion as any;
				}
				break;
			}
			case "settings":
				(mergedSettings as any)[conflict.itemId as string] = conflict.remoteVersion;
				break;
			case "history": {
				const historyIndex = mergedHistory.findIndex((h: any) => h.id === conflict.itemId);
				if (historyIndex >= 0) {
					mergedHistory[historyIndex] = conflict.remoteVersion as any;
				}
				break;
			}
		}
	}

	return {
		commands: mergedCommands,
		history: mergedHistory,
		settings: mergedSettings,
		lastSyncAt: new Date(),
	};
};

// Detect sync conflicts
export const detectConflicts = (local: SyncData, remote: SyncData): readonly SyncConflict[] => {
	const conflicts: SyncConflict[] = [];

	// Check for command conflicts
	const localCommandIds = new Set(local.commands.map((c) => (c as any).id));
	const remoteCommandIds = new Set(remote.commands.map((c) => (c as any).id));

	for (const id of localCommandIds) {
		if (remoteCommandIds.has(id)) {
			const localCmd = local.commands.find((c) => (c as any).id === id);
			const remoteCmd = remote.commands.find((c) => (c as any).id === id);
			if (JSON.stringify(localCmd) !== JSON.stringify(remoteCmd)) {
				conflicts.push({
					type: "command",
					itemId: id,
					localVersion: localCmd,
					remoteVersion: remoteCmd,
					conflictAt: new Date(),
				});
			}
		}
	}

	return conflicts;
};

// Resolve conflict
export const resolveConflict = (_conflict: SyncConflict, resolution: ConflictResolution): SyncData => {
	switch (resolution.strategy) {
		case "local":
			return resolution.localData as SyncData;
		case "remote":
			return resolution.remoteData as SyncData;
		case "manual":
			if (resolution.mergedData) {
				return resolution.mergedData as SyncData;
			}
			return resolution.remoteData as SyncData;
		case "newest": {
			const localDate = new Date((resolution.localData as any).lastSyncAt || 0);
			const remoteDate = new Date((resolution.remoteData as any).lastSyncAt || 0);
			return localDate > remoteDate ? (resolution.localData as SyncData) : (resolution.remoteData as SyncData);
		}
		default:
			return resolution.remoteData as SyncData;
	}
};

// Create sync result
export const createSyncResult = (success: boolean, itemsSynced?: number, error?: string): SyncResult => ({
	success,
	syncedAt: new Date(),
	error,
	itemsSynced,
});

// Create sync status
export const createSyncStatus = (
	isSyncing: boolean,
	lastSyncAt?: Date,
	lastSyncError?: string,
	syncCount: number = 0,
): SyncStatus => ({
	isSyncing,
	lastSyncAt,
	lastSyncError,
	syncCount,
});
