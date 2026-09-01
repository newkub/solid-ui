// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {}

export function Image(props: ImageProps) {
	const [local, rest] = splitProps(props, ["class", "alt"]);
	const base = "max-w-full h-auto rounded-md object-cover";
	const className = [base, local.class || ""].filter(Boolean).join(" ");
	return <img class={className} alt={local.alt} {...rest} />;
}
