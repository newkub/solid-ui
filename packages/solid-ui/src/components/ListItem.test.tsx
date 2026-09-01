import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { ListItem } from "./ListItem";

describe("ListItem", () => {
	afterEach(cleanup);

	it("renders as a <li> element with children", () => {
		render(() => <ListItem>List item content</ListItem>);

		const el = screen.getByText("List item content");
		expect(el.tagName).toBe("LI");
	});

	it("merges custom className with base styles", () => {
		render(() => <ListItem class="custom-item">Item</ListItem>);

		const el = screen.getByText("Item");
		expect(el.classList.contains("custom-item")).toBe(true);
		expect(el.classList.contains("text-sm")).toBe(true);
	});

	it("forwards extra props to the <li> element", () => {
		render(() => (
			<ListItem data-testid="list-item" id="main-item">
				Item
			</ListItem>
		));

		const el = screen.getByTestId("list-item");
		expect(el.tagName).toBe("LI");
		expect(el.id).toBe("main-item");
	});
});
