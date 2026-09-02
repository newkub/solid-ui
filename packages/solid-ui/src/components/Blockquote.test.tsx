import { cleanup, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";
import { Blockquote } from "./Blockquote";

describe("Blockquote", () => {
	afterEach(cleanup);

	it("renders as a <blockquote> element with children", () => {
		render(() => <Blockquote>Words of wisdom</Blockquote>);

		const el = screen.getByText("Words of wisdom");
		expect(el.tagName).toBe("BLOCKQUOTE");
	});

	it("merges custom className with base styles", () => {
		render(() => <Blockquote class="custom-quote">Quote</Blockquote>);

		const el = screen.getByText("Quote");
		expect(el.classList.contains("custom-quote")).toBe(true);
		expect(el.classList.contains("border-l-4")).toBe(true);
	});

	it("renders a citation footer when citation is provided", () => {
		render(() => <Blockquote citation="Source Name">Quoted words</Blockquote>);

		const quote = screen.getByText("Quoted words");
		expect(quote.tagName).toBe("BLOCKQUOTE");

		const cite = screen.getByText("Source Name");
		expect(cite.tagName).toBe("CITE");

		const footer = cite.closest("footer");
		expect(footer).toBeTruthy();
		expect(footer?.textContent).toContain("— Source Name");
	});

	it("does not render a footer when citation is absent", () => {
		render(() => <Blockquote>No citation here</Blockquote>);

		const el = screen.getByText("No citation here");
		expect(el.querySelector("footer")).toBeNull();
	});

	it("forwards extra props to the <blockquote> element", () => {
		render(() => (
			<Blockquote data-testid="primary-quote" id="main-quote">
				Content
			</Blockquote>
		));

		const el = screen.getByTestId("primary-quote");
		expect(el.tagName).toBe("BLOCKQUOTE");
		expect(el.id).toBe("main-quote");
	});
});
