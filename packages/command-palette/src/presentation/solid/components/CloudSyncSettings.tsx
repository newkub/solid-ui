/**
 * CloudSyncSettings - SolidJS component for cloud sync configuration
 */

import { createSignal, Show, splitProps } from "solid-js";
import type { CloudSyncConfig } from "#modules/command-palette/types";
import { createSettingsHandlers } from "./cloud-sync-settings/handlers";
import { SettingsForm } from "./cloud-sync-settings/SettingsForm";
import { SettingsSummary } from "./cloud-sync-settings/SettingsSummary";
import type { CloudSyncSettingsProps } from "./cloud-sync-settings/types";

export function CloudSyncSettings(props: CloudSyncSettingsProps) {
	const [local] = splitProps(props, ["config", "status", "onSaveConfig", "onSyncNow", "onResolveConflict"]);

	const [provider, setProvider] = createSignal<CloudSyncConfig["provider"]>(local.config?.provider ?? "supabase");
	const [apiKey, setApiKey] = createSignal(local.config?.apiKey ?? "");
	const [endpoint, setEndpoint] = createSignal(local.config?.endpoint ?? "");
	const [bucket, setBucket] = createSignal(local.config?.bucket ?? "");
	const [syncInterval, setSyncInterval] = createSignal(local.config?.syncInterval ?? 60000);
	const [isEditing, setIsEditing] = createSignal(false);

	const { handleSave, handleSyncNow, handleEdit, handleCancel } = createSettingsHandlers(
		local.config,
		provider(),
		apiKey(),
		endpoint(),
		bucket(),
		syncInterval(),
		setProvider,
		setApiKey,
		setEndpoint,
		setBucket,
		setSyncInterval,
		setIsEditing,
		local.onSaveConfig,
		local.onSyncNow,
	);

	return (
		<div class="cloud-sync-settings">
			<div class="settings-header">
				<h2 class="settings-title">Cloud Sync Settings</h2>
				<div class="sync-status">
					<Show
						when={local.status?.isSyncing}
						fallback={
							<>
								<span class="status-indicator synced" />
								<span class="status-text">
									{local.status?.lastSyncAt
										? `Last synced: ${new Date(local.status.lastSyncAt).toLocaleString()}`
										: "Not synced"}
								</span>
							</>
						}
					>
						<span class="status-indicator syncing" />
						<span class="status-text">Syncing...</span>
					</Show>
				</div>
			</div>

			<div class="settings-actions">
				<button class="action-button sync" onClick={handleSyncNow} disabled={local.status?.isSyncing} type="button">
					Sync Now
				</button>
				<Show when={!isEditing()}>
					<button class="action-button edit" onClick={handleEdit} type="button">
						Edit Settings
					</button>
				</Show>
			</div>

			<Show when={isEditing()}>
				<SettingsForm
					provider={provider()}
					apiKey={apiKey()}
					endpoint={endpoint()}
					bucket={bucket()}
					syncInterval={syncInterval()}
					onProviderChange={setProvider}
					onApiKeyChange={setApiKey}
					onEndpointChange={setEndpoint}
					onBucketChange={setBucket}
					onSyncIntervalChange={setSyncInterval}
					onCancel={handleCancel}
					onSave={handleSave}
				/>
			</Show>

			<Show when={!isEditing() && local.config}>
				<SettingsSummary config={local.config} />
			</Show>

			<Show when={local.status?.lastSyncError}>
				<div class="sync-error">
					<span class="error-label">Last Sync Error:</span>
					<span class="error-message">{local.status?.lastSyncError}</span>
				</div>
			</Show>

			<Show when={local.status?.syncCount !== undefined}>
				<div class="sync-stats">
					<span class="stat-item">Total Syncs: {local.status?.syncCount}</span>
				</div>
			</Show>
		</div>
	);
}

export type { CloudSyncSettingsProps };
