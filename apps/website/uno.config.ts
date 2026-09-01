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
			background: "var(--su-bg)",
			foreground: "var(--su-foreground)",
			primary: {
				DEFAULT: "var(--su-primary)",
				foreground: "var(--su-primary-foreground)",
			},
			secondary: {
				DEFAULT: "var(--su-secondary)",
				foreground: "var(--su-secondary-foreground)",
			},
			accent: {
				DEFAULT: "var(--su-accent)",
				foreground: "var(--su-accent-foreground)",
			},
			muted: {
				DEFAULT: "var(--su-muted)",
				foreground: "var(--su-muted-foreground)",
			},
			destructive: {
				DEFAULT: "var(--su-destructive)",
				foreground: "var(--su-destructive-foreground)",
			},
			success: {
				DEFAULT: "var(--su-success)",
				foreground: "var(--su-success-foreground)",
			},
			warning: {
				DEFAULT: "var(--su-warning)",
				foreground: "var(--su-warning-foreground)",
			},
			info: {
				DEFAULT: "var(--su-info)",
				foreground: "var(--su-info-foreground)",
			},
			border: "var(--su-border)",
			input: "var(--su-input)",
			ring: "var(--su-ring)",
			surface: {
				DEFAULT: "var(--su-surface)",
				foreground: "var(--su-foreground)",
				elevated: "var(--su-surface-elevated)",
			},
			card: {
				DEFAULT: "var(--su-surface)",
				foreground: "var(--su-foreground)",
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
