import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { Meter } from "./Meter";

describe("Meter", () => {
	afterEach(cleanup);

	it("renders as a <meter> element", () => {
		render(() => <Meter value={50} />);

		const el = screen.getByRole("meter");
		expect(el.tagName).toBe("METER");
	});

	it("uses default min, max, low, high, and optimum values", () => {
		render(() => <Meter value={40} />);

		const el = screen.getByRole("meter");
		expect(el.getAttribute("min")).toBe("0");
		expect(el.getAttribute("max")).toBe("100");
		expect(el.getAttribute("low")).toBe("0");
		expect(el.getAttribute("high")).toBe("100");
		expect(el.getAttribute("optimum")).toBe("100");
	});

	it("renders custom low, high, and optimum values", () => {
		render(() => <Meter value={60} min={0} max={100} low={30} high={70} optimum={80} />);

		const el = screen.getByRole("meter");
		expect(el.getAttribute("value")).toBe("60");
		expect(el.getAttribute("low")).toBe("30");
		expect(el.getAttribute("high")).toBe("70");
		expect(el.getAttribute("optimum")).toBe("80");
	});

	it("merges custom className with base styles", () => {
		render(() => <Meter value={20} class="custom-meter" />);

		const el = screen.getByRole("meter");
		expect(el.classList.contains("custom-meter")).toBe(true);
		expect(el.classList.contains("h-4")).toBe(true);
		expect(el.classList.contains("w-full")).toBe(true);
	});

	it("sets custom min, max, and value", () => {
		render(() => <Meter value={10} min={0} max={50} low={10} high={40} optimum={45} />);

		const el = screen.getByRole("meter");
		expect(el.getAttribute("min")).toBe("0");
		expect(el.getAttribute("max")).toBe("50");
		expect(el.getAttribute("value")).toBe("10");
		expect(el.getAttribute("optimum")).toBe("45");
	});

	it("forwards extra props to the <meter> element", () => {
		render(() => <Meter value={10} data-testid="meter-1" id="primary-meter" />);

		const el = screen.getByTestId("meter-1");
		expect(el.tagName).toBe("METER");
		expect(el.id).toBe("primary-meter");
	});
});
