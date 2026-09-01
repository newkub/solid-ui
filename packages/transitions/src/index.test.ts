import { describe, expect, it } from "vitest";
import { buildCssTransition, mergeTransitionOptions } from "./index";

describe("@wrikka/transitions", () => {
	it("mergeTransitionOptions fills in defaults for missing fields", () => {
		const merged = mergeTransitionOptions();

		expect(merged).toHaveProperty("duration");
		expect(merged).toHaveProperty("easing");
		expect(merged).toHaveProperty("mode");
	});

	it("mergeTransitionOptions overrides defaults with the provided options", () => {
		const merged = mergeTransitionOptions({ duration: 500 });

		expect(merged.duration).toBe(500);
	});

	it("buildCssTransition returns a CSS transition string", () => {
		const options = mergeTransitionOptions({ duration: 300, easing: "ease-in-out" });

		expect(buildCssTransition(options)).toBe("all 300ms ease-in-out");
	});
});
