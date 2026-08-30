// Generated component — customize as needed
import { type JSX, splitProps } from "solid-js";

export interface ImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {}

export function Image(props: ImageProps) {
	const [local, rest] = splitProps(props, ["class", "alt"]);
	const base = "solidui-image";
	return <img class={`${base} ${local.class || ""}`.trim()} alt={local.alt} {...rest} />;
}
