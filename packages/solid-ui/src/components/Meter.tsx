import { type JSX, mergeProps, splitProps } from "solid-js";

export interface MeterProps
	extends Omit<JSX.MeterHTMLAttributes<HTMLMeterElement>, "value" | "min" | "max" | "low" | "high" | "optimum"> {
	value?: number;
	min?: number;
	max?: number;
	low?: number;
	high?: number;
	optimum?: number;
}

export function Meter(props: MeterProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const merged = mergeProps({ value: 0, min: 0, max: 100, low: 0, high: 100, optimum: 100 }, rest);

	const className = () => ["h-4 w-full", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<meter
			class={className()}
			value={merged.value}
			min={merged.min}
			max={merged.max}
			low={merged.low}
			high={merged.high}
			optimum={merged.optimum}
		/>
	);
}
