import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { Stat } from "./Stat";

describe("Stat", () => {
	afterEach(cleanup);

	it("renders as a <div> element", () => {
		render(() => <Stat value={123} data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.tagName).toBe("DIV");
	});

	it("renders the value prop", () => {
		render(() => <Stat value={123} data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.textContent).toContain("123");
	});

	it("falls back to children when value is not provided", () => {
		render(() => <Stat data-testid="stat-children">Child Value</Stat>);

		const el = screen.getByTestId("stat-children");
		expect(el.textContent).toContain("Child Value");
	});

	it("renders a label when provided", () => {
		render(() => <Stat label="Total Users" value={123} data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.textContent).toContain("Total Users");
	});

	it("renders help text", () => {
		render(() => <Stat value={123} helpText="Updated today" data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.textContent).toContain("Updated today");
	});

	it("renders a positive numeric trend with + sign and success color", () => {
		render(() => <Stat value={123} trend={12} trendLabel="vs last month" data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.textContent).toContain("+12%");
		expect(el.textContent).toContain("vs last month");

		const trendEl = screen.getByText("+12%");
		expect(trendEl.classList.contains("text-success")).toBe(true);
	});

	it("renders a negative numeric trend with destructive color", () => {
		render(() => <Stat value={123} trend={-5} data-testid="stat-1" />);

		const trendEl = screen.getByText("-5%");
		expect(trendEl.classList.contains("text-destructive")).toBe(true);
	});

	it("renders a string trend with muted color", () => {
		render(() => <Stat value={123} trend="Stable" data-testid="stat-1" />);

		const trendEl = screen.getByText("Stable");
		expect(trendEl.classList.contains("text-muted-foreground")).toBe(true);
	});

	it("does not render a trend for a zero trend value", () => {
		render(() => <Stat value={123} trend={0} data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.textContent).not.toContain("0%");
	});

	it("merges custom className with base styles", () => {
		render(() => <Stat value={123} class="custom-stat" data-testid="stat-1" />);

		const el = screen.getByTestId("stat-1");
		expect(el.classList.contains("custom-stat")).toBe(true);
		expect(el.classList.contains("rounded-lg")).toBe(true);
	});
});
