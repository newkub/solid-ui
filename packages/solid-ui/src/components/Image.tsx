import { createSignal, type JSX, Show, splitProps } from "solid-js";

export interface ImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {
	fallback?: JSX.Element;
	fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function Image(props: ImageProps) {
	const [local, rest] = splitProps(props, ["class", "src", "alt", "fallback", "fit", "onError"]);
	const [error, setError] = createSignal(false);

	const fit = () => local.fit ?? "cover";
	const className = () =>
		["max-w-full h-auto rounded-md", `object-${fit()}`, local.class ?? ""].filter(Boolean).join(" ");

	const handleError: JSX.EventHandler<HTMLImageElement, ErrorEvent> = (e) => {
		setError(true);
		if (typeof local.onError === "function") {
			local.onError(e);
		}
	};

	const fallbackContent = () => {
		if (local.fallback === undefined) return null;
		if (typeof local.fallback === "string") {
			return (
				<div class="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground">
					{local.fallback}
				</div>
			);
		}
		return local.fallback;
	};

	return (
		<Show when={!error() && local.src} fallback={fallbackContent()}>
			<img class={className()} src={local.src} alt={local.alt} onError={handleError} {...rest} />
		</Show>
	);
}
