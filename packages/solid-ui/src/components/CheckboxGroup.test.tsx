import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CheckboxGroup } from "./CheckboxGroup";

const options = [
	{ value: "a", label: "Alpha" },
	{ value: "b", label: "Beta" },
	{ value: "c", label: "Gamma", disabled: true },
];

describe("CheckboxGroup", () => {
	afterEach(cleanup);

	it("renders as a fieldset with checkbox inputs", () => {
		render(() => <CheckboxGroup options={options} data-testid="checkbox-group" />);
		const group = screen.getByTestId("checkbox-group");
		expect(group.tagName).toBe("FIELDSET");
		expect(group.getAttribute("aria-label")).toBe("Checkbox group");
		expect(screen.getAllByRole("checkbox").length).toBe(3);
	});

	it("applies a custom class and horizontal orientation styles", () => {
		render(() => (
			<CheckboxGroup options={options} class="custom-checks" orientation="horizontal" data-testid="checkbox-group" />
		));
		const group = screen.getByTestId("checkbox-group");
		expect(group.classList.contains("custom-checks")).toBe(true);
		expect(group.classList.contains("flex-wrap")).toBe(true);
	});

	it("selects an option when changed", () => {
		const onChange = vi.fn();
		render(() => <CheckboxGroup options={options} onChange={onChange} />);
		const beta = screen.getByLabelText("Beta") as HTMLInputElement;
		fireEvent.change(beta, { target: { checked: true } });
		expect(beta.checked).toBe(true);
		expect(onChange).toHaveBeenCalledWith(["b"]);
	});

	it("toggles an option when changed again", () => {
		const onChange = vi.fn();
		render(() => <CheckboxGroup options={options} defaultValue={["b"]} onChange={onChange} />);
		const beta = screen.getByLabelText("Beta") as HTMLInputElement;
		fireEvent.change(beta, { target: { checked: false } });
		expect(beta.checked).toBe(false);
		expect(onChange).toHaveBeenCalledWith([]);
	});

	it("marks disabled options as disabled", () => {
		render(() => <CheckboxGroup options={options} />);
		const gamma = screen.getByLabelText("Gamma") as HTMLInputElement;
		expect(gamma.disabled).toBe(true);
	});
});
