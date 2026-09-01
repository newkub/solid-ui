import { type JSX, Show, splitProps } from "solid-js";

export interface StatProps extends JSX.HTMLAttributes<HTMLDivElement> {
	label?: string;
	value?: string | number;
	helpText?: string;
	trend?: number | string;
	trendLabel?: string;
}

export function Stat(props: StatProps) {
	const [local, rest] = splitProps(props, ["class", "label", "value", "helpText", "trend", "trendLabel", "children"]);

	const className = () =>
		["space-y-1 rounded-lg border border-border bg-surface p-3", local.class ?? ""].filter(Boolean).join(" ");

	const displayValue = () => local.value ?? local.children;

	const trendIsNumber = () => typeof local.trend === "number";
	const trendIsUp = () => trendIsNumber() && (local.trend as number) > 0;
	const trendIsDown = () => trendIsNumber() && (local.trend as number) < 0;

	const trendText = () => {
		if (trendIsNumber()) {
			const n = local.trend as number;
			const sign = n > 0 ? "+" : "";
			return `${sign}${n}%`;
		}
		return (local.trend as string | undefined) ?? "";
	};

	const trendClass = () => {
		if (trendIsUp()) return "text-success";
		if (trendIsDown()) return "text-destructive";
		return "text-muted-foreground";
	};

	return (
		<div class={className()} {...rest}>
			<Show when={local.label}>
				<div class="text-xs font-medium text-muted-foreground">{local.label}</div>
			</Show>
			<div class="text-xl font-bold text-foreground">{displayValue()}</div>
			<Show when={local.trend || local.helpText}>
				<div class="flex items-center gap-2 text-xs">
					<Show when={local.trend}>
						<span class={trendClass()}>{trendText()}</span>
					</Show>
					<Show when={local.helpText}>
						<span class="text-muted-foreground">{local.helpText}</span>
					</Show>
					<Show when={local.trendLabel}>
						<span class="text-muted-foreground">{local.trendLabel}</span>
					</Show>
				</div>
			</Show>
		</div>
	);
}
