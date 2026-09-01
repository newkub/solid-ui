import { type Accessor, createContext, type JSX, mergeProps, Show, splitProps, useContext } from "solid-js";

export type StepState = "completed" | "current" | "pending";

export interface StepsProps extends JSX.HTMLAttributes<HTMLOListElement> {
	current?: number;
}

interface StepsContextValue {
	current: Accessor<number>;
}

const StepsContext = createContext<StepsContextValue>({ current: () => 0 });

export interface StepBaseProps extends Omit<JSX.HTMLAttributes<HTMLLIElement>, "title"> {
	index?: number;
	title?: JSX.Element;
	description?: JSX.Element;
	state?: StepState;
}

export interface StepProps extends StepBaseProps {}

export interface StepItemProps extends StepBaseProps {}

export function Steps(props: StepsProps) {
	const merged = mergeProps({ current: 0 }, props);
	const [local, rest] = splitProps(props, ["class", "current", "children"]);
	const current = () => merged.current;
	const className = () => ["flex w-full items-start gap-4", local.class ?? ""].filter(Boolean).join(" ");

	return (
		<StepsContext.Provider value={{ current }}>
			<ol class={className()} {...rest}>
				{local.children}
			</ol>
		</StepsContext.Provider>
	);
}

function stepState(ctx: StepsContextValue, index: number | undefined, override: StepState | undefined): StepState {
	if (override) return override;
	const idx = index ?? 0;
	if (ctx.current() > idx) return "completed";
	if (ctx.current() === idx) return "current";
	return "pending";
}

function circleClasses(state: StepState) {
	switch (state) {
		case "completed":
			return "border-primary bg-primary text-primary-foreground";
		case "current":
			return "border-primary bg-background text-primary";
		case "pending":
			return "border-muted bg-background text-muted-foreground";
	}
}

function StepContent(props: StepProps) {
	const ctx = useContext(StepsContext);
	const [local, rest] = splitProps(props, ["class", "index", "title", "description", "state", "children"]);
	const state = () => stepState(ctx, local.index, local.state);
	const className = () =>
		["flex flex-1 flex-col items-center gap-2 text-center", local.class ?? ""].filter(Boolean).join(" ");
	const circleClass = () =>
		[
			"flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
			circleClasses(state()),
		]
			.filter(Boolean)
			.join(" ");

	return (
		<li class={className()} aria-current={state() === "current" ? "step" : undefined} {...rest}>
			<span class={circleClass()}>{(local.index ?? 0) + 1}</span>
			<Show when={local.title}>
				<span class="text-sm font-medium text-foreground">{local.title}</span>
			</Show>
			<Show when={local.description}>
				<span class="text-xs text-muted-foreground">{local.description}</span>
			</Show>
			{local.children}
		</li>
	);
}

export function Step(props: StepProps) {
	return <StepContent {...props} />;
}

export function StepItem(props: StepItemProps) {
	return <StepContent {...props} />;
}
