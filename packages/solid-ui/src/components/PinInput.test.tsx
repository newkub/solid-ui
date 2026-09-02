import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PinInput } from "./PinInput";

describe("PinInput", () => {
	afterEach(cleanup);

	it("renders a fieldset with the requested number of inputs", () => {
		render(() => <PinInput length={6} data-testid="pin" />);
		const el = screen.getByTestId("pin");
		expect(el.tagName).toBe("FIELDSET");
		expect(el.getAttribute("aria-label")).toBe("Pin input");
		const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
		expect(inputs.length).toBe(6);
	});

	it("applies custom class and input class", () => {
		render(() => <PinInput class="custom-pin" inputClass="custom-digit" data-testid="pin" />);
		const el = screen.getByTestId("pin");
		const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
		expect(el.classList.contains("custom-pin")).toBe(true);
		expect(el.classList.contains("flex")).toBe(true);
		expect(inputs[0].classList.contains("custom-digit")).toBe(true);
	});

	it("displays the default value across inputs", () => {
		render(() => <PinInput defaultValue="12" data-testid="pin" />);
		const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
		expect(inputs[0].value).toBe("1");
		expect(inputs[1].value).toBe("2");
		expect(inputs[2].value).toBe("");
		expect(inputs[3].value).toBe("");
	});

	it("updates value and calls onChange when typing", () => {
		const onChange = vi.fn();
		render(() => <PinInput onChange={onChange} />);
		const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
		fireEvent.input(inputs[0], { target: { value: "5" } });
		expect(onChange).toHaveBeenNthCalledWith(1, "5");
		fireEvent.input(inputs[1], { target: { value: "9" } });
		expect(onChange).toHaveBeenNthCalledWith(2, "59");
	});

	it("calls onComplete when all digits are filled", () => {
		const onComplete = vi.fn();
		render(() => <PinInput length={4} onComplete={onComplete} />);
		const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
		fireEvent.input(inputs[0], { target: { value: "1" } });
		fireEvent.input(inputs[1], { target: { value: "2" } });
		fireEvent.input(inputs[2], { target: { value: "3" } });
		fireEvent.input(inputs[3], { target: { value: "4" } });
		expect(onComplete).toHaveBeenCalledWith("1234");
	});

	it("clears a digit and moves focus on Backspace", () => {
		const onChange = vi.fn();
		render(() => <PinInput defaultValue="12" onChange={onChange} data-testid="pin" />);
		const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

		fireEvent.keyDown(inputs[1], { key: "Backspace" });
		expect(inputs[1].value).toBe("");
		expect(onChange).toHaveBeenLastCalledWith("1");

		fireEvent.keyDown(inputs[1], { key: "Backspace" });
		expect(document.activeElement).toBe(inputs[0]);
	});
});
