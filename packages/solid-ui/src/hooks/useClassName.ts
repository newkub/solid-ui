import { splitProps } from "solid-js";

export function useClassName<P extends { class?: string; variant?: string }>(
	props: P,
	base: string,
	variantMap?: Record<string, string>,
) {
	const [local, rest] = splitProps(props as Record<string, unknown>, ["class", "variant"]);
	const className = () => {
		const parts: string[] = [base];
		const localClass = local.class as string | undefined;
		if (localClass) parts.push(localClass);
		if (variantMap) {
			const variant = local.variant as string | undefined;
			if (variant) {
				const variantClass = variantMap[variant];
				if (variantClass) parts.push(variantClass);
			}
		}
		return parts.filter(Boolean).join(" ");
	};
	return { className, rest: rest as Omit<P, "class" | "variant"> };
}
