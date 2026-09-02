import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RadioGroup } from "./RadioGroup";

const options = [
	{ value: "a", label: "Alpha" },
	{ value: "b", label: "Beta" },
	{ value: "c", label: "Gamma", disabled: true },
];

describe("RadioGroup", () => {
	afterEach(cleanup);

	it("renders as a radiogroup with radio inputs", () => {
		render(() => <RadioGroup options={options} name="group" data-testid="radio-group" />);
		const group = screen.getByTestId("radio-group");
		expect(group.tagName).toBe("DIV");
		expect(group.getAttribute("role")).toBe("radiogroup");
		expect(screen.getAllByRole("radio").length).toBe(3);
	});

	it("applies a custom class and horizontal orientation styles", () => {
		render(() => (
			<RadioGroup
				options={options}
				name="group"
				class="custom-radio"
				orientation="horizontal"
				data-testid="radio-group"
			/>
		));
		const group = screen.getByTestId("radio-group");
		expect(group.classList.contains("custom-radio")).toBe(true);
		expect(group.classList.contains("flex-wrap")).toBe(true);
	});

	it("selects an option when changed", () => {
		const onChange = vi.fn();
		render(() => <RadioGroup options={options} name="group" onChange={onChange} />);
		const beta = screen.getByLabelText("Beta") as HTMLInputElement;
		fireEvent.change(beta, { target: { checked: true } });
		expect(beta.checked).toBe(true);
		expect(onChange).toHaveBeenCalledWith("b");
	});

	it("uses the provided default value", () => {
		render(() => <RadioGroup options={options} name="group" defaultValue="a" />);
		const alpha = screen.getByLabelText("Alpha") as HTMLInputElement;
		expect(alpha.checked).toBe(true);
	});

	it("marks disabled options as disabled", () => {
		render(() => <RadioGroup options={options} name="group" />);
		const gamma = screen.getByLabelText("Gamma") as HTMLInputElement;
		expect(gamma.disabled).toBe(true);
	});
});
