import { For, mergeProps, Show } from "solid-js";

export interface ChartDataPoint {
	label: string;
	value: number;
	color?: string;
}

export interface ChartProps {
	data?: ChartDataPoint[];
	title?: string;
	height?: number;
	class?: string;
}

export function Chart(props: ChartProps) {
	const merged = mergeProps({ data: [] as ChartDataPoint[], height: 256 }, props);
	const max = () => Math.max(1, ...merged.data.map((d) => d.value));

	return (
		<div class={`w-full rounded-xl border border-border bg-surface p-4 shadow-sm ${merged.class ?? ""}`}>
			<Show when={merged.title}>
				<h3 class="mb-3 text-sm font-semibold text-foreground">{merged.title}</h3>
			</Show>
			<div class="flex items-end justify-around gap-2" style={{ height: `${merged.height}px` }}>
				<For each={merged.data}>
					{(point) => {
						const h = () => `${(point.value / max()) * 100}%`;
						return (
							<div class="flex flex-1 flex-col items-center gap-1">
								<div
									class="w-full max-w-12 rounded-t bg-primary transition-all"
									style={{
										height: h(),
										"background-color": point.color ? `hsl(${point.color})` : undefined,
									}}
									role="img"
									aria-label={`${point.label}: ${point.value}`}
								/>
								<span class="text-xs text-muted-foreground">{point.label}</span>
							</div>
						);
					}}
				</For>
				<Show when={merged.data.length === 0}>
					<p class="text-sm text-muted-foreground">No data</p>
				</Show>
			</div>
		</div>
	);
}
