import { type Accessor, createContext, createSignal, type JSX, Show, splitProps, useContext } from "solid-js";

interface AvatarContextValue {
	src?: string;
	alt?: string;
	fallback?: JSX.Element;
	error: Accessor<boolean>;
	setError: (value: boolean) => void;
}

const AvatarContext = createContext<AvatarContextValue>();

export interface AvatarProps extends JSX.HTMLAttributes<HTMLDivElement> {
	src?: string;
	alt?: string;
	fallback?: JSX.Element;
}

export function Avatar(props: AvatarProps) {
	const [local, rest] = splitProps(props, ["class", "src", "alt", "fallback", "children"]);
	const [error, setError] = createSignal(false);

	const className = () =>
		["relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted", local.class ?? ""]
			.filter(Boolean)
			.join(" ");

	return (
		<AvatarContext.Provider value={{ src: local.src, alt: local.alt, fallback: local.fallback, error, setError }}>
			<div class={className()} {...rest}>
				{local.children ?? (
					<>
						<AvatarImage />
						<AvatarFallback />
					</>
				)}
			</div>
		</AvatarContext.Provider>
	);
}

export interface AvatarImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {}

export function AvatarImage(props: AvatarImageProps) {
	const ctx = useContext(AvatarContext);
	const [local, rest] = splitProps(props, ["class", "src"]);

	if (!ctx) {
		throw new Error("AvatarImage must be used inside an Avatar.");
	}

	const className = () => ["aspect-square h-full w-full object-cover", local.class ?? ""].filter(Boolean).join(" ");
	const src = () => local.src ?? ctx.src;

	return (
		<Show when={src() && !ctx.error()}>
			<img class={className()} src={src()} alt={ctx.alt} onError={() => ctx.setError(true)} {...rest} />
		</Show>
	);
}

export interface AvatarFallbackProps extends JSX.HTMLAttributes<HTMLSpanElement> {
	children?: JSX.Element;
}

export function AvatarFallback(props: AvatarFallbackProps) {
	const ctx = useContext(AvatarContext);
	const [local, rest] = splitProps(props, ["class", "children"]);

	if (!ctx) {
		throw new Error("AvatarFallback must be used inside an Avatar.");
	}

	const className = () =>
		[
			"absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground",
			local.class ?? "",
		]
			.filter(Boolean)
			.join(" ");

	return (
		<Show when={ctx.error() || !ctx.src}>
			<span class={className()} {...rest}>
				{local.children ?? ctx.fallback}
			</span>
		</Show>
	);
}
