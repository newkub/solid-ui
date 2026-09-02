import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { ProgressCircle } from "./ProgressCircle";

describe("ProgressCircle", () => {
	afterEach(cleanup);

	it("renders as an <svg> with role progressbar", () => {
		render(() => <ProgressCircle value={50} max={100} />);

		const el = screen.getByRole("progressbar");
		expect(el.tagName).toBe("svg");
	});

	it("sets default size, stroke, and viewBox", () => {
		render(() => <ProgressCircle />);

		const el = screen.getByRole("progressbar");
		expect(el.getAttribute("width")).toBe("48");
		expect(el.getAttribute("height")).toBe("48");
		expect(el.getAttribute("viewBox")).toBe("0 0 48 48");
	});

	it("sets custom size and stroke", () => {
		render(() => <ProgressCircle size={64} stroke={6} />);

		const el = screen.getByRole("progressbar");
		expect(el.getAttribute("width")).toBe("64");
		expect(el.getAttribute("height")).toBe("64");
		expect(el.getAttribute("viewBox")).toBe("0 0 64 64");
	});

	it("exposes accessibility attributes", () => {
		render(() => <ProgressCircle value={42} max={200} />);

		const el = screen.getByRole("progressbar");
		expect(el.getAttribute("aria-valuemin")).toBe("0");
		expect(el.getAttribute("aria-valuemax")).toBe("200");
		expect(el.getAttribute("aria-valuenow")).toBe("42");
	});

	it("clamps aria-valuenow to the max value", () => {
		render(() => <ProgressCircle value={250} max={200} />);

		const el = screen.getByRole("progressbar");
		expect(el.getAttribute("aria-valuenow")).toBe("250");
	});

	it("computes stroke-dasharray and dashoffset for the progress circle", () => {
		render(() => <ProgressCircle value={50} max={100} size={48} stroke={4} />);

		const el = screen.getByRole("progressbar");
		const progressCircle = el.querySelector("circle.text-primary");
		expect(progressCircle).toBeTruthy();

		const radius = (48 - 4) / 2;
		const circumference = 2 * Math.PI * radius;
		const dashOffset = circumference - (50 / 100) * circumference;

		expect(progressCircle?.getAttribute("stroke-dasharray")).toBe(String(circumference));
		expect(progressCircle?.getAttribute("stroke-dashoffset")).toBe(String(dashOffset));
	});

	it("clamps percent at 100 and updates dashoffset accordingly", () => {
		render(() => <ProgressCircle value={150} max={100} size={48} stroke={4} />);

		const el = screen.getByRole("progressbar");
		const progressCircle = el.querySelector("circle.text-primary");
		const radius = (48 - 4) / 2;
		const circumference = 2 * Math.PI * radius;

		expect(progressCircle?.getAttribute("stroke-dashoffset")).toBe("0");
		expect(progressCircle?.getAttribute("stroke-dasharray")).toBe(String(circumference));
	});

	it("clamps percent at 0 for negative values", () => {
		render(() => <ProgressCircle value={-20} max={100} size={48} stroke={4} />);

		const el = screen.getByRole("progressbar");
		const progressCircle = el.querySelector("circle.text-primary");
		const radius = (48 - 4) / 2;
		const circumference = 2 * Math.PI * radius;

		expect(progressCircle?.getAttribute("stroke-dashoffset")).toBe(String(circumference));
	});

	it("merges custom className with base styles", () => {
		render(() => <ProgressCircle class="custom-progress" />);

		const el = screen.getByRole("progressbar");
		expect(el.classList.contains("custom-progress")).toBe(true);
		expect(el.classList.contains("inline-block")).toBe(true);
	});
});
