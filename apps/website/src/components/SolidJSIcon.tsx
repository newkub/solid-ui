import type { JSX } from "solid-js";

export type SolidJSIconProps = JSX.SvgSVGAttributes<SVGSVGElement>;

export function SolidJSIcon(props: SolidJSIconProps) {
	return (
		<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SolidJS" {...props}>
			<path
				d="M15.4 2.6 5.7 9.2c-.7.5-.7 1.5 0 2l9.7 6.6c.7.5 1.7 0 1.7-.9V3.5c0-.9-1-1.4-1.7-.9Z"
				fill="currentColor"
			/>
			<path
				d="M16.6 29.4 26.3 22.8c.7-.5.7-1.5 0-2l-9.7-6.6c-.7-.5-1.7 0-1.7.9v13.4c0 .9 1 1.4 1.7.9Z"
				fill="currentColor"
				opacity="0.8"
			/>
			<path
				d="M17.6 12.5 26.7 6.4c.8-.6.8-1.7 0-2.2l-8.9-5.8c-.7-.5-1.8-.1-1.8.8v11.3c0 .9 1 1.4 1.7.9Z"
				fill="currentColor"
				opacity="0.6"
			/>
		</svg>
	);
}
