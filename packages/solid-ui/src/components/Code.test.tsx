import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { Code } from "./Code";

describe("Code", () => {
	afterEach(cleanup);

	it("renders as a <code> element with children", () => {
		render(() => <Code>const hello = "hello"</Code>);

		const el = screen.getByText('const hello = "hello"');
		expect(el.tagName).toBe("CODE");
	});

	it("merges custom className with base styles", () => {
		render(() => <Code class="custom-code">snippet</Code>);

		const el = screen.getByText("snippet");
		expect(el.classList.contains("custom-code")).toBe(true);
		expect(el.classList.contains("font-mono")).toBe(true);
	});

	it("forwards extra props to the <code> element", () => {
		render(() => (
			<Code data-testid="code-block" id="primary-code">
				snippet
			</Code>
		));

		const el = screen.getByTestId("code-block");
		expect(el.tagName).toBe("CODE");
		expect(el.id).toBe("primary-code");
	});
});
