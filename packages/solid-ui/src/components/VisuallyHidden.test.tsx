import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { VisuallyHidden } from "./VisuallyHidden";

describe("VisuallyHidden", () => {
	afterEach(cleanup);

	it("renders as a <span> with sr-only base class", () => {
		render(() => <VisuallyHidden>Hidden text</VisuallyHidden>);

		const el = screen.getByText("Hidden text");
		expect(el.tagName).toBe("SPAN");
		expect(el.classList.contains("sr-only")).toBe(true);
	});

	it("merges custom className with base sr-only class", () => {
		render(() => <VisuallyHidden class="custom-hidden">Hidden</VisuallyHidden>);

		const el = screen.getByText("Hidden");
		expect(el.classList.contains("sr-only")).toBe(true);
		expect(el.classList.contains("custom-hidden")).toBe(true);
	});

	it("adds focusable utility classes when focusable is true", () => {
		render(() => (
			<VisuallyHidden focusable class="focus-hidden">
				Focusable hidden
			</VisuallyHidden>
		));

		const el = screen.getByText("Focusable hidden");
		expect(el.classList.contains("sr-only")).toBe(true);
		expect(el.classList.contains("focus:not-sr-only")).toBe(true);
		expect(el.classList.contains("focus:static")).toBe(true);
		expect(el.classList.contains("focus:whitespace-normal")).toBe(true);
		expect(el.classList.contains("focus-hidden")).toBe(true);
	});

	it("does not add focusable classes when focusable is false or absent", () => {
		render(() => <VisuallyHidden>Non-focusable hidden</VisuallyHidden>);

		const el = screen.getByText("Non-focusable hidden");
		expect(el.classList.contains("focus:not-sr-only")).toBe(false);
		expect(el.classList.contains("focus:static")).toBe(false);
	});

	it("forwards extra props to the <span> element", () => {
		render(() => (
			<VisuallyHidden data-testid="visually-hidden" id="hidden-1">
				Hidden
			</VisuallyHidden>
		));

		const el = screen.getByTestId("visually-hidden");
		expect(el.tagName).toBe("SPAN");
		expect(el.id).toBe("hidden-1");
	});
});
