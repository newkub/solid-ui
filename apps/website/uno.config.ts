import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from "unocss";

export default defineConfig({
	content: {
		filesystem: [
			"./src/**/*.{html,js,ts,jsx,tsx}",
			"../../packages/*/src/**/*.{html,js,ts,jsx,tsx}",
			"../../tools/*/src/**/*.{html,js,ts,jsx,tsx}",
		],
	},
	presets: [
		presetWind4({
			dark: {
				dark: 'html[data-theme="dark"]',
				light: 'html[data-theme="light"]',
			},
			preflights: {
				reset: false,
			},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
	theme: {
		colors: {
			background: "hsl(var(--color-background))",
			foreground: "hsl(var(--color-foreground))",
			primary: {
				DEFAULT: "hsl(var(--color-primary))",
				hover: "hsl(var(--color-primary-hover))",
				active: "hsl(var(--color-primary-active))",
				foreground: "hsl(var(--color-primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--color-secondary))",
				hover: "hsl(var(--color-secondary-hover))",
				active: "hsl(var(--color-secondary-active))",
				foreground: "hsl(var(--color-secondary-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--color-accent))",
				hover: "hsl(var(--color-accent-hover))",
				active: "hsl(var(--color-accent-active))",
				foreground: "hsl(var(--color-accent-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--color-muted))",
				foreground: "hsl(var(--color-muted-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--color-destructive))",
				hover: "hsl(var(--color-destructive-hover))",
				active: "hsl(var(--color-destructive-active))",
				foreground: "hsl(var(--color-destructive-foreground))",
			},
			success: {
				DEFAULT: "hsl(var(--color-success))",
				foreground: "hsl(var(--color-success-foreground))",
			},
			warning: {
				DEFAULT: "hsl(var(--color-warning))",
				foreground: "hsl(var(--color-warning-foreground))",
			},
			info: {
				DEFAULT: "hsl(var(--color-info))",
				foreground: "hsl(var(--color-info-foreground))",
			},
			border: {
				DEFAULT: "hsl(var(--color-border))",
				hover: "hsl(var(--color-border-hover))",
			},
			input: "hsl(var(--color-input))",
			ring: "hsl(var(--color-ring))",
			surface: {
				DEFAULT: "hsl(var(--color-surface))",
				foreground: "hsl(var(--color-surface-foreground))",
				elevated: "hsl(var(--color-surface-elevated))",
			},
			card: {
				DEFAULT: "hsl(var(--color-surface))",
				foreground: "hsl(var(--color-surface-foreground))",
			},
			focus: "hsl(var(--color-focus))",
			overlay: "hsl(var(--color-overlay))",
			skeleton: {
				DEFAULT: "hsl(var(--color-skeleton))",
				shine: "hsl(var(--color-skeleton-shine))",
			},
		},
		fontFamily: {
			sans: "var(--su-font-sans)",
			mono: "var(--su-font-mono)",
		},
		fontSize: {
			xs: "var(--su-text-xs)",
			sm: "var(--su-text-sm)",
			base: "var(--su-text-base)",
			lg: "var(--su-text-lg)",
			xl: "var(--su-text-xl)",
			"2xl": "var(--su-text-2xl)",
			"3xl": "var(--su-text-3xl)",
			"4xl": "var(--su-text-4xl)",
		},
		lineHeight: {
			none: "var(--su-leading-none)",
			tight: "var(--su-leading-tight)",
			normal: "var(--su-leading-normal)",
			relaxed: "var(--su-leading-relaxed)",
		},
		borderRadius: {
			sm: "var(--su-radius-sm)",
			md: "var(--su-radius-md)",
			lg: "var(--su-radius-lg)",
			xl: "var(--su-radius-xl)",
			full: "var(--su-radius-full)",
		},
		boxShadow: {
			sm: "var(--su-shadow-sm)",
			md: "var(--su-shadow-md)",
			lg: "var(--su-shadow-lg)",
			xl: "var(--su-shadow-xl)",
			glow: "var(--su-shadow-glow)",
		},
		zIndex: {
			base: "var(--su-z-base)",
			dropdown: "var(--su-z-dropdown)",
			sticky: "var(--su-z-sticky)",
			fixed: "var(--su-z-fixed)",
			modalBackdrop: "var(--su-z-modal-backdrop)",
			modal: "var(--su-z-modal)",
			popover: "var(--su-z-popover)",
			tooltip: "var(--su-z-tooltip)",
			toast: "var(--su-z-toast)",
		},
	},
});
