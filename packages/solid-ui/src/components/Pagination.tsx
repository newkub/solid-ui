import {
	type Accessor,
	createContext,
	createSignal,
	For,
	type JSX,
	mergeProps,
	children as resolveChildren,
	Show,
	splitProps,
	useContext,
} from "solid-js";

interface PaginationContextValue {
	page: Accessor<number>;
	totalPages: Accessor<number>;
	setPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextValue>();

export interface PaginationProps extends JSX.HTMLAttributes<HTMLElement> {
	page?: number;
	defaultPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
}

function getPaginationRange(page: number, total: number): (number | "ellipsis")[] {
	if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
	if (page <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
	if (page >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
	return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", total];
}

export function Pagination(props: PaginationProps) {
	const merged = mergeProps({ totalPages: 1, defaultPage: 1 }, props);
	const [internal, setInternal] = createSignal(merged.defaultPage);
	const page = () => props.page ?? internal();
	const totalPages = () => merged.totalPages;
	const setPage = (next: number) => {
		if (next < 1 || next > totalPages()) return;
		setInternal(next);
		props.onPageChange?.(next);
	};

	const isFirst = () => page() === 1;
	const isLast = () => page() === totalPages();

	const [local, rest] = splitProps(props, ["class", "page", "defaultPage", "totalPages", "onPageChange", "children"]);
	const resolved = resolveChildren(() => local.children);
	const range = () => getPaginationRange(page(), totalPages());
	const className = () => ["flex items-center gap-1", local.class ?? ""].filter(Boolean).join(" ");

	const defaultContent = (
		<>
			<PaginationPrevious disabled={isFirst()} />
			<For each={range()}>
				{(item) =>
					typeof item === "number" ? (
						<PaginationItem page={item} />
					) : (
						<li class="flex h-8 items-center justify-center px-1 text-sm text-muted-foreground" aria-hidden="true">
							…
						</li>
					)
				}
			</For>
			<PaginationNext disabled={isLast()} />
		</>
	);

	return (
		<PaginationContext.Provider value={{ page, totalPages, setPage }}>
			<nav class={className()} aria-label="pagination" {...rest}>
				<ul class="flex items-center gap-1">
					<Show when={resolved()} fallback={defaultContent}>
						{resolved()}
					</Show>
				</ul>
			</nav>
		</PaginationContext.Provider>
	);
}

export interface PaginationItemProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
	page: number;
}

export function PaginationItem(props: PaginationItemProps) {
	const ctx = useContext(PaginationContext);
	const [local, rest] = splitProps(props, ["class", "page", "children", "onClick"]);

	if (!ctx) {
		throw new Error("PaginationItem must be used inside a Pagination.");
	}

	const active = () => ctx.page() === local.page;
	const className = () => {
		const base =
			"inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
		return [
			base,
			active()
				? "border-transparent bg-primary text-primary-foreground hover:bg-primary/90"
				: "border-input bg-background text-foreground hover:bg-muted hover:text-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");
	};

	const onClick = (e: MouseEvent) => {
		ctx.setPage(local.page);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<li>
			<button
				type="button"
				aria-label={`Go to page ${local.page}`}
				aria-current={active() ? "page" : undefined}
				class={className()}
				onClick={onClick}
				{...rest}
			>
				{local.children ?? local.page}
			</button>
		</li>
	);
}

export interface PaginationPreviousProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PaginationPrevious(props: PaginationPreviousProps) {
	const ctx = useContext(PaginationContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick", "disabled"]);

	if (!ctx) {
		throw new Error("PaginationPrevious must be used inside a Pagination.");
	}

	const disabled = () => local.disabled || ctx.page() === 1;
	const className = () =>
		[
			"inline-flex h-8 items-center justify-center gap-1 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		if (!disabled()) ctx.setPage(ctx.page() - 1);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<li>
			<button
				type="button"
				aria-label="Go to previous page"
				class={className()}
				disabled={disabled()}
				onClick={onClick}
				{...rest}
			>
				<Show
					when={local.children}
					fallback={
						<>
							<svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
							<span class="sr-only">Previous</span>
						</>
					}
				>
					{local.children}
				</Show>
			</button>
		</li>
	);
}

export interface PaginationNextProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {}

export function PaginationNext(props: PaginationNextProps) {
	const ctx = useContext(PaginationContext);
	const [local, rest] = splitProps(props, ["class", "children", "onClick", "disabled"]);

	if (!ctx) {
		throw new Error("PaginationNext must be used inside a Pagination.");
	}

	const disabled = () => local.disabled || ctx.page() === ctx.totalPages();
	const className = () =>
		[
			"inline-flex h-8 items-center justify-center gap-1 rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	const onClick = (e: MouseEvent) => {
		if (!disabled()) ctx.setPage(ctx.page() + 1);
		if (typeof local.onClick === "function") {
			(local.onClick as (e: MouseEvent) => void)(e);
		}
	};

	return (
		<li>
			<button
				type="button"
				aria-label="Go to next page"
				class={className()}
				disabled={disabled()}
				onClick={onClick}
				{...rest}
			>
				<Show
					when={local.children}
					fallback={
						<>
							<span class="sr-only">Next</span>
							<svg
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</>
					}
				>
					{local.children}
				</Show>
			</button>
		</li>
	);
}
