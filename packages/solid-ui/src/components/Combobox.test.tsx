import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";

const options = [
	{ value: "apple", label: "Apple" },
	{ value: "banana", label: "Banana" },
	{ value: "cherry", label: "Cherry" },
];

describe("Combobox", () => {
	afterEach(cleanup);

	it("renders a combobox input inside a wrapper", () => {
		render(() => <Combobox options={options} data-testid="combobox" />);
		const wrapper = screen.getByTestId("combobox");
		expect(wrapper.tagName).toBe("DIV");
		expect(wrapper.classList.contains("relative")).toBe(true);
		const input = screen.getByRole("combobox");
		expect(input.tagName).toBe("INPUT");
	});

	it("applies custom class and input class", () => {
		render(() => (
			<Combobox options={options} class="custom-combobox" inputClass="custom-input" data-testid="combobox" />
		));
		const wrapper = screen.getByTestId("combobox");
		const input = screen.getByRole("combobox");
		expect(wrapper.classList.contains("custom-combobox")).toBe(true);
		expect(input.classList.contains("custom-input")).toBe(true);
	});

	it("opens the list and selects an option on click", () => {
		const onChange = vi.fn();
		render(() => <Combobox options={options} onChange={onChange} />);
		const input = screen.getByRole("combobox") as HTMLInputElement;
		fireEvent.focus(input);

		const option = screen.getByRole("option", { name: "Banana" });
		expect(option).toBeTruthy();
		fireEvent.click(option);
		expect(onChange).toHaveBeenCalledWith("banana");
		expect(input.value).toBe("Banana");
		expect(screen.queryByRole("listbox")).toBeNull();
	});

	it("filters options when typing", () => {
		render(() => <Combobox options={options} />);
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		fireEvent.input(input, { target: { value: "App" } });
		const opts = screen.getAllByRole("option");
		expect(opts.length).toBe(1);
		expect(opts[0].textContent).toBe("Apple");
	});

	it("shows empty text when no options match", () => {
		render(() => <Combobox options={options} emptyText="No match" />);
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		fireEvent.input(input, { target: { value: "xyz" } });
		expect(screen.queryByRole("option")).toBeNull();
		expect(screen.getByText("No match")).toBeTruthy();
	});

	it("closes the list on Escape", () => {
		render(() => <Combobox options={options} />);
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		expect(screen.getByRole("listbox")).toBeTruthy();

		fireEvent.keyDown(input, { key: "Escape" });
		expect(screen.queryByRole("listbox")).toBeNull();
	});

	it("selects the active option with Enter", () => {
		const onChange = vi.fn();
		render(() => <Combobox options={options} onChange={onChange} />);
		const input = screen.getByRole("combobox");
		fireEvent.focus(input);
		fireEvent.keyDown(input, { key: "ArrowDown" });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(onChange).toHaveBeenCalledWith("banana");
	});
});
