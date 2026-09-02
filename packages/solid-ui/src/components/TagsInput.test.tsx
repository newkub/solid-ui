import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TagsInput } from "./TagsInput";

describe("TagsInput", () => {
	afterEach(cleanup);

	it("renders as a div with an input and an empty tag list", () => {
		render(() => <TagsInput data-testid="tags" />);
		const el = screen.getByTestId("tags");
		expect(el.tagName).toBe("DIV");
		const list = el.querySelector("ul");
		expect(list).toBeTruthy();
		const input = screen.getByRole("textbox", { name: "Add a tag" });
		expect(input).toBeTruthy();
	});

	it("applies custom class and input class", () => {
		render(() => <TagsInput class="custom-tags" inputClass="custom-input" data-testid="tags" />);
		const el = screen.getByTestId("tags");
		const input = screen.getByRole("textbox", { name: "Add a tag" });
		expect(el.classList.contains("custom-tags")).toBe(true);
		expect(input.classList.contains("custom-input")).toBe(true);
	});

	it("adds a tag on Enter", () => {
		const onChange = vi.fn();
		render(() => <TagsInput onChange={onChange} data-testid="tags" />);
		const input = screen.getByRole("textbox", { name: "Add a tag" });
		fireEvent.input(input, { target: { value: "new tag" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(onChange).toHaveBeenCalledWith(["new tag"]);
		expect(screen.getByText("new tag")).toBeTruthy();
	});

	it("does not add duplicate tags", () => {
		const onChange = vi.fn();
		render(() => <TagsInput defaultValue={["solid"]} onChange={onChange} />);
		const input = screen.getByRole("textbox", { name: "Add a tag" });
		fireEvent.input(input, { target: { value: "solid" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(onChange).not.toHaveBeenCalled();
	});

	it("removes a tag when the remove button is clicked", () => {
		const onChange = vi.fn();
		render(() => <TagsInput defaultValue={["alpha", "beta"]} onChange={onChange} />);
		const remove = screen.getByRole("button", { name: "Remove alpha" });
		fireEvent.click(remove);
		expect(onChange).toHaveBeenCalledWith(["beta"]);
	});

	it("removes the last tag on Backspace when the input is empty", () => {
		const onChange = vi.fn();
		render(() => <TagsInput defaultValue={["alpha", "beta"]} onChange={onChange} />);
		const input = screen.getByRole("textbox", { name: "Add a tag" });
		fireEvent.input(input, { target: { value: "" } });
		fireEvent.keyDown(input, { key: "Backspace" });
		expect(onChange).toHaveBeenCalledWith(["alpha"]);
	});
});
