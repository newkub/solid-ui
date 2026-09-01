import { type JSX, splitProps } from "solid-js";

export interface CardProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function Card(props: CardProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () =>
		["rounded-xl border border-border bg-card text-card-foreground shadow-sm", local.class ?? ""]
			.filter(Boolean)
			.join(" ");
	return (
		<div class={className()} {...rest}>
			{local.children}
		</div>
	);
}

export interface CardHeaderProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CardHeader(props: CardHeaderProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["flex flex-col space-y-1.5 p-6", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<div class={className()} {...rest}>
			{local.children}
		</div>
	);
}

export interface CardContentProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CardContent(props: CardContentProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["p-6 pt-0", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<div class={className()} {...rest}>
			{local.children}
		</div>
	);
}

export interface CardFooterProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function CardFooter(props: CardFooterProps) {
	const [local, rest] = splitProps(props, ["class", "children"]);
	const className = () => ["flex items-center p-6 pt-0", local.class ?? ""].filter(Boolean).join(" ");
	return (
		<div class={className()} {...rest}>
			{local.children}
		</div>
	);
}
