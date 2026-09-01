import { splitProps } from "solid-js";

const base =
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const variantMap: Record<string, string> = {
	default: "bg-primary text-primary-foreground hover:bg-primary/90",
	primary: "bg-primary text-primary-foreground hover:bg-primary/90",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	link: "text-primary underline-offset-4 hover:underline",
};

const sizeMap: Record<string, string> = {
	default: "h-9 px-4 py-2",
	sm: "h-8 px-3 text-xs",
	md: "h-9 px-4 py-2",
	lg: "h-10 px-8",
	icon: "h-9 w-9",
};

interface ButtonHookProps {
	class?: string;
	variant?: string;
	size?: string;
}

export function useButton(props: ButtonHookProps) {
	const [local, rest] = splitProps(props as Record<string, unknown>, ["class", "variant", "size"]);
	const className = () => {
		const variant = (local.variant as string) || "default";
		const size = (local.size as string) || "default";
		return [base, variantMap[variant] || variantMap.default, sizeMap[size] || sizeMap.default, local.class || ""]
			.filter(Boolean)
			.join(" ");
	};
	return { className, rest };
}
