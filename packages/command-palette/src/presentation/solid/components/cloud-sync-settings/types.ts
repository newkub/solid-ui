import type { CloudSyncConfig, SyncConflict, SyncStatus } from "#modules/command-palette/types";

export interface CloudSyncSettingsProps {
	config?: CloudSyncConfig;
	status?: SyncStatus;
	onSaveConfig?: (config: CloudSyncConfig) => void;
	onSyncNow?: () => void;
	onResolveConflict?: (conflict: SyncConflict, resolution: "local" | "remote" | "merge") => void;
}
