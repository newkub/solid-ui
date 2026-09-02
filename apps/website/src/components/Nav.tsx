import { createSignal, type JSX, onCleanup, onMount } from "solid-js";
import { toggleThemeMode } from "../lib/theme";
import { CommandPalette } from "./CommandPalette";
import { DevTools } from "./DevTools";
import { TopNav } from "./TopNav";

export function NavLayout(props: { children: JSX.Element }) {
	const [commandOpen, setCommandOpen] = createSignal(false);
	const [devToolsOpen, setDevToolsOpen] = createSignal(false);

	onMount(() => {
		function onKeyDown(e: KeyboardEvent) {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setCommandOpen((v) => !v);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		onCleanup(() => document.removeEventListener("keydown", onKeyDown));
	});

	return (
		<>
			<TopNav onSearch={() => setCommandOpen(true)} onDevTools={() => setDevToolsOpen((v) => !v)} />
			<div class="min-w-0 flex-1">{props.children}</div>
			<DevTools open={devToolsOpen} onOpenChange={(open) => setDevToolsOpen(open)} />
			<CommandPalette open={commandOpen()} onClose={() => setCommandOpen(false)} onToggleTheme={toggleThemeMode} />
		</>
	);
}
