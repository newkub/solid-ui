/**
 * CommandPaletteSettings - SolidJS component for command palette settings
 */

import { createSignal, For, Show, splitProps } from "solid-js";
import type { CommandPaletteSettings, CommandPaletteTheme } from "#modules/command-palette/types";

interface CommandPaletteSettingsProps {
	settings: CommandPaletteSettings;
	availableThemes: readonly CommandPaletteTheme[];
	onSettingsChange?: (settings: CommandPaletteSettings) => void;
	onThemeChange?: (themeId: string) => void;
	onShortcutChange?: (shortcuts: Record<string, string>) => void;
}

export function CommandPaletteSettingsComponent(props: CommandPaletteSettingsProps) {
	const [local] = splitProps(props, [
		"settings",
		"availableThemes",
		"onSettingsChange",
		"onThemeChange",
		"onShortcutChange",
	]);

	const [editingShortcut, setEditingShortcut] = createSignal<string | null>(null);

	const handleThemeChange = (themeId: string) => {
		local.onThemeChange?.(themeId);
	};

	const handleSettingChange = (key: keyof CommandPaletteSettings, value: any) => {
		local.onSettingsChange?.({
			...local.settings,
			[key]: value,
		});
	};

	const handleShortcutEdit = (action: string) => {
		setEditingShortcut(action);
	};

	const handleShortcutKeyDown = (action: string, event: KeyboardEvent) => {
		event.preventDefault();
		const modifiers: string[] = [];
		if (event.ctrlKey) modifiers.push("ctrl");
		if (event.altKey) modifiers.push("alt");
		if (event.shiftKey) modifiers.push("shift");
		if (event.metaKey) modifiers.push("meta");

		const shortcut = [...modifiers, event.key].join("+");

		local.onShortcutChange?.({
			...local.settings.keyboardShortcuts,
			[action]: shortcut,
		});

		setEditingShortcut(null);
	};

	return (
		<div class="command-palette-settings">
			<h2 class="settings-title">Command Palette Settings</h2>

			<div class="settings-section">
				<h3 class="section-title">Appearance</h3>
				<div class="setting-item">
					<label for="theme-select" class="setting-label">
						Theme
					</label>
					<select
						id="theme-select"
						value={local.settings.theme}
						onChange={(e) => handleThemeChange(e.currentTarget.value)}
						class="setting-select"
					>
						<For each={local.availableThemes}>{(theme) => <option value={theme.id}>{theme.name}</option>}</For>
					</select>
				</div>
				<div class="setting-item">
					<label for="max-visible" class="setting-label">
						Max Visible Commands
					</label>
					<input
						id="max-visible"
						type="number"
						value={local.settings.maxVisibleCommands}
						onChange={(e) => handleSettingChange("maxVisibleCommands", parseInt(e.currentTarget.value, 10))}
						class="setting-input"
						min="1"
						max="20"
					/>
				</div>
			</div>

			<div class="settings-section">
				<h3 class="section-title">Behavior</h3>
				<div class="setting-item">
					<label class="setting-label">
						<input
							type="checkbox"
							checked={local.settings.enableHistory}
							onChange={(e) => handleSettingChange("enableHistory", e.currentTarget.checked)}
							class="setting-checkbox"
						/>
						Enable History
					</label>
				</div>
				<div class="setting-item">
					<label class="setting-label">
						<input
							type="checkbox"
							checked={local.settings.enableAnimations}
							onChange={(e) => handleSettingChange("enableAnimations", e.currentTarget.checked)}
							class="setting-checkbox"
						/>
						Enable Animations
					</label>
				</div>
				<div class="setting-item">
					<label class="setting-label">
						<input
							type="checkbox"
							checked={local.settings.autoClose}
							onChange={(e) => handleSettingChange("autoClose", e.currentTarget.checked)}
							class="setting-checkbox"
						/>
						Auto Close After Selection
					</label>
				</div>
				<div class="setting-item">
					<label for="debounce-delay" class="setting-label">
						Debounce Delay (ms)
					</label>
					<input
						id="debounce-delay"
						type="number"
						value={local.settings.debounceDelay}
						onChange={(e) => handleSettingChange("debounceDelay", parseInt(e.currentTarget.value, 10))}
						class="setting-input"
						min="0"
						max="500"
					/>
				</div>
			</div>

			<div class="settings-section">
				<h3 class="section-title">Keyboard Shortcuts</h3>
				<div class="shortcuts-list">
					<For each={Object.entries(local.settings.keyboardShortcuts)}>
						{([action, shortcut]) => (
							<div class="shortcut-item">
								<span class="shortcut-action">{action}</span>
								<Show when={editingShortcut() === action}>
									<button
										class="shortcut-edit-button editing"
										onKeyDown={(e) => handleShortcutKeyDown(action, e)}
										type="button"
									>
										Press a key...
									</button>
								</Show>
								<Show when={editingShortcut() !== action}>
									<span class="shortcut-value">{shortcut}</span>
									<button class="shortcut-edit-button" onClick={() => handleShortcutEdit(action)} type="button">
										Edit
									</button>
								</Show>
							</div>
						)}
					</For>
				</div>
			</div>
		</div>
	);
}
