import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { HoverCard } from "./HoverCard";

describe("HoverCard", () => {
	afterEach(() => {
		cleanup();
		vi.useRealTimers();
	});

	it("renders the trigger button with its children", () => {
		render(() => <HoverCard content="Tooltip text">Hover me</HoverCard>);
		const trigger = screen.getByRole("button", { name: "Hover me" });
		expect(trigger.tagName).toBe("BUTTON");
	});

	it("applies a custom class to the wrapper", () => {
		render(() => (
			<HoverCard class="custom-hover" content="Tooltip text">
				Hover me
			</HoverCard>
		));
		const trigger = screen.getByRole("button", { name: "Hover me" });
		const wrapper = trigger.parentElement as HTMLElement;
		expect(wrapper.classList.contains("custom-hover")).toBe(true);
		expect(wrapper.classList.contains("relative")).toBe(true);
	});

	it("opens on mouse enter and closes on mouse leave after a delay", () => {
		vi.useFakeTimers();
		render(() => <HoverCard content="Tooltip text">Hover me</HoverCard>);
		const trigger = screen.getByRole("button", { name: "Hover me" });

		fireEvent.mouseEnter(trigger);
		const content = screen.getByRole("dialog", { name: "Hover card" });
		expect(content).toBeTruthy();
		expect(content.textContent).toBe("Tooltip text");

		fireEvent.mouseLeave(trigger);
		vi.advanceTimersByTime(120);
		expect(screen.queryByRole("dialog", { name: "Hover card" })).toBeNull();
	});
});
