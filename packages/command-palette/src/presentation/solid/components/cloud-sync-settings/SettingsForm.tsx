import { Show } from "solid-js";
import type { CloudSyncConfig } from "#modules/command-palette/types";
import { formatSyncInterval } from "./utils";

interface SettingsFormProps {
	provider: CloudSyncConfig["provider"];
	apiKey: string;
	endpoint: string;
	bucket: string;
	syncInterval: number;
	onProviderChange: (value: CloudSyncConfig["provider"]) => void;
	onApiKeyChange: (value: string) => void;
	onEndpointChange: (value: string) => void;
	onBucketChange: (value: string) => void;
	onSyncIntervalChange: (value: number) => void;
	onCancel: () => void;
	onSave: () => void;
}

export function SettingsForm(props: SettingsFormProps) {
	return (
		<div class="settings-form">
			<div class="form-group">
				<label for="sync-provider" class="form-label">
					Provider
				</label>
				<select
					id="sync-provider"
					value={props.provider}
					onChange={(e) =>
						props.onProviderChange(
							e.currentTarget.value as CloudSyncConfig["provider"],
						)
					}
					class="form-select"
				>
					<option value="supabase">Supabase</option>
					<option value="firebase">Firebase</option>
					<option value="custom">Custom</option>
				</select>
			</div>

			<div class="form-group">
				<label for="sync-api-key" class="form-label">
					API Key
				</label>
				<input
					id="sync-api-key"
					type="password"
					value={props.apiKey}
					onInput={(e) => props.onApiKeyChange(e.currentTarget.value)}
					class="form-input"
					placeholder="Enter your API key"
				/>
			</div>

			<Show when={props.provider === "custom"}>
				<div class="form-group">
					<label for="sync-endpoint" class="form-label">
						Endpoint
					</label>
					<input
						id="sync-endpoint"
						type="url"
						value={props.endpoint}
						onInput={(e) => props.onEndpointChange(e.currentTarget.value)}
						class="form-input"
						placeholder="https://api.example.com"
					/>
				</div>
			</Show>

			<Show when={props.provider === "supabase" || props.provider === "custom"}>
				<div class="form-group">
					<label for="sync-bucket" class="form-label">
						Bucket
					</label>
					<input
						id="sync-bucket"
						type="text"
						value={props.bucket}
						onInput={(e) => props.onBucketChange(e.currentTarget.value)}
						class="form-input"
						placeholder="storage-bucket"
					/>
				</div>
			</Show>

			<div class="form-group">
				<label for="sync-interval" class="form-label">
					Sync Interval
				</label>
				<input
					id="sync-interval"
					type="number"
					value={props.syncInterval}
					onChange={(e) =>
						props.onSyncIntervalChange(
							Number.parseInt(e.currentTarget.value, 10),
						)
					}
					class="form-input"
					min="1000"
					step="1000"
				/>
				<span class="form-hint">
					Current: {formatSyncInterval(props.syncInterval)}
				</span>
			</div>

			<div class="form-actions">
				<button
					class="action-button cancel"
					onClick={props.onCancel}
					type="button"
				>
					Cancel
				</button>
				<button class="action-button save" onClick={props.onSave} type="button">
					Save Settings
				</button>
			</div>
		</div>
	);
}
