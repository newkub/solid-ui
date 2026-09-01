import { createMemo, createSignal, For, type JSX, mergeProps, onMount } from "solid-js";

export interface VirtualListProps {
	itemCount: number;
	itemHeight: number;
	renderItem: (index: number) => JSX.Element;
	overscan?: number;
	height?: number | string;
	width?: number | string;
	class?: string;
}

export function VirtualList(props: VirtualListProps) {
	const merged = mergeProps({ overscan: 3 }, props);
	const [container, setContainer] = createSignal<HTMLDivElement | undefined>();
	const [scrollTop, setScrollTop] = createSignal(0);
	const [clientHeight, setClientHeight] = createSignal(0);

	const totalHeight = () => merged.itemCount * merged.itemHeight;

	const visibleRange = createMemo(() => {
		const top = scrollTop();
		const height = clientHeight() || totalHeight();
		const start = Math.max(0, Math.floor(top / merged.itemHeight) - merged.overscan);
		const end = Math.min(merged.itemCount - 1, Math.ceil((top + height) / merged.itemHeight) + merged.overscan);
		return { start, end };
	});

	const visibleItems = createMemo(() => {
		const range = visibleRange();
		const items: number[] = [];
		for (let i = range.start; i <= range.end; i++) items.push(i);
		return items;
	});

	const onScroll = (e: Event) => {
		const target = e.currentTarget as HTMLDivElement;
		setScrollTop(target.scrollTop);
		setClientHeight(target.clientHeight);
	};

	onMount(() => {
		const el = container();
		if (el) {
			setClientHeight(el.clientHeight);
			setScrollTop(el.scrollTop);
		}
	});

	const sizeStyle = (value: number | string | undefined) =>
		typeof value === "number" ? `${value}px` : (value ?? "100%");

	return (
		<div
			class={["relative overflow-auto", merged.class ?? ""].filter(Boolean).join(" ")}
			style={{ height: sizeStyle(merged.height), width: sizeStyle(merged.width) }}
			onScroll={onScroll}
			ref={setContainer}
		>
			<div class="relative w-full" style={{ height: `${totalHeight()}px` }}>
				<For each={visibleItems()}>
					{(index) => (
						<div
							class="absolute left-0 w-full"
							style={{ top: `${index * merged.itemHeight}px`, height: `${merged.itemHeight}px` }}
						>
							{merged.renderItem(index)}
						</div>
					)}
				</For>
			</div>
		</div>
	);
}
