import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MultiSelect } from "./MultiSelect";

const options = [
	{ value: "a", label: "Alpha" },
	{ value: "b", label: "Beta" },
	{ value: "c", label: "Gamma", disabled: true },
];

describe("MultiSelect", () => {
	afterEach(cleanup);

	it("renders a trigger button inside a wrapper", () => {
		render(() => <MultiSelect options={options} data-testid="multi" />);
		const wrapper = screen.getByTestId("multi");
		expect(wrapper.tagName).toBe("DIV");
		const trigger = screen.getByRole("button", { name: "Multi-select" });
		expect(trigger.tagName).toBe("BUTTON");
	});

	it("applies custom class and trigger class", () => {
		render(() => (
			<MultiSelect options={options} class="custom-multi" triggerClass="custom-trigger" data-testid="multi" />
		));
		const wrapper = screen.getByTestId("multi");
		const trigger = screen.getByRole("button", { name: "Multi-select" });
		expect(wrapper.classList.contains("custom-multi")).toBe(true);
		expect(trigger.classList.contains("custom-trigger")).toBe(true);
	});

	it("opens the listbox and selects an option", () => {
		const onChange = vi.fn();
		render(() => <MultiSelect options={options} onChange={onChange} />);
		const trigger = screen.getByRole("button", { name: "Multi-select" });
		fireEvent.click(trigger);

		const list = screen.getByRole("listbox");
		expect(list).toBeTruthy();

		const option = screen.getByRole("option", { name: "Alpha" });
		fireEvent.click(option);
		expect(onChange).toHaveBeenCalledWith(["a"]);
		expect(screen.getByLabelText("Remove Alpha")).toBeTruthy();
	});

	it("removes a selected option via the tag remove button", () => {
		const onChange = vi.fn();
		render(() => <MultiSelect options={options} defaultValue={["a", "b"]} onChange={onChange} />);
		const remove = screen.getByRole("button", { name: "Remove Alpha" });
		fireEvent.click(remove);
		expect(onChange).toHaveBeenCalledWith(["b"]);
	});

	it("selects and deselects with the Enter key", () => {
		const onChange = vi.fn();
		render(() => <MultiSelect options={options} onChange={onChange} />);
		const trigger = screen.getByRole("button", { name: "Multi-select" });

		fireEvent.keyDown(trigger, { key: "Enter" });
		expect(onChange).toHaveBeenNthCalledWith(1, ["a"]);

		fireEvent.keyDown(trigger, { key: "Enter" });
		expect(onChange).toHaveBeenNthCalledWith(2, []);
	});

	it("does not select disabled options with the keyboard", () => {
		const onChange = vi.fn();
		render(() => <MultiSelect options={options} defaultValue={[]} onChange={onChange} />);
		const trigger = screen.getByRole("button", { name: "Multi-select" });
		fireEvent.keyDown(trigger, { key: "ArrowDown" });
		fireEvent.keyDown(trigger, { key: "ArrowDown" });
		fireEvent.keyDown(trigger, { key: "Enter" });
		expect(onChange).not.toHaveBeenCalled();
	});

	it("closes on Escape", () => {
		render(() => <MultiSelect options={options} />);
		const trigger = screen.getByRole("button", { name: "Multi-select" });
		fireEvent.click(trigger);
		expect(screen.getByRole("listbox")).toBeTruthy();

		fireEvent.keyDown(trigger, { key: "Escape" });
		expect(screen.queryByRole("listbox")).toBeNull();
	});
});
