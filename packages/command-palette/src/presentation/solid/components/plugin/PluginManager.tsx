/**
 * PluginManager - SolidJS component for command palette plugin management
 */

import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type { Plugin } from "#modules/command-palette/types";

interface PluginManagerProps {
	plugins: readonly Plugin[];
	onTogglePlugin?: (pluginId: string) => void;
	onInstallPlugin?: (pluginId: string) => void;
	onUninstallPlugin?: (pluginId: string) => void;
	onConfigurePlugin?: (pluginId: string) => void;
}

export function PluginManager(props: PluginManagerProps) {
	const [local] = splitProps(props, [
		"plugins",
		"onTogglePlugin",
		"onInstallPlugin",
		"onUninstallPlugin",
		"onConfigurePlugin",
	]);

	const [selectedPlugin, setSelectedPlugin] = createSignal<Plugin | null>(null);
	const [showInstalledOnly, setShowInstalledOnly] = createSignal(false);

	const filteredPlugins = createMemo(() => {
		if (showInstalledOnly()) {
			return local.plugins.filter((p) => p.enabled);
		}
		return local.plugins;
	});

	const enabledPlugins = createMemo(() => {
		return local.plugins.filter((p) => p.enabled).length;
	});

	const totalCommands = createMemo(() => {
		return local.plugins.reduce((sum, plugin) => sum + plugin.commands.length, 0);
	});

	const handleTogglePlugin = (pluginId: string) => {
		local.onTogglePlugin?.(pluginId);
	};

	const handleConfigurePlugin = (plugin: Plugin) => {
		setSelectedPlugin(plugin);
		local.onConfigurePlugin?.(plugin.id);
	};

	return (
		<div class="plugin-manager">
			<div class="plugin-header">
				<h2 class="plugin-title">Plugin Manager</h2>
				<div class="plugin-stats">
					<div class="stat-item">
						<span class="stat-label">Plugins:</span>
						<span class="stat-value">
							{enabledPlugins()}/{local.plugins.length}
						</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Commands:</span>
						<span class="stat-value">{totalCommands()}</span>
					</div>
				</div>
			</div>

			<div class="plugin-controls">
				<label class="filter-toggle">
					<input
						type="checkbox"
						checked={showInstalledOnly()}
						onChange={(e) => setShowInstalledOnly(e.currentTarget.checked)}
						class="toggle-checkbox"
					/>
					Show Installed Only
				</label>
			</div>

			<div class="plugin-list">
				<For each={filteredPlugins()}>
					{(plugin) => (
						<div class={`plugin-card ${plugin.enabled ? "enabled" : "disabled"}`}>
							<div class="plugin-header">
								<div class="plugin-info">
									<h3 class="plugin-name">{plugin.name}</h3>
									<span class="plugin-version">v{plugin.version}</span>
								</div>
								<div class="plugin-status">
									<span class={`status-badge ${plugin.enabled ? "enabled" : "disabled"}`}>
										{plugin.enabled ? "Enabled" : "Disabled"}
									</span>
								</div>
							</div>

							<Show when={plugin.description}>
								<p class="plugin-description">{plugin.description}</p>
							</Show>

							<div class="plugin-commands">
								<span class="commands-count">{plugin.commands.length} commands</span>
								<Show when={plugin.commands.length > 0}>
									<div class="commands-preview">
										<For each={plugin.commands.slice(0, 3)}>
											{(command) => <span class="command-preview">{command.label}</span>}
										</For>
										<Show when={plugin.commands.length > 3}>
											<span class="commands-more">+{plugin.commands.length - 3} more</span>
										</Show>
									</div>
								</Show>
							</div>

							<div class="plugin-actions">
								<button
									class={`action-button toggle ${plugin.enabled ? "disable" : "enable"}`}
									onClick={() => handleTogglePlugin(plugin.id)}
									type="button"
								>
									{plugin.enabled ? "Disable" : "Enable"}
								</button>
								<Show when={plugin.enabled}>
									<button class="action-button configure" onClick={() => handleConfigurePlugin(plugin)} type="button">
										Configure
									</button>
								</Show>
							</div>
						</div>
					)}
				</For>
			</div>

			<Show when={selectedPlugin()}>
				<div class="plugin-details-panel">
					<h3 class="panel-title">Plugin Details</h3>
					<div class="plugin-details">
						<div class="detail-row">
							<span class="detail-label">Name:</span>
							<span class="detail-value">{selectedPlugin()?.name}</span>
						</div>
						<div class="detail-row">
							<span class="detail-label">Version:</span>
							<span class="detail-value">{selectedPlugin()?.version}</span>
						</div>
						<Show when={selectedPlugin()?.description}>
							<div class="detail-row">
								<span class="detail-label">Description:</span>
								<span class="detail-value">{selectedPlugin()?.description}</span>
							</div>
						</Show>
					</div>

					<h4 class="section-title">Commands</h4>
					<div class="plugin-commands-list">
						<For each={selectedPlugin()?.commands || []}>
							{(command) => (
								<div class="plugin-command-item">
									<span class="command-label">{command.label}</span>
									<Show when={command.description}>
										<span class="command-desc">{command.description}</span>
									</Show>
									<Show when={command.hotkey}>
										<span class="command-hotkey">{command.hotkey}</span>
									</Show>
								</div>
							)}
						</For>
					</div>

					<button class="close-button" onClick={() => setSelectedPlugin(null)} type="button">
						Close
					</button>
				</div>
			</Show>
		</div>
	);
}
