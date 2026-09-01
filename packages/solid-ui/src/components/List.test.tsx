import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { List } from "./List";

describe("List", () => {
	afterEach(cleanup);

	it("renders as an unordered <ul> by default", () => {
		render(() => (
			<List>
				<li>Apple</li>
				<li>Banana</li>
			</List>
		));

		const list = screen.getByRole("list");
		expect(list.tagName).toBe("UL");
	});

	it("renders as an ordered <ol> when ordered is true", () => {
		render(() => (
			<List ordered>
				<li>First</li>
				<li>Second</li>
			</List>
		));

		const list = screen.getByRole("list");
		expect(list.tagName).toBe("OL");
	});

	it("applies list-disc class for unordered lists", () => {
		render(() => (
			<List>
				<li>Item</li>
			</List>
		));

		const list = screen.getByRole("list");
		expect(list.classList.contains("list-disc")).toBe(true);
		expect(list.classList.contains("list-decimal")).toBe(false);
	});

	it("applies list-decimal class for ordered lists", () => {
		render(() => (
			<List ordered>
				<li>Step</li>
			</List>
		));

		const list = screen.getByRole("list");
		expect(list.classList.contains("list-decimal")).toBe(true);
		expect(list.classList.contains("list-disc")).toBe(false);
	});

	it("removes list markers when unstyled is true", () => {
		render(() => (
			<List unstyled>
				<li>Plain</li>
			</List>
		));

		const list = screen.getByRole("list");
		expect(list.classList.contains("list-disc")).toBe(false);
		expect(list.classList.contains("list-decimal")).toBe(false);
		expect(list.classList.contains("my-2")).toBe(true);
	});

	it("merges custom className with base styles", () => {
		render(() => (
			<List class="custom-list">
				<li>Item</li>
			</List>
		));

		const list = screen.getByRole("list");
		expect(list.classList.contains("custom-list")).toBe(true);
		expect(list.classList.contains("my-2")).toBe(true);
	});

	it("renders children correctly", () => {
		render(() => (
			<List>
				<li>One</li>
				<li>Two</li>
			</List>
		));

		expect(screen.getByText("One")).toBeTruthy();
		expect(screen.getByText("Two")).toBeTruthy();
	});
});
