import type { CloudSyncConfig } from "#modules/command-palette/types";

export function createSettingsHandlers(
	config: CloudSyncConfig | undefined,
	provider: CloudSyncConfig["provider"],
	apiKey: string,
	endpoint: string,
	bucket: string,
	syncInterval: number,
	setProvider: (provider: CloudSyncConfig["provider"]) => void,
	setApiKey: (key: string) => void,
	setEndpoint: (endpoint: string) => void,
	setBucket: (bucket: string) => void,
	setSyncInterval: (interval: number) => void,
	setIsEditing: (editing: boolean) => void,
	onSaveConfig?: (config: CloudSyncConfig) => void,
	onSyncNow?: () => void,
) {
	const handleSave = () => {
		const endpointValue = endpoint;
		const bucketValue = bucket;

		const newConfig: CloudSyncConfig = {
			provider,
			apiKey,
			...(endpointValue ? { endpoint: endpointValue } : {}),
			...(bucketValue ? { bucket: bucketValue } : {}),
			syncInterval,
		};
		onSaveConfig?.(newConfig);
		setIsEditing(false);
	};

	const handleSyncNow = () => {
		onSyncNow?.();
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		// Reset to original config
		if (config) {
			setProvider(config.provider);
			setApiKey(config.apiKey);
			setEndpoint(config.endpoint ?? "");
			setBucket(config.bucket ?? "");
			setSyncInterval(config.syncInterval ?? 60000);
		} else {
			setProvider("supabase");
			setApiKey("");
			setEndpoint("");
			setBucket("");
			setSyncInterval(60000);
		}
	};

	return { handleSave, handleSyncNow, handleEdit, handleCancel };
}
