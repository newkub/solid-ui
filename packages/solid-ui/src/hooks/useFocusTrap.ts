export interface FocusTrapOptions {
	returnFocus?: boolean;
	trapOnActivation?: boolean;
	exclude?: readonly HTMLElement[];
}

export function getFocusableElements(container: HTMLElement): readonly HTMLElement[] {
	const focusableSelectors = [
		"a[href]",
		"button:not([disabled])",
		"textarea:not([disabled])",
		"input:not([disabled])",
		"select:not([disabled])",
		"[tabindex]:not([tabindex='-1'])",
		"[contenteditable]",
	].join(", ");

	return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter((el) => {
		const style = window.getComputedStyle(el);
		return style.display !== "none" && style.visibility !== "hidden";
	});
}

export function getFirstFocusableElement(container: HTMLElement): HTMLElement | undefined {
	return getFocusableElements(container)[0];
}

export function getLastFocusableElement(container: HTMLElement): HTMLElement | undefined {
	const elements = getFocusableElements(container);
	return elements[elements.length - 1];
}

export function createFocusTrap(
	container: HTMLElement,
	options: FocusTrapOptions = {},
): {
	activate: () => void;
	deactivate: () => void;
} {
	const { returnFocus = true, trapOnActivation = true, exclude = [] } = options;

	let previousActiveElement: HTMLElement | null = null;
	let cleanup: (() => void) | null = null;

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key !== "Tab") return;

		const focusableElements = getFocusableElements(container).filter((el) => !exclude.includes(el));
		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstElement && lastElement) {
				event.preventDefault();
				lastElement.focus();
			}
		} else {
			if (document.activeElement === lastElement && firstElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	};

	const activate = () => {
		previousActiveElement = document.activeElement as HTMLElement;
		container.addEventListener("keydown", handleKeyDown);

		if (trapOnActivation) {
			const firstElement = getFirstFocusableElement(container);
			if (firstElement) {
				firstElement.focus();
			} else {
				container.focus();
			}
		}

		cleanup = () => {
			container.removeEventListener("keydown", handleKeyDown);
		};
	};

	const deactivate = () => {
		if (cleanup) {
			cleanup();
			cleanup = null;
		}

		if (returnFocus && previousActiveElement) {
			previousActiveElement.focus();
		}
	};

	return { activate, deactivate };
}

export function useFocusTrap(element: HTMLElement | undefined, active: boolean, options?: FocusTrapOptions) {
	const trap = element ? createFocusTrap(element, options) : null;

	if (active && trap) {
		trap.activate();
	} else if (trap) {
		trap.deactivate();
	}

	return trap;
}
