import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { SkeletonCircle } from "./SkeletonCircle";

describe("SkeletonCircle", () => {
	afterEach(cleanup);

	it("renders as a <div> with status and busy accessibility attributes", () => {
		render(() => <SkeletonCircle data-testid="skeleton-circle" />);
		const el = screen.getByTestId("skeleton-circle");
		expect(el.tagName).toBe("DIV");
		expect(el.getAttribute("role")).toBe("status");
		expect(el.getAttribute("aria-busy")).toBe("true");
		expect(el.getAttribute("aria-label")).toBe("Loading");
	});

	it("renders with the default size", () => {
		render(() => <SkeletonCircle data-testid="skeleton-circle" />);
		const el = screen.getByTestId("skeleton-circle");
		expect(el.style.width).toBe("48px");
		expect(el.style.height).toBe("48px");
	});

	it("renders with a custom size", () => {
		render(() => <SkeletonCircle size={64} data-testid="skeleton-circle" />);
		const el = screen.getByTestId("skeleton-circle");
		expect(el.style.width).toBe("64px");
		expect(el.style.height).toBe("64px");
	});

	it("merges custom className with base styles", () => {
		render(() => <SkeletonCircle class="custom-skeleton" data-testid="skeleton-circle" />);
		const el = screen.getByTestId("skeleton-circle");
		expect(el.classList.contains("custom-skeleton")).toBe(true);
		expect(el.classList.contains("rounded-full")).toBe(true);
		expect(el.classList.contains("bg-muted")).toBe(true);
	});
});
