import { createMemo, type JSX, mergeProps, Show, splitProps } from "solid-js";

export interface ProgressProps extends JSX.HTMLAttributes<HTMLDivElement> {
	value?: number;
	max?: number;
	indeterminate?: boolean;
}

export function Progress(props: ProgressProps) {
	const [local, rest] = splitProps(props, ["class", "value", "max", "indeterminate"]);
	const merged = mergeProps({ max: 100, indeterminate: false }, local);

	const isIndeterminate = () =>
		merged.indeterminate || merged.value === undefined || merged.value === null || Number.isNaN(merged.value);

	const percent = createMemo(() => {
		if (isIndeterminate()) return 0;
		const v = Math.max(0, Math.min(merged.value as number, merged.max));
		return (v / merged.max) * 100;
	});

	const className = () =>
		["h-2 w-full overflow-hidden rounded-full bg-muted", merged.class ?? ""].filter(Boolean).join(" ");

	return (
		<div
			class={className()}
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={merged.max}
			aria-valuenow={isIndeterminate() ? undefined : (merged.value as number)}
			{...rest}
		>
			<Show when={!isIndeterminate()} fallback={<div class="h-full w-full animate-pulse rounded-full bg-primary" />}>
				<div class="h-full rounded-full bg-primary transition-[width]" style={{ width: `${percent()}%` }} />
			</Show>
		</div>
	);
}
