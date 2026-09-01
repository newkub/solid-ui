import { createEffect, createSignal, type JSX, mergeProps, Show, splitProps } from "solid-js";

export interface TransitionProps extends JSX.HTMLAttributes<HTMLDivElement> {
	show?: boolean;
	enter?: string;
	exit?: string;
	duration?: number;
	unmount?: boolean;
}

type TransitionState = "exited" | "entering" | "entered" | "exiting";

export function Transition(props: TransitionProps) {
	const merged = mergeProps({ show: true, enter: "", exit: "", duration: 300, unmount: true }, props);
	const [local, rest] = splitProps(merged, ["class", "show", "enter", "exit", "duration", "unmount", "children"]);
	const [state, setState] = createSignal<TransitionState>(local.show ? "entered" : "exited");
	let timer: ReturnType<typeof setTimeout> | undefined;

	const apply = (show: boolean) => {
		clearTimeout(timer);
		if (show) {
			if (state() !== "entered") {
				setState("entering");
				timer = setTimeout(() => setState("entered"), local.duration);
			}
		} else if (state() !== "exited") {
			setState("exiting");
			timer = setTimeout(() => setState("exited"), local.duration);
		}
	};

	createEffect(() => apply(local.show));

	const className = () => {
		const classes = ["transition-all", local.class ?? ""];
		if (state() === "entering" || state() === "entered") classes.push(local.enter);
		if (state() === "exiting" || state() === "exited") classes.push(local.exit);
		return classes.filter(Boolean).join(" ");
	};

	return (
		<Show when={state() !== "exited" || !local.unmount}>
			<div class={className()} style={{ "transition-duration": `${local.duration}ms` }} {...rest}>
				{local.children}
			</div>
		</Show>
	);
}
