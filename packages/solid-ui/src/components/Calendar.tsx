import { createSignal, For, mergeProps } from "solid-js";

export interface CalendarProps {
	value?: Date;
	onChange?: (date: Date) => void;
	class?: string;
}

function startOfMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Calendar(props: CalendarProps) {
	const merged = mergeProps({ value: new Date() }, props);
	const [view, setView] = createSignal(merged.value);
	const [selected, setSelected] = createSignal(merged.value);

	const start = () => startOfMonth(view());
	const offset = () => start().getDay();
	const days = () => daysInMonth(view());

	const weeks = () => {
		const cells: (number | null)[] = [];
		for (let i = 0; i < offset(); i++) cells.push(null);
		for (let i = 1; i <= days(); i++) cells.push(i);
		const total = Math.ceil(cells.length / 7) * 7;
		while (cells.length < total) cells.push(null);
		const result: (number | null)[][] = [];
		for (let i = 0; i < cells.length; i += 7) result.push(cells.slice(i, i + 7));
		return result;
	};

	function selectDate(d: number) {
		const date = new Date(view().getFullYear(), view().getMonth(), d);
		setSelected(date);
		setView(date);
		props.onChange?.(date);
	}

	function prevMonth() {
		setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1));
	}

	function nextMonth() {
		setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1));
	}

	const monthLabel = () => view().toLocaleDateString("en-US", { month: "long", year: "numeric" });

	const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

	return (
		<div class={`w-full rounded-xl border border-border bg-surface p-4 shadow-sm ${props.class ?? ""}`}>
			<div class="mb-3 flex items-center justify-between">
				<button
					type="button"
					onClick={prevMonth}
					class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted"
					aria-label="Previous month"
				>
					‹
				</button>
				<span class="text-sm font-semibold">{monthLabel()}</span>
				<button
					type="button"
					onClick={nextMonth}
					class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted"
					aria-label="Next month"
				>
					›
				</button>
			</div>
			<div class="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
				<For each={weekDays}>{(d) => <div>{d}</div>}</For>
			</div>
			<div class="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
				<For each={weeks()}>
					{(week) => (
						<For each={week}>
							{(day) => {
								if (day === null) return <div />;
								const date = new Date(view().getFullYear(), view().getMonth(), day);
								const isSelected = isSameDay(selected(), date);
								const isToday = isSameDay(new Date(), date);
								return (
									<button
										type="button"
										onClick={() => selectDate(day)}
										class={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors ${
											isSelected
												? "bg-primary text-primary-foreground"
												: isToday
													? "border border-primary text-primary"
													: "text-foreground hover:bg-muted"
										}`}
									>
										{day}
									</button>
								);
							}}
						</For>
					)}
				</For>
			</div>
		</div>
	);
}
