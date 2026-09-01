import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { SkeletonText } from "./SkeletonText";

describe("SkeletonText", () => {
	afterEach(cleanup);

	it("renders as a <div> with status and busy accessibility attributes", () => {
		render(() => <SkeletonText data-testid="skeleton-text" />);

		const el = screen.getByTestId("skeleton-text");
		expect(el.tagName).toBe("DIV");
		expect(el.getAttribute("role")).toBe("status");
		expect(el.getAttribute("aria-busy")).toBe("true");
		expect(el.getAttribute("aria-label")).toBe("Loading text");
	});

	it("renders three skeleton lines by default", () => {
		render(() => <SkeletonText data-testid="skeleton-text" />);

		const el = screen.getByTestId("skeleton-text");
		const lines = el.querySelectorAll(".animate-pulse");
		expect(lines.length).toBe(3);
	});

	it("renders a custom number of lines", () => {
		render(() => <SkeletonText lines={5} data-testid="skeleton-text" />);

		const el = screen.getByTestId("skeleton-text");
		const lines = el.querySelectorAll(".animate-pulse");
		expect(lines.length).toBe(5);
	});

	it("cycles through width classes for each line", () => {
		render(() => <SkeletonText lines={6} data-testid="skeleton-text" />);

		const el = screen.getByTestId("skeleton-text");
		const lines = Array.from(el.querySelectorAll(".animate-pulse"));

		const widths = ["w-full", "w-5/6", "w-4/5", "w-3/4", "w-2/3", "w-1/2"];
		lines.forEach((line, i) => {
			expect(line.classList.contains(widths[i % widths.length])).toBe(true);
		});
	});

	it("repeats width classes after the defined cycle", () => {
		render(() => <SkeletonText lines={7} data-testid="skeleton-text" />);

		const el = screen.getByTestId("skeleton-text");
		const lines = Array.from(el.querySelectorAll(".animate-pulse"));

		expect(lines[6].classList.contains("w-full")).toBe(true);
	});

	it("merges custom className with base styles", () => {
		render(() => <SkeletonText class="custom-skeleton" data-testid="skeleton-text" />);

		const el = screen.getByTestId("skeleton-text");
		expect(el.classList.contains("custom-skeleton")).toBe(true);
		expect(el.classList.contains("w-full")).toBe(true);
		expect(el.classList.contains("space-y-2")).toBe(true);
	});
});
