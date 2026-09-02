import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Kbd } from "./Kbd";

describe("Kbd", () => {
	it("renders as a <kbd> element with children", () => {
		render(() => <Kbd>Ctrl</Kbd>);

		const el = screen.getByText("Ctrl");
		expect(el.tagName).toBe("KBD");
	});

	it("applies custom className", () => {
		render(() => <Kbd class="custom-class">K</Kbd>);

		const el = screen.getByText("K");
		expect(el.classList.contains("custom-class")).toBe(true);
	});
});
