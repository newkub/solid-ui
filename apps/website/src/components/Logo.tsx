import type { JSX } from "solid-js";

export type LogoProps = JSX.SvgSVGAttributes<SVGSVGElement>;

/**
 * Minimal geometric brand mark: three stacked/offset squares forming an "S"-like
 * silhouette, rendered with currentColor so it inherits text color/theme.
 */
export function Logo(props: LogoProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			width="24"
			height="24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="solid-ui logo"
			{...props}
		>
			<rect x="4" y="4" width="12" height="12" rx="3" fill="currentColor" opacity="0.35" />
			<rect x="16" y="16" width="12" height="12" rx="3" fill="currentColor" opacity="0.35" />
			<rect x="10" y="10" width="12" height="12" rx="3" fill="currentColor" />
		</svg>
	);
}
